<template>
  <BaseFloating as-child class="p-6 flex flex-col gap-4 rounded-4xl">
    <NuxtLink :to="{ name: 'ArticlePage', params: { id: article.id } }">
      <div class="flex items-center">
        <p class="text-gray-400">{{ createdAt }}</p>

        <DropdownMenuRoot>
          <DropdownMenuTrigger class="ml-auto cursor-pointer">
            <Icon name="tabler:dots" class="size-6" />
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent>
              <DropdownMenuItem as-child>
                <NuxtLink
                  :to="{ name: 'EditorPage', query: { id: article.id } }"
                >
                  <DropdownMenuItemIcon name="tabler:pencil" />
                  <p>Редактировать</p>
                </NuxtLink>
              </DropdownMenuItem>

              <DropdownMenuItem class="text-red-600" @click="removeArticle">
                <DropdownMenuItemIcon name="tabler:trash" />
                <p>Удалить</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </div>

      <EditorContent :content="article.content" readonly />
    </NuxtLink>
  </BaseFloating>
</template>

<script setup lang="ts">
import { BaseFloating } from '~/shared/ui/base-floating'
import type { Article } from '~/shared/model'
import { EditorContent } from '~/features/editor'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown'
import { remove } from '~/features/article'

const { article } = defineProps<{ article: Article }>()

const createdAt = useDateFormat(article.createdAt, 'DD.MM.YY в HH:mm')

const { errorToastify, successToastify } = useToasts()

const queryCache = useQueryCache()

const { mutate: removeArticle } = useMutation({
  mutation: () => remove({ id: article.id }),

  onMutate: () => {
    const oldArticles = queryCache.getQueryData<Article[]>(['feed']) || []
    const newArticles = oldArticles.filter(
      (newArticle) => newArticle.id !== article.id,
    )
    const removedArticle = article

    queryCache.setQueryData(['feed'], newArticles)
    queryCache.cancelQueries({ key: ['feed'] })

    return { oldArticles, newArticles, removedArticle }
  },

  onSettled: () => {
    queryCache.invalidateQueries({ key: ['feed'] })
  },

  onError: (error, vars, { oldArticles, newArticles }) => {
    if (newArticles === queryCache.getQueryData(['feed'])) {
      queryCache.setQueryData(['feed'], oldArticles)
    }

    errorToastify({
      title: 'Ошибка',
      description: 'Не удалось удалить запись',
    })
  },

  onSuccess: (article, vars, { removedArticle }) => {
    const articles = queryCache.getQueryData<Article[]>(['feed']) || []

    const articleIndex = articles.findIndex((t) => t.id === removedArticle.id)

    if (articleIndex >= 0) {
      const copy = articles.slice()
      copy.splice(articleIndex, 1, removedArticle)
      queryCache.setQueryData(['feed'], copy)
    }

    successToastify({ title: 'Успех', description: 'Запись удалена' })
  },
})
</script>
