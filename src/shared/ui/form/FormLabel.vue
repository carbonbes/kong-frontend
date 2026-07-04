<template>
  <Label
    v-bind="labelProps"
    class="text-gray-800 font-medium data-[error=true]:text-red-700"
    :data-error="error"
  >
    <slot />
  </Label>
</template>

<script setup lang="ts">
import { Label } from 'reka-ui'
import type { FormLabelProps } from './form-label.props.interface'

const { error, ...labelProps } = defineProps<FormLabelProps>()
</script>
