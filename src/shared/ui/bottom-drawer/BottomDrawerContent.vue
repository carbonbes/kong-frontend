<template>
  <DrawerContent
    v-bind="forward"
    class="fixed inset-x-0 bottom-0 translate-y-[calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y))] transition-[transform__333ms_cubic-bezier(0.32,0.72,0,1)] data-swiping:transition-none p-6 w-full h-full max-h-[95%] flex flex-col gap-6 bg-white rounded-t-4xl data-[state=open]:animate-[slideIn_333ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slideOut_333ms_cubic-bezier(0.32,0.72,0,1)]"
  >
    <slot />
  </DrawerContent>
</template>

<script setup lang="ts">
import {
  DrawerContent,
  type DrawerContentEmits,
  type DrawerContentProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<DrawerContentProps>()
const emits = defineEmits<DrawerContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
