<template>
  <BaseFloating as-child>
    <ArticlePageLink
      :article-id="article.id"
      class="p-6 flex flex-col gap-4 rounded-4xl"
    >
      <ArticleHeader :article @remove-article="removeArticle" />

      <EditorContent
        :content="article.content"
        readonly
        class="[&>.tiptap]:static! [&>.tiptap]:line-clamp-4"
      />
    </ArticlePageLink>
  </BaseFloating>
</template>

<script setup lang="ts">
import { BaseFloating } from '~/shared/ui/base-floating'
import {
  type Article,
  type FindManyArticlesReturn,
  useAuthQuery,
  useFeedInfiniteQueryOptions,
} from '~/shared/model'
import { ArticleHeader, remove } from '~/entities/article'
import { EditorContent } from '~/widgets/editor'
import { ArticlePageLink } from '~/shared/ui/links'
import { setInfiniteQueryData, type UseInfiniteQueryData } from '@pinia/colada'

const { article } = defineProps<{ article: Article }>()

const { errorToastify, successToastify } = useToasts()

const queryCache = useQueryCache()

const route = useRoute()
const { data: me } = useAuthQuery()

const feedInfiniteQueryOptions = useFeedInfiniteQueryOptions({
  order: route.params.order as 'fresh' | 'old' | undefined,
  authorId: me.value!.id,
})

const { mutate: removeArticle } = useMutation({
  mutation: (id: number) => remove({ id }),

  onMutate: (id) => {
    queryCache.cancelQueries({ key: feedInfiniteQueryOptions.key })

    const previousFeed = queryCache.getQueryData(feedInfiniteQueryOptions.key)
    if (!previousFeed) {
      return
    }

    const previousFeedArticles = previousFeed.pages.flatMap(
      (page) => page.items,
    )

    const newFeedArticles = previousFeedArticles.filter(
      (feedArticle) => feedArticle.id !== id,
    )

    const newFeed: UseInfiniteQueryData<FindManyArticlesReturn, string | null> =
      {
        ...previousFeed,
        pages: [
          {
            ...previousFeed.pages[0],
            items: newFeedArticles,
          } as FindManyArticlesReturn,
        ],
      }

    setInfiniteQueryData(queryCache, feedInfiniteQueryOptions.key, newFeed)

    successToastify({ title: 'Готово', description: 'Запись удалена' })

    return { previousFeed }
  },

  onSettled: () => {
    queryCache.invalidateQueries({ key: feedInfiniteQueryOptions.key })
  },

  onError: (_, __, { previousFeed }) => {
    if (!previousFeed) {
      return
    }

    setInfiniteQueryData(queryCache, feedInfiniteQueryOptions.key, previousFeed)

    errorToastify({
      title: 'Ошибка',
      description: 'Не удалось удалить запись',
    })
  },
})
</script>
