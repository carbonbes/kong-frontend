import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const signupValidationSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Обязательное поле' })
      .email('Неправильный адрес')
      .max(100, 'Запрещено использовать свыше 100 символов'),

    name: z
      .string({ required_error: 'Обязательное поле' })
      .trim()
      .min(1, 'Минимум 1 символ')
      .max(100, 'Максимум 100 символов'),

    gender: z.enum(['male', 'female', 'other'], {
      errorMap: (issue, ctx) => {
        if (issue.code === 'invalid_type' && ctx.data === undefined) {
          return { message: 'Обязательное поле' }
        }

        return { message: ctx.defaultError }
      },
    }),
  }),
)
