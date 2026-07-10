import type { ToastRootProps as TRP } from 'reka-ui'
import type { Toast } from '~/shared/model'

export interface ToastRootProps extends TRP, Pick<Toast, 'variant'> {}
