<template>
  <DrawerTitle v-bind="props" class="text-xl font-bold">
    <slot />
  </DrawerTitle>
</template>

<script setup lang="ts">
import { DrawerTitle, type DrawerTitleProps } from 'reka-ui'

const props = defineProps<DrawerTitleProps>()
</script>
