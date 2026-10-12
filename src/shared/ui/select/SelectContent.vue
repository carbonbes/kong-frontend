<template>
  <SelectContent v-bind="forward" as-child>
    <BaseFloating class="p-2 bg-white rounded-3xl">
      <slot />
    </BaseFloating>
  </SelectContent>
</template>

<script setup lang="ts">
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { BaseFloating } from '~/shared/ui/base-floating'

const props = withDefaults(defineProps<SelectContentProps>(), {
  align: 'center',
  position: 'popper',
  side: 'bottom',
  sideOffset: 2.5,
})

const emits = defineEmits<SelectContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
