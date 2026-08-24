import { useAuth, useAuthCookies } from '~/shared/model'

export default defineNuxtRouteMiddleware(async (to) => {
  const { getCookie } = useAuthCookies()
  const { data, refresh } = useAuth()

  if (['SigninPage', 'SignupPage'].includes(to.name as string)) {
    return
  }

  const accessToken = getCookie({ type: 'accessToken' })

  if (!accessToken) {
    return navigateTo({ name: 'SigninPage' })
  }

  if (!data.value) {
    await refresh()

    if (!data.value) {
      return navigateTo({ name: 'SigninPage' })
    }
  }
})
