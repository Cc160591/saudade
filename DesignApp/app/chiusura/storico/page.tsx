'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const chiusure = [
  { id: 1, data: '20 Gen 2025', coperti: 45, vinoBottiglie: 8, dolci: 12, incasso: '€1.850,50', stato: 'chiuso' },
  { id: 2, data: '19 Gen 2025', coperti: 52, vinoBottiglie: 6, dolci: 15, incasso: '€2.120,00', stato: 'chiuso' },
  { id: 3, data: '18 Gen 2025', coperti: 38, vinoBottiglie: 5, dolci: 10, incasso: '€1.650,00', stato: 'chiuso' },
  { id: 4, data: '17 Gen 2025', coperti: 41, vinoBottiglie: 7, dolci: 9, incasso: '€1.920,50', stato: 'chiuso' },
  { id: 5, data: '16 Gen 2025', coperti: 48, vinoBottiglie: 9, dolci: 14, incasso: '€2.250,00', stato: 'chiuso' },
]

const chartData = [
  { data: '16 Gen', coperti: 48, incasso: 2250 },
  { data: '17 Gen', coperti: 41, incasso: 1920 },
  { data: '18 Gen', coperti: 38, incasso: 1650 },
  { data: '19 Gen', coperti: 52, incasso: 2120 },
  { data: '20 Gen', coperti: 45, incasso: 1850 },
]

export default function StoricoChiusuraPage() {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentWeek = Math.ceil((today.getDate() + new Date(currentYear, currentMonth, 1).getDay()) / 7)

  const [selectedChiusura, setSelectedChiusura] = useState<any>(null)
  const [allChiusure, setAllChiusure] = useState(chiusure)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedWeekCoperti, setSelectedWeekCoperti] = useState(currentWeek)
  const [selectedWeekIncassi, setSelectedWeekIncassi] = useState(currentWeek)

  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
                  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
  const weeks = Array.from({ length: 5 }, (_, i) => i + 1)

  useEffect(() => {
    // Carica le chiusure salvate da localStorage
    const savedChiusure = JSON.parse(localStorage.getItem('chiusure') || '[]')
    if (savedChiusure.length > 0) {
      setAllChiusure([...savedChiusure.reverse(), ...chiusure])
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Storico Chiusure</h1>
        <p className="text-foreground/60 mt-1">Storico chiusure giornaliere</p>
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
          <div className="flex items-end">
            <p className="text-xs text-foreground/60">Periodo: {months[selectedMonth]} {selectedYear}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Mese */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">224</div>
            <p className="text-sm text-foreground/60 mt-1">Coperti Mese</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">35</div>
            <p className="text-sm text-foreground/60 mt-1">Bottiglie Vini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">60</div>
            <p className="text-sm text-foreground/60 mt-1">Dolci Venduti</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€9.791,00</div>
            <p className="text-sm text-foreground/60 mt-1">Incasso Totale</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Settimana (Coperti)</label>
            <select
              value={selectedWeekCoperti}
              onChange={(e) => setSelectedWeekCoperti(Number(e.target.value))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {weeks.map(week => (
                <option key={week} value={week}>Settimana {week}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Settimana (Incassi)</label>
            <select
              value={selectedWeekIncassi}
              onChange={(e) => setSelectedWeekIncassi(Number(e.target.value))}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {weeks.map(week => (
                <option key={week} value={week}>Settimana {week}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Coperti Settimanali</CardTitle>
            <CardDescription>Settimana {selectedWeekCoperti} - {months[selectedMonth]} {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="coperti" fill="#f59e0b" name="Coperti" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incassi Giornalieri</CardTitle>
            <CardDescription>Settimana {selectedWeekIncassi} - {months[selectedMonth]} {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incasso" stroke="#f59e0b" strokeWidth={2} name="Incasso €" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Chiusure List */}
      <Card>
        <CardHeader>
          <CardTitle>Chiusure Recenti</CardTitle>
          <CardDescription>Dettagli giornalieri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Coperti</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Vini</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Dolci</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Incasso</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {allChiusure.map((chiusura, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium">{chiusura.data}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                        {chiusura.coperti || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{chiusura.vinoBottiglie || chiusura.bottiglie || 0} bottiglie</td>
                    <td className="py-3 px-4 text-sm">{chiusura.dolci || 0} pezzi</td>
                    <td className="py-3 px-4 font-bold text-primary">{chiusura.incasso || `€${chiusura.incassoTotale?.toFixed(2) || '0.00'}`}</td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSelectedChiusura(chiusura)}>
                        <Eye className="w-4 h-4" />
                        Dettagli
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Riepilogo Mese */}
      <Card>
        <CardHeader>
          <CardTitle>Riepilogo Mese Gennaio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-foreground/70">Media Coperti/giorno</span>
                <span className="font-bold">44,8</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-foreground/70">Media Incasso/giorno</span>
                <span className="font-bold">€1.958,20</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-foreground/70">Media Vini/giorno</span>
                <span className="font-bold">7 bottiglie</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-primary/10 rounded-lg">
                <span className="font-semibold text-foreground">Giorni Operativi</span>
                <span className="font-bold text-primary">5</span>
              </div>
              <div className="flex justify-between p-3 bg-primary/10 rounded-lg">
                <span className="font-semibold text-foreground">Incasso Totale</span>
                <span className="font-bold text-primary">€9.791,00</span>
              </div>
              <div className="flex justify-between p-3 bg-primary/10 rounded-lg">
                <span className="font-semibold text-foreground">Coperti Totali</span>
                <span className="font-bold text-primary">224</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dettagli Modal */}
      {selectedChiusura && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-screen overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white dark:bg-slate-900">
              <CardTitle>Dettagli Chiusura - {selectedChiusura.data}</CardTitle>
              <button
                onClick={() => setSelectedChiusura(null)}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-sm text-foreground/60">Data</p>
                  <p className="text-lg font-bold text-foreground">{selectedChiusura.data}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                  <p className="text-sm text-foreground/60">Turno</p>
                  <p className="text-lg font-bold text-foreground">{selectedChiusura.turno || 'Completo'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">Incassi per Canale</h3>
                <div className="space-y-2">
                  {selectedChiusura.incassi ? (
                    <>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Contanti:</span>
                        <span className="font-bold">{selectedChiusura.incassi.contanti || '€0,00'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Bancomat:</span>
                        <span className="font-bold">{selectedChiusura.incassi.bancomat || '€0,00'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Satispay:</span>
                        <span className="font-bold">{selectedChiusura.incassi.satispay || '€0,00'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Altro:</span>
                        <span className="font-bold">{selectedChiusura.incassi.other || '€0,00'}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-foreground/60">Dati non disponibili</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">Statistiche Giornata</h3>
                <div className="space-y-2">
                  {selectedChiusura.statistiche ? (
                    <>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Coperti:</span>
                        <span className="font-bold">{selectedChiusura.statistiche.coperti || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Coperti TheFork:</span>
                        <span className="font-bold">{selectedChiusura.statistiche.copertiTheFork || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Bottiglie Vini:</span>
                        <span className="font-bold">{selectedChiusura.statistiche.bottiglie || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Dolci Venduti:</span>
                        <span className="font-bold">{selectedChiusura.statistiche.dolci || 'N/A'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Coperti:</span>
                        <span className="font-bold">{selectedChiusura.coperti || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Bottiglie Vini:</span>
                        <span className="font-bold">{selectedChiusura.vinoBottiglie || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>Dolci Venduti:</span>
                        <span className="font-bold">{selectedChiusura.dolci || 'N/A'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {selectedChiusura.spese && selectedChiusura.spese.length > 0 && (
                <div>
                  <h3 className="font-bold text-foreground mb-3">Piccole Spese</h3>
                  <div className="space-y-2">
                    {selectedChiusura.spese.map((spesa: any, idx: number) => (
                      <div key={idx} className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                        <span>{spesa.desc}</span>
                        <span className="font-bold">{spesa.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Incasso Totale:</span>
                  <span className="font-bold">€{selectedChiusura.incassoTotale?.toFixed(2) || selectedChiusura.incasso || '0,00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Spese Totali:</span>
                  <span className="font-bold">€{selectedChiusura.speseTotali?.toFixed(2) || '0,00'}</span>
                </div>
                <div className="border-t border-primary/20 pt-2 flex justify-between">
                  <span className="font-semibold">Totale Netto:</span>
                  <span className="font-bold text-primary text-lg">€{selectedChiusura.totaleNetto?.toFixed(2) || '0,00'}</span>
                </div>
              </div>

              <Button onClick={() => setSelectedChiusura(null)} className="w-full">Chiudi</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
