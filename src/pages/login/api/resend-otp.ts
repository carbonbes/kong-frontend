import type { OtpType } from '~/shared/model'

export interface ResendOtpOptions {
  email: string
  type: OtpType
}

export const resendOtp = (options: ResendOtpOptions) => {
  const { $api } = useNuxtApp()

  return $api('/auth/resend-otp', { method: 'POST', body: options })
}
