'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from '../navigation'

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Oculta a navegação na tela de login
  const hideNavigation = pathname === '/login'

  return (
    <div>
      {!hideNavigation && <Navigation />}
      <main>{children}</main>
    </div>
  )
}
