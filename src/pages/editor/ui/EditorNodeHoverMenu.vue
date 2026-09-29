<template>
  <PopoverRoot v-model:open="open">
    <PopoverPortal>
      <PopoverContent
        ref="popoverContent"
        align="start"
        side="left"
        :side-offset="15"
        :collision-padding="16"
        :reference="editorNode"
        class="flex items-center gap-1"
        @open-auto-focus="preventDefault"
        @interact-outside="preventDefault"
        @escape-key-down="preventDefault"
      >
        <EditorNodeHoverMenuNodesListDropdown :editor :editor-node-pos />
        <EditorNodeHoverMenuNodeActionsListDropdown :editor :editor-node-pos />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import type { EditorNodeMenuProps } from './editor-node-menu.props.interface.ts'
import { PopoverPortal, PopoverContent, PopoverRoot } from 'reka-ui'
import { getEditorNodePos } from '../lib/get-editor-node-pos.ts'
import EditorNodeHoverMenuNodesListDropdown from '~/pages/editor/ui/EditorNodeHoverMenuNodesListDropdown.vue'
import EditorNodeHoverMenuNodeActionsListDropdown from '~/pages/editor/ui/EditorNodeHoverMenuNodeActionsListDropdown.vue'

const { editor } = defineProps<EditorNodeMenuProps>()

const popoverContentRef = useTemplateRef('popoverContent')
const editorNode = ref<Element | null>(null)
const editorNodePos = computed(() =>
  editorNode.value ? getEditorNodePos(editorNode.value, editor.view) : 0,
)
const open = computed(() => !!editorNode.value)

useEventListener(
  editor.view.dom,
  ['mousemove', 'mouseleave'],
  (e: MouseEvent) => {
    if (e.type === 'mousemove') {
      const { clientY } = e

      for (const child of editor.view.dom.children) {
        const { top: childTop, bottom: childBottom } =
          child.getBoundingClientRect()

        if (clientY >= childTop && clientY <= childBottom) {
          editorNode.value = child

          return
        }
      }
    }

    if (e.type === 'mouseleave') {
      if (!popoverContentRef.value) {
        return
      }

      const popoverContent = popoverContentRef.value.$el as HTMLElement
      const relatedTarget = e.relatedTarget as HTMLElement

      if (popoverContent.contains(relatedTarget)) {
        return
      }

      editorNode.value = null
    }
  },
)

const preventDefault = (e: Event) => {
  e.preventDefault()
}
</script>
