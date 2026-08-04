import { $fetch } from 'ofetch'
import PQueue from 'p-queue'

const baseURL = import.meta.env.VITE_API_BASE_URL
const queue = new PQueue({ concurrency: 1 })
let isRefreshing = false

export const client = $fetch.create({
  baseURL,

  async onRequest({ options }) {
    const accessToken = useCookie('kong_access_token').value

    if (accessToken) {
      options.headers.set('Authorization', `Bearer ${accessToken}`)
    }
  },

  async onResponseError({ response, request }) {
    if (response.status !== 401) {
      return
    }

    const refreshToken = useCookie('kong_refresh_token').value

    if (!refreshToken) {
      return
    }

    if (!isRefreshing) {
      isRefreshing = true

      await queue.add(async () => {
        try {
          const data = await $fetch(`${baseURL}/auth/update`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          })
        } catch {}
      })
    }

    await queue.onIdle()
  },
})
