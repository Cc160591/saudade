'use client'

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FileText, AlertCircle, X } from 'lucide-react'
import { useState } from 'react'

const fattureMese = [
  { id: 1, numero: 'FT-2025-001', data: '20 Gen 2025', importo: '€2.450,00', iva: '€490,00' },
  { id: 2, numero: 'FT-2025-002', data: '20 Gen 2025', importo: '€920,50', iva: '€184,10' },
  { id: 3, numero: 'FT-2025-003', data: '19 Gen 2025', importo: '€1.200,00', iva: '€240,00' },
]

export default function CassettoFiscalePage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleConfirmUpload = () => {
    if (uploadedFile) {
      console.log('Fattura caricata:', uploadedFile.name)
      setShowUploadModal(false)
      setUploadedFile(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cassetto Fiscale</h1>
        <p className="text-foreground/60 mt-1">Verifica e gestione dichiarazioni fiscali</p>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Carica Fattura</h3>
              <p className="text-sm text-foreground/60 mt-1">Carica immagine o PDF della fattura</p>
            </div>
            <Button className="gap-2" onClick={() => setShowUploadModal(true)}>
              <FileText className="w-4 h-4" />
              Carica Fattura
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-foreground/60 mt-1">Fatture Gennaio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€4.570,50</div>
            <p className="text-sm text-foreground/60 mt-1">Totale Imponibile</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">€914,10</div>
            <p className="text-sm text-foreground/60 mt-1">IVA Totale</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">Sincronizzato</div>
            <p className="text-sm text-foreground/60 mt-1">Stato</p>
          </CardContent>
        </Card>
      </div>

      {/* Fatture Mese */}
      <Card>
        <CardHeader>
          <CardTitle>Fatture Mese Gennaio</CardTitle>
          <CardDescription>Dati da cassetto fiscale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Numero</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Imponibile</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">IVA</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Totale</th>
                </tr>
              </thead>
              <tbody>
                {fattureMese.map((fattura) => (
                  <tr key={fattura.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium">{fattura.numero}</td>
                    <td className="py-3 px-4 text-sm text-foreground/60">{fattura.data}</td>
                    <td className="py-3 px-4 font-semibold">{fattura.importo}</td>
                    <td className="py-3 px-4">{fattura.iva}</td>
                    <td className="py-3 px-4 font-bold text-primary">€{(parseFloat(fattura.importo.replace('€', '').replace(',', '.')) + parseFloat(fattura.iva.replace('€', '').replace(',', '.'))).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-primary/5">
                  <td colSpan={2} className="py-3 px-4 font-bold text-foreground">TOTALI</td>
                  <td className="py-3 px-4 font-bold">€4.570,50</td>
                  <td className="py-3 px-4 font-bold">€914,10</td>
                  <td className="py-3 px-4 font-bold text-primary">€5.484,60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Log Importazioni */}
      <Card>
        <CardHeader>
          <CardTitle>Log Importazioni</CardTitle>
          <CardDescription>Storico importazioni da Cassetto Fiscale</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border border-border rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Importazione completata</p>
            <p className="text-xs text-foreground/60 mt-1">20 Gen 2025 - 14:32</p>
            <p className="text-xs text-foreground/70 mt-2">Importate 3 fatture da cassetto</p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm font-semibold text-foreground">Importazione completata</p>
            <p className="text-xs text-foreground/60 mt-1">15 Gen 2025 - 10:15</p>
            <p className="text-xs text-foreground/70 mt-2">Importate 0 fatture (nessuna nuova)</p>
          </div>
        </CardContent>
      </Card>

      {/* Nota Informativa */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 flex gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Informazione</p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              La funzionalità di import automatico dal Cassetto Fiscale è in fase di implementazione. Contatta il supporto per i dettagli sulla disponibilità dell'API.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Carica Fattura</CardTitle>
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
