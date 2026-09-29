<template>
  <BaseFloating
    as="button"
    class="p-2 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 active:bg-gray-200 data-[state='open']:bg-gray-100 rounded-full"
  >
    <slot />
  </BaseFloating>
</template>

<script setup lang="ts">
import { BaseFloating } from '~/shared/ui/base-floating'
</script>
