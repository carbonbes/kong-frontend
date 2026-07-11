<template>
  <LoginView>
    <LoginFormStep v-if="step === 0">
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
    </LoginFormStep>

    <LoginFormStep v-else>
      <div class="flex flex-col items-center gap-2">
        <p class="text-lg font-bold">Введите код</p>
        <p class="text-gray-500">Он был отправлен на указанную почту</p>
      </div>

      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    </LoginFormStep>
  </LoginView>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import { Field as LoginFormField, useForm } from 'vee-validate'
import { signinValidationSchema } from '../model/signin-validation.schema'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { Input } from '~/shared/ui/input'
import { useSignin } from '../model/use-signin.mutation'
import { useToasts } from '~/shared/model'
import LoginView from './LoginView.vue'
import LoginForm from './LoginForm.vue'
import LoginFormItem from './LoginFormItem.vue'
import LoginFormErrorMessage from './LoginFormErrorMessage.vue'
import LoginFormFooter from './LoginFormFooter.vue'
import LoginFormLabel from './LoginFormLabel.vue'
import LoginFormStep from './LoginFormStep.vue'

const step = ref<0 | 1>(0)

const { handleSubmit } = useForm({ validationSchema: signinValidationSchema })
const { error, isLoading, mutate: signin, status } = useSignin()
const { errorToastify } = useToasts()

watch(status, (value) => {
  if (value === 'success') {
    step.value = 1
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
