import { $fetch } from 'ofetch'
import type { VerifyOtpReturn } from '~/shared/model'
import { parseCookie, parseSetCookie, stringifyCookie } from 'cookie'

export default defineNuxtPlugin(() => {
  let refreshPromise: ReturnType<typeof $fetch.raw<VerifyOtpReturn>> | null =
    null

  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  const event = import.meta.server ? useRequestEvent() : undefined

  const cookies =
    import.meta.server && event
      ? parseCookie(event.node.req.headers.cookie ?? '')
      : {}

  const forwardCookies = (response: Response) => {
    if (!import.meta.server || !event) return

    const setCookieHeaders =
      typeof response.headers.getSetCookie === 'function'
        ? response.headers.getSetCookie()
        : Array.from<[string, string]>(response.headers.entries())
            .filter(([k]) => k.toLowerCase() === 'set-cookie')
            .map(([, v]) => v)

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

      console.log(`API ${request}`, options.headers)

      if (response.status !== 401) return
      if (response.url.includes('/auth/update')) return

      try {
        if (!refreshPromise) {
          refreshPromise = $fetch.raw<VerifyOtpReturn>('/auth/update', {
            baseURL: apiBaseUrl,
            credentials: 'include',
            method: 'POST',
            ...(import.meta.server && {
              headers: useRequestHeaders(['cookie']),
            }),
          })
        }

        const refreshed = await refreshPromise
        const cookies = refreshed.headers.getSetCookie()
        const headers = new Headers(options.headers)

        if (cookies.length) {
          if (import.meta.server) {
            headers.set(
              'cookie',
              cookies.map((cookie) => cookie.split(';')[0]!).join('; '),
            )
          }
        }

        context.response = await $fetch.raw(request, options)

        console.log('CONTEXT HEADERS', context.options.headers)
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
