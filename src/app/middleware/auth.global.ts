import { useAuthQuery } from '~/shared/model'

export default defineNuxtRouteMiddleware(async (to) => {
  if (['SigninPage', 'SignupPage'].includes(to.name as string)) {
    return
  }

  const { data, refresh } = useAuthQuery()
  await refresh()

  if (!data.value) {
    return navigateTo({ name: 'SigninPage' })
  }
})
