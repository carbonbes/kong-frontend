import { createClient } from '~/shared/api'
import type { OtpType } from '~/shared/model'

export interface ResendOtpOptions {
  email: string
  type: OtpType
}

export const resendOtp = (options: ResendOtpOptions) => {
  const client = createClient()

  return client('/auth/resend-otp', { method: 'POST', body: options })
}
