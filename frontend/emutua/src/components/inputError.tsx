interface InputErrorProps {
  messages?: string[] | string | null
  className?: string
}

export default function InputError({ messages, className = '' }: InputErrorProps) {
  if (!messages || (Array.isArray(messages) && messages.length === 0)) return null

  const errorList = Array.isArray(messages) ? messages : [messages]

  return (
    <div className={`text-sm text-red-600 ${className}`}>
      {errorList.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  )
}
