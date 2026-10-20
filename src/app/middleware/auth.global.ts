import { useAuthQueryOptions } from '~/shared/model'

export default defineNuxtRouteMiddleware(async (to) => {
  if (['SigninPage', 'SignupPage'].includes(to.name as string)) {
    return
  }

  const queryCache = useQueryCache()
  const authQueryOptions = useAuthQueryOptions()

  const me = queryCache.getQueryData(authQueryOptions.key)

  if (!me) {
    const entry = queryCache.ensure(authQueryOptions)
    const { data } = await queryCache.fetch(entry)

    if (!data) {
      return navigateTo({ name: 'SigninPage' })
    }
  }
})
