import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listMessages, getMessage, downloadAttachment } from '@/lib/gmail'
import { uploadDocument } from '@/lib/supabase/storage'

export async function POST() {
  const supabase = await createClient()

  try {
    // 1. Fetch messages from Gmail
    const messages = await listMessages()
    const results = []

    for (const msg of messages) {
      if (!msg.id) continue

      // 2. Check idempotency
      const { data: existingDoc } = await supabase
        .from('documents')
        .select('id')
        .eq('gmail_message_id', msg.id)
        .single()

      if (existingDoc) {
        results.push({ id: msg.id, status: 'skipped', reason: 'already_exists' })
        continue
      }

      // 3. Get full message details
      const fullMsg = await getMessage(msg.id)
      const parts = fullMsg.payload?.parts || []
      
      // Extract metadata
      const headers = fullMsg.payload?.headers || []
      const subject = headers.find(h => h.name === 'Subject')?.value || 'Senza oggetto'
      const dateStr = headers.find(h => h.name === 'Date')?.value
      const docDate = dateStr ? new Date(dateStr).toISOString().split('T')[0] : null

      // Process attachments
      for (const part of parts) {
        if (part.filename && part.body?.attachmentId && part.mimeType === 'application/pdf') {
          const buffer = await downloadAttachment(msg.id, part.body.attachmentId)
          
          if (buffer) {
            // Get current organization (saudade by default for now)
            const { data: org } = await supabase
              .from('organizations')
              .select('id')
              .eq('slug', 'saudade')
              .single()

            if (!org) throw new Error('Organization Saudade not found')

            // 4. Upload to Storage
            const { fullPath } = await uploadDocument(
              org.id,
              buffer,
              part.filename,
              part.mimeType,
              msg.id
            )

            // 5. Create Document record
            const { data: doc, error: docError } = await supabase
              .from('documents')
              .insert({
                organization_id: org.id,
                type: part.filename.toLowerCase().includes('bolla') ? 'bolla' : 'fattura',
                doc_number: subject, // Placeholder
                doc_date: docDate,
                status: 'pending_review',
                gmail_message_id: msg.id,
                currency: 'EUR'
              })
              .select()
              .single()

            if (docError) {
              console.error('Errore creazione documento:', docError)
              continue
            }

            // Create Document File record
            await supabase
              .from('document_files')
              .insert({
                document_id: doc.id,
                storage_path: fullPath,
                filename: part.filename,
                mime_type: part.mimeType,
                size_bytes: buffer.length
              })

            results.push({ id: msg.id, status: 'synced', docId: doc.id })
            
            // TODO: Trigger AI extraction here
          }
        }
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Errore sync Gmail:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
