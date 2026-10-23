<template>
  <div id="__layout" class="flex gap-4">
    <NuxtLoadingIndicator />

    <main class="size-full">
      <NuxtPage />
    </main>

    <BottomNavbar />

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { BottomNavbar } from '~/widgets/bottom-navbar'
import { Toasts } from '~/widgets/toasts'
import { useLiquidGlass } from '~/shared/model'

useLiquidGlass({
  root: document?.querySelector('#__layout')!,
  glassElements: [document?.querySelector('#bottom-navbar')!],
  defaults: {
    blurAmount: 0.25,
    brightness: -0.15,
    cornerRadius: 50,
    shadowOpacity: 0,
    zRadius: 25,
  },
})
</script>
