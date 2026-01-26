import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, ArrowDown } from 'lucide-react'

const movimenti = [
  { id: 1, data: '20 Gen 2025', tipo: 'carico', prodotto: 'Carne di Manzo Premium', quantita: 50, origine: 'Bolla BL-2025-001', causale: 'Carico da Fornitore' },
  { id: 2, data: '20 Gen 2025', tipo: 'scarico', prodotto: 'Riso Brasile', quantita: 15, origine: 'Vendita Giornaliera', causale: 'Scarico Vendita' },
  { id: 3, data: '19 Gen 2025', tipo: 'carico', prodotto: 'Vino Rosso Toscano', quantita: 24, origine: 'Bolla BL-2025-003', causale: 'Carico da Fornitore' },
  { id: 4, data: '19 Gen 2025', tipo: 'scarico', prodotto: 'Birra Brasiliana', quantita: 36, origine: 'Chiusura Giornaliera', causale: 'Scarico Vendita' },
  { id: 5, data: '18 Gen 2025', tipo: 'carico', prodotto: 'Materiale di Consumo', quantita: 100, origine: 'Bolla BL-2024-999', causale: 'Carico da Fornitore' },
  { id: 6, data: '18 Gen 2025', tipo: 'scarico', prodotto: 'Farinetta di Manioca', quantita: 8, origine: 'Chiusura Giornaliera', causale: 'Scarico Vendita' },
]

export default function MovimentiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Movimenti Magazzino</h1>
        <p className="text-foreground/60 mt-1">Registro carichi e scarichi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">6</div>
            <p className="text-sm text-foreground/60 mt-1">Movimenti Odierni</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-foreground/60">Carichi</p>
                <p className="text-2xl font-bold text-green-600">174</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ArrowDown className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-foreground/60">Scarichi</p>
                <p className="text-2xl font-bold text-red-600">59</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movimenti List */}
      <Card>
        <CardHeader>
          <CardTitle>Movimenti Recenti</CardTitle>
          <CardDescription>Storico carichi e scarichi da magazzino</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {movimenti.map((mov) => (
              <div key={mov.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className={`p-3 rounded-lg ${
                  mov.tipo === 'carico'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {mov.tipo === 'carico' ? (
                    <ArrowUp className={`w-5 h-5 ${mov.tipo === 'carico' ? 'text-green-600' : 'text-red-600'}`} />
                  ) : (
                    <ArrowDown className={`w-5 h-5 ${mov.tipo === 'carico' ? 'text-green-600' : 'text-red-600'}`} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{mov.prodotto}</p>
                      <p className="text-xs text-foreground/60 mt-0.5">{mov.causale}</p>
                      <p className="text-xs text-foreground/50 mt-0.5">Da: {mov.origine}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/60">{mov.data}</p>
                      <p className={`text-lg font-bold ${mov.tipo === 'carico' ? 'text-green-600' : 'text-red-600'}`}>
                        {mov.tipo === 'carico' ? '+' : '-'}{mov.quantita}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
