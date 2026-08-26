import { me } from '~/shared/api'

export const useAuth = defineQuery({ key: ['auth'], query: me })
