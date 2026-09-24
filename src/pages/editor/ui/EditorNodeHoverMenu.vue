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
                  <DropdownMenuItemIcon as-child>
                    <Icon name="tabler:heading" />
                  </DropdownMenuItemIcon>
                  <p>Заголовок</p>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:h-1" />
                    </DropdownMenuItemIcon>
                    <p>Заголовок 1 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:h-2" />
                    </DropdownMenuItemIcon>
                    <p>Заголовок 2 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:h-3" />
                    </DropdownMenuItemIcon>
                    <p>Заголовок 3 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:h-4" />
                    </DropdownMenuItemIcon>
                    <p>Заголовок 4 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:h-5" />
                    </DropdownMenuItemIcon>
                    <p>Заголовок 5 уровня</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:h-6" />
                    </DropdownMenuItemIcon>
                    <p>Заголовок 6 уровня</p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <DropdownMenuItemIcon as-child>
                  <Icon name="tabler:letter-case" />
                </DropdownMenuItemIcon>
                <p>Текст</p>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuItemIcon as-child>
                    <Icon name="tabler:list" />
                  </DropdownMenuItemIcon>
                  <p>Список</p>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:list" />
                    </DropdownMenuItemIcon>
                    <p>Маркированный список</p>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:list-numbers" />
                    </DropdownMenuItemIcon>
                    <p>Нумерованный список</p>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <DropdownMenuItemIcon as-child>
                  <Icon name="tabler:quote" />
                </DropdownMenuItemIcon>
                <p>Цитата</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <DropdownMenuItemIcon as-child>
                  <Icon name="tabler:code" />
                </DropdownMenuItemIcon>
                <p>Код</p>
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
                <DropdownMenuItemIcon as-child>
                  <Icon name="tabler:arrow-up" />
                </DropdownMenuItemIcon>
                <p>Переместить наверх</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <DropdownMenuItemIcon as-child>
                  <Icon name="tabler:arrow-down" />
                </DropdownMenuItemIcon>
                <p>Переместить вниз</p>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuItemIcon as-child>
                    <Icon name="tabler:refresh" />
                  </DropdownMenuItemIcon>
                  <p>Поменять на</p>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <DropdownMenuItemIcon as-child>
                        <Icon name="tabler:heading" />
                      </DropdownMenuItemIcon>
                      <p>Заголовок</p>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:h-1" />
                        </DropdownMenuItemIcon>
                        <p>Заголовок 1 уровня</p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:h-2" />
                        </DropdownMenuItemIcon>
                        <p>Заголовок 2 уровня</p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:h-3" />
                        </DropdownMenuItemIcon>
                        <p>Заголовок 3 уровня</p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:h-4" />
                        </DropdownMenuItemIcon>
                        <p>Заголовок 4 уровня</p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:h-5" />
                        </DropdownMenuItemIcon>
                        <p>Заголовок 5 уровня</p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:h-6" />
                        </DropdownMenuItemIcon>
                        <p>Заголовок 6 уровня</p>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuItem>
                    <DropdownMenuItemIcon as-child>
                      <Icon name="tabler:letter-case" />
                    </DropdownMenuItemIcon>
                    <p>Текст</p>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <DropdownMenuItemIcon as-child>
                        <Icon name="tabler:heading" />
                      </DropdownMenuItemIcon>
                      <p>Список</p>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:list" />
                        </DropdownMenuItemIcon>
                        <p>Маркированный список</p>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DropdownMenuItemIcon as-child>
                          <Icon name="tabler:list-numbers" />
                        </DropdownMenuItemIcon>
                        <p>Нумерованный список</p>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem class="text-red-600">
                <DropdownMenuItemIcon as-child>
                  <Icon name="tabler:trash" />
                </DropdownMenuItemIcon>
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
import type { EditorNodeHoverMenuProps } from '~/pages/editor/ui/editor-node-hover-menu.props.interface.ts'
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

const { editor } = defineProps<EditorNodeHoverMenuProps>()

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
