import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

export async function listMessages(query = 'has:attachment filename:pdf') {
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults: 10
  })
  return res.data.messages || []
}

export async function getMessage(id: string) {
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: id
  })
  return res.data
}

export async function getAttachment(messageId: string, attachmentId: string) {
  const res = await gmail.users.messages.attachments.get({
    userId: 'me',
    messageId: messageId,
    id: attachmentId
  })
  return res.data.data // base64url encoded
}

export async function downloadAttachment(messageId: string, attachmentId: string) {
  const base64Data = await getAttachment(messageId, attachmentId)
  if (!base64Data) return null
  return Buffer.from(base64Data, 'base64')
}
