'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, PrinterIcon as PrintIcon } from 'lucide-react'
import Link from 'next/link'

export default function FatturaDetailPage({ params }: { params: { id: string } }) {
  const fatturaData = {
    numero: 'FT-2025-001',
    fornitore: 'Carni Italiane',
    data: '20 Gennaio 2025',
    scadenza: '20 Febbraio 2025',
    stato: 'OK',
    prodotti: [
      { id: 1, nome: 'Carne di Manzo Premium 5kg', quantita: 20, unitario: 45.00, totale: 900.00 },
      { id: 2, nome: 'Petto di Pollo Fresco 3kg', quantita: 15, unitario: 28.50, totale: 427.50 },
      { id: 3, nome: 'Costine di Maiale 2kg', quantita: 10, unitario: 32.00, totale: 320.00 },
      { id: 4, nome: 'Braciole Miste 1kg', quantita: 25, unitario: 18.75, totale: 468.75 },
    ]
  }

  const subtotale = fatturaData.prodotti.reduce((sum, p) => sum + p.totale, 0)
  const iva = subtotale * 0.10
  const totale = subtotale + iva

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/amministrazione/fatture">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fattura {fatturaData.numero}</h1>
            <p className="text-foreground/60 mt-1">Dettagli completi della fattura</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Scarica PDF
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <PrintIcon className="w-4 h-4" />
            Stampa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Data Fattura</p>
            <p className="text-xl font-bold mt-2">{fatturaData.data}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Data Scadenza</p>
            <p className="text-xl font-bold mt-2">{fatturaData.scadenza}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Stato</p>
            <p className="text-xl font-bold text-green-600 mt-2">✓ {fatturaData.stato}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Importo Totale</p>
            <p className="text-2xl font-bold text-primary mt-2">€{totale.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Intestatario Fattura */}
      <Card>
        <CardHeader>
          <CardTitle>Dati Fattura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Cedente</p>
              <p className="text-lg font-semibold">{fatturaData.fornitore}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Partita IVA</p>
              <p className="text-lg font-semibold">IT 12345678901</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Indirizzo</p>
              <p className="text-lg">Via delle Carni, 45</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Città</p>
              <p className="text-lg">Brescia (BS) - Italia</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prestazioni */}
      <Card>
        <CardHeader>
          <CardTitle>Prestazioni</CardTitle>
          <CardDescription>{fatturaData.prodotti.length} articoli in fattura</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Descrizione</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Quantità</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Prezzo Unitario</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Importo</th>
                </tr>
              </thead>
              <tbody>
                {fatturaData.prodotti.map((prod) => (
                  <tr key={prod.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium">{prod.nome}</td>
                    <td className="py-3 px-4 text-right">{prod.quantita}</td>
                    <td className="py-3 px-4 text-right">€{prod.unitario.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-semibold text-primary">€{prod.totale.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 space-y-2 border-t border-border pt-4">
            <div className="flex justify-end gap-4">
              <div className="text-right">
                <p className="text-sm text-foreground/60 mb-1">Imponibile</p>
                <p className="font-semibold">€{subtotale.toFixed(2)}</p>
              </div>
              <div className="w-32"></div>
            </div>
            <div className="flex justify-end gap-4">
              <div className="text-right">
                <p className="text-sm text-foreground/60 mb-1">IVA 10%</p>
                <p className="font-semibold">€{iva.toFixed(2)}</p>
              </div>
              <div className="w-32"></div>
            </div>
            <div className="flex justify-end gap-4 border-t border-border pt-2">
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground/70 mb-1">TOTALE</p>
                <p className="text-2xl font-bold text-primary">€{totale.toFixed(2)}</p>
              </div>
              <div className="w-32"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle>Dati Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Modalità Pagamento</p>
              <p className="text-lg font-semibold">Bonifico Bancario</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Stato Pagamento</p>
              <p className="text-lg font-semibold text-green-600">✓ Pagata</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">IBAN</p>
              <p className="text-lg font-semibold font-mono">IT60X0542811101000000123456</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Data Pagamento</p>
              <p className="text-lg font-semibold">25 Gennaio 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note Documento */}
      <Card>
        <CardHeader>
          <CardTitle>Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Fattura regolare con consegna conforme all'ordine. Nessuna anomalia riscontrata.</p>
        </CardContent>
      </Card>
    </div>
  )
}
