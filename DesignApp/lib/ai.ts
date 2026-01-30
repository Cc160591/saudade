import OpenAI from 'openai'

// #region agent log (lazy instance)
let openaiClient: OpenAI | null = null
function getOpenAI() {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables')
    }
    openaiClient = new OpenAI({ apiKey })
  }
  return openaiClient
}
// #endregion

const CATEGORIES = [
  'Carne',
  'Cucina',
  'Vini',
  'Bar / Beverage',
  'Materiale di consumo',
  'Manutenzioni',
  'Servizi'
]

export async function extractDocumentData(text: string, metadata: any) {
  const openai = getOpenAI()
  
  const prompt = `
Sei un assistente esperto in gestione amministrativa per ristoranti (Saudade). 
Il tuo compito è estrarre dati strutturati da un testo estratto da una bolla o fattura.

DATI DA ESTRARRE:
- Tipo documento: "bolla" | "fattura" | "bonifico"
- Nome Fornitore
- Numero documento
- Data documento (formato YYYY-MM-DD)
- Totale documento (numero)
- Valuta (default EUR)
- Righe prodotto: per ogni riga estrai descrizione, quantità, unità di misura, prezzo unitario, totale riga e CATEGORIA.

CATEGORIE DISPONIBILI (scegli solo tra queste):
${CATEGORIES.map(c => `- ${c}`).join('\n')}

IMPORTANTE: Una singola bolla può contenere prodotti di categorie diverse. Assegna ogni riga alla categoria corretta.

TESTO ESTRATTO:
---
${text}
---

METADATA:
${JSON.stringify(metadata)}

RESTITUISCI SOLO UN JSON VALIDO con questa struttura:
{
  "doc_type": "string",
  "vendor_name": "string",
  "doc_number": "string",
  "doc_date": "string",
  "total_amount": number,
  "currency": "string",
  "line_items": [
    {
      "description": "string",
      "quantity": number,
      "unit": "string",
      "unit_price": number,
      "total_line": number,
      "category": "string"
    }
  ],
  "confidence": number,
  "notes": "string"
}
`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // O gpt-4-turbo
    messages: [
      { role: 'system', content: 'Sei un estrattore di dati strutturati JSON.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('Risposta OpenAI vuota')
  
  return JSON.parse(content)
}
