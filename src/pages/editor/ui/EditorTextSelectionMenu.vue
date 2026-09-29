<template>
  <PopoverRoot v-model:open="open">
    <PopoverPortal>
      <PopoverContent
        as-child
        :reference
        :side-offset="5"
        :collision-padding="16"
        @open-auto-focus="preventDefault"
        @focus-outside="preventDefault"
      >
        <BaseFloating class="p-1.5 flex gap-1 bg-white rounded-full">
          <EditorTextSelectionMenuItem
            :active="editor.isActive('bold')"
            @click="() => editor.chain().focus().toggleBold().run()"
          >
            <EditorTextSelectionMenuItemIcon name="tabler:bold" />
          </EditorTextSelectionMenuItem>

          <EditorTextSelectionMenuItem
            :active="editor.isActive('italic')"
            @click="() => editor.chain().focus().toggleItalic().run()"
          >
            <EditorTextSelectionMenuItemIcon name="tabler:italic" />
          </EditorTextSelectionMenuItem>

          <EditorTextSelectionMenuItem
            :active="editor.isActive('strike')"
            @click="() => editor.chain().focus().toggleStrike().run()"
          >
            <EditorTextSelectionMenuItemIcon name="tabler:strikethrough" />
          </EditorTextSelectionMenuItem>
        </BaseFloating>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot } from 'reka-ui'
import type { Editor } from '@tiptap/vue-3'
import { TextSelection } from '@tiptap/pm/state'
import EditorTextSelectionMenuItem from './EditorTextSelectionMenuItem.vue'
import EditorTextSelectionMenuItemIcon from './EditorTextSelectionMenuItemIcon.vue'
import { BaseFloating } from '~/shared/ui/base-floating'

const { editor } = defineProps<{ editor: Editor }>()

const open = ref(false)

const selection = computed(() => editor.state.selection)

const textSelection = computed(() =>
  selection.value instanceof TextSelection ? selection.value : undefined,
)

const textSelectionIsEmpty = computed(() => {
  if (!textSelection.value) return true

  const { from, to } = textSelection.value

  return from === to
})

const textSelectionRect = computed(() => {
  if (!textSelection.value) return

  const { from, to } = textSelection.value

  const start = editor.view.domAtPos(from)
  const end = editor.view.domAtPos(to)

  const range = document.createRange()
  range.setStart(start.node, start.offset)
  range.setEnd(end.node, end.offset)

  return range.getBoundingClientRect()
})

const reference = computed(() => {
  if (!textSelectionRect.value) return

  return {
    getBoundingClientRect() {
      return textSelectionRect.value
    },
  }
})

watch(reference, (value) => {
  if (textSelectionIsEmpty.value) return

  open.value = !!value
})

const preventDefault = (e: Event) => {
  e.preventDefault()
}
</script>
