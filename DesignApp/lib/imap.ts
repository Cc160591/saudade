import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'

export interface EmailAttachment {
  filename: string
  content: Buffer
  contentType: string
}

export interface EmailMessage {
  id: string // Message-ID or UID
  subject: string
  date: Date
  from: string
  attachments: EmailAttachment[]
}

export async function fetchEmailsWithPdf() {
  const client = new ImapFlow({
    host: process.env.IMAP_HOST || 'imapmail.libero.it',
    port: parseInt(process.env.IMAP_PORT || '993'),
    secure: process.env.IMAP_SECURE !== 'false',
    auth: {
      user: process.env.IMAP_USER!,
      pass: process.env.IMAP_PASSWORD!
    },
    logger: false
  })

  const messages: EmailMessage[] = []

  try {
    await client.connect()

    const lock = await client.getMailboxLock(process.env.IMAP_MAILBOX || 'INBOX')
    try {
      // Search for unseen messages or just messages with attachments
      // For Libero/IMAP, searching for PDF attachments directly might be tricky depending on the server support.
      // We'll search for all messages in the last 7 days as a safety net, or just all for now and filter.
      // Better: search for UNSEEN to avoid reprocessing, or rely on our DB idempotency.
      
      const searchCriteria = {
        // You can add criteria here, e.g., unseen: true
      }

      for await (const msg of client.fetch(searchCriteria, {
        source: true,
        envelope: true,
        uid: true
      })) {
        const parsed = await simpleParser(msg.source)
        
        const pdfAttachments = parsed.attachments.filter(
          att => att.contentType === 'application/pdf' || att.filename?.toLowerCase().endsWith('.pdf')
        )

        if (pdfAttachments.length > 0) {
          messages.push({
            id: parsed.messageId || msg.uid.toString(),
            subject: parsed.subject || 'Senza oggetto',
            date: parsed.date || new Date(),
            from: parsed.from?.text || 'Sconosciuto',
            attachments: pdfAttachments.map(att => ({
              filename: att.filename || 'documento.pdf',
              content: att.content,
              contentType: att.contentType
            }))
          })
        }
        
        // Mark as seen if we processed it (optional, depends on workflow)
        // await client.messageFlagsAdd({uid: msg.uid}, ['\\Seen']);
      }
    } finally {
      lock.release()
    }

    await client.logout()
  } catch (error) {
    console.error('IMAP Error:', error)
    throw error
  }

  return messages
}
