<template>
  <div class="flex items-center">
    <p class="text-gray-400" data-testid="article-header/created-at">
      {{ createdAt }}
    </p>

    <DropdownMenuRoot>
      <DropdownMenuTrigger
        class="ml-auto cursor-pointer"
        data-testid="article-header/dropdown-menu/trigger"
      >
        <Icon name="tabler:dots" class="size-6" />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent data-testid="article-header/dropdown-menu/content">
          <DropdownMenuItem
            as-child
            data-testid="article-header/dropdown-menu/content/edit-button"
          >
            <NuxtLink :to="{ name: 'EditorPage', query: { id: article.id } }">
              <DropdownMenuItemIcon name="tabler:pencil" />
              <p>Редактировать</p>
            </NuxtLink>
          </DropdownMenuItem>

          <DropdownMenuItem
            class="text-red-600"
            data-testid="article-header/dropdown-menu/content/remove-button"
            @click="removeArticle"
          >
            <DropdownMenuItemIcon name="tabler:trash" />
            <p>Удалить</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
</template>

<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown'
import type { Article } from '~/shared/model'
import { remove } from '~/entities/article'

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
