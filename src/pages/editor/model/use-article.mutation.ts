import type { JSONContent } from '@tiptap/vue-3'
import { promiseTimeout } from '@vueuse/core'
import { create, update } from '~/entities/article'
import type { Article } from '~/shared/model'

export const useArticleMutation = defineMutation(() => {
  const queryCache = useQueryCache()
  const route = useRoute()
  const router = useRouter()

  return useMutation({
    mutation: async (content: JSONContent, { oldArticle }) => {
      if (!oldArticle) {
        await promiseTimeout(1000)

        return create({ content })
      } else {
        await promiseTimeout(1000)

        return update({ id: oldArticle.id, content })
      }
    },

    onMutate: () => {
      const oldArticle = queryCache.getQueryData<Article>([
        'editor-article',
        route.query.id!,
      ])

      return { oldArticle }
    },

    onSuccess: (article, vars, { oldArticle }) => {
      queryCache.setQueryData(['editor-article'], article)
      queryCache.cancelQueries({ key: ['editor-article'] })

      if (!oldArticle) {
        router.push({
          name: route.name,
          query: { id: article.id },
          replace: true,
        })
      }
    },
  })
})
