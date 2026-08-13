import { verifyOtp } from '../api'
import { useAuthCookies, useToasts, type VerifyOtpReturn } from '~/shared/model'

export const useVerifyOtp = defineMutation(() => {
  const { setCookies } = useAuthCookies()
  const router = useRouter()
  const { errorToastify } = useToasts()
  const queryCache = useQueryCache()

  const handleSuccess = async ({
    accessToken,
    refreshToken,
    user,
  }: VerifyOtpReturn) => {
    setCookies({ accessToken, refreshToken })
    queryCache.setQueryData(['auth'], user)

    router.push({ name: 'FeedPage' })
  }

  const handleError = (error: Error) => {
    errorToastify({
      title: 'Ошибка',
      description: error.message,
    })
  }

  return useMutation({
    mutation: verifyOtp,
    onSuccess: handleSuccess,
    onError: handleError,
  })
})
