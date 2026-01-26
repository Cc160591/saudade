import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Mail, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const statusConfig = {
  verified: { label: 'Verificato', bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle },
  pending_review: { label: 'In Revisione', bg: 'bg-yellow-50', text: 'text-yellow-700', icon: FileText },
  error: { label: 'Errore Lettura', bg: 'bg-red-50', text: 'text-red-700', icon: AlertTriangle },
  archived: { label: 'Archiviato', bg: 'bg-slate-50', text: 'text-slate-700', icon: FileText },
}

export default async function InboxPage() {
  const supabase = await createClient()

  // Recupera gli ultimi documenti con i file associati
  const { data: documents } = await supabase
    .from('documents')
    .select(`
      id,
      doc_number,
      doc_date,
      status,
      vendor_id,
      vendors (name),
      document_files (filename, size_bytes)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // Recupera statistiche
  const { data: statsData } = await supabase
    .from('documents')
    .select('status')

  const stats = {
    verified: statsData?.filter(d => d.status === 'verified').length || 0,
    pending: statsData?.filter(d => d.status === 'pending_review').length || 0,
    error: statsData?.filter(d => d.status === 'error').length || 0,
    total: statsData?.length || 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inbox Documenti</h1>
        <p className="text-foreground/60 mt-1">Gestisci bolle e fatture in arrivo</p>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Upload Documenti</h3>
              <p className="text-sm text-foreground/60 mt-1">Carica bolle, fatture e ordini via email o manualmente</p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <Mail className="w-4 h-4" />
                Da Email
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Upload className="w-4 h-4" />
                Upload File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary">{stats.verified}</div>
            <p className="text-sm text-foreground/60 mt-1">Documenti Verificati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-foreground/60 mt-1">In Revisione</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-red-600">{stats.error}</div>
            <p className="text-sm text-foreground/60 mt-1">Errori Lettura</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-sm text-foreground/60 mt-1">Documenti Totali</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Ultimi Documenti</CardTitle>
          <CardDescription>Ordina per data o stato di verifica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {!documents || documents.length === 0 ? (
              <p className="text-center py-8 text-foreground/60">Nessun documento trovato.</p>
            ) : (
              documents.map((doc: any) => {
                const config = statusConfig[doc.status as keyof typeof statusConfig] || statusConfig.pending_review
                const StatusIcon = config.icon
                const filename = doc.document_files?.[0]?.filename || doc.doc_number || 'Documento senza nome'
                const size = doc.document_files?.[0]?.size_bytes 
                  ? `${(doc.document_files[0].size_bytes / 1024 / 1024).toFixed(1)} MB`
                  : 'N/D'
                
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-foreground/60" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{filename}</p>
                        <p className="text-xs text-foreground/60">
                          {doc.vendors?.name || 'Fornitore sconosciuto'} • {doc.doc_date || 'Data N/D'} • {size}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} ${config.text} text-xs font-medium`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

