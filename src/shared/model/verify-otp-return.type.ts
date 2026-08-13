import type { EncodedJwt } from './encoded-jwt.type.ts'
import type { User } from '~/shared/model'

export interface VerifyOtpReturn {
  accessToken: EncodedJwt
  refreshToken: EncodedJwt
  user: User
}
