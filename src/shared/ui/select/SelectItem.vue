<template>
  <SelectItem v-bind="forward" class="p-1.5 cursor-pointer">
    <slot />
  </SelectItem>
</template>

<script setup lang="ts">
import {
  SelectItem,
  type SelectItemEmits,
  type SelectItemProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<SelectItemProps>()
const emits = defineEmits<SelectItemEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
