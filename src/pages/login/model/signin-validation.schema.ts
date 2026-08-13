import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const signinValidationSchema = toTypedSchema(
  z.object({
    email: z.string().email().max(100),
  }),
)
