<template>
  <LoginPage>
    <LoginPageStep v-show="step === 0">
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormField v-slot="{ componentField, errorMessage }" name="email">
          <LoginFormItem
            class="relative sm:static top-full sm:top-[unset] -translate-y-1/2 sm:translate-y-[unset] h-fit sm:h-auto"
          >
            <LoginFormLabel :error="!!errorMessage" for="email">
              Почта
            </LoginFormLabel>

            <Input
              v-bind="componentField"
              type="email"
              :disabled="signinIsLoading"
              :error="!!errorMessage"
            />

            <LoginFormErrorMessage name="email" />
          </LoginFormItem>
        </LoginFormField>

        <LoginFormFooter>
          <Button :disabled="signinIsLoading" type="submit">Войти</Button>

          <Button
            as-child
            class="flex items-center justify-center"
            :disabled="signinIsLoading"
            variant="tertiary"
          >
            <NuxtLink :to="{ name: 'SignupPage' }">
              У меня нет аккаунта
            </NuxtLink>
          </Button>
        </LoginFormFooter>
      </LoginForm>
    </LoginPageStep>

    <LoginPageStep v-if="step === 1">
      <LoginPageVerifyOtp
        :email="values.email!"
        type="SIGN_IN"
        @back="() => (step = 0)"
      />
    </LoginPageStep>
  </LoginPage>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import LoginFormItem from './LoginFormItem.vue'
import LoginFormFooter from './LoginFormFooter.vue'
import LoginFormLabel from './LoginFormLabel.vue'
import { Input } from '~/shared/ui/input'
import LoginFormErrorMessage from './LoginFormErrorMessage.vue'
import LoginForm from './LoginForm.vue'
import { signinValidationSchema } from '../model/signin-validation.schema'
import { Field as LoginFormField } from 'vee-validate'
import { signin, type SigninOptions } from '../api/signin'
import LoginPageStep from './LoginPageStep.vue'
import LoginPage from './LoginPage.vue'
import LoginPageVerifyOtp from './LoginPageVerifyOtp.vue'

const { errorToastify } = useToasts()

const step = ref<0 | 1>(0)

const { handleSubmit, values } = useForm({
  validationSchema: signinValidationSchema,
})

const { isLoading: signinIsLoading, mutate: signinMutation } = useMutation({
  mutation: (options: SigninOptions) => signin(options),

  onError: (error) => {
    errorToastify({
      title: 'Ошибка',
      description: error.message,
    })
  },

  onSuccess: () => {
    step.value = 1
  },
})

const onSubmit = handleSubmit(signinMutation)
</script>
