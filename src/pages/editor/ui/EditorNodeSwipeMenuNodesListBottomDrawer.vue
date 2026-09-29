<template>
  <BottomDrawerRoot
    v-model:open="open"
    :snap-points="[0.5, 1]"
    :default-snap-point="0.5"
  >
    <BottomDrawerPortal>
      <BottomDrawerOverlay />

      <BottomDrawerContent>
        <BottomDrawerContentHeader>
          <BottomDrawerTitle>Добавить новый узел</BottomDrawerTitle>
          <BottomDrawerClose />
        </BottomDrawerContentHeader>

        <BottomDrawerContentScrollableArea>
          <BottomDrawerContentItems>
            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('heading', { level: 2 })"
            >
              <BottomDrawerContentItemIcon name="tabler:h-2" />
              <p>Заголовок 2 уровня</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('heading', { level: 3 })"
            >
              <BottomDrawerContentItemIcon name="tabler:h-3" />
              <p>Заголовок 3 уровня</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('paragraph')"
            >
              <BottomDrawerContentItemIcon name="tabler:letter-case" />
              <p>Текст</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('bulletList')"
            >
              <BottomDrawerContentItemIcon name="tabler:list" />
              <p>Маркированный список</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('orderedList')"
            >
              <BottomDrawerContentItemIcon name="tabler:list-numbers" />
              <p>Нумерованный список</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('blockquote')"
            >
              <BottomDrawerContentItemIcon name="tabler:quote" />
              <p>Цитата</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              @click="() => editor.commands.insertNode('horizontalRule')"
            >
              <BottomDrawerContentItemIcon name="tabler:separator" />
              <p>Разделитель</p>
            </BottomDrawerContentItem>
          </BottomDrawerContentItems>
        </BottomDrawerContentScrollableArea>
      </BottomDrawerContent>
    </BottomDrawerPortal>
  </BottomDrawerRoot>
</template>

<script setup lang="ts">
import {
  BottomDrawerClose,
  BottomDrawerContent,
  BottomDrawerContentHeader,
  BottomDrawerContentItem,
  BottomDrawerContentItemIcon,
  BottomDrawerContentItems,
  BottomDrawerContentScrollableArea,
  BottomDrawerOverlay,
  BottomDrawerPortal,
  BottomDrawerRoot,
  BottomDrawerTitle,
} from '~/shared/ui/bottom-drawer'
import type { EditorNodeMenuProps } from './editor-node-menu.props.interface.ts'
import { getEditorNodeByCoords } from '../lib/get-editor-node-by-coords.ts'
import { getEditorNodePos } from '../lib/get-editor-node-pos.ts'

const { editor } = defineProps<EditorNodeMenuProps>()

const open = ref(false)

watch(open, (value) => {
  if (!value) {
    return
  }

  editor.commands.setNodeSelection(editorNodePos.value)
})

const editorNode = ref<Element | null>(null)
const editorNodePos = computed(() =>
  editorNode.value ? getEditorNodePos(editorNode.value, editor.view) : 0,
)
const directionX = ref(0)

const handleDragStart = ({
  direction: [dirX],
  xy: [x, y],
}: DragGestureState) => {
  editorNode.value = getEditorNodeByCoords(x, y)
  directionX.value = dirX
}

const handleDrag = ({ movement: [movX] }: DragGestureState) => {
  editor.commands.setNodeAttrs(editorNodePos.value, {
    style: `transform: translateX(${movX}px); transition: none;`,
  })
}

const handleDragEnd = ({ movement: [movX] }: DragGestureState) => {
  editor.commands.setNodeAttrs(editorNodePos.value, {
    style: undefined,
  })

  if (Math.abs(movX) < 75) {
    return
  }

  if (directionX.value === 1) {
    open.value = true
  }
}

useDragGesture({
  target: editor.view.dom,
  handlers: {
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  },
  config: {
    axis: 'x',
    bounds: { left: -75, right: 75 },
    from: [0, 0],
    rubberband: true,
  },
})
</script>
