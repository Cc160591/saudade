import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react'

const alerts = [
  {
    id: 1,
    prodotto: 'Materiale di Consumo',
    giacenza: 45,
    soglia: 100,
    urgenza: 'alta',
    ultimoOrdine: '5 giorni fa',
    ordine: 'Pendente',
  },
  {
    id: 2,
    prodotto: 'Detergenti Professionali',
    giacenza: 32,
    soglia: 80,
    urgenza: 'alta',
    ultimoOrdine: '8 giorni fa',
    ordine: 'No',
  },
  {
    id: 3,
    prodotto: 'Bustine di Zucchero',
    giacenza: 120,
    soglia: 150,
    urgenza: 'media',
    ultimoOrdine: '3 giorni fa',
    ordine: 'No',
  },
  {
    id: 4,
    prodotto: 'Tovaglioli',
    giacenza: 250,
    soglia: 300,
    urgenza: 'bassa',
    ultimoOrdine: '2 giorni fa',
    ordine: 'No',
  },
]

const urgencyConfig = {
  alta: { color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', label: 'Alta' },
  media: { color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'Media' },
  bassa: { color: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', label: 'Bassa' },
}

export default function AlertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alert Scorte</h1>
        <p className="text-foreground/60 mt-1">Prodotti sotto la soglia minima</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-red-600">4</p>
                <p className="text-sm text-foreground/60 mt-1">Alert Attivi</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-red-700">2</p>
                <p className="text-sm text-foreground/60 mt-1">Urgenza Alta</p>
              </div>
              <TrendingDown className="w-6 h-6 text-red-700" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-foreground/60 mt-1">Ordini Pendenti</p>
              </div>
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Prodotti sotto Soglia</CardTitle>
          <CardDescription>Configurare soglie di allerta per ogni categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const config = urgencyConfig[alert.urgenza as keyof typeof urgencyConfig]
              const percentuale = Math.round((alert.giacenza / alert.soglia) * 100)
              return (
                <div key={alert.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{alert.prodotto}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-foreground/60">Giacenza</p>
                          <p className="font-semibold text-foreground">{alert.giacenza} unità</p>
                        </div>
                        <div>
                          <p className="text-foreground/60">Soglia</p>
                          <p className="font-semibold text-foreground">{alert.soglia} unità</p>
                        </div>
                        <div>
                          <p className="text-foreground/60">Percentuale</p>
                          <p className="font-semibold text-foreground">{percentuale}%</p>
                        </div>
                        <div>
                          <p className="text-foreground/60">Ultimo Ordine</p>
                          <p className="font-semibold text-foreground">{alert.ultimoOrdine}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            alert.urgenza === 'alta'
                              ? 'bg-red-500'
                              : alert.urgenza === 'media'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${percentuale}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-foreground">
                        {alert.ordine}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
