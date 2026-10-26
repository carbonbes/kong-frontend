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
            <EditorPageLink :article-id="article.id">
              <DropdownMenuItemIcon name="tabler:pencil" />
              <p>Редактировать</p>
            </EditorPageLink>
          </DropdownMenuItem>

          <DropdownMenuItem
            class="text-red-600"
            data-testid="article-header/dropdown-menu/content/remove-button"
            @click="emits('removeArticle', article.id)"
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
import { EditorPageLink } from '~/shared/ui/links'

const { article } = defineProps<{ article: Article }>()

const emits = defineEmits<{ removeArticle: [number] }>()

const createdAt = useDateFormat(article.createdAt, 'DD.MM.YY в HH:mm')
</script>
