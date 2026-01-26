import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Save } from 'lucide-react'

export default function ImpostazioniPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Impostazioni</h1>
        <p className="text-foreground/60 mt-1">Configurazione sistema e preferenze</p>
      </div>

      {/* Email Bolle */}
      <Card>
        <CardHeader>
          <CardTitle>Email Dedicated (Bolle)</CardTitle>
          <CardDescription>Configurazione email per l'arrivo bolle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email Destinazione</label>
            <input
              type="email"
              defaultValue="bolle@saudade.restaurant"
              className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-foreground/60 mt-1">Le bolle inviate a questo indirizzo saranno importate automaticamente</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Inoltro Automatico</label>
            <select className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Abilitato</option>
              <option>Disabilitato</option>
            </select>
            <p className="text-xs text-foreground/60 mt-1">Abilita l'inoltro automatico delle bolle dalla mailbox</p>
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Salva Impostazioni
          </Button>
        </CardContent>
      </Card>

      {/* Soglie Alert */}
      <Card>
        <CardHeader>
          <CardTitle>Soglie Alert Scorte</CardTitle>
          <CardDescription>Configura le soglie di allarme per categoria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { nome: 'Carne', valore: '200 kg' },
              { nome: 'Cucina', valore: '300 unità' },
              { nome: 'Vini', valore: '100 bottiglie' },
              { nome: 'Bar/Beverage', valore: '300 bottiglie' },
              { nome: 'Materiale', valore: '150 unità' },
              { nome: 'Manutenzioni', valore: '50 unità' },
            ].map((cat) => (
              <div key={cat.nome}>
                <label className="text-sm font-medium text-foreground">{cat.nome}</label>
                <input
                  type="text"
                  defaultValue={cat.valore}
                  className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Salva Soglie
          </Button>
        </CardContent>
      </Card>

      {/* Preferenze Export */}
      <Card>
        <CardHeader>
          <CardTitle>Preferenze Export</CardTitle>
          <CardDescription>Configurazione per commercialista</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email Commercialista</label>
            <input
              type="email"
              placeholder="commercialista@studiocontabile.it"
              className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Frequenza Export</label>
            <select className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Settimanale</option>
              <option>Mensile</option>
              <option>Su Richiesta</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Formato</label>
            <select className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Excel</option>
              <option>CSV</option>
              <option>PDF</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="automatico" defaultChecked className="w-4 h-4 rounded" />
            <label htmlFor="automatico" className="text-sm text-foreground">
              Invio automatico al commercialista
            </label>
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Salva Preferenze
          </Button>
        </CardContent>
      </Card>

      {/* Backup */}
      <Card>
        <CardHeader>
          <CardTitle>Backup e Sicurezza</CardTitle>
          <CardDescription>Gestione backup automatici</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="font-semibold text-foreground">Ultimo Backup</p>
            <p className="text-sm text-foreground/60 mt-1">20 Gen 2025 - 02:30</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="font-semibold text-foreground">Frequenza Backup</p>
            <p className="text-sm text-foreground/60 mt-1">Giornaliero (automatico)</p>
          </div>
          <div className="flex gap-2">
            <Button>Esegui Backup Manuale</Button>
            <Button variant="outline">Ripristina da Backup</Button>
          </div>
        </CardContent>
      </Card>

      {/* Informazioni Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between pb-3 border-b border-border">
            <span className="text-foreground/70">Versione Gestionale</span>
            <span className="font-semibold">v1.0.0</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-border">
            <span className="text-foreground/70">Data Installazione</span>
            <span className="font-semibold">01 Gen 2025</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-border">
            <span className="text-foreground/70">Ultimo Aggiornamento</span>
            <span className="font-semibold">20 Gen 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/70">Spazio Dati</span>
            <span className="font-semibold">2.4 GB / 10 GB</span>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100 font-semibold mb-2">
            Hai bisogno di aiuto?
          </p>
          <p className="text-xs text-blue-800 dark:text-blue-200 mb-4">
            Contatta il supporto Saudade per configurazioni personalizzate e assistenza.
          </p>
          <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-50 bg-transparent">
            Contatta Supporto
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
