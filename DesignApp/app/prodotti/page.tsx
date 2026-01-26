'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Plus, X } from 'lucide-react'
import { useState, useMemo } from 'react'

const prodotti = [
  // Carne (5)
  { id: 1, nome: 'Carne di Manzo Premium', categoria: 'Carne', fornitore: 'Carni Italiane', prezzo: '€12,50/kg', giacenza: '45 kg' },
  { id: 2, nome: 'Petto di Pollo', categoria: 'Carne', fornitore: 'Carni Italiane', prezzo: '€8,00/kg', giacenza: '32 kg' },
  { id: 3, nome: 'Costine Maiale', categoria: 'Carne', fornitore: 'Carni Italiane', prezzo: '€10,20/kg', giacenza: '28 kg' },
  { id: 4, nome: 'Filetto Manzo', categoria: 'Carne', fornitore: 'Carni Premium', prezzo: '€18,50/kg', giacenza: '12 kg' },
  { id: 5, nome: 'Salsiccia Brasiliana', categoria: 'Carne', fornitore: 'Fornitori Brasile', prezzo: '€9,80/kg', giacenza: '40 kg' },
  
  // Cucina (5)
  { id: 6, nome: 'Riso Brasile', categoria: 'Cucina', fornitore: 'Fornitori Brasile', prezzo: '€3,20/kg', giacenza: '120 kg' },
  { id: 7, nome: 'Farinetta di Manioca', categoria: 'Cucina', fornitore: 'Fornitori Brasile', prezzo: '€4,50/kg', giacenza: '80 kg' },
  { id: 8, nome: 'Farina 0', categoria: 'Cucina', fornitore: 'Molini Italiani', prezzo: '€0,80/kg', giacenza: '200 kg' },
  { id: 9, nome: 'Olio Extra Vergine', categoria: 'Cucina', fornitore: 'Oliveti', prezzo: '€12,00/lt', giacenza: '45 lt' },
  { id: 10, nome: 'Sale Fino', categoria: 'Cucina', fornitore: 'Molini Italiani', prezzo: '€0,50/kg', giacenza: '100 kg' },
  
  // Vini (5)
  { id: 11, nome: 'Vino Rosso Toscano', categoria: 'Vini', fornitore: 'Vini Pregiati', prezzo: '€8,90/bottiglia', giacenza: '156 bottiglie' },
  { id: 12, nome: 'Prosecco DOC', categoria: 'Vini', fornitore: 'Vini Veneti', prezzo: '€6,50/bottiglia', giacenza: '98 bottiglie' },
  { id: 13, nome: 'Vino Brasiliano Branco', categoria: 'Vini', fornitore: 'Fornitori Brasile', prezzo: '€7,20/bottiglia', giacenza: '72 bottiglie' },
  { id: 14, nome: 'Chianti Classico', categoria: 'Vini', fornitore: 'Vini Toscani', prezzo: '€9,50/bottiglia', giacenza: '64 bottiglie' },
  { id: 15, nome: 'Pinot Grigio', categoria: 'Vini', fornitore: 'Vini Pregiati', prezzo: '€7,80/bottiglia', giacenza: '85 bottiglie' },
  
  // Bar/Beverage (5)
  { id: 16, nome: 'Birra Brasiliana', categoria: 'Bar/Beverage', fornitore: 'Premium Beverages', prezzo: '€1,50/bottiglia', giacenza: '250 bottiglie' },
  { id: 17, nome: 'Coca Cola', categoria: 'Bar/Beverage', fornitore: 'Bevande Soft', prezzo: '€0,80/bottiglia', giacenza: '180 bottiglie' },
  { id: 18, nome: 'Succo di Mango', categoria: 'Bar/Beverage', fornitore: 'Bevande Esotiche', prezzo: '€2,10/bottiglia', giacenza: '95 bottiglie' },
  { id: 19, nome: 'Birra Bionda', categoria: 'Bar/Beverage', fornitore: 'Premium Beverages', prezzo: '€1,40/bottiglia', giacenza: '220 bottiglie' },
  { id: 20, nome: 'Acqua Minerale', categoria: 'Bar/Beverage', fornitore: 'Bevande Soft', prezzo: '€0,30/bottiglia', giacenza: '500 bottiglie' },
]

const categorie = ['Carne', 'Cucina', 'Vini', 'Bar/Beverage']
const categorieCount: { [key: string]: number } = {
  'Carne': 45,
  'Cucina': 87,
  'Vini': 124,
  'Bar/Beverage': 86,
}

export default function ProdottiPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editFormData, setEditFormData] = useState<any>(null)

  const filteredProducts = useMemo(() => {
    return prodotti.filter((prod) => {
      const matchesSearch = prod.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prod.fornitore.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || prod.categoria === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleEditClick = (product: any) => {
    setEditingProduct(product)
    setEditFormData({ ...product })
  }

  const handleSaveEdit = () => {
    // Salva i cambiamenti (in una vera app, andrà a backend)
    setEditingProduct(null)
    setEditFormData(null)
  }

  const handleCloseEdit = () => {
    setEditingProduct(null)
    setEditFormData(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Prodotti</h1>
        <p className="text-foreground/60 mt-1">Anagrafica e gestione prodotti</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-foreground/60" />
            <input
              type="text"
              placeholder="Cerca prodotto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Filter */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        <Card
          className={`cursor-pointer hover:shadow-lg transition-all ${
            selectedCategory === null ? 'ring-2 ring-primary bg-primary/5' : ''
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          <CardContent className="pt-4 pb-4 text-center">
            <p className="font-bold text-foreground">Tutti</p>
            <p className="text-2xl font-bold text-primary mt-2">342</p>
            <p className="text-xs text-foreground/60 mt-1">Prodotti</p>
          </CardContent>
        </Card>
        {categorie.map((cat) => (
          <Card
            key={cat}
            className={`cursor-pointer hover:shadow-lg transition-all ${
              selectedCategory === cat ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            <CardContent className="pt-4 pb-4 text-center">
              <p className="font-bold text-foreground">{cat}</p>
              <p className="text-2xl font-bold text-primary mt-2">{categorieCount[cat]}</p>
              <p className="text-xs text-foreground/60 mt-1">Prodotti</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Anagrafica Prodotti</CardTitle>
          <CardDescription>
            {selectedCategory
              ? `Prodotti della categoria ${selectedCategory}`
              : 'Elenco completo dei prodotti disponibili'}
            {' '}
            ({filteredProducts.length})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Nome Prodotto</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Categoria</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Fornitore</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Prezzo</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Giacenza</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-medium">{prod.nome}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {prod.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground/60">{prod.fornitore}</td>
                      <td className="py-3 px-4 font-semibold">{prod.prezzo}</td>
                      <td className="py-3 px-4">{prod.giacenza}</td>
                      <td className="py-3 px-4 text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(prod)}>Modifica</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-4 text-center text-foreground/60">
                      Nessun prodotto trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingProduct && editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Modifica Prodotto</CardTitle>
              <button
                onClick={handleCloseEdit}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Nome Prodotto</label>
                <input
                  type="text"
                  value={editFormData.nome}
                  onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Categoria</label>
                <select
                  value={editFormData.categoria}
                  onChange={(e) => setEditFormData({ ...editFormData, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categorie.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Fornitore</label>
                <input
                  type="text"
                  value={editFormData.fornitore}
                  onChange={(e) => setEditFormData({ ...editFormData, fornitore: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Prezzo</label>
                <input
                  type="text"
                  value={editFormData.prezzo}
                  onChange={(e) => setEditFormData({ ...editFormData, prezzo: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Giacenza</label>
                <input
                  type="text"
                  value={editFormData.giacenza}
                  onChange={(e) => setEditFormData({ ...editFormData, giacenza: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCloseEdit} className="flex-1 bg-transparent">Annulla</Button>
                <Button onClick={handleSaveEdit} className="flex-1">Salva Modifiche</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
