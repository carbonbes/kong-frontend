export default defineNuxtRouteMiddleware(async (to) => {
  if (['SigninPage', 'SignupPage'].includes(to.name as string)) {
    return
  }

  const { getCookie } = useAuthCookies()

  const accessToken = getCookie({ type: 'accessToken' })

  if (!accessToken) {
    return navigateTo({ name: 'SigninPage' })
  }

  const { data, refresh } = useAuth()

  if (!data.value) {
    await refresh()

    if (!data.value) {
      return navigateTo({ name: 'SigninPage' })
    }
  }
})
