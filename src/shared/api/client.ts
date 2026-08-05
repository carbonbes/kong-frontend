import { $fetch } from 'ofetch'
import PQueue from 'p-queue'
import type { VerifyOtpReturn } from '~/shared/model'

const pQueue = new PQueue({ concurrency: 1 })

export const createClient = () => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  const client = $fetch.create({
    baseURL: apiBaseUrl,

    async onRequest({ options }) {
      const accessToken = useCookie('kong_access_token').value

      if (accessToken) {
        options.headers.set('Authorization', `Bearer ${accessToken}`)
      }
    },

    async onResponseError({ options, response, request }) {
      if (response.status !== 401) {
        return
      }

      const refreshToken = useCookie('kong_refresh_token').value

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

          useCookie('kong_access_token').value = data.accessToken
          useCookie('kong_refresh_token').value = data.refreshToken

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
