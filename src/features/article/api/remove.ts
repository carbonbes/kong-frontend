import { createClient } from '~/shared/api'

interface RemoveOptions {
  id: number
}

export const remove = ({ id }: RemoveOptions) => {
  const client = createClient()

  return client(`/articles/${id}`, {
    method: 'DELETE',
  })
}
