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
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'reka-ui'
import type { ToastRootProps } from './toast-root.props.interface'
import { BaseFloating } from '~/shared/ui/base-floating'

const { variant, ...toastRootProps } = withDefaults(
  defineProps<ToastRootProps>(),
  { asChild: true },
)

const emits = defineEmits<ToastRootEmits>()

const forward = useForwardPropsEmits(toastRootProps, emits)
</script>
