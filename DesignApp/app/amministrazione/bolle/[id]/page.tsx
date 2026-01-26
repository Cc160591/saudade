'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Printer as Print } from 'lucide-react'
import Link from 'next/link'

export default function BollaDetailPage({ params }: { params: { id: string } }) {
  const bollaData = {
    numero: 'BL-2025-001',
    fornitore: 'Fornitori Brasile S.r.l.',
    data: '20 Gennaio 2025',
    scadenza: '20 Febbraio 2025',
    totale: 2450.00,
    stato: 'Verificata',
    prodotti: [
      { id: 1, nome: 'Riso Brasile 5kg', quantita: 10, unitario: 35.00, totale: 350.00 },
      { id: 2, nome: 'Farinetta di Manioca 2kg', quantita: 15, unitario: 45.50, totale: 682.50 },
      { id: 3, nome: 'Spezie Brasiliane Mix', quantita: 8, unitario: 28.75, totale: 230.00 },
      { id: 4, nome: 'Farina di Mais 10kg', quantita: 12, unitario: 98.00, totale: 1176.00 },
      { id: 5, nome: 'Olio di Palma 5L', quantita: 2, unitario: 5.50, totale: 11.00 },
    ]
  }

  const subtotale = bollaData.prodotti.reduce((sum, p) => sum + p.totale, 0)
  const iva = subtotale * 0.10
  const totale = subtotale + iva

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/amministrazione/bolle">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bolla {bollaData.numero}</h1>
            <p className="text-foreground/60 mt-1">Dettagli completi della bolla</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Scarica PDF
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Print className="w-4 h-4" />
            Stampa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Data Documento</p>
            <p className="text-xl font-bold mt-2">{bollaData.data}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Data Scadenza</p>
            <p className="text-xl font-bold mt-2">{bollaData.scadenza}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Stato</p>
            <p className="text-xl font-bold text-green-600 mt-2">✓ {bollaData.stato}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 uppercase font-semibold">Importo Totale</p>
            <p className="text-2xl font-bold text-primary mt-2">€{totale.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Fornitore Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni Fornitore</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Ragione Sociale</p>
              <p className="text-lg font-semibold">{bollaData.fornitore}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Partita IVA</p>
              <p className="text-lg font-semibold">IT 12345678901</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Indirizzo</p>
              <p className="text-lg">Rua dos Fornecedores, 123</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase font-semibold mb-2">Città</p>
              <p className="text-lg">São Paulo, SP - Brasile</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prodotti */}
      <Card>
        <CardHeader>
          <CardTitle>Prodotti</CardTitle>
          <CardDescription>{bollaData.prodotti.length} articoli in bolla</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Prodotto</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Quantità</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Prezzo Unitario</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Totale</th>
                </tr>
              </thead>
              <tbody>
                {bollaData.prodotti.map((prod) => (
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
                <p className="text-sm text-foreground/60 mb-1">Subtotale</p>
                <p className="font-semibold">€{subtotale.toFixed(2)}</p>
              </div>
              <div className="w-32"></div>
            </div>
            <div className="flex justify-end gap-4">
              <div className="text-right">
                <p className="text-sm text-foreground/60 mb-1">IVA (10%)</p>
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

      {/* Riconciliazione */}
      <Card>
        <CardHeader>
          <CardTitle>Riconciliazione con Fattura</CardTitle>
          <CardDescription>Stato della riconciliazione con documento fiscale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-900 dark:text-green-100 font-semibold">✓ Riconciliata</p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-2">Questa bolla è stata riconciliata con la Fattura FT-2025-001 in data 20 Gennaio 2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
