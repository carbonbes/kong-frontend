<template>
  <ErrorMessage :name="toValue(name)" class="text-red-600" />
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'

const { name } = useFormField()
</script>
