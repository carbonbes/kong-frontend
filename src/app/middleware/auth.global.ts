import { useAuthQuery } from '~/shared/model'

export default defineNuxtRouteMiddleware(async (to) => {
  if (['SigninPage', 'SignupPage'].includes(to.name as string)) {
    return
  }

  console.log('PAGE', to.path)

  const { data, refresh } = useAuthQuery()
  await refresh()

  console.log('USER', data.value)

  if (!data.value) {
    return navigateTo({ name: 'SigninPage' })
  }
})
