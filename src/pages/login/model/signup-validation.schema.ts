import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const signupValidationSchema = toTypedSchema(
  z.object({
    email: z.string().email().max(100),
    name: z.string().trim().min(1).max(100),
    gender: z.enum(['male', 'female', 'other']),
  }),
)
