import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          })
      
          const text = await res.text()
          const data = JSON.parse(text)
      
          if (res.status !== 200 || !data.token || !data.user) {
            console.log('❌ Dados inválidos:', res.status, data)
            return null
          }
          
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token
          }
        } catch (e) {
          console.error('🔥 ERRO NO FETCH:', e)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token,
        token.name = user.name 
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user = {
        ...session.user,
        name: token.name,
        email: token.email
      }
      return session
    }
    
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
