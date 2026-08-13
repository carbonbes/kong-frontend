interface GetPluralOptions {
  count: number
  words: string[]
}

const pr = new Intl.PluralRules('ru-RU')

export const getPlural = ({
  count,
  words: [one, few, many, other],
}: GetPluralOptions) => {
  const rule = pr.select(Number(count))

  switch (rule) {
    case 'one':
      return `${count} ${one}`

    case 'few':
      return `${count} ${few}`

    case 'many':
      return `${count} ${many}`

    case 'other':
      return `${count} ${other}`

    default:
      return `${count} ${many}`
  }
}
