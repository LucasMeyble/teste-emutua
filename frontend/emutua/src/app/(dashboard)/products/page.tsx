'use client'

import MainLayout from '@/components/layouts/mainLayout'
import { Button } from '@/components/button'
import { useProducts } from '@/hooks/useProducts'
import { useRef, useState, useEffect } from 'react'
import { Product, ProductInputErrors } from '@/types/product'
import ProductFormModal from '@/components/ProductFormModal'
import ConfirmDialog from '@/components/ConfirmDialog'
import Alert from '@/components/alert'

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  })
  const [errors, setErrors] = useState<ProductInputErrors | null>(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'warning' | 'info'
    text: string
  } | null>(null)

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null)
      }, 4000)

      return () => clearTimeout(timeout)
    }
  }, [alert])

  const handleCreate = () => {
    setIsEditing(false)
    setInputs({ name: '', description: '', price: '', category: '' })
    setErrors(null)
    setIsSuccess(false)
    setIsModalOpen(true)
  }

  const handleEdit = (product: Product) => {
    setIsEditing(true)
    setEditingProductId(product.id)
    setInputs({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
    })
    setErrors(null)
    setIsSuccess(false)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setPendingDeleteId(id)
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!pendingDeleteId) return
    try {
      await deleteProduct(pendingDeleteId)
      setAlert({ type: 'success', text: 'Produto excluído com sucesso.' })
    } catch (err: any) {
      setAlert({ type: 'error', text: err.message || 'Erro ao excluir produto.' })
    } finally {
      setPendingDeleteId(null)
      setConfirmOpen(false)
    }
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const payload = {
      name: inputs.name.trim(),
      description: inputs.description.trim(),
      price: parseFloat(inputs.price.replace(',', '.')),
      category: inputs.category.trim(),
    }

    if (!payload.name || !payload.description || isNaN(payload.price) || !payload.category) {
      setErrors({
        name: !payload.name ? ['Nome é obrigatório'] : [],
        description: !payload.description ? ['Descrição é obrigatória'] : [],
        price: isNaN(payload.price) ? ['Preço inválido'] : [],
        category: !payload.category ? ['Categoria é obrigatória'] : [],
      })
      return
    }

    try {
      if (isEditing && editingProductId) {
        await updateProduct(editingProductId, payload)
        setAlert({ type: 'success', text: 'Produto atualizado com sucesso.' })
      } else {
        await createProduct(payload)
        setAlert({ type: 'success', text: 'Produto criado com sucesso.' })
      }

      setInputs({ name: '', description: '', price: '', category: '' })
      setErrors(null)
      setIsSuccess(true)
      setIsModalOpen(false)
    } catch (err: any) {
      setErrors(err.errors || { geral: err.message || 'Erro ao salvar' })
      setAlert({ type: 'error', text: err.message || 'Erro ao salvar produto.' })
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Produtos</h1>
          <Button
            onClick={handleCreate}
            className="w-auto bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white transition-colors"
          >
            Criar novo produto
          </Button>
        </div>

        <ProductFormModal
          ref={modalRef}
          isEditing={isEditing}
          isSuccess={isSuccess}
          errorMessage=""
          errors={errors}
          inputs={inputs}
          setters={{
            setName: (v) => setInputs((prev) => ({ ...prev, name: v })),
            setDescription: (v) => setInputs((prev) => ({ ...prev, description: v })),
            setPrice: (v) => setInputs((prev) => ({ ...prev, price: v })),
            setCategory: (v) => setInputs((prev) => ({ ...prev, category: v }))
          }}
          isOpen={isModalOpen}
          onSubmit={onSubmit}
          onClose={() => setIsModalOpen(false)}
        />

        {loading ? (
          <p className="text-gray-600">Carregando produtos...</p>
        ) : error ? (
          <p className="text-red-600">Erro ao carregar produtos: {error}</p>
        ) : products.length === 0 ? (
          <div className="text-gray-700">
            Não há produtos cadastrados. Clique em <strong>"Criar novo produto"</strong> para adicionar seu primeiro produto!
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Preço</th>
                  <th className="px-4 py-2">Categoria</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.description}</td>
                    <td className="px-4 py-2">R$ {product.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-sm text-blue-600 hover:underline mr-4"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => handleDelete(product.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={confirmOpen}
        text="Tem certeza que deseja excluir este produto?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert text={alert.text} type={alert.type} />
        </div>
      )}
    </MainLayout>

  )
}
