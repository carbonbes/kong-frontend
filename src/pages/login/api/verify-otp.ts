import type { OtpType, VerifyOtpReturn } from '~/shared/model'

export interface VerifyOtpOptions {
  code: string
  type: OtpType
  email: string
}

export const verifyOtp = (
  options: VerifyOtpOptions,
): Promise<VerifyOtpReturn> => {
  const { $api } = useNuxtApp()

  return $api('/auth/verify-otp', { method: 'POST', body: options })
}
