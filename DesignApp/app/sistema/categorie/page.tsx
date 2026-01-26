import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'

const categorie = [
  { id: 1, nome: 'Carne', colore: '#f59e0b', prodotti: 45, fornitori: 12 },
  { id: 2, nome: 'Cucina', colore: '#8b5cf6', prodotti: 87, fornitori: 8 },
  { id: 3, nome: 'Vini', colore: '#8b0000', prodotti: 124, fornitori: 15 },
  { id: 4, nome: 'Bar/Beverage', colore: '#10b981', prodotti: 86, fornitori: 6 },
  { id: 5, nome: 'Materiale di Consumo', colore: '#f97316', prodotti: 23, fornitori: 4 },
  { id: 6, nome: 'Manutenzioni', colore: '#0ea5e9', prodotti: 8, fornitori: 3 },
  { id: 7, nome: 'Servizi', colore: '#ec4899', prodotti: 12, fornitori: 5 },
]

export default function CategoriePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Categorie</h1>
        <p className="text-foreground/60 mt-1">Gestione 7 categorie principali Saudade</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{categorie.length}</div>
            <p className="text-sm text-foreground/60 mt-1">Categorie Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{categorie.reduce((sum, c) => sum + c.prodotti, 0)}</div>
            <p className="text-sm text-foreground/60 mt-1">Prodotti Totali</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{new Set(categorie.flatMap(c => Array(c.fornitori))).size}</div>
            <p className="text-sm text-foreground/60 mt-1">Fornitori</p>
          </CardContent>
        </Card>
      </div>

      {/* Categorie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categorie.map((cat) => (
          <Card key={cat.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-6 h-6 rounded-lg"
                  style={{ backgroundColor: cat.colore }}
                />
                <p className="font-bold text-foreground">{cat.nome}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Prodotti:</span>
                  <span className="font-semibold">{cat.prodotti}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Fornitori:</span>
                  <span className="font-semibold">{cat.fornitori}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-red-600">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aggiungi Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Dettagli Categorie</CardTitle>
          <CardDescription>Configurazione e assegnazioni</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categorie.map((cat) => (
              <div key={cat.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded"
                      style={{ backgroundColor: cat.colore }}
                    />
                    <p className="font-semibold text-foreground">{cat.nome}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit className="w-4 h-4" />
                      Modifica
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-foreground/60">
                  <p>{cat.prodotti} prodotti assegnati • {cat.fornitori} fornitori</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
