<template>
  <BottomDrawerRoot
    v-model:open="open"
    :snap-points="[0.5, 1]"
    :default-snap-point="0.5"
  >
    <BottomDrawerPortal>
      <BottomDrawerOverlay />

      <BottomDrawerContent data-testid="node-actions-list-bottom-drawer">
        <BottomDrawerContentHeader>
          <BottomDrawerTitle
            data-testid="node-actions-list-bottom-drawer/title"
          >
            Настройки узла
          </BottomDrawerTitle>

          <BottomDrawerClose
            data-testid="node-actions-list-bottom-drawer/close-button"
          />
        </BottomDrawerContentHeader>

        <BottomDrawerContentScrollableArea
          data-testid="node-actions-list-bottom-drawer/scrollable-area"
        >
          <BottomDrawerContentItems>
            <BottomDrawerContentItem
              v-if="editor.can().moveUp()"
              data-testid="node-actions-list-bottom-drawer/move-up-button"
              @click="() => editor.commands.moveUp()"
            >
              <BottomDrawerContentItemIcon name="tabler:arrow-up" />
              <p>Переместить наверх</p>
            </BottomDrawerContentItem>

            <BottomDrawerContentItem
              v-if="editor.can().moveDown()"
              data-testid="node-actions-list-bottom-drawer/move-down-button"
              @click="() => editor.commands.moveDown()"
            >
              <BottomDrawerContentItemIcon name="tabler:arrow-down" />
              <p>Переместить вниз</p>
            </BottomDrawerContentItem>

            <BottomDrawerRoot :snap-points="[0.5, 1]" :default-snap-point="0.5">
              <BottomDrawerContentSubItem
                v-if="editor.can().transform()"
                data-testid="transform-actions-list-bottom-drawer/trigger"
              >
                <BottomDrawerContentItemIcon name="tabler:refresh" />
                <p>Поменять на</p>
              </BottomDrawerContentSubItem>

              <BottomDrawerPortal>
                <BottomDrawerOverlay force-render />

                <BottomDrawerContent
                  data-testid="transform-actions-list-bottom-drawer"
                >
                  <BottomDrawerContentHeader>
                    <BottomDrawerTitle
                      data-testid="transform-actions-list-bottom-drawer/title"
                    >
                      Поменять на
                    </BottomDrawerTitle>

                    <BottomDrawerClose
                      data-testid="transform-actions-list-bottom-drawer/close-button"
                    />
                  </BottomDrawerContentHeader>

                  <BottomDrawerContentScrollableArea
                    data-testid="transform-actions-list-bottom-drawer/scrollable-area"
                  >
                    <BottomDrawerContentItems>
                      <BottomDrawerContentItem
                        v-if="editor.can().transformToHeading(2)"
                        data-testid="transform-actions-list-bottom-drawer/transform-to-heading-2-button"
                        @click="
                          () => {
                            editor.commands.transformToHeading(2)
                            open = false
                          }
                        "
                      >
                        <BottomDrawerContentItemIcon name="tabler:h-2" />
                        <p>Заголовок 2 уровня</p>
                      </BottomDrawerContentItem>

                      <BottomDrawerContentItem
                        v-if="editor.can().transformToHeading(3)"
                        data-testid="transform-actions-list-bottom-drawer/transform-to-heading-3-button"
                        @click="
                          () => {
                            editor.commands.transformToHeading(3)
                            open = false
                          }
                        "
                      >
                        <BottomDrawerContentItemIcon name="tabler:h-3" />
                        <p>Заголовок 3 уровня</p>
                      </BottomDrawerContentItem>

                      <BottomDrawerContentItem
                        v-if="editor.can().transformToParagraph()"
                        data-testid="transform-actions-list-bottom-drawer/transform-to-paragraph-button"
                        @click="
                          () => {
                            editor.commands.transformToParagraph()
                            open = false
                          }
                        "
                      >
                        <BottomDrawerContentItemIcon
                          name="tabler:letter-case"
                        />
                        <p>Текст</p>
                      </BottomDrawerContentItem>

                      <BottomDrawerContentItem
                        v-if="editor.can().transformToList('bulletList')"
                        data-testid="transform-actions-list-bottom-drawer/transform-to-bullet-list-button"
                        @click="
                          () => {
                            editor.commands.transformToList('bulletList')
                            open = false
                          }
                        "
                      >
                        <BottomDrawerContentItemIcon name="tabler:list" />
                        <p>Маркированный список</p>
                      </BottomDrawerContentItem>

                      <BottomDrawerContentItem
                        v-if="editor.can().transformToList('orderedList')"
                        data-testid="transform-actions-list-bottom-drawer/transform-to-ordered-list-button"
                        @click="
                          () => {
                            editor.commands.transformToList('orderedList')
                            open = false
                          }
                        "
                      >
                        <BottomDrawerContentItemIcon
                          name="tabler:list-numbers"
                        />
                        <p>Нумерованный список</p>
                      </BottomDrawerContentItem>
                    </BottomDrawerContentItems>
                  </BottomDrawerContentScrollableArea>
                </BottomDrawerContent>
              </BottomDrawerPortal>
            </BottomDrawerRoot>

            <BottomDrawerContentItem
              class="text-red-600"
              data-testid="transform-actions-list-bottom-drawer/remove-button"
              @click="() => editor.commands.deleteSelection()"
            >
              <BottomDrawerContentItemIcon name="tabler:trash" />
              <p>Удалить</p>
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
  BottomDrawerContentSubItem,
  BottomDrawerOverlay,
  BottomDrawerPortal,
  BottomDrawerRoot,
  BottomDrawerTitle,
} from '~/shared/ui/bottom-drawer'
import type { EditorNodeMenuProps } from './editor-node-menu.props.interface.ts'
import { getEditorNodeByCoords } from '../lib/get-editor-node-by-coords.ts'
import { getEditorNodePos } from '../lib/get-editor-node-pos.ts'
import { type DragGestureState, useDragGesture } from '~/shared/model'

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

  if (directionX.value === -1) {
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
    pointer: { keys: false },
    rubberband: true,
  },
})
</script>
