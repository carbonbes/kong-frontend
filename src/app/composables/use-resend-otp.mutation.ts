import { resendOtp } from '~/shared/api'

export const useResendOtp = defineMutation(() => {
  const { errorToastify, successToastify } = useToasts()

  return useMutation({
    mutation: resendOtp,

    async onSuccess() {
      successToastify({ title: 'Код отправлен', description: 'На вашу почту' })
    },

    onError(error) {
      errorToastify({
        title: 'Ошибка',
        description: error.message,
      })
    },
  })
})
