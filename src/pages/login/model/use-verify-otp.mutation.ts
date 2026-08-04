import { verifyOtp } from '../api'
import { useToasts } from '~/shared/model'

export const useVerifyOtp = defineMutation(() => {
  const router = useRouter()
  const { errorToastify } = useToasts()

  const cookieOptions = {
    sameSite: 'strict',
    secure: import.meta.env.PROD,
  }

  return useMutation({
    mutation: verifyOtp,

    async onSuccess(data) {
      const { accessToken, refreshToken } = data

      useCookie('kong_access_token', cookieOptions).value = accessToken
      useCookie('kong_refresh_token', cookieOptions).value = refreshToken

      router.push({ name: 'FeedPage' })
    },

    onError(error) {
      errorToastify({
        title: 'Ошибка',
        description: error.message,
      })
    },
  })
})
