import type { ButtonProps } from '~/shared/ui/button'

export interface TemporalDisabledButtonProps extends ButtonProps {
  duration: number
  immediate?: boolean
}
