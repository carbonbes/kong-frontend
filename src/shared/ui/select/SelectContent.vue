<template>
  <SelectContent
    v-bind="forward"
    class="p-2 w-(--reka-select-trigger-width) bg-white ring-1 ring-gray-200 rounded-2xl shadow"
  >
    <slot />
  </SelectContent>
</template>

<script setup lang="ts">
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = withDefaults(defineProps<SelectContentProps>(), {
  align: 'center',
  position: 'popper',
  side: 'bottom',
  sideOffset: 5,
})

const emits = defineEmits<SelectContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
