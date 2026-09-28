<template>
  <DrawerViewport v-bind="props" class="h-full overflow-y-auto">
    <slot />
  </DrawerViewport>
</template>

<script setup lang="ts">
import { DrawerViewport, type DrawerViewportProps } from 'reka-ui'

const props = defineProps<DrawerViewportProps>()
</script>
