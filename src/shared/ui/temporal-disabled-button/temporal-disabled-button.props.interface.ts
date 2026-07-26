import type { ButtonProps } from '~/shared/ui/button'

export interface TemporalDisabledButtonProps extends ButtonProps {
  immediate?: boolean
  timer: number
}
