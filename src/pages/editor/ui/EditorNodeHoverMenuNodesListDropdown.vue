<template>
  <DropdownMenuRoot v-model:open="open">
    <DropdownMenuTrigger as-child>
      <EditorNodeHoverMenuButton data-testid="nodes-list-dropdown/trigger">
        <Icon name="tabler:plus" />
      </EditorNodeHoverMenuButton>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent :side-offset="5" data-testid="nodes-list-dropdown">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            data-testid="heading-nodes-list-dropdown/trigger"
          >
            <DropdownMenuItemIcon name="tabler:heading" />
            <p>Заголовок</p>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent data-testid="heading-nodes-list-dropdown">
              <DropdownMenuItem
                data-testid="heading-nodes-list-dropdown/insert-heading-2-button"
                @click="
                  () => editor.commands.insertNode('heading', { level: 2 })
                "
              >
                <DropdownMenuItemIcon name="tabler:h-2" />
                <p>Заголовок 2 уровня</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                data-testid="heading-nodes-list-dropdown/insert-heading-3-button"
                @click="
                  () => editor.commands.insertNode('heading', { level: 3 })
                "
              >
                <DropdownMenuItemIcon name="tabler:h-3" />
                <p>Заголовок 3 уровня</p>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          data-testid="nodes-list-dropdown/insert-paragraph-button"
          @click="() => editor.commands.insertNode('paragraph')"
        >
          <DropdownMenuItemIcon name="tabler:letter-case" />
          <p>Текст</p>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            data-testid="list-nodes-list-dropdown/trigger"
          >
            <DropdownMenuItemIcon name="tabler:list" />
            <p>Список</p>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent data-testid="list-nodes-list-dropdown">
              <DropdownMenuItem
                data-testid="list-nodes-list-dropdown/insert-bullet-list-button"
                @click="() => editor.commands.insertNode('bulletList')"
              >
                <DropdownMenuItemIcon name="tabler:list" />
                <p>Маркированный список</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                data-testid="list-nodes-list-dropdown/insert-ordered-list-button"
                @click="() => editor.commands.insertNode('orderedList')"
              >
                <DropdownMenuItemIcon name="tabler:list-numbers" />
                <p>Нумерованный список</p>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          data-testid="nodes-list-dropdown/insert-blockquote-button"
          @click="() => editor.commands.insertNode('blockquote')"
        >
          <DropdownMenuItemIcon name="tabler:quote" />
          <p>Цитата</p>
        </DropdownMenuItem>

        <DropdownMenuItem
          data-testid="nodes-list-dropdown/insert-horizontal-rule-button"
          @click="() => editor.commands.insertNode('horizontalRule')"
        >
          <DropdownMenuItemIcon name="tabler:separator" />
          <p>Разделитель</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
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
import EditorNodeHoverMenuButton from './EditorNodeHoverMenuButton.vue'
import type { EditorNodeMenuProps } from './editor-node-menu.props.interface.ts'

const { editor, editorNodePos } = defineProps<
  EditorNodeMenuProps & { editorNodePos: number }
>()

const open = ref(false)

watch(open, (value) => {
  if (!value) {
    return
  }

  editor.commands.setNodeSelection(editorNodePos)
})
</script>
