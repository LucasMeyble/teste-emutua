import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {

  const { data: session } = useSession()
  const router = useRouter()

  const fetchLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })

      await signOut({ redirect: false })
      router.push('/login')
    } catch (err) {
      console.error('Erro ao sair:', err)
    }
  }

  return { fetchLogout }
}