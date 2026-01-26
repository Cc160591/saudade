'use client'

import { Menu, User, Bell, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [openDropdown, setOpenDropdown] = useState(false)
  const pathname = usePathname()
  
  // Determine current account based on pathname
  const isDiscoteca = pathname.startsWith('/discoteca')
  const currentAccount = isDiscoteca ? 'discoteca' : 'saudade'

  const accounts = [
    { id: 'saudade', name: 'Saudade', href: '/dashboard' },
    { id: 'discoteca', name: 'Discoteca', href: '/discoteca/dashboard' },
  ]

  const displayName = accounts.find(a => a.id === currentAccount)?.name || 'Saudade'

  const handleAccountSwitch = (accountId: string) => {
    // Handle account switch logic here
  }

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-border flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground hidden sm:block">Gestionale {displayName}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-foreground"
          >
            <span>{displayName}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-border rounded-lg shadow-lg z-50">
              {accounts.map((account) => (
                <Link
                  key={account.id}
                  href={account.href}
                  onClick={() => setOpenDropdown(false)}
                  className={`block px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-border last:border-b-0 text-sm font-medium ${
                    currentAccount === account.id
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground'
                  }`}
                >
                  {currentAccount === account.id && <span className="mr-2">✓</span>}
                  {account.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
