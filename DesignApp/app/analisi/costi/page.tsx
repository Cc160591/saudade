'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

const costiPerCategoria = [
  { categoria: 'Carne', costo: 12500, percentuale: 28 },
  { categoria: 'Cucina', costo: 8200, percentuale: 18 },
  { categoria: 'Vini', costo: 7800, percentuale: 17 },
  { categoria: 'Bar/Beverage', costo: 5600, percentuale: 12 },
  { categoria: 'Materiale', costo: 4200, percentuale: 9 },
  { categoria: 'Manutenzioni', costo: 2800, percentuale: 6 },
  { categoria: 'Servizi', costo: 2900, percentuale: 10 },
]

const costTrendData = [
  { settimana: 'Sett 1', costo: 5200 },
  { settimana: 'Sett 2', costo: 6100 },
  { settimana: 'Sett 3', costo: 5800 },
  { settimana: 'Sett 4', costo: 6300 },
]

const COLORS = ['#f59e0b', '#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#f97316', '#ec4899']

export default function CostiAnalisiPage() {
  const totalCosti = costiPerCategoria.reduce((sum, item) => sum + item.costo, 0)
  const mediaGiornaliera = totalCosti / 30

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Report Costi</h1>
        <p className="text-foreground/60 mt-1">Breakdown per 7 categorie e trend settimanale</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€{(totalCosti / 1000).toFixed(1)}K</div>
            <p className="text-sm text-foreground/60 mt-1">Costi Mese</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€{Math.round(mediaGiornaliera)}</div>
            <p className="text-sm text-foreground/60 mt-1">Media Giornaliera</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">28%</div>
            <p className="text-sm text-foreground/60 mt-1">Categoria Top (Carne)</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Breakdown per Categoria</CardTitle>
            <CardDescription>Distribuzione costi</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={costiPerCategoria} margin={{ bottom: 80, right: 30, left: 0, top: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="categoria"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="costo" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Percentuale</CardTitle>
            <CardDescription>% costi per categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costiPerCategoria}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percentuale }) => `${categoria} ${percentuale}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="costo"
                >
                  {costiPerCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Settimanale */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Settimanale</CardTitle>
          <CardDescription>Andamento costi gennaio</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="settimana" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="costo" fill="#ef4444" name="Costi €" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Dettagli Categorie */}
      <Card>
        <CardHeader>
          <CardTitle>Dettagli per Categoria</CardTitle>
          <CardDescription>Costi e percentuali</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {costiPerCategoria.map((item, idx) => (
              <div key={item.categoria} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <p className="font-semibold text-foreground">{item.categoria}</p>
                  </div>
                  <p className="font-bold text-primary">€{item.costo.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-3">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentuale}%`,
                        backgroundColor: COLORS[idx % COLORS.length],
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground/70">{item.percentuale}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900 dark:text-blue-100">Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>• La categoria Carne rappresenta il 28% dei costi totali (€12.500)</p>
          <p>• Trend in crescita della settimana 4 (+€500 rispetto media)</p>
          <p>• Opportunità di ottimizzazione nella categoria Materiale di Consumo</p>
        </CardContent>
      </Card>
    </div>
  )
}
