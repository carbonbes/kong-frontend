import * as z from 'zod'
import { getPlural } from '~/shared/lib'

const words = ['символ', 'символа', 'символов', 'символа']

export default defineNuxtPlugin(() => {
  z.config({
    customError: (iss) => {
      if (iss.input === undefined) {
        return 'Обязательное поле'
      }

      if (iss.code === 'invalid_format') {
        if (iss.format === 'email') {
          return 'Неверная почта'
        }
      }

      if (iss.code === 'too_small') {
        if (iss.origin === 'string') {
          return `Минимум ${getPlural(iss.minimum, words)}`
        }
      }

      if (iss.code === 'too_big') {
        if (iss.origin === 'string') {
          return `Максимум ${getPlural(iss.maximum, words)}`
        }
      }
    },
  })
})
