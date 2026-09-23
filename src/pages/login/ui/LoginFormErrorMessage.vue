<template>
  <ErrorMessage v-slot="{ message }" :name>
    <p v-bind="$attrs" :data-field-name="name" class="text-[15px] text-red-600">
      {{ message }}
    </p>
  </ErrorMessage>
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate'

const { name } = defineProps<{ name: string }>()
</script>
