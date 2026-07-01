<template>
  <SigninPage />
</template>

<script setup lang="ts">
import { SigninPage } from '~/pages/signin'
import { definePageMeta } from '#imports'

definePageMeta({
  auth: false,
})
</script>
