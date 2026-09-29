<template>
  <EditorNodeSwipeMenuNodesListBottomDrawer :editor />
  <EditorNodeSwipeMenuNodeActionsListBottomDrawer :editor />
</template>

<script setup lang="ts">
import EditorNodeSwipeMenuNodesListBottomDrawer from './EditorNodeSwipeMenuNodesListBottomDrawer.vue'
import EditorNodeSwipeMenuNodeActionsListBottomDrawer from './EditorNodeSwipeMenuNodeActionsListBottomDrawer.vue'
import type { EditorNodeMenuProps } from './editor-node-menu.props.interface.ts'

const { editor } = defineProps<EditorNodeMenuProps>()
</script>
