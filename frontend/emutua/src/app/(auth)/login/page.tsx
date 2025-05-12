'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { Form } from '@/components/form'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { ButtonLoading } from '@/components/buttonLoading'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (res?.ok) {
      router.push('/products')
    } else {
      setError(' Logininválido')
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emutua e-commerce</h1>
        <p className="text-gray-500 text-lg mt-1">Login</p>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-left">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ButtonLoading type="submit" isLoading={isLoading}>
            Entrar
          </ButtonLoading>
        </div>
      </Form>
    </div>
  )
}
