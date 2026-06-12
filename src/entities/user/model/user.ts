import type { UserGender } from './user-gender'
import type { UserRole } from './user-role'

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
