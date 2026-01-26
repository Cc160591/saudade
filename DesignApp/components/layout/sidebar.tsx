'use client'

import React from "react"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  FileText, 
  Package, 
  Warehouse, 
  Settings, 
  Users, 
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  Utensils,
  Clock,
  Home,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="w-4 h-4" />
  },
  {
    label: 'Magazzino',
    icon: <Warehouse className="w-4 h-4" />,
    children: [
      { label: 'Prodotti', href: '/prodotti' },
      { label: 'Stock per Settore', href: '/magazzino/stock' },
      { label: 'Alert Scorte', href: '/magazzino/alert' },
      { label: 'Movimenti', href: '/magazzino/movimenti' },
    ]
  },
  {
    label: 'Amministrazione',
    icon: <AlertCircle className="w-4 h-4" />,
    children: [
      { label: 'Bolle', href: '/amministrazione/bolle' },
      { label: 'Fatture & Scadenze', href: '/amministrazione/fatture' },
      { label: 'Riconciliazione', href: '/amministrazione/riconciliazione' },
      { label: 'Pagamenti', href: '/amministrazione/pagamenti' },
      { label: 'Cassetto Fiscale', href: '/amministrazione/cassetto' },
    ]
  },
  {
    label: 'Chiusura Giornaliera',
    icon: <Clock className="w-4 h-4" />,
    children: [
      { label: 'Nuova Chiusura', href: '/chiusura/nuova' },
      { label: 'Storico', href: '/chiusura/storico' },
    ]
  },
  {
    label: 'Analisi',
    icon: <TrendingUp className="w-4 h-4" />,
    children: [
      { label: 'Report Costi', href: '/analisi/costi' },
      { label: 'Report Vendite', href: '/analisi/vendite' },
    ]
  },
  {
    label: 'Sistema',
    icon: <Settings className="w-4 h-4" />,
    children: [
      { label: 'Fornitori', href: '/sistema/fornitori' },
      { label: 'Categorie', href: '/sistema/categorie' },
      { label: 'Utenti & Ruoli', href: '/sistema/utenti' },
      { label: 'Impostazioni', href: '/sistema/impostazioni' },
    ]
  },
]

function NavItemComponent({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)
  const isActive = item.href === pathname
  const hasChildren = item.children && item.children.length > 0

  return (
    <div key={item.label}>
      {hasChildren ? (
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
            'hover:bg-primary/10 text-foreground'
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
        </button>
      ) : (
        <Link
          href={item.href || '#'}
          className={cn(
            'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-primary/10'
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      )}

      {hasChildren && open && (
        <div className="ml-6 space-y-1 py-2 border-l border-border">
          {item.children!.map((child) => (
            <Link
              key={child.label}
              href={child.href!}
              className={cn(
                'block px-4 py-2 text-xs font-medium rounded-lg transition-colors',
                pathname === child.href
                  ? 'bg-primary/20 text-primary font-semibold'
                  : 'text-foreground/70 hover:text-foreground hover:bg-primary/10'
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const discotecaNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/discoteca/dashboard',
    icon: <Home className="w-4 h-4" />
  },
  {
    label: 'Prodotti',
    href: '/discoteca/prodotti',
    icon: <Package className="w-4 h-4" />
  },
  {
    label: 'Magazzino',
    icon: <Warehouse className="w-4 h-4" />,
    children: [
      { label: 'Stock per Settore', href: '/discoteca/magazzino/stock' },
    ]
  },
  {
    label: 'Amministrazione',
    icon: <AlertCircle className="w-4 h-4" />,
    children: [
      { label: 'Fatture & Scadenze', href: '/discoteca/amministrazione/fatture' },
    ]
  },
  {
    label: 'Analisi',
    icon: <TrendingUp className="w-4 h-4" />,
    children: [
      { label: 'Report Vendite', href: '/discoteca/analisi/vendite' },
    ]
  },
]

export default function Sidebar({ open, isDiscoteca }: { open: boolean; isDiscoteca?: boolean }) {
  const pathname = usePathname()
  const items = isDiscoteca ? discotecaNavItems : navItems
  const accountName = isDiscoteca ? 'Discoteca' : 'Saudade'

  return (
    <aside
      className={cn(
        'w-64 bg-white dark:bg-slate-900 border-r border-border transition-all duration-300 overflow-y-auto',
        !open && '-translate-x-full absolute h-full z-50'
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            isDiscoteca 
              ? 'bg-gradient-to-br from-purple-500 to-pink-600'
              : 'bg-gradient-to-br from-amber-500 to-orange-600'
          )}>
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-lg text-foreground">{accountName}</h1>
            <p className="text-xs text-foreground/60">Gestionale</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {items.map((item) => (
          <NavItemComponent key={item.label} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  )
}
