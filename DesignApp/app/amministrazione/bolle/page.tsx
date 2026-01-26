'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle, Eye, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function BollePage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [bolle, setBolle] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, verified: 0, pending: 0, totalAmount: 0 })

  const supabase = createClient()

  useEffect(() => {
    fetchBolle()
  }, [])

  const fetchBolle = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('documents')
      .select(`
        id,
        doc_number,
        doc_date,
        total_amount,
        status,
        vendors (name),
        document_lines (id)
      `)
      .eq('type', 'bolla')
      .order('created_at', { ascending: false })

    if (data) {
      setBolle(data)
      const totalAmount = data.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0)
      const verified = data.filter(b => b.status === 'verified').length
      const pending = data.filter(b => b.status === 'pending_review').length
      setStats({
        total: data.length,
        verified,
        pending,
        totalAmount
      })
    }
    setLoading(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleConfirmUpload = async () => {
    if (uploadedFile) {
      // Qui andrebbe la logica di upload reale
      console.log('File caricato:', uploadedFile.name)
      setShowUploadModal(false)
      setUploadedFile(null)
      fetchBolle() // Refresh
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bolle (AI)</h1>
        <p className="text-foreground/60 mt-1">Gestione automatizzata bolle con AI</p>
      </div>

      {/* Filters and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <p className="text-sm text-foreground/60 mt-1">Bolle Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{stats.verified}</div>
            <p className="text-sm text-foreground/60 mt-1">Verificate</p>
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
            <div className="text-3xl font-bold">€{stats.totalAmount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
            <p className="text-sm text-foreground/60 mt-1">Totale Importo</p>
          </CardContent>
        </Card>
      </div>

      {/* Bolle Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tutte le Bolle</CardTitle>
              <CardDescription>Gestione bolle con verifica AI</CardDescription>
            </div>
            <Button className="gap-2" onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4" />
              + Nuova Bolla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Numero</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Fornitore</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Prodotti</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Totale</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Stato</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-foreground/60">Caricamento...</td>
                  </tr>
                ) : bolle.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-foreground/60">Nessuna bolla trovata.</td>
                  </tr>
                ) : (
                  bolle.map((bolla) => (
                    <tr key={bolla.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-medium">{bolla.doc_number || 'N/D'}</td>
                      <td className="py-3 px-4 text-sm">{bolla.vendors?.name || 'Fornitore sconosciuto'}</td>
                      <td className="py-3 px-4 text-sm text-foreground/60">{bolla.doc_date || 'N/D'}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-foreground">
                          {bolla.document_lines?.length || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-primary">
                        €{Number(bolla.total_amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">
                        {bolla.status === 'verified' ? (
                          <div className="flex items-center gap-1 text-green-700 dark:text-green-400 text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Verificata
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
                            <AlertTriangle className="w-4 h-4" />
                            Da Verificare
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link href={`/amministrazione/bolle/${bolla.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="w-4 h-4" />
                            Dettagli
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Carica Nuova Bolla</CardTitle>
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  setUploadedFile(null)
                }}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-foreground/60" />
                    <div>
                      <p className="font-medium text-foreground">Carica file</p>
                      <p className="text-xs text-foreground/60">Immagine o PDF (max 10MB)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {uploadedFile && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    File selezionato: {uploadedFile.name}
                  </p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowUploadModal(false)
                    setUploadedFile(null)
                  }}
                  className="flex-1 bg-transparent"
                >
                  Annulla
                </Button>
                <Button onClick={handleConfirmUpload} className="flex-1" disabled={!uploadedFile}>
                  Carica
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

