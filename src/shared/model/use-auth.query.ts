import { me } from '~/shared/api'

export const useAuthQuery = defineQuery({ key: ['auth'], query: me })
