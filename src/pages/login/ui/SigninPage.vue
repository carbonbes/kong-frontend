<template>
  <LoginPage>
    <SigninPageFirstStep v-if="step === 0" @next="step = 1" />
    <SigninPageSecondStep v-else />
  </LoginPage>
</template>

<script setup lang="ts">
import LoginPage from '~/pages/login/ui/LoginPage.vue'
import SigninPageFirstStep from '~/pages/login/ui/SigninPageFirstStep.vue'
import SigninPageSecondStep from '~/pages/login/ui/SigninPageSecondStep.vue'

const step = ref<0 | 1>(0)
</script>
