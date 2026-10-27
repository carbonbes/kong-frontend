<template>
  <div class="py-4 mx-auto max-w-160 h-full flex flex-col gap-8">
    <EditorContent
      ref="editorContent"
      :content="article?.content"
      class="[&>.tiptap]:p-4 [&>.tiptap]:sm:pl-22 [&>.tiptap]:pb-50"
      @update="handleUpdate"
    />

    <EditorPageFooter />
  </div>

  <EditorNodeHoverMenu v-if="editor && !isTouch" :editor />
  <EditorNodeSwipeMenu v-if="editor && isTouch" :editor />
  <EditorTextSelectionMenu v-if="editor" :editor />
</template>

<script setup lang="ts">
import { EditorContent } from '~/widgets/editor'
import EditorNodeHoverMenu from './EditorNodeHoverMenu.vue'
import EditorNodeSwipeMenu from './EditorNodeSwipeMenu.vue'
import EditorTextSelectionMenu from './EditorTextSelectionMenu.vue'
import { findUnique } from '~/entities/article'
import { clearEmptyNodes } from '../lib/clear-empty-nodes.ts'
import { useArticleMutation } from '../model/use-article.mutation.ts'
import EditorPageFooter from './EditorPageFooter.vue'
import { useDevice } from '~/shared/model'

const editorContentRef = useTemplateRef<typeof EditorContent>('editorContent')

const editor = computed(() => editorContentRef.value?.editor)

const { isTouch } = useDevice()

const route = useRoute()

const { data: article, refresh } = useQuery({
  key: () => ['editor-article', route.query.id!],
  query: () => findUnique({ id: +route.query.id! }),
  enabled: () => !!route.query.id,
})

if (route.query.id) {
  await refresh()
}

const { mutate: saveArticle } = useArticleMutation()

const handleUpdate = useDebounceFn(() => {
  const data = editor.value.getJSON()

  const clearedData = {
    ...data,
    content: clearEmptyNodes(data.content!),
  }

  saveArticle(clearedData)
}, 500)
</script>
