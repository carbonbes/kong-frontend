<template>
  <LoginPage>
    <SignupPageFirstStep v-if="step === 0" @next="step = 1" />
    <SignupPageSecondStep v-else />
  </LoginPage>
</template>

<script setup lang="ts">
import { createContext } from 'reka-ui'
import LoginPage from '~/pages/login/ui/LoginPage.vue'
import SignupPageFirstStep from '~/pages/login/ui/SignupPageFirstStep.vue'
import SignupPageSecondStep from '~/pages/login/ui/SignupPageSecondStep.vue'
import type { UserGender } from '~/shared/model'

const step = ref<0 | 1>(0)

const formValues = reactive<{
  email: string | undefined
  name: string | undefined
  gender: keyof typeof UserGender | undefined
}>({ email: undefined, name: undefined, gender: undefined })

provideSignupPageContext({ formValues })
</script>

<script lang="ts">
export const [injectSignupPageContext, provideSignupPageContext] =
  createContext<SignupPageContext>('SignupPage')
</script>
