<template>
  <SelectContent
    v-bind="forward"
    class="p-2 bg-white ring-1 ring-gray-200 rounded-xl shadow-md"
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
  position: 'popper',
})

const emits = defineEmits<SelectContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
