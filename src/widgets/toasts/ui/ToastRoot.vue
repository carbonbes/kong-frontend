<template>
  <ToastRoot v-bind="forward">
    <BaseFloating
      class="p-4 w-full bg-white flex flex-col gap-4 rounded-3xl pointer-events-auto"
    >
      <slot />
    </BaseFloating>
  </ToastRoot>
</template>

<script setup lang="ts">
import {
  ToastRoot,
  type ToastRootEmits,
  type ToastRootProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { BaseFloating } from '~/shared/ui/base-floating'

const props = withDefaults(defineProps<ToastRootProps>(), { asChild: true })
const emits = defineEmits<ToastRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
