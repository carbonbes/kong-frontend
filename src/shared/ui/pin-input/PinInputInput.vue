<template>
  <PinInputInput
    v-bind="props"
    class="size-12 bg-gray-100 text-center focus:bg-white rounded-2xl inset-ring-2 inset-ring-gray-200 hover:inset-ring-blue-700 focus:inset-ring-blue-700 disabled:pointer-events-none disabled:opacity-50 placeholder:text-gray-400 data-[error=true]:bg-red-50 data-[error=true]:inset-ring-red-600 data-[success=true]:bg-green-50 data-[success=true]:inset-ring-green-600"
  />
</template>

<script setup lang="ts">
import { PinInputInput, type PinInputInputProps } from 'reka-ui'

const props = defineProps<PinInputInputProps>()
</script>
