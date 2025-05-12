interface AlertProps {
  text: string
  type?: 'success' | 'error' | 'warning' | 'info'
  classes?: string
}

export default function Alert({ text, type = 'info', classes = '' }: AlertProps) {
  const colorMap = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  }

  return (
    <div
      className={`border-l-4 p-4 rounded shadow-md ${colorMap[type]} ${classes}`}
      role="alert"
    >
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}
