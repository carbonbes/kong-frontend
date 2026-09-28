<template>
  <BottomDrawerRoot
    v-model:open="nodesListBottomDrawerIsOpen"
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

        <BottomDrawerViewport>
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
        </BottomDrawerViewport>
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
        <BottomDrawerContentHeader>
          <BottomDrawerTitle>Настройки узла</BottomDrawerTitle>
          <BottomDrawerClose />
        </BottomDrawerContentHeader>

        <BottomDrawerContentItems>
          <BottomDrawerContentItem
            v-if="editor.can().moveUp()"
            @click="() => editor.commands.moveUp()"
          >
            <BottomDrawerContentItemIcon name="tabler:arrow-up" />
            <p>Переместить наверх</p>
          </BottomDrawerContentItem>

          <BottomDrawerContentItem
            v-if="editor.can().moveDown()"
            @click="() => editor.commands.moveDown()"
          >
            <BottomDrawerContentItemIcon name="tabler:arrow-down" />
            <p>Переместить вниз</p>
          </BottomDrawerContentItem>

          <BottomDrawerRoot
            v-if="editor.can().transform()"
            :snap-points="[0.5, 1]"
            :default-snap-point="0.5"
          >
            <BottomDrawerContentSubItem>
              <BottomDrawerContentItemIcon name="tabler:refresh" />
              <p>Поменять на</p>
            </BottomDrawerContentSubItem>

            <BottomDrawerPortal>
              <BottomDrawerOverlay force-render />

              <BottomDrawerContent>
                <BottomDrawerContentHeader>
                  <BottomDrawerTitle>Поменять на</BottomDrawerTitle>
                  <BottomDrawerClose />
                </BottomDrawerContentHeader>

                <BottomDrawerContentItems>
                  <BottomDrawerContentItem
                    v-if="editor.can().transformToHeading(2)"
                    @click="() => editor.commands.transformToHeading(2)"
                  >
                    <BottomDrawerContentItemIcon name="tabler:h-2" />
                    <p>Заголовок 2 уровня</p>
                  </BottomDrawerContentItem>

                  <BottomDrawerContentItem
                    v-if="editor.can().transformToHeading(3)"
                    @click="() => editor.commands.transformToHeading(3)"
                  >
                    <BottomDrawerContentItemIcon name="tabler:h-3" />
                    <p>Заголовок 3 уровня</p>
                  </BottomDrawerContentItem>

                  <BottomDrawerContentItem
                    v-if="editor.can().transformToParagraph()"
                    @click="() => editor.commands.transformToParagraph()"
                  >
                    <BottomDrawerContentItemIcon name="tabler:letter-case" />
                    <p>Текст</p>
                  </BottomDrawerContentItem>

                  <BottomDrawerContentItem
                    v-if="editor.can().transformToList('bulletList')"
                    @click="() => editor.commands.transformToList('bulletList')"
                  >
                    <BottomDrawerContentItemIcon name="tabler:list" />
                    <p>Маркированный список</p>
                  </BottomDrawerContentItem>

                  <BottomDrawerContentItem
                    v-if="editor.can().transformToList('orderedList')"
                    @click="
                      () => editor.commands.transformToList('orderedList')
                    "
                  >
                    <BottomDrawerContentItemIcon name="tabler:list-numbers" />
                    <p>Нумерованный список</p>
                  </BottomDrawerContentItem>
                </BottomDrawerContentItems>
              </BottomDrawerContent>
            </BottomDrawerPortal>
          </BottomDrawerRoot>

          <BottomDrawerContentItem
            class="text-red-600"
            @click="() => editor.commands.deleteSelection()"
          >
            <BottomDrawerContentItemIcon name="tabler:trash" />
            <p>Удалить</p>
          </BottomDrawerContentItem>
        </BottomDrawerContentItems>
      </BottomDrawerContent>
    </BottomDrawerPortal>
  </BottomDrawerRoot>
</template>

<script setup lang="ts">
import type { EditorNodeMenuProps } from './editor-node-menu.props.interface.ts'
import {
  BottomDrawerClose,
  BottomDrawerContent,
  BottomDrawerContentHeader,
  BottomDrawerContentItem,
  BottomDrawerContentItemIcon,
  BottomDrawerContentItems,
  BottomDrawerContentSubItem,
  BottomDrawerOverlay,
  BottomDrawerPortal,
  BottomDrawerRoot,
  BottomDrawerTitle,
  BottomDrawerViewport,
} from '~/shared/ui/bottom-drawer'
import { getEditorNodeByCoords } from '../lib/get-editor-node-by-coords.ts'
import { getEditorNodePos } from '../lib/get-editor-node-pos.ts'

const { editor } = defineProps<EditorNodeMenuProps>()

const nodesListBottomDrawerIsOpen = ref(false)
const nodeActionsListBottomDrawerIsOpen = ref(false)

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

  editor.commands.setNodeSelection(editorNodePos.value)

  if (directionX.value === -1) {
    nodeActionsListBottomDrawerIsOpen.value = true
  } else if (directionX.value === 1) {
    nodesListBottomDrawerIsOpen.value = true
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
