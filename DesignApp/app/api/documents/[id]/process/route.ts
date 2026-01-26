import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { extractTextFromPdf } from '@/lib/pdf'
import { extractDocumentData } from '@/lib/ai'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const supabase = await createClient()

  try {
    // 1. Get document and file info
    const { data: doc, error: docError } = await supabase
      .from('documents')
      .select('*, document_files(*)')
      .eq('id', id)
      .single()

    if (docError || !doc) {
      return NextResponse.json({ success: false, error: 'Documento non trovato' }, { status: 404 })
    }

    const file = doc.document_files?.[0]
    if (!file) {
      return NextResponse.json({ success: false, error: 'File associato non trovato' }, { status: 404 })
    }

    // 2. Download from Storage
    const { data: fileBuffer, error: storageError } = await supabase
      .storage
      .from('documents')
      .download(file.storage_path)

    if (storageError || !fileBuffer) {
      return NextResponse.json({ success: false, error: 'Errore download file da storage' }, { status: 500 })
    }

    // 3. Extract text
    const text = await extractTextFromPdf(Buffer.from(await fileBuffer.arrayBuffer()))

    // 4. Call AI
    const aiResult = await extractDocumentData(text, { 
      filename: file.filename, 
      original_doc_number: doc.doc_number 
    })

    // 5. Update Database
    // First, find or create vendor
    let vendorId = doc.vendor_id
    if (!vendorId && aiResult.vendor_name) {
      const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .ilike('name', aiResult.vendor_name)
        .single()
      
      if (vendor) {
        vendorId = vendor.id
      } else {
        const { data: newVendor } = await supabase
          .from('vendors')
          .insert({ 
            organization_id: doc.organization_id, 
            name: aiResult.vendor_name 
          })
          .select()
          .single()
        vendorId = newVendor?.id
      }
    }

    // Update document
    await supabase
      .from('documents')
      .update({
        vendor_id: vendorId,
        doc_number: aiResult.doc_number || doc.doc_number,
        doc_date: aiResult.doc_date || doc.doc_date,
        total_amount: aiResult.total_amount,
        status: 'pending_review',
        ai_confidence: aiResult.confidence,
        ai_raw_response: aiResult
      })
      .eq('id', id)

    // Upsert line items
    // First delete existing lines
    await supabase.from('document_lines').delete().eq('document_id', id)

    // Insert new lines
    if (aiResult.line_items && Array.isArray(aiResult.line_items)) {
      // Get categories to map names to IDs
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name')
        .eq('organization_id', doc.organization_id)

      const linesToInsert = aiResult.line_items.map((item: any) => {
        const category = categories?.find(c => c.name.toLowerCase() === item.category?.toLowerCase())
        return {
          document_id: id,
          category_id: category?.id,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          total_line: item.total_line,
          needs_review: !category
        }
      })

      await supabase.from('document_lines').insert(linesToInsert)
    }

    return NextResponse.json({ success: true, data: aiResult })
  } catch (error: any) {
    console.error('Errore processing AI:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
