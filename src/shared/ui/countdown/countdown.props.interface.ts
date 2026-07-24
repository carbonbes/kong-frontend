import type { PrimitiveProps } from 'reka-ui'

export interface CountdownProps extends PrimitiveProps {
  format?: string
  seconds: number | string
}
