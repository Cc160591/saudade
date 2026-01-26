'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

export default function DiscotecaDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard - Discoteca</h1>
        <p className="text-foreground/60 mt-1">Benvenuto nel gestionale della Discoteca</p>
      </div>

      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Il modulo Discoteca è in fase di sviluppo. Tutte le sezioni nel menu sono disponibili e pronte per essere utilizzate.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-4xl font-bold text-primary">-</div>
            <p className="text-base text-foreground/60 mt-3">Dati Non Disponibili</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-4xl font-bold text-primary">-</div>
            <p className="text-base text-foreground/60 mt-3">Dati Non Disponibili</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-4xl font-bold text-primary">-</div>
            <p className="text-base text-foreground/60 mt-3">Dati Non Disponibili</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sezioni Disponibili</CardTitle>
          <CardDescription>Accedi alle seguenti sezioni dal menu laterale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 border border-border rounded-lg">
              <p className="font-semibold text-foreground">Prodotti</p>
              <p className="text-sm text-foreground/60 mt-1">Gestione anagrafica prodotti della Discoteca</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="font-semibold text-foreground">Magazzino</p>
              <p className="text-sm text-foreground/60 mt-1">Gestione stock e movimenti del magazzino</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="font-semibold text-foreground">Amministrazione</p>
              <p className="text-sm text-foreground/60 mt-1">Gestione fatture, bolle e pagamenti</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="font-semibold text-foreground">Analisi</p>
              <p className="text-sm text-foreground/60 mt-1">Report e analisi dati della Discoteca</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
