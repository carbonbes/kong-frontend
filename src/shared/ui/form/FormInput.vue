<template>
  <Input v-bind="props" :error="!!error" :success="valid" />
</template>

<script setup lang="ts">
import { Input, type InputProps } from '~/shared/ui/input'
import { useFormField } from './useFormField'

const props = defineProps<InputProps>()

const { error, valid } = useFormField()
</script>
