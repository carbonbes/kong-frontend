import { $fetch } from 'ofetch'
import PQueue from 'p-queue'
import { useAuthCookies, type VerifyOtpReturn } from '~/shared/model'

const pQueue = new PQueue({ concurrency: 1 })

export const createClient = () => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  const { getCookies, setCookies } = useAuthCookies()

  const client = $fetch.create({
    baseURL: apiBaseUrl,

    async onRequest({ options }) {
      const accessToken = getCookies().accessToken

      if (accessToken) {
        options.headers.set('Authorization', `Bearer ${accessToken}`)
      }
    },

    async onResponseError({ options, response, request }) {
      if (response.status !== 401) {
        return
      }

      const refreshToken = getCookies().refreshToken

      if (!refreshToken) {
        return
      }

      try {
        await pQueue.add(async () => {
          const data = await $fetch<VerifyOtpReturn>(
            `${apiBaseUrl}/auth/update`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )

          setCookies({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })

          options.headers.set('Authorization', `Bearer ${data.accessToken}`)

          return client(request, options)
        })
      } catch {
        return
      }
    },
  })

  return client
}
