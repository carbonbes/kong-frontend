import { $fetch } from 'ofetch'
import type { VerifyOtpReturn } from '~/shared/model'

let runningNow = false
let currentPromise = Promise.resolve() as unknown as Promise<VerifyOtpReturn>

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

      if (runningNow) {
        await currentPromise
      } else {
        const refreshToken = getCookies().refreshToken

        if (!refreshToken) {
          return
        }

        currentPromise = $fetch<VerifyOtpReturn>(`${apiBaseUrl}/auth/update`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })

        try {
          runningNow = true

          const data = await currentPromise

          setCookies({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })

          await client(request, options)
        } catch {
          return
        } finally {
          runningNow = false
        }
      }
    },
  })

  return client
}
