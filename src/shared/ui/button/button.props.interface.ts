import type { PrimitiveProps } from 'reka-ui'

export interface ButtonProps extends PrimitiveProps {
  circle?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'submit' | 'reset' | 'button'
  variant?: 'danger' | 'primary' | 'secondary' | 'tertiary'
}
