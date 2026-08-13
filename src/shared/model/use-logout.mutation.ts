import { logout } from '../api'
import { useAuthCookies, useToasts } from '~/shared/model'

export const useLogout = defineMutation(() => {
  const { getCookie, clearCookies } = useAuthCookies()
  const router = useRouter()
  const { errorToastify, successToastify } = useToasts()
  const queryCache = useQueryCache()

  const refreshToken = getCookie({ type: 'refreshToken' })

  const handleSuccess = async () => {
    successToastify({ title: 'Успех', description: 'Вы вышли из аккаунта' })
    clearCookies()
    queryCache.setQueryData(['auth'], undefined)
    router.push({ name: 'SigninPage' })
  }

  const handleError = (error: Error) => {
    errorToastify({
      title: 'Ошибка',
      description: error.message,
    })
  }

  return useMutation({
    mutation: () => logout({ refreshToken }),
    onSuccess: handleSuccess,
    onError: handleError,
  })
})
