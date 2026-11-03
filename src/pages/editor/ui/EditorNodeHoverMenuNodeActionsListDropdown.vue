<template>
  <DropdownMenuRoot v-model:open="open">
    <DropdownMenuTrigger as-child>
      <EditorNodeHoverMenuButton
        data-testid="node-actions-list-dropdown/trigger"
      >
        <Icon name="tabler:grip-vertical" />
      </EditorNodeHoverMenuButton>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :side-offset="5"
        data-testid="node-actions-list-dropdown"
      >
        <DropdownMenuItem
          v-if="editor.can().moveUp()"
          data-testid="node-actions-list-dropdown/move-up-button"
          @click="() => editor.commands.moveUp()"
        >
          <DropdownMenuItemIcon name="tabler:arrow-up" />
          <p>Переместить наверх</p>
        </DropdownMenuItem>

        <DropdownMenuItem
          v-if="editor.can().moveDown()"
          data-testid="node-actions-list-dropdown/move-down-button"
          @click="() => editor.commands.moveDown()"
        >
          <DropdownMenuItemIcon name="tabler:arrow-down" />
          <p>Переместить вниз</p>
        </DropdownMenuItem>

        <DropdownMenuSub v-if="editor.can().transform()">
          <DropdownMenuSubTrigger
            data-testid="transform-actions-list-dropdown/trigger"
          >
            <DropdownMenuItemIcon name="tabler:refresh" />
            <p>Поменять на</p>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent
              data-testid="transform-actions-list-dropdown"
            >
              <DropdownMenuItem
                v-if="editor.can().transformToHeading(2)"
                data-testid="transform-actions-list-dropdown/transform-to-heading-2-button"
                @click="() => editor.commands.transformToHeading(2)"
              >
                <DropdownMenuItemIcon name="tabler:h-2" />
                <p>Заголовок 2 уровня</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToHeading(3)"
                data-testid="transform-actions-list-dropdown/transform-to-heading-3-button"
                @click="() => editor.commands.transformToHeading(3)"
              >
                <DropdownMenuItemIcon name="tabler:h-3" />
                <p>Заголовок 3 уровня</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToParagraph()"
                data-testid="transform-actions-list-dropdown/transform-to-paragraph-button"
                @click="() => editor.commands.transformToParagraph()"
              >
                <DropdownMenuItemIcon name="tabler:letter-case" />
                <p>Текст</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToList('bulletList')"
                data-testid="transform-actions-list-dropdown/transform-to-bullet-list-button"
                @click="() => editor.commands.transformToList('bulletList')"
              >
                <DropdownMenuItemIcon name="tabler:list" />
                <p>Маркированный список</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToList('orderedList')"
                data-testid="transform-actions-list-dropdown/transform-to-ordered-list-button"
                @click="() => editor.commands.transformToList('orderedList')"
              >
                <DropdownMenuItemIcon name="tabler:list-numbers" />
                <p>Нумерованный список</p>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          class="text-red-600"
          data-testid="node-actions-list-dropdown/remove-button"
          @click="() => editor.commands.deleteSelection()"
        >
          <DropdownMenuItemIcon name="tabler:trash" />
          <p>Удалить</p>
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
