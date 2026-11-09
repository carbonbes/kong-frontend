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
import type { Article } from '~/shared/model'
import { ArticleHeader, useRemoveArticleMutation } from '~/entities/article'
import { EditorContent } from '~/widgets/editor'
import { ArticlePageLink } from '~/shared/ui/links'

const { article } = defineProps<{ article: Article }>()

const { mutate: removeArticle } = useRemoveArticleMutation()
</script>
