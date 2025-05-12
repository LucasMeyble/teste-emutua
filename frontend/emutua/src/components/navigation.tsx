'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

import { Button } from '@/components/button'

export default function Navigation() {
  const { data: session } = useSession()
  const router = useRouter()

  const { fetchLogout } = useAuth()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: '#f5f5f5',
      borderBottom: '1px solid #ddd'
    }}>
      <div>
        <h1 style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
          Emutua
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ color: '#555' }}>
          Seja bem-vindo{session?.user?.name ? `, ${session.user.name}` : ''}
        </span>
        <Button onClick={fetchLogout} className="w-auto px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration">
          Sair
        </Button>
      </div>
    </nav>
  )
}
