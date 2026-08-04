import { signin } from '../api'
import { useToasts } from '~/shared/model'

export const useSignin = () => {
  const step = ref<0 | 1>(0)

  const { errorToastify } = useToasts()

  const mutation = useMutation({
    mutation: signin,

    onSuccess() {
      step.value = 1
    },

    onError(error) {
      errorToastify({
        title: 'Ошибка',
        description: error.message,
      })
    },
  })

  return { step, ...mutation }
}
