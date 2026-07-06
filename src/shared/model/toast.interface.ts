export interface Toast {
  description?: string
  duration?: number
  id: string
  title: string
  variant?: 'success' | 'danger'
}
