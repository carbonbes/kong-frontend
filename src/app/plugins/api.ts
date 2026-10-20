import { $fetch } from 'ofetch'
import type { VerifyOtpReturn } from '~/shared/model'
import { parseCookie, parseSetCookie, stringifyCookie } from 'cookie'

export default defineNuxtPlugin(() => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  const event = import.meta.server ? useRequestEvent() : undefined

  const cookies =
    import.meta.server && event
      ? parseCookie(event.node.req.headers.cookie ?? '')
      : {}

  let refreshPromise: ReturnType<typeof $fetch.raw<VerifyOtpReturn>> | null =
    null

  const forwardCookies = (response: Response) => {
    if (!import.meta.server || !event) return

    const setCookieHeaders = response.headers.getSetCookie()

    for (const setCookie of setCookieHeaders) {
      appendResponseHeader(event, 'Set-Cookie', setCookie)

      const { name, value } = parseSetCookie(setCookie)
      cookies[name] = value
    }
  }

  const api = $fetch.create({
    baseURL: apiBaseUrl,
    credentials: 'include',

    onRequest: ({ options }) => {
      if (import.meta.server) {
        options.headers.set('Cookie', stringifyCookie(cookies))
      }
    },

    onResponse: async (context) => {
      forwardCookies(context.response)

      const { response, options, request } = context

      if (response.status !== 401 || response.url.includes('/auth/update')) {
        return
      }

      try {
        if (!refreshPromise) {
          refreshPromise = api.raw<VerifyOtpReturn>('/auth/update', {
            method: 'POST',
          })
        }

        await refreshPromise

        context.response = await api.raw(request, options)
      } catch {
        return
      } finally {
        refreshPromise = null
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
