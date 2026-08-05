import type { EncodedJwt } from './encoded-jwt.type.ts'

export interface VerifyOtpReturn {
  accessToken: EncodedJwt
  refreshToken: EncodedJwt
}
