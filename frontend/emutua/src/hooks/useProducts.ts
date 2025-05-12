'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Product } from '@/types/product'

export function useProducts() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!session?.accessToken) return

    try {
      setLoading(true)

      const res = await fetch('http://localhost:8000/api/products', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error('Erro ao buscar produtos')
      }

      const data = await res.json()
      setProducts(data)
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const createProduct = async (product: Omit<Product, 'id'>) => {
    const res = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(product)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw errorData
    }

    await fetchProducts()
  }

  const updateProduct = async (id: string, product: Partial<Product>) => {
    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(product)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw errorData
    }

    await fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        Accept: 'application/json'
      }
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw errorData
    }

    await fetchProducts()
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
