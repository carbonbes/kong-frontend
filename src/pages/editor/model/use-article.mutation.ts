import type { JSONContent } from '@tiptap/vue-3'
import { create, update } from '~/entities/article'
import { promiseTimeout } from '@vueuse/core'

export const useArticleMutation = defineMutation(() => {
  const queryCache = useQueryCache()
  const route = useRoute()
  const router = useRouter()

  return useMutation({
    mutation: async (content: JSONContent) => {
      await promiseTimeout(1000)

      if (!route.query.id) {
        return create({ content })
      } else {
        return update({ id: +route.query.id, content })
      }
    },

    onSuccess: (article) => {
      queryCache.setQueryData(['editor-article', route.query.id!], article)
      queryCache.cancelQueries({ key: ['editor-article', route.query.id!] })

      if (!route.query.id) {
        router.push({
          name: route.name,
          query: { id: article.id },
          replace: true,
        })
      }
    },
  })
})
