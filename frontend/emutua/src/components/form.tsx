import { FormHTMLAttributes } from 'react'

export function Form({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form {...props} className="space-y-6 w-full max-w-md mx-auto">
      {children}
    </form>
  )
}
