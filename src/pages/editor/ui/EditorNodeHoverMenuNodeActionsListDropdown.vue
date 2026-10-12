<template>
  <DropdownMenuRoot v-model:open="open">
    <DropdownMenuTrigger as-child>
      <EditorNodeHoverMenuButton>
        <Icon name="tabler:grip-vertical" />
      </EditorNodeHoverMenuButton>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent :side-offset="5">
        <DropdownMenuItem
          v-if="editor.can().moveUp()"
          @click="() => editor.commands.moveUp()"
        >
          <DropdownMenuItemIcon name="tabler:arrow-up" />
          <p>Переместить наверх</p>
        </DropdownMenuItem>

        <DropdownMenuItem
          v-if="editor.can().moveDown()"
          @click="() => editor.commands.moveDown()"
        >
          <DropdownMenuItemIcon name="tabler:arrow-down" />
          <p>Переместить вниз</p>
        </DropdownMenuItem>

        <DropdownMenuSub v-if="editor.can().transform()">
          <DropdownMenuSubTrigger>
            <DropdownMenuItemIcon name="tabler:refresh" />
            <p>Поменять на</p>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                v-if="editor.can().transformToHeading(2)"
                @click="() => editor.commands.transformToHeading(2)"
              >
                <DropdownMenuItemIcon name="tabler:h-2" />
                <p>Заголовок 2 уровня</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToHeading(3)"
                @click="() => editor.commands.transformToHeading(3)"
              >
                <DropdownMenuItemIcon name="tabler:h-3" />
                <p>Заголовок 3 уровня</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToParagraph()"
                @click="() => editor.commands.transformToParagraph()"
              >
                <DropdownMenuItemIcon name="tabler:letter-case" />
                <p>Текст</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToList('bulletList')"
                @click="() => editor.commands.transformToList('bulletList')"
              >
                <DropdownMenuItemIcon name="tabler:list" />
                <p>Маркированный список</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                v-if="editor.can().transformToList('orderedList')"
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
