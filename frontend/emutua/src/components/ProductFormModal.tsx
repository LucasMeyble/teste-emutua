'use client'

import { NumericFormat } from 'react-number-format'
import { ProductInputErrors } from '@/types/product'
import Alert from '@/components/alert'
import InputError from '@/components/inputError'
import { Button } from '@/components/button'
import { Label } from '@/components/label'
import { Input } from '@/components/input'

import { forwardRef } from 'react'

interface ProductFormModalProps {
  isSuccess: boolean
  isEditing: boolean
  errorMessage?: string
  errors: ProductInputErrors | null
  inputs: {
    name: string
    description: string
    price: string
    category: string
  }
  setters: {
    setName: (value: string) => void
    setDescription: (value: string) => void
    setPrice: (value: string) => void
    setCategory: (value: string) => void
  }
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  onClose: () => void
}

const ProductFormModal = forwardRef<HTMLDivElement, ProductFormModalProps>(
  (
    {
      isSuccess,
      isEditing,
      errorMessage,
      errors,
      inputs,
      setters,
      onSubmit,
      isOpen,
      onClose
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`fixed inset-0 z-50 items-center justify-center bg-black/50 backdrop-blur-sm p-4 ${isOpen ? 'flex' : 'hidden'
          }`}
      >
        <div className="bg-white p-6 rounded shadow-xl max-w-2xl w-full relative">
          <button
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>

          {isSuccess ? (
            <span className="text-xl font-bold text-success">
              Produto {isEditing ? 'editado' : 'criado'} com sucesso!
            </span>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">
                {isEditing ? 'Editar' : 'Criar'} Produto
              </h3>

              {errorMessage && (
                <Alert text={errorMessage} type="error" classes="mb-3" />
              )}

              <div className="form-control mb-4">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={inputs.name}
                  onChange={(e) => setters.setName(e.target.value)}
                  placeholder="Nome do produto"
                />
                <InputError messages={errors?.name} className="mt-1" />
              </div>

              <div className="form-control mb-4">
                <Label htmlFor="description">Descrição do Produto</Label>
                <Input
                  id="description"
                  value={inputs.description}
                  onChange={(e) => setters.setDescription(e.target.value)}
                  placeholder="Descrição do produto"
                />
                <InputError messages={errors?.description} className="mt-1" />
              </div>

              <div className="form-control mb-4">
                <Label htmlFor="price">Preço</Label>
                <NumericFormat
                  id="price"
                  className="input input-bordered w-full"
                  value={inputs.price}
                  onValueChange={(values) => setters.setPrice(values.value)}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  placeholder="Preço"
                />
                <InputError messages={errors?.price} className="mt-1" />
              </div>

              <div className="form-control mb-4">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={inputs.category}
                  onChange={(e) => setters.setCategory(e.target.value)}
                  placeholder="Nome da categoria"
                />
                <InputError messages={errors?.category} className="mt-1" />
              </div>

              <div className="modal-action flex justify-end gap-2">
                <Button onClick={onSubmit}>
                  {isEditing ? 'Salvar alterações' : 'Criar produto'}
                </Button>
                <form method="dialog">
                  <Button onClick={onClose} variant="secondary">Cancelar</Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
)

ProductFormModal.displayName = 'ProductFormModal'
export default ProductFormModal
