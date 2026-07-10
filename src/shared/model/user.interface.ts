import type { UserGender } from './user-gender.enum'
import type { UserRole } from './user-role.enum'

export interface User {
  id: number
  email: string
  name: string
  gender: UserGender
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
