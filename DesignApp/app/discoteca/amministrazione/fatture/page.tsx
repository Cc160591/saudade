'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

export default function DiscotecaFattureAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fatture & Scadenze - Discoteca</h1>
        <p className="text-foreground/60 mt-1">Gestione e monitoraggio fatture fornitori della Discoteca</p>
      </div>

      <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          Questa sezione è in fase di sviluppo. I dati verranno popolati in seguito.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Fatture della Discoteca</CardTitle>
          <CardDescription>Elenco fatture fornitori</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/60">Nessun dato disponibile al momento</p>
        </CardContent>
      </Card>
    </div>
  )
}
