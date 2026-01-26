import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Shield } from 'lucide-react'

const utenti = [
  {
    id: 1,
    nome: 'Marco Rossi',
    email: 'marco@saudade.it',
    ruolo: 'Titolare',
    accesso: 'Completo',
    ultimoAccesso: '20 Gen 2025',
    attivo: true,
  },
  {
    id: 2,
    nome: 'Giulia Bianchi',
    email: 'giulia@saudade.it',
    ruolo: 'Responsabile Generale',
    accesso: 'Lettura/Scrittura',
    ultimoAccesso: '20 Gen 2025',
    attivo: true,
  },
  {
    id: 3,
    nome: 'Antonio Verdi',
    email: 'antonio@saudade.it',
    ruolo: 'Magazzino',
    accesso: 'Lettura Limitata',
    ultimoAccesso: '19 Gen 2025',
    attivo: true,
  },
]

export default function UtentiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Utenti & Ruoli</h1>
        <p className="text-foreground/60 mt-1">Gestione accessi e permessi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{utenti.length}</div>
            <p className="text-sm text-foreground/60 mt-1">Utenti Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{utenti.filter(u => u.attivo).length}</div>
            <p className="text-sm text-foreground/60 mt-1">Attivi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-foreground/60 mt-1">Ruoli</p>
          </CardContent>
        </Card>
      </div>

      {/* Utenti List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Elenco Utenti</CardTitle>
              <CardDescription>Utenti e permessi di accesso</CardDescription>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuovo Utente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Ruolo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Accesso</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Ultimo Accesso</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {utenti.map((utente) => (
                  <tr key={utente.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-medium">{utente.nome}</td>
                    <td className="py-3 px-4 text-sm text-foreground/60">{utente.email}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">{utente.ruolo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{utente.accesso}</td>
                    <td className="py-3 px-4 text-sm text-foreground/60">{utente.ultimoAccesso}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {utente.ruolo !== 'Titolare' && (
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ruoli */}
      <Card>
        <CardHeader>
          <CardTitle>Ruoli Disponibili</CardTitle>
          <CardDescription>Permessi e accessi per ruolo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-foreground">Titolare</p>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Massimi Permessi</span>
              </div>
              <div className="text-sm text-foreground/70 space-y-1">
                <p>✓ Accesso completo a tutte le funzionalità</p>
                <p>✓ Gestione utenti e ruoli</p>
                <p>✓ Impostazioni sistema</p>
                <p>✓ Export dati completi</p>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-foreground">Responsabile Generale</p>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded">Permessi Estesi</span>
              </div>
              <div className="text-sm text-foreground/70 space-y-1">
                <p>✓ Lettura e scrittura su tutte le sezioni</p>
                <p>✓ Gestione magazzino e fatture</p>
                <p>✓ Creazione report</p>
                <p>✗ Gestione utenti</p>
                <p>✗ Impostazioni sistema</p>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-foreground">Magazzino</p>
                <span className="text-xs bg-slate-200 dark:bg-slate-700 text-foreground px-2 py-1 rounded">Permessi Limitati</span>
              </div>
              <div className="text-sm text-foreground/70 space-y-1">
                <p>✓ Lettura magazzino</p>
                <p>✓ Registrazione movimenti</p>
                <p>✗ Gestione fatture</p>
                <p>✗ Modifica prezzi</p>
                <p>✗ Report esportazione</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
