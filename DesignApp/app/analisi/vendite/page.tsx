import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const venditeMese = [
  { data: '16 Gen', vendite: 1850, margine: 920 },
  { data: '17 Gen', vendite: 1920, margine: 960 },
  { data: '18 Gen', vendite: 1650, margine: 825 },
  { data: '19 Gen', vendite: 2120, margine: 1060 },
  { data: '20 Gen', vendite: 1850, margine: 925 },
]

const marginiProdotto = [
  { prodotto: 'Rodizio Completo', vendite: 280, margine: 45, percentuale: 16 },
  { prodotto: 'Bevande Premium', vendite: 450, margine: 360, percentuale: 80 },
  { prodotto: 'Vini Pregiati', vendite: 890, margine: 580, percentuale: 65 },
  { prodotto: 'Dolci', vendite: 320, margine: 240, percentuale: 75 },
]

const canali = [
  { canale: 'Banco', vendite: 4250, percentuale: 35 },
  { canale: 'Tavoli', vendite: 6890, percentuale: 57 },
  { canale: 'TheFork', vendite: 1400, percentuale: 8 },
]

export default function VenditeAnalisiPage() {
  const totalVendite = venditeMese.reduce((sum, item) => sum + item.vendite, 0)
  const totalMargine = venditeMese.reduce((sum, item) => sum + item.margine, 0)
  const marginePercentuale = ((totalMargine / totalVendite) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Report Vendite</h1>
        <p className="text-foreground/60 mt-1">KPI da chiusura e margini stima rodizio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€{(totalVendite / 1000).toFixed(1)}K</div>
            <p className="text-sm text-foreground/60 mt-1">Vendite Mese</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€{(totalMargine / 1000).toFixed(1)}K</div>
            <p className="text-sm text-foreground/60 mt-1">Margine Lordo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{marginePercentuale}%</div>
            <p className="text-sm text-foreground/60 mt-1">% Margine</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">224</div>
            <p className="text-sm text-foreground/60 mt-1">Coperti Totali</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trend Vendite vs Margine</CardTitle>
            <CardDescription>Ultimi 5 giorni</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={venditeMese}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendite" stroke="#f59e0b" strokeWidth={2} name="Vendite €" />
                <Line type="monotone" dataKey="margine" stroke="#10b981" strokeWidth={2} name="Margine €" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Canali di Vendita</CardTitle>
            <CardDescription>Distribuzione per canale</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={canali}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="canale" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendite" fill="#8b5cf6" name="Vendite €" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Margini Prodotto */}
      <Card>
        <CardHeader>
          <CardTitle>Margini per Prodotto</CardTitle>
          <CardDescription>Stima margine lordo e percentuale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marginiProdotto.map((prod) => (
              <div key={prod.prodotto} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-foreground">{prod.prodotto}</p>
                  <div className="text-right">
                    <p className="font-bold text-primary">€{prod.margine}</p>
                    <p className="text-xs text-foreground/60">{prod.percentuale}% margine</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Vendite: €{prod.vendite}</span>
                  <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                      style={{ width: `${Math.min(prod.percentuale, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Canali Dettagli */}
      <Card>
        <CardHeader>
          <CardTitle>Dettagli Canali</CardTitle>
          <CardDescription>Performance per canale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {canali.map((canale) => (
              <div key={canale.canale} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground">{canale.canale}</p>
                  <p className="font-bold text-primary">€{canale.vendite}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${canale.percentuale}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground/70 w-12 text-right">{canale.percentuale}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-lg text-green-900 dark:text-green-100">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-800 dark:text-green-200">
          <div className="grid grid-cols-2">
            <div>
              <p className="font-semibold">Scontrino Medio</p>
              <p className="text-lg font-bold mt-1">€{(totalVendite / 224).toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Vendita per Coperto</p>
              <p className="text-lg font-bold mt-1">€{(totalVendite / 224).toFixed(2)}</p>
            </div>
          </div>
          <p className="pt-3 border-t border-green-300 dark:border-green-700">
            • Le bevande premium generano il margine più alto (80%)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
