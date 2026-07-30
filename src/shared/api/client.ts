import { $fetch } from 'ofetch'

export const client = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  async onRequest({ options }) {
    const accessToken = useCookie('kong_access_token').value

    if (accessToken) {
      options.headers.set('Authorization', `Bearer ${accessToken}`)
    }
  },
})
