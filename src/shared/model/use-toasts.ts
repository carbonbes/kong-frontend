import { useState } from '#imports'
import type { Toast } from './toast.interface'

export const useToasts = () => {
  const toasts = useState<Toast[]>(() => [])

  const add = ({
    description,
    duration = 3000,
    title,
    variant = 'success',
  }: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID()

    toasts.value.push({ description, duration, id, title, variant })
  }

  const remove = (id: Toast['id']) => {
    const i = toasts.value.findIndex((toast) => toast.id === id)

    if (i !== -1) {
      toasts.value.splice(i, 1)
    }
  }

  const successToastify = (options: Omit<Toast, 'id' | 'variant'>) =>
    add({ ...options, variant: 'success' })

  const errorToastify = (options: Omit<Toast, 'id' | 'variant'>) =>
    add({ ...options, variant: 'danger' })

  return { toasts, add, remove, successToastify, errorToastify }
}
