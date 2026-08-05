import { useAuth } from '~/shared/model'

export default defineNuxtRouteMiddleware(async (to) => {
  if (['SigninPage', 'SignupPage'].includes(to.name as string)) {
    return
  }

  const accessToken = useCookie('kong_access_token').value

  if (!accessToken) {
    return navigateTo({ name: 'SigninPage' })
  }

  const { data, refresh } = useAuth()

  await refresh()

  if (!data.value) {
    return navigateTo({ name: 'SigninPage' })
  }
})
