<template>
  <LoginPage />
</template>

<script setup lang="ts">
import { LoginPage } from '~/pages/login'
import { definePageMeta } from '#imports'

definePageMeta({
  auth: false,
})
</script>
