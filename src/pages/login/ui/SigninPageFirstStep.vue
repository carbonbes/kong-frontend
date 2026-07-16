<template>
  <div class="w-full h-full flex items-center justify-center">
    <LoginForm @submit.prevent="onSubmit">
      <LoginFormField v-slot="{ componentField, errorMessage }" name="email">
        <LoginFormItem>
          <LoginFormLabel :error="!!errorMessage">Почта</LoginFormLabel>

          <Input
            v-bind="componentField"
            type="email"
            :disabled="isLoading"
            :error="!!errorMessage"
          />

          <LoginFormErrorMessage name="email" />
        </LoginFormItem>
      </LoginFormField>

      <LoginFormFooter>
        <Button type="submit" :disabled="isLoading">Войти</Button>

        <Button as-child variant="secondary" :disabled="isLoading">
          <NuxtLink
            :to="{ name: 'SignupPage' }"
            class="flex items-center justify-center"
          >
            У меня нет аккаунта
          </NuxtLink>
        </Button>
      </LoginFormFooter>
    </LoginForm>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import LoginFormLabel from '~/pages/login/ui/LoginFormLabel.vue'
import LoginFormFooter from '~/pages/login/ui/LoginFormFooter.vue'
import LoginFormItem from '~/pages/login/ui/LoginFormItem.vue'
import LoginForm from '~/pages/login/ui/LoginForm.vue'
import { Input } from '~/shared/ui/input'
import LoginFormErrorMessage from '~/pages/login/ui/LoginFormErrorMessage.vue'
import { Field as LoginFormField } from 'vee-validate'
import { signinValidationSchema } from '~/pages/login/model/signin-validation.schema'
import { useSignin } from '~/pages/login/model/use-signin.mutation'
import { useToasts } from '~/shared/model'
import type { LoginPageStepEmits } from '~/pages/login/ui/login-page-step.emits.interface'

const emits = defineEmits<LoginPageStepEmits>()

const { handleSubmit } = useForm({ validationSchema: signinValidationSchema })
const { error, isLoading, mutate: signin, status } = useSignin()
const { errorToastify } = useToasts()

watch(status, (value) => {
  if (value === 'success') {
    emits('next')
  }

  if (value === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: error.value?.message || 'Неизвестная ошибка',
    })
  }
})

const onSubmit = handleSubmit(signin)
</script>
