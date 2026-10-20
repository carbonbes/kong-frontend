import { logout } from '~/shared/api'

export const useLogoutMutation = defineMutation(() => {
  const router = useRouter()
  const { errorToastify, successToastify } = useToasts()
  const queryCache = useQueryCache()

  const handleSuccess = async () => {
    successToastify({ title: 'Успех', description: 'Вы вышли из аккаунта' })
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
    mutation: logout,
    onSuccess: handleSuccess,
    onError: handleError,
  })
})
