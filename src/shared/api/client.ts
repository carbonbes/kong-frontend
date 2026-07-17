import { $fetch } from 'ofetch'

export const client = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
