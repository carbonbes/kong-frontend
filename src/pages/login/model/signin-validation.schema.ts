import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const signinValidationSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Обязательное поле' })
      .email('Неправильный адрес')
      .max(100, 'Запрещено использовать свыше 100 символов'),
  }),
)
