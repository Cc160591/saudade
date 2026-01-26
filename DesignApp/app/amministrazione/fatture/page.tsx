'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const statusConfig = {
  ok: { label: 'OK', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle },
  verified: { label: 'OK', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle },
  pending_review: { label: 'Da Verificare', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: AlertTriangle },
  error: { label: 'Errore', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: AlertTriangle },
  archived: { label: 'Archiviata', bg: 'bg-slate-100 dark:bg-slate-900/30', text: 'text-slate-700 dark:text-slate-400', icon: CheckCircle },
}

export default function FattureAdministrazionePage() {
  const [fatture, setFatture] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, ok: 0, pending: 0, totalAmount: 0 })
  const [topVendors, setTopVendors] = useState<any[]>([])

  const supabase = createClient()

  useEffect(() => {
    fetchFatture()
  }, [])

  const fetchFatture = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('documents')
      .select(`
        id,
        doc_number,
        doc_date,
        total_amount,
        status,
        vendors (id, name)
      `)
      .eq('type', 'fatture') // Nota: nello schema abbiamo usato 'fattura' singolare, nel mock era plurale. Verifico.
      // Brief dice: type (enum) bolla | fattura | bonifico
      .eq('type', 'fattura')
      .order('doc_date', { ascending: false })

    if (data) {
      setFatture(data)
      const totalAmount = data.reduce((sum, f) => sum + (Number(f.total_amount) || 0), 0)
      const ok = data.filter(f => f.status === 'verified').length
      const pending = data.filter(f => f.status === 'pending_review').length
      setStats({
        total: data.length,
        ok,
        pending,
        totalAmount
      })

      // Calcola top vendors
      const vendorsMap = data.reduce((acc: any, f) => {
        const vId = f.vendors?.id
        if (!vId) return acc
        if (!acc[vId]) acc[vId] = { nome: f.vendors.name, fatture: 0, importo: 0 }
        acc[vId].fatture += 1
        acc[vId].importo += Number(f.total_amount) || 0
        return acc
      }, {})
      
      const sortedVendors = Object.values(vendorsMap)
        .sort((a: any, b: any) => b.importo - a.importo)
        .slice(0, 3)
      setTopVendors(sortedVendors)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fatture & Scadenze</h1>
        <p className="text-foreground/60 mt-1">Gestione e monitoraggio fatture fornitori</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-sm text-foreground/60 mt-1">Fatture Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{stats.ok}</div>
            <p className="text-sm text-foreground/60 mt-1">OK</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-foreground/60 mt-1">Da Verificare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-600">€{stats.totalAmount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
            <p className="text-sm text-foreground/60 mt-1">Totale Importo</p>
          </CardContent>
        </Card>
      </div>

      {/* Fatture Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scadenziario Fatture</CardTitle>
          <CardDescription>Ordinate per data di scadenza</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Numero</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Fornitore</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Importo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Stato</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-foreground/60">Caricamento...</td>
                  </tr>
                ) : fatture.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-foreground/60">Nessuna fattura trovata.</td>
                  </tr>
                ) : (
                  fatture.map((fattura) => {
                    const config = statusConfig[fattura.status as keyof typeof statusConfig] || statusConfig.pending_review
                    const StatusIcon = config.icon
                    return (
                      <tr key={fattura.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-3 px-4 font-medium">{fattura.doc_number || 'N/D'}</td>
                        <td className="py-3 px-4 text-sm">{fattura.vendors?.name || 'Fornitore sconosciuto'}</td>
                        <td className="py-3 px-4 text-sm text-foreground/60">{fattura.doc_date || 'N/D'}</td>
                        <td className="py-3 px-4 font-semibold text-primary">
                          €{Number(fattura.total_amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4">
                          <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${config.bg} ${config.text} w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link href={`/amministrazione/fatture/${fattura.id}`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="w-4 h-4" />
                              Dettagli
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Fornitori */}
      <Card>
        <CardHeader>
          <CardTitle>Fornitori Principali</CardTitle>
          <CardDescription>Fornitori per volume di acquisti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topVendors.length === 0 ? (
              <p className="text-center py-4 text-foreground/60">Nessun dato fornitore.</p>
            ) : (
              topVendors.map((fornitore: any) => (
                <div key={fornitore.nome} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground">{fornitore.nome}</p>
                      <p className="text-xs text-foreground/60 mt-1">{fornitore.fatture} fatture</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        €{fornitore.importo.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

