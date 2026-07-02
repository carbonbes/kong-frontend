<template>
  <SigninPage />
</template>

<script setup lang="ts">
import { SigninPage } from '~/pages/login'
import { definePageMeta } from '#imports'

definePageMeta({
  auth: false,
})
</script>
