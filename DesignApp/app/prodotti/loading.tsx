import { Card, CardContent } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 animate-pulse" />
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-72 animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
