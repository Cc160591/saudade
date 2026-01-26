'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, FileText, X } from 'lucide-react'
import { useState } from 'react'

let paymentsData = [
  {
    id: 1,
    fattura: 'FT-2025-001',
    fornitore: 'Carni Italiane',
    importo: '€2.450,00',
    data: '20 Gen 2025',
    scadenza: '04 Feb 2025',
    status: 'pagato',
    dataPagamento: '20 Gen 2025',
  },
  {
    id: 2,
    fattura: 'FT-2025-002',
    fornitore: 'Premium Beverages',
    importo: '€920,50',
    data: '20 Gen 2025',
    scadenza: '02 Feb 2025',
    status: 'pendente',
    dataPagamento: '-',
  },
  {
    id: 3,
    fattura: 'FT-2025-003',
    fornitore: 'Vini Pregiati',
    importo: '€1.200,00',
    data: '19 Gen 2025',
    scadenza: '03 Feb 2025',
    status: 'programmato',
    dataPagamento: '02 Feb 2025',
  },
]

const pagamenti = paymentsData; // Declare the pagamenti variable

export default function PagamentiPage() {
  const [pagamenti, setPagamenti] = useState(paymentsData)
  const [registerModal, setRegisterModal] = useState<any>(null)
  const [confirmAmount, setConfirmAmount] = useState('')

  const totalPendente = pagamenti
    .filter(p => p.status === 'pendente')
    .reduce((sum, p) => sum + parseFloat(p.importo.replace('€', '').replace(',', '.')), 0)

  const handleRegisterClick = (payment: any) => {
    setRegisterModal(payment)
    setConfirmAmount(payment.importo)
  }

  const handleConfirmPayment = () => {
    if (!registerModal) return
    
    // Update payment status to 'pagato'
    const updatedPayments = pagamenti.map(p => 
      p.id === registerModal.id 
        ? { ...p, status: 'pagato', dataPagamento: new Date().toLocaleDateString('it-IT') }
        : p
    )
    
    setPagamenti(updatedPayments)
    setRegisterModal(null)
    setConfirmAmount('')
  }

  const handleCloseModal = () => {
    setRegisterModal(null)
    setConfirmAmount('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pagamenti</h1>
        <p className="text-foreground/60 mt-1">Gestione pagamenti fornitori</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{pagamenti.length}</div>
            <p className="text-sm text-foreground/60 mt-1">Pagamenti Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">1</div>
            <p className="text-sm text-foreground/60 mt-1">Pagati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-600">€{totalPendente.toFixed(2)}</div>
            <p className="text-sm text-foreground/60 mt-1">Pendenti</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">1</div>
            <p className="text-sm text-foreground/60 mt-1">Programmati</p>
          </CardContent>
        </Card>
      </div>

      {/* Pagamenti List */}
      <Card>
        <CardHeader>
          <CardTitle>Registro Pagamenti</CardTitle>
          <CardDescription>Storico e stato di tutti i pagamenti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Fattura</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Fornitore</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Importo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Scadenza</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Stato</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {pagamenti.map((pag) => (
                  <tr key={pag.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium">{pag.fattura}</td>
                    <td className="py-3 px-4 text-sm">{pag.fornitore}</td>
                    <td className="py-3 px-4 font-semibold text-primary">{pag.importo}</td>
                    <td className="py-3 px-4 text-sm text-foreground/60">{pag.data}</td>
                    <td className="py-3 px-4 text-sm font-medium">{pag.scadenza}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        pag.status === 'pagato'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : pag.status === 'pendente'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        {pag.status === 'pagato' ? 'Pagato' : pag.status === 'pendente' ? 'Pendente' : 'Programmato'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="sm">
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

      {/* Azioni Pagamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pagamenti da Registrare</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pagamenti.filter(p => p.status === 'pendente').map((pag) => (
              <div key={pag.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{pag.fornitore}</p>
                  <p className="text-xs text-foreground/60">{pag.fattura}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{pag.importo}</p>
                  <Button size="sm" className="mt-2 w-full" onClick={() => handleRegisterClick(pag)}>Registra</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Storico Pagati</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pagamenti.filter(p => p.status === 'pagato').map((pag) => (
              <div key={pag.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{pag.fornitore}</p>
                  <p className="text-xs text-foreground/60">Pagato: {pag.dataPagamento}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-bold text-primary">{pag.importo}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Payment Registration Modal */}
      {registerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Registra Pagamento</CardTitle>
              <button
                onClick={handleCloseModal}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-foreground/60">Fornitore</p>
                <p className="text-lg font-semibold text-foreground">{registerModal.fornitore}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Fattura</p>
                <p className="text-lg font-semibold text-foreground">{registerModal.fattura}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <label className="block text-sm font-medium mb-2 text-foreground">Importo da Registrare</label>
                <input
                  type="text"
                  value={confirmAmount}
                  onChange={(e) => setConfirmAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg font-semibold"
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                <p className="text-sm text-foreground">Importo originale: <span className="font-bold">{registerModal.importo}</span></p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCloseModal} className="flex-1 bg-transparent">Annulla</Button>
                <Button onClick={handleConfirmPayment} className="flex-1">Conferma Pagamento</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
