import { useQuery } from '@pinia/colada'
import { signup } from '~/shared/api'

export const useSignup = () =>
  useQuery({ key: ['signup'], query: signup, enabled: false })
