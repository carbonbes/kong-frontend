<template>
  <BottomDrawerRoot
    v-model:open="nodesListBottomDrawerIsOpen"
    :snap-points="[0.5, 1]"
    :default-snap-point="0.5"
  >
    <BottomDrawerPortal>
      <BottomDrawerOverlay />

      <BottomDrawerContent>
        <BottomDrawerTitle>СПИСОК УЗЛОВ</BottomDrawerTitle>
      </BottomDrawerContent>
    </BottomDrawerPortal>
  </BottomDrawerRoot>

  <BottomDrawerRoot
    v-model:open="nodeActionsListBottomDrawerIsOpen"
    :snap-points="[0.5, 1]"
    :default-snap-point="0.5"
  >
    <BottomDrawerPortal>
      <BottomDrawerOverlay />

      <BottomDrawerContent>
        <BottomDrawerTitle>СПИСОК ДЕЙСТВИЙ НАД УЗЛОМ</BottomDrawerTitle>
      </BottomDrawerContent>
    </BottomDrawerPortal>
  </BottomDrawerRoot>
</template>

<script setup lang="ts">
import type { EditorNodeSwipeMenuProps } from './editor-node-swipe-menu.props.interface.ts'
import {
  BottomDrawerContent,
  BottomDrawerOverlay,
  BottomDrawerPortal,
  BottomDrawerRoot,
  BottomDrawerTitle,
} from '~/shared/ui/bottom-drawer'
import { DragGesture } from '@use-gesture/vanilla'
import { getEditorNodeByCoords } from '../api/get-editor-node-by-coords.ts'
import { getEditorNodePos } from '../api/get-editor-node-pos.ts'

const { editor } = defineProps<EditorNodeSwipeMenuProps>()

const nodesListBottomDrawerIsOpen = ref(false)
const nodeActionsListBottomDrawerIsOpen = ref(false)

const gesture = ref<DragGesture | null>(null)

const initGesture = () => {
  if (gesture.value) {
    return
  }

  gesture.value = new DragGesture(
    editor.view.dom,
    ({ first, last, direction: [dirX], movement: [movX], xy: [x, y] }) => {
      if (first) {
        const editorNode = getEditorNodeByCoords(x, y)
        if (!editorNode) {
          return
        }

        const editorNodePos = getEditorNodePos(editorNode, editor.view)

        editor.commands.setNodeSelection(editorNodePos)
      }

      if (last) {
        nodesListBottomDrawerIsOpen.value = true
      }

      editor.commands.updateAttributes('style', {
        transform: `translateX: ${movX}px`,
      })
    },
    {
      axis: 'x',
      bounds: { left: -75, right: 75 },
      from: [0, 0],
      threshold: 75,
    },
  )
}

const destroyGesture = () => {
  if (!gesture.value) {
    return
  }

  gesture.value.destroy()
  gesture.value = null
}

onMounted(initGesture)
onBeforeUnmount(destroyGesture)
</script>
