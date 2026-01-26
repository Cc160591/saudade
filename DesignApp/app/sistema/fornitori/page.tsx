import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'

const fornitori = [
  {
    id: 1,
    nome: 'Carni Italiane',
    tipo: 'Principale',
    termini: '40 giorni',
    contatto: 'info@carniitaliane.it',
    telefono: '+39 02 1234 5678',
    indirizzo: 'Milano, MI',
  },
  {
    id: 2,
    nome: 'Premium Beverages',
    tipo: 'Principale',
    termini: '15 giorni',
    contatto: 'sales@premium-beverages.it',
    telefono: '+39 02 9876 5432',
    indirizzo: 'Milano, MI',
  },
  {
    id: 3,
    nome: 'Vini Pregiati',
    tipo: 'Principale',
    termini: '30 giorni',
    contatto: 'ordini@vini-pregiati.it',
    telefono: '+39 055 5555 5555',
    indirizzo: 'Firenze, FI',
  },
  {
    id: 4,
    nome: 'Fornitori Brasile',
    tipo: 'Principale',
    termini: '40 giorni',
    contatto: 'brasile@fornitori.it',
    telefono: '+39 041 9999 9999',
    indirizzo: 'Venezia, VE',
  },
  {
    id: 5,
    nome: 'Fornitori Vari',
    tipo: 'Occasionale',
    termini: '15 giorni',
    contatto: 'info@fornitori-vari.it',
    telefono: '+39 06 1111 1111',
    indirizzo: 'Roma, RM',
  },
]

export default function FornitoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fornitori</h1>
        <p className="text-foreground/60 mt-1">Anagrafica e termini di pagamento</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{fornitori.length}</div>
            <p className="text-sm text-foreground/60 mt-1">Fornitori Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-foreground/60 mt-1">Principali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">1</div>
            <p className="text-sm text-foreground/60 mt-1">Occasionali</p>
          </CardContent>
        </Card>
      </div>

      {/* Fornitori List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Elenco Fornitori</CardTitle>
              <CardDescription>Gestione anagrafica e termini</CardDescription>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nuovo Fornitore
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fornitori.map((fornitore) => (
              <div key={fornitore.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground">{fornitore.nome}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        fornitore.tipo === 'Principale'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-slate-200 dark:bg-slate-700 text-foreground'
                      }`}>
                        {fornitore.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">{fornitore.indirizzo}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-foreground/60 text-xs font-medium">Email</p>
                    <p className="font-medium text-foreground mt-0.5 break-all">{fornitore.contatto}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-xs font-medium">Telefono</p>
                    <p className="font-medium text-foreground mt-0.5">{fornitore.telefono}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-xs font-medium">Termini Pagamento</p>
                    <p className="font-medium text-foreground mt-0.5">{fornitore.termini}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-xs font-medium">Ultime Fatture</p>
                    <p className="font-medium text-foreground mt-0.5">12 fatture</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
