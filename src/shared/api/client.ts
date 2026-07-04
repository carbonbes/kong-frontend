import { $fetch } from 'ofetch'

export const client = $fetch.create({
  baseURL: import.meta.env.NUXT_PUBLIC_BASE_API_URL,
})
