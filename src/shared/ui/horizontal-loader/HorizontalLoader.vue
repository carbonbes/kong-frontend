<template>
  <div class="flex gap-1.5">
    <div
      v-for="i in 3"
      :key="i"
      class="size-1 bg-gray-400 rounded-full animate-[horizontal-loader_1.25s_infinite] nth-2:animation-delay-[0.1s] nth-3:animation-delay-[0.2s]"
    />
  </div>
</template>
