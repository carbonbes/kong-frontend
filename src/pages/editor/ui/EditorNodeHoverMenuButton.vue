<script setup lang="ts"></script>
<template>
  <button
    class="p-2 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 active:bg-gray-200 data-[state='open']:bg-gray-100 rounded-full inset-ring-1 inset-ring-gray-200/75 shadow-md"
  >
    <slot />
  </button>
</template>
