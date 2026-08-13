import * as z from 'zod'
import { getPlural } from '~/shared/lib'

const words = ['символ', 'символа', 'символов', 'символа']

export default defineNuxtPlugin(() => {
  z.setErrorMap((issue, ctx) => {
    if (
      issue.code === z.ZodIssueCode.invalid_type &&
      issue.received === 'undefined'
    ) {
      return { message: 'Обязательное поле' }
    }

    if (
      issue.code === z.ZodIssueCode.invalid_string &&
      issue.validation === 'email'
    ) {
      return { message: 'Неверная почта' }
    }

    if (issue.code === z.ZodIssueCode.too_small && issue.type === 'string') {
      const min = Number(issue.minimum)

      return { message: `Минимум ${getPlural({ count: min, words })}` }
    }

    if (issue.code === z.ZodIssueCode.too_big && issue.type === 'string') {
      const max = Number(issue.maximum)

      return { message: `Максимум ${getPlural({ count: max, words })}` }
    }

    return { message: ctx.defaultError }
  })
})
