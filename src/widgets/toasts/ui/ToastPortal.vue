<template>
  <ToastPortal v-bind="props">
    <slot />
  </ToastPortal>
</template>

<script setup lang="ts">
import { ToastPortal, type ToastPortalProps } from 'reka-ui'

const props = withDefaults(defineProps<ToastPortalProps>(), {
  to: '#teleports',
})
</script>
