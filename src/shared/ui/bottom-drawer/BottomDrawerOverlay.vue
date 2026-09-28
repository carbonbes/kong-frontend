<template>
  <DrawerOverlay
    v-bind="props"
    class="fixed inset-0 bg-black/50 data-[state=open]:animate-[fadeIn_333ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[fadeOut_333ms_cubic-bezier(0.32,0.72,0,1)]"
  />
</template>

<script setup lang="ts">
import { DrawerOverlay, type DrawerOverlayProps } from 'reka-ui'

const props = defineProps<DrawerOverlayProps>()
</script>
