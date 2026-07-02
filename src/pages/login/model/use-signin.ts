import { useQuery } from '@pinia/colada'
import { signin } from '~/shared/api'

export const useSignin = () =>
  useQuery({ key: ['signin'], query: signin, enabled: false })
