<template>
  <EditorContent
    ref="editorContent"
    :content="article?.content"
    class="mx-auto max-w-160 h-full [&>.tiptap]:p-4 [&>.tiptap]:sm:pl-22 [&>.tiptap]:pb-50"
    @update="handleUpdate"
  />

  <EditorNodeHoverMenu v-if="editor && !isTouch" :editor="editor" />
  <EditorNodeSwipeMenu v-if="editor && isTouch" :editor="editor" />
  <EditorTextSelectionMenu v-if="editor" :editor="editor" />
</template>

<script setup lang="ts">
import { EditorContent } from '~/entities/editor'
import type { JSONContent } from '@tiptap/vue-3'
import EditorNodeHoverMenu from './EditorNodeHoverMenu.vue'
import EditorNodeSwipeMenu from './EditorNodeSwipeMenu.vue'
import EditorTextSelectionMenu from './EditorTextSelectionMenu.vue'
import { create, findUnique, update } from '~/entities/article'
import type { Article } from '~/shared/model'

const editorContentRef = useTemplateRef<typeof EditorContent>('editorContent')

const editor = computed(() => editorContentRef.value?.editor)

const { isTouch } = useDevice()

const router = useRouter()
const route = useRoute()

const { data: article, refresh } = useQuery({
  key: () => ['editor-article', route.query.id!],
  query: () => findUnique({ id: +route.query.id! }),
  enabled: () => !!route.query.id,
})

if (route.query.id) {
  await refresh()
}

const { errorToastify, successToastify } = useToasts()

const queryCache = useQueryCache()

const { mutate: saveArticle } = useMutation({
  mutation: (content: JSONContent, { oldArticle }) =>
    !oldArticle ? create({ content }) : update({ id: oldArticle.id, content }),

  onMutate: () => {
    const oldArticle = queryCache.getQueryData<Article>([
      'editor-article',
      route.query.id!,
    ])

    return { oldArticle }
  },

  onError: () => {
    errorToastify({
      title: 'Ошибка',
      description: 'Не удалось сохранить запись',
    })
  },

  onSuccess: (article, vars, { oldArticle }) => {
    queryCache.setQueryData(['editor-article'], article)
    queryCache.cancelQueries({ key: ['editor-article'] })

    if (!oldArticle) {
      successToastify({ title: 'Успех', description: 'Запись создана' })

      router.push({
        name: route.name,
        query: { id: article.id },
        replace: true,
      })
    }
  },
})

const clearEmptyNodes = (content: JSONContent[]) =>
  content.filter((rootNode) => {
    if (['heading', 'paragraph'].includes(rootNode.type!)) {
      return !!rootNode.content?.length
    }

    if (['bulletList', 'orderedList'].includes(rootNode.type!)) {
      rootNode.content = rootNode.content?.filter(
        (listItem) =>
          !listItem.content?.some(
            (child) => child.type === 'paragraph' && !child.content?.length,
          ),
      )
    }

    if (rootNode.type === 'blockquote') {
      return !rootNode.content?.some(
        (child) => child.type === 'paragraph' && !child.content?.length,
      )
    }

    return true
  })

const handleUpdate = (data: JSONContent) => {
  const clearedData = {
    ...data,
    content: clearEmptyNodes(data.content!),
  }

  saveArticle(clearedData)
}
</script>
