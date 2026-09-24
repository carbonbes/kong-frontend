<template>
  <DrawerOverlay v-bind="props" class="fixed inset-0 bg-black/25" />
</template>

<script setup lang="ts">
import { DrawerOverlay, type DrawerOverlayProps } from 'reka-ui'

const props = defineProps<DrawerOverlayProps>()
</script>
