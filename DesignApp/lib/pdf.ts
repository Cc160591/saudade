import { PDFParse } from 'pdf-parse'

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/d48c886e-e718-4dbc-abae-36606b84511f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdf.ts:4',message:'Inizio estrazione PDF',data:{bufferLength:buffer?.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
  // #endregion
  
  const parser = new PDFParse({ data: buffer })
  try {
    const data = await parser.getText()
    
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/d48c886e-e718-4dbc-abae-36606b84511f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdf.ts:11',message:'Testo estratto con successo',data:{textPreview:data.text?.substring(0, 50),totalChars:data.text?.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    
    return data.text
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/d48c886e-e718-4dbc-abae-36606b84511f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pdf.ts:17',message:'Errore durante estrazione',data:{error:error?.message || error},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    
    console.error('Errore estrazione testo PDF:', error)
    throw error
  } finally {
    await parser.destroy().catch(() => {})
  }
}
