import { createClient } from './server'

/**
 * Genera un signed URL per un documento caricato in Supabase Storage.
 * @param path Il path completo nel bucket 'documents'
 * @param expiresIn Scadenza in secondi (default 1 ora)
 */
export async function getDocumentSignedUrl(path: string, expiresIn = 3600) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .storage
    .from('documents')
    .createSignedUrl(path, expiresIn)

  if (error) {
    console.error('Errore generazione signed URL:', error)
    return null
  }

  return data.signedUrl
}

/**
 * Upload di un file nel bucket 'documents' seguendo la naming convention.
 * @param organizationId ID dell'organizzazione
 * @param file Il file da caricare
 * @param messageId ID opzionale del messaggio Gmail per idempotenza
 */
export async function uploadDocument(
  organizationId: string, 
  file: File | Buffer, 
  filename: string,
  mimeType: string,
  messageId?: string
) {
  const supabase = await createClient()
  
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  
  const cleanFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storagePath = `${organizationId}/${year}/${month}/${messageId ? `${messageId}_` : ''}${cleanFilename}`

  const { data, error } = await supabase
    .storage
    .from('documents')
    .upload(storagePath, file, {
      contentType: mimeType,
      upsert: true
    })

  if (error) {
    console.error('Errore upload documento:', error)
    throw error
  }

  return {
    path: data.path,
    fullPath: storagePath
  }
}
