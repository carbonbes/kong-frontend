<template>
  <div>
    <NuxtPage />

    <ToastProvider>
      <ToastItem v-for="(toast, i) in toasts" :key="i" :toast />
      <ToastViewport />
    </ToastProvider>
  </div>
</template>

<script setup lang="ts">
import { ToastItem, ToastProvider, ToastViewport } from '~/shared/ui/toast'
import { useToasts } from '~/shared/model'

const { toasts } = useToasts()
</script>
