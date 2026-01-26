'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, TrendingUp, Users, Package } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

const kpiData = [
  { label: 'Fatturato Mese', value: '€45.230', change: '+12%', icon: TrendingUp },
  { label: 'Ordini Pendenti', value: '23', change: '-5%', icon: AlertCircle },
  { label: 'Coperti Mese', value: '892', change: '+8%', icon: Users },
  { label: 'Prod. Giacenza', value: '156', change: '+3%', icon: Package },
]

const chartData = [
  { name: 'Lun', vendite: 4000, costi: 2400 },
  { name: 'Mar', vendite: 3000, costi: 1398 },
  { name: 'Mer', vendite: 2000, costi: 9800 },
  { name: 'Gio', vendite: 2780, costi: 3908 },
  { name: 'Ven', vendite: 1890, costi: 4800 },
  { name: 'Sab', vendite: 2390, costi: 3800 },
  { name: 'Dom', vendite: 3490, costi: 4300 },
]

const pendingTasks = [
  { id: 1, title: 'Bolle da verificare', count: 7, urgency: 'high' },
  { id: 2, title: 'Fatture da riconciliare', count: 5, urgency: 'medium' },
  { id: 3, title: 'Chiusure mancanti', count: 2, urgency: 'high' },
  { id: 4, title: 'Alert scorte', count: 12, urgency: 'medium' },
]

const prodottiPerCategoria = [
  { categoria: 'Carne', acquistati: 180, venduti: 85, magazzino: 95 },
  { categoria: 'Cucina', acquistati: 520, venduti: 180, magazzino: 340 },
  { categoria: 'Vini', acquistati: 475, venduti: 220, magazzino: 255 },
  { categoria: 'Bar/Beverage', acquistati: 745, venduti: 380, magazzino: 365 },
]

export default function DashboardPage() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentWeek = Math.ceil((today.getDate() + new Date(currentYear, currentMonth, 1).getDay()) / 7)
  
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedWeek, setSelectedWeek] = useState(currentWeek)

  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
                  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
  const weeks = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/60 mt-1">Benvenuto nel gestionale Saudade</p>
      </div>

      {/* Date Filters */}
      <Card>
        <CardContent className="pt-6 flex gap-4 flex-wrap">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Anno</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Mese</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {months.map((month, idx) => (
                <option key={idx} value={idx}>{month}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Settimana</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {weeks.map(week => (
                <option key={week} value={week}>Settimana {week}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <p className="text-xs text-foreground/60">Periodo: {months[selectedMonth]} {selectedYear}, Settimana {selectedWeek}</p>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground/70">{kpi.label}</CardTitle>
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">{kpi.change} rispetto scorso mese</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendite Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Trend Settimanale</CardTitle>
              <CardDescription>Vendite vs Costi</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vendite" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="costi" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attività Pendenti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">{task.title}</p>
                  <p className="text-xs text-foreground/60">{task.count} elementi</p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.urgency === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scadenzario (Prossimi 7 giorni)</CardTitle>
            <CardDescription>Fatture e pagamenti in scadenza</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '22 Gen', desc: 'Fattura Fornitori Brasile', amount: '€2.450' },
                { date: '24 Gen', desc: 'Pagamento Affitto', amount: '€3.000' },
                { date: '26 Gen', desc: 'Bolletta Energia', amount: '€890' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{item.date}</p>
                    <p className="text-xs text-foreground/60">{item.desc}</p>
                  </div>
                  <span className="font-bold text-primary">{item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Panoramica Prodotti per Categoria</CardTitle>
            <CardDescription>Acquistati, Venduti e Magazzino</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prodottiPerCategoria.map((cat) => (
                <div key={cat.categoria} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-foreground">{cat.categoria}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-xs text-foreground/60">Acquistati</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{cat.acquistati}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-xs text-foreground/60">Venduti</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{cat.venduti}</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                      <p className="text-xs text-foreground/60">Magazzino</p>
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{cat.magazzino}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
