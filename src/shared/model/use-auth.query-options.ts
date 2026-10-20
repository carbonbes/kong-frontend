import { me } from '~/shared/api'

export const useAuthQueryOptions = defineQueryOptions(() => ({
  key: ['auth'],
  query: me,
}))
