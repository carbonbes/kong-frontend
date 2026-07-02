<template>
  <SignupPage />
</template>

<script setup lang="ts">
import { SignupPage } from '~/pages/login'
import { definePageMeta } from '#imports'

definePageMeta({
  auth: false,
})
</script>
