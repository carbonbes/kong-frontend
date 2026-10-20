import { $fetch } from 'ofetch'
import { appendResponseHeader } from 'h3'
import { parseCookie, parseSetCookie, stringifyCookie } from 'cookie-es'

export default defineNuxtPlugin(() => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig()

  let refreshPromise: Promise<void> | null = null

  const event = import.meta.server ? useRequestEvent() : undefined

  const cookies =
    import.meta.server && event
      ? parseCookie(event.node.req.headers.cookie ?? '')
      : {}

  const forwardCookies = (response: Response) => {
    if (!import.meta.server || !event) {
      return
    }

    const setCookieHeaders = response.headers.getSetCookie()

    for (const setCookie of setCookieHeaders) {
      appendResponseHeader(event, 'Set-Cookie', setCookie)

      const { name, value } = parseSetCookie(setCookie)!

      cookies[name] = value
    }
  }

  const isRefreshRequest = (request: Request | string) => {
    const url = request instanceof Request ? request.url : request

    return url.includes('/auth/update')
  }

  const api = $fetch.create({
    baseURL: apiBaseUrl,
    credentials: 'include',

    onRequest: (context) => {
      if (import.meta.server) {
        context.options.headers.set('Cookie', stringifyCookie(cookies))
      }
    },

    onResponse: async (context) => {
      forwardCookies(context.response)

      if (
        context.response.status !== 401 ||
        isRefreshRequest(context.request)
      ) {
        return
      }

      try {
        if (!refreshPromise) {
          refreshPromise = api('/auth/update', { method: 'POST' })
        }

        await refreshPromise

        context.response = await api.raw(context.request, context.options)
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
