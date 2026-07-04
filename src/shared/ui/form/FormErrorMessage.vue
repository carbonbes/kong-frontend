<template>
  <ErrorMessage :name class="text-red-600" />
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate'

const props = defineProps<{ name: string }>()
</script>
