import type { UserGenderEnum } from './user-gender.enum'
import type { UserRoleEnum } from './user-role.enum'

export interface User {
  id: number
  email: string
  name: string
  gender: UserGenderEnum
  role: UserRoleEnum
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
