import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const stockData = [
  { settore: 'Carne', stock: 320, soglia: 200, allerta: false },
  { settore: 'Cucina', stock: 480, soglia: 300, allerta: false },
  { settore: 'Vini', stock: 156, soglia: 100, allerta: false },
  { settore: 'Bar/Beverage', stock: 450, soglia: 300, allerta: false },
  { settore: 'Materiale', stock: 125, soglia: 150, allerta: true },
  { settore: 'Manutenzioni', stock: 45, soglia: 50, allerta: true },
  { settore: 'Servizi', stock: 230, soglia: 150, allerta: false },
]

const chartData = [
  { name: 'Carne', stock: 320, soglia: 200 },
  { name: 'Cucina', stock: 480, soglia: 300 },
  { name: 'Vini', stock: 156, soglia: 100 },
  { name: 'Bar', stock: 450, soglia: 300 },
  { name: 'Materiale', stock: 125, soglia: 150 },
  { name: 'Manuten.', stock: 45, soglia: 50 },
  { name: 'Servizi', stock: 230, soglia: 150 },
]

export default function StockPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stock per Settore</h1>
        <p className="text-foreground/60 mt-1">Monitoraggio giacenze per categoria</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">1.806</div>
            <p className="text-sm text-foreground/60 mt-1">Total Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">5</div>
            <p className="text-sm text-foreground/60 mt-1">Settori OK</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-600">2</div>
            <p className="text-sm text-foreground/60 mt-1">Sotto Soglia</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Confronto Stock vs Soglia</CardTitle>
          <CardDescription>Visualizzazione per settore</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#f59e0b" name="Stock Attuale" />
              <Bar dataKey="soglia" fill="#ef4444" name="Soglia Minima" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed List */}
      <Card>
        <CardHeader>
          <CardTitle>Dettagli per Settore</CardTitle>
          <CardDescription>Giacenze attuali e state di allerta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stockData.map((item) => (
              <div key={item.settore} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.settore}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-foreground/60">Stock: <span className="font-medium text-foreground">{item.stock} unità</span></span>
                    <span className="text-foreground/60">Soglia: <span className="font-medium text-foreground">{item.soglia} unità</span></span>
                  </div>
                </div>
                <div className="text-right">
                  {item.allerta ? (
                    <div className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold">
                      ⚠️ Allerta
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                      ✓ OK
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
