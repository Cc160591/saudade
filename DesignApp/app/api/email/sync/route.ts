import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { fetchEmailsWithPdf } from '@/lib/imap'
import { uploadDocument } from '@/lib/supabase/storage'

export const runtime = 'nodejs' // IMAP needs Node.js runtime

export async function POST(request: Request) {
  // Check for Cron Secret
  const authHeader = request.headers.get('Authorization')
  if (process.env.SYNC_CRON_SECRET && authHeader !== `Bearer ${process.env.SYNC_CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  try {
    // 1. Fetch messages from IMAP (Libero)
    const messages = await fetchEmailsWithPdf()
    const results = []

    for (const msg of messages) {
      if (!msg.id) continue

      // 2. Check idempotency (using gmail_message_id field as a generic email_id for now)
      const { data: existingDoc } = await supabase
        .from('documents')
        .select('id')
        .eq('gmail_message_id', msg.id)
        .single()

      if (existingDoc) {
        results.push({ id: msg.id, status: 'skipped', reason: 'already_exists' })
        continue
      }

      // 3. Process attachments
      for (const attachment of msg.attachments) {
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
          attachment.content,
          attachment.filename,
          attachment.contentType,
          msg.id
        )

        // 5. Create Document record
        const { data: doc, error: docError } = await supabase
          .from('documents')
          .insert({
            organization_id: org.id,
            type: attachment.filename.toLowerCase().includes('bolla') ? 'bolla' : 'fattura',
            doc_number: msg.subject,
            doc_date: msg.date.toISOString().split('T')[0],
            status: 'pending_review',
            gmail_message_id: msg.id, // Keeping the field name for now to avoid DB migration complexity
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
            filename: attachment.filename,
            mime_type: attachment.contentType,
            size_bytes: attachment.content.length
          })

        results.push({ id: msg.id, status: 'synced', docId: doc.id })
        
        // Note: AI extraction is usually triggered by a webhook or manually in this setup
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Errore sync Email:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
