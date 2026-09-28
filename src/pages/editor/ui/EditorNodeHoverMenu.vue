<template>
  <PopoverRoot v-model:open="open">
    <PopoverPortal>
      <PopoverContent
        ref="popoverContent"
        align="start"
        side="left"
        :side-offset="15"
        :collision-padding="16"
        :reference
        class="flex items-center gap-1"
        @open-auto-focus="preventDefault"
        @interact-outside="preventDefault"
        @escape-key-down="preventDefault"
      >
        <DropdownMenuRoot>
          <DropdownMenuTrigger as-child>
            <EditorNodeHoverMenuButton>
              <Icon name="tabler:plus" />
            </EditorNodeHoverMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent :side-offset="5" :collision-padding="16">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuItemIcon name="tabler:heading" />
                  <p>Заголовок</p>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:h-2" />
                    <p>Заголовок 2 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:h-3" />
                    <p>Заголовок 3 уровня</p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <DropdownMenuItemIcon name="tabler:letter-case" />
                <p>Текст</p>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuItemIcon name="tabler:list" />
                  <p>Список</p>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:list" />
                    <p>Маркированный список</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:list-numbers" />
                    <p>Нумерованный список</p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <DropdownMenuItemIcon name="tabler:quote" />
                <p>Цитата</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <DropdownMenuItemIcon name="tabler:separator" />
                <p>Разделитель</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>

        <DropdownMenuRoot>
          <DropdownMenuTrigger as-child>
            <EditorNodeHoverMenuButton>
              <Icon name="tabler:grip-vertical" />
            </EditorNodeHoverMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent :side-offset="5" :collision-padding="16">
              <DropdownMenuItem>
                <DropdownMenuItemIcon name="tabler:arrow-up" />
                <p>Переместить наверх</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <DropdownMenuItemIcon name="tabler:arrow-down" />
                <p>Переместить вниз</p>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuItemIcon name="tabler:refresh" />
                  <p>Поменять на</p>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:h-2" />
                    <p>Заголовок 2 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:h-3" />
                    <p>Заголовок 3 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:letter-case" />
                    <p>Текст</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:list" />
                    <p>Маркированный список</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon name="tabler:list-numbers" />
                    <p>Нумерованный список</p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem class="text-red-600">
                <DropdownMenuItemIcon name="tabler:trash" />
                <p>Удалить</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script setup lang="ts">
import type { EditorNodeMenuProps } from '~/pages/editor/ui/editor-node-menu.props.interface.ts'
import { PopoverPortal, PopoverContent, PopoverRoot } from 'reka-ui'
import EditorNodeHoverMenuButton from './EditorNodeHoverMenuButton.vue'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown'

const { editor } = defineProps<EditorNodeMenuProps>()

const popoverContentRef = useTemplateRef('popoverContent')
const reference = ref<Element | null>(null)
const open = computed(() => !!reference.value)

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
          reference.value = child

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

      reference.value = null
    }
  },
)

const preventDefault = (e: Event) => {
  e.preventDefault()
}
</script>
