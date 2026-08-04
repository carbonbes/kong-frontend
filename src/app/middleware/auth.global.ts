import { useAuth } from '~/shared/model'

export default defineNuxtRouteMiddleware(async (to) => {
  if (['SigninPage', 'SignupPage'].includes(to.name)) {
    return
  }

  const { data, refresh } = useAuth()

  await refresh()

  if (!data.value) {
    return navigateTo({ name: 'SigninPage' })
  }
})
