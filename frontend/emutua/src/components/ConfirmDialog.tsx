import { useEffect } from 'react'

interface ConfirmDialogProps {
  open: boolean
  text: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, text, onConfirm, onCancel }: ConfirmDialogProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <p className="text-gray-800 mb-4">{text}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
