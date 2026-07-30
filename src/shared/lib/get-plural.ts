const pr = new Intl.PluralRules('ru-RU')

export const getPlural = (count: number, words: string[]) => {
  const rule = pr.select(count)

  switch (rule) {
    case 'one':
      return `${count} ${words[0]}`

    case 'few':
      return `${count} ${words[1]}`

    case 'many':
      return `${count} ${words[2]}`

    case 'other':
      return `${count} ${words[3]}`

    default:
      return `${count} ${words[2]}`
  }
}
