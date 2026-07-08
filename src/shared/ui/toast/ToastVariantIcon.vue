<template>
  <Icon :name :class="classes" />
</template>

<script setup lang="ts">
import type { ToastVariantIconProps } from './toast-variant-icon.props.interface'
import { computed } from 'vue'

const { variant } = defineProps<ToastVariantIconProps>()

const name = computed(() =>
  variant === 'success' ? 'tabler:circle-check' : 'tabler:exclamation-circle',
)

const classes = computed(() =>
  variant === 'success' ? 'size-6 text-green-700' : 'size-6 text-red-700',
)
</script>
