'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function RiconciliazionePage() {
  const [riconciliazioni, setRiconciliazioni] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, ok: 0, mismatch: 0, totalDiff: 0 })

  const supabase = createClient()

  useEffect(() => {
    fetchRiconciliazioni()
  }, [])

  const fetchRiconciliazioni = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('reconciliations')
      .select(`
        id,
        status,
        discrepancies,
        computed_payable_amount,
        bolla:documents!bolla_id(doc_number, total_amount, vendors(name)),
        fattura:documents!fattura_id(doc_number, total_amount)
      `)
      .order('created_at', { ascending: false })

    if (data) {
      setRiconciliazioni(data)
      const ok = data.filter(r => r.status === 'matched').length
      const mismatch = data.filter(r => r.status === 'mismatched').length
      
      // Calcola differenza totale dai discrepancies JSONB
      let totalDiff = 0
      data.forEach(r => {
        if (r.discrepancies && Array.isArray(r.discrepancies)) {
          r.discrepancies.forEach((d: any) => {
            if (d.diff) totalDiff += d.diff
          })
        }
      })

      setStats({
        total: data.length,
        ok,
        mismatch,
        totalDiff
      })
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Riconciliazione</h1>
        <p className="text-foreground/60 mt-1">Match Bolla ↔ Fattura e gestione incongruenze</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-sm text-foreground/60 mt-1">Riconciliazioni</p>
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
            <div className="text-3xl font-bold text-red-600">{stats.mismatch}</div>
            <p className="text-sm text-foreground/60 mt-1">Con Incongruenze</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.totalDiff >= 0 ? '' : '-'}€{Math.abs(stats.totalDiff).toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
            <p className="text-sm text-foreground/60 mt-1">Differenza Totale</p>
          </CardContent>
        </Card>
      </div>

      {/* Riconciliazioni List */}
      <Card>
        <CardHeader>
          <CardTitle>Riconciliazioni Bolle vs Fatture</CardTitle>
          <CardDescription>Verifica corrispondenza dati e importi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-center py-8 text-foreground/60">Caricamento...</p>
          ) : riconciliazioni.length === 0 ? (
            <p className="text-center py-8 text-foreground/60">Nessuna riconciliazione trovata.</p>
          ) : (
            riconciliazioni.map((ric) => (
              <div key={ric.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-foreground">{ric.bolla?.vendors?.name || 'Fornitore sconosciuto'}</p>
                    <p className="text-sm text-foreground/60 mt-1">
                      Bolla {ric.bolla?.doc_number || 'N/D'} • Fattura {ric.fattura?.doc_number || 'N/D'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {ric.status === 'matched' ? (
                      <div className="flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        OK
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-700 dark:text-red-400 font-semibold text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                        <AlertTriangle className="w-4 h-4" />
                        Incongruenze ({ric.discrepancies?.length || 0})
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-foreground/60 text-xs font-medium">Bolla</p>
                    <p className="font-bold text-foreground mt-1">
                      €{Number(ric.bolla?.total_amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-foreground/60 text-xs font-medium">Fattura</p>
                    <p className="font-bold text-foreground mt-1">
                      €{Number(ric.fattura?.total_amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                {ric.status === 'mismatched' && ric.discrepancies && Array.isArray(ric.discrepancies) && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400">Incongruenze Rilevate:</p>
                    <ul className="text-xs text-red-600 dark:text-red-400 mt-2 space-y-1">
                      {ric.discrepancies.map((d: any, idx: number) => (
                        <li key={idx}>• {d.description || d.type || 'Differenza rilevata'}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Import Corretti */}
      <Card>
        <CardHeader>
          <CardTitle>Importi Corretti da Pagare</CardTitle>
          <CardDescription>Calcolati dopo riconciliazione</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {!loading && riconciliazioni.map((ric) => (
              <div key={ric.id} className="flex justify-between items-center p-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{ric.bolla?.vendors?.name || 'Fornitore sconosciuto'}</p>
                  <p className="text-xs text-foreground/60">{ric.fattura?.doc_number || 'N/D'}</p>
                </div>
                <p className="font-bold text-primary">
                  €{Number(ric.computed_payable_amount || ric.fattura?.total_amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg mt-4">
              <p className="font-semibold text-foreground">Totale da Pagare</p>
              <p className="font-bold text-primary text-lg">
                €{riconciliazioni.reduce((sum, r) => sum + Number(r.computed_payable_amount || r.fattura?.total_amount || 0), 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

