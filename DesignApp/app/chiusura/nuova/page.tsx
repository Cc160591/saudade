'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { parseItalianAmount } from '@/lib/formatters'

export default function NuvaChiusuraPage() {
  const router = useRouter()
  const [data, setData] = useState(new Date().toISOString().split('T')[0])
  const [contanti, setContanti] = useState('')
  const [bancomat, setBancomat] = useState('')
  const [satispay, setSatispay] = useState('')
  const [other, setOther] = useState('')
  const [spese, setSpese] = useState<Array<{ desc: string; amount: string }>>([])
  const [spesaDesc, setSpesaDesc] = useState('')
  const [spesaAmount, setSpesaAmount] = useState('')
  const [coperti, setCoperti] = useState('')
  const [copertiTheFork, setCopertiTheFork] = useState('')
  const [bottiglie, setBottiglie] = useState('')
  const [dolci, setDolci] = useState('')
  const [bonifico, setBonifico] = useState('')
  const [fattura, setFattura] = useState('')
  const [theFork20, setTheFork20] = useState('')
  const [theFork30, setTheFork30] = useState('')
  const [tavoliYums20, setTavoliYums20] = useState('')
  const [tavoliYums50, setTavoliYums50] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createClient()

  const incassoTotale = parseItalianAmount(contanti) + parseItalianAmount(bancomat) + parseItalianAmount(satispay) + parseItalianAmount(bonifico) + parseItalianAmount(fattura) + parseItalianAmount(theFork20) + parseItalianAmount(theFork30) + parseItalianAmount(tavoliYums20) + parseItalianAmount(tavoliYums50)
  const speseTotali = spese.reduce((sum, s) => sum + parseItalianAmount(s.amount), 0)
  const totaleNetto = incassoTotale - speseTotali

  const handleAddSpesa = () => {
    if (spesaDesc && spesaAmount) {
      setSpese([...spese, { desc: spesaDesc, amount: spesaAmount }])
      setSpesaDesc('')
      setSpesaAmount('')
    }
  }

  const handleSaveChiusura = async () => {
    setIsSaving(true)
    
    // Recupera l'utente corrente per organization_id (nella realtà lo prenderemmo dal profilo)
    // Per ora facciamo una query semplice
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id')
      .eq('id', user?.id)
      .single()

    const { error } = await supabase
      .from('daily_closings')
      .insert({
        organization_id: profile?.organization_id,
        closing_date: data,
        coperti_totali: parseInt(coperti) || 0,
        coperti_thefork: parseInt(copertiTheFork) || 0,
        vini_venduti: parseInt(bottiglie) || 0,
        dolci_venduti: parseInt(dolci) || 0,
        incasso_bancomat: parseAmount(bancomat),
        incasso_contanti: parseAmount(contanti),
        incasso_satispay: parseAmount(satispay),
        incasso_totale: incassoTotale,
        note_spese: JSON.stringify(spese),
        created_by: user?.id
      })

    if (error) {
      console.error('Errore salvataggio chiusura:', error)
      alert('Errore durante il salvataggio.')
    } else {
      router.push('/chiusura/storico')
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nuova Chiusura Giornaliera</h1>
        <p className="text-foreground/60 mt-1">Registra la chiusura della giornata operativa</p>
      </div>

      {/* Data e Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informazioni Giornata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Data Chiusura</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Incassi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Incassi per Canale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Contanti</label>
              <input
                type="text"
                placeholder="€0,00"
                value={contanti}
                onChange={(e) => setContanti(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Bancomat</label>
              <input
                type="text"
                placeholder="€0,00"
                value={bancomat}
                onChange={(e) => setBancomat(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Satispay</label>
              <input
                type="text"
                placeholder="€0,00"
                value={satispay}
                onChange={(e) => setSatispay(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Altro</label>
              <input
                type="text"
                placeholder="€0,00"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiche */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistiche Giornaliera</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Numero Coperti</label>
              <input
                type="number"
                placeholder="0"
                value={coperti}
                onChange={(e) => setCoperti(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Coperti TheFork</label>
              <input
                type="number"
                placeholder="0"
                value={copertiTheFork}
                onChange={(e) => setCopertiTheFork(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Bottiglie Vini</label>
              <input
                type="number"
                placeholder="0"
                value={bottiglie}
                onChange={(e) => setBottiglie(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Dolci Venduti</label>
              <input
                type="number"
                placeholder="0"
                value={dolci}
                onChange={(e) => setDolci(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spese */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Piccole Spese Giornaliere</CardTitle>
          <CardDescription>Spese extra della giornata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Descrizione spesa..."
              value={spesaDesc}
              onChange={(e) => setSpesaDesc(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
            />
            <input
              type="text"
              placeholder="€0,00"
              value={spesaAmount}
              onChange={(e) => setSpesaAmount(e.target.value)}
              className="w-24 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
            />
            <Button variant="outline" onClick={handleAddSpesa}>+</Button>
          </div>
          <div className="space-y-2 text-sm">
            {spese.map((spesa, idx) => (
              <div key={idx} className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                <span>{spesa.desc}</span>
                <span className="font-semibold">{spesa.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Riepilogo */}
      <Card className="bg-primary/5 border border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Riepilogo Chiusura</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Incasso Totale</span>
            <span className="font-bold">€{incassoTotale.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Spese Giornaliere</span>
            <span className="font-bold">€{speseTotali.toFixed(2)}</span>
          </div>
          <div className="border-t border-primary/20 pt-3 flex justify-between">
            <span className="font-semibold">Totale Netto</span>
            <span className="font-bold text-primary text-lg">€{totaleNetto.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Azioni */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2" onClick={handleSaveChiusura} disabled={isSaving}>
          <Calendar className="w-4 h-4" />
          {isSaving ? 'Salvataggio...' : 'Salva Chiusura'}
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">Anteprima PDF</Button>
      </div>
    </div>
  )
}

