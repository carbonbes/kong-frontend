<template>
  <LoginPage>
    <div v-show="step === 0" class="size-full flex items-center justify-center">
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormField v-slot="{ componentField, errorMessage }" name="email">
          <LoginFormItem>
            <LoginFormLabel :error="!!errorMessage">Почта</LoginFormLabel>

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
    </div>

    <div
      v-show="step === 1"
      class="size-full flex flex-col items-center justify-center gap-16"
    >
      <div class="flex flex-col gap-8">
        <div class="flex flex-col items-center gap-2">
          <p class="text-lg font-bold">Введите код</p>
          <p class="text-gray-500">Он был отправлен на указанную почту</p>
        </div>

        <PinInputRoot @complete="handleVerifyOtp">
          <PinInputInput
            v-for="(key, index) in 6"
            :key
            :index
            :disabled="verifyOtpIsLoading"
          />
        </PinInputRoot>
      </div>

      <div class="flex flex-col items-center gap-2">
        <p class="text-gray-500">Не пришел код?</p>

        <Button
          :disabled="verifyOtpIsLoading"
          variant="secondary"
          @click="handleVerifyOtp"
        >
          Отправить снова
        </Button>
      </div>
    </div>
  </LoginPage>
</template>

<script setup lang="ts">
import LoginPage from '~/pages/login/ui/LoginPage.vue'
import { Button } from '~/shared/ui/button'
import LoginFormItem from '~/pages/login/ui/LoginFormItem.vue'
import LoginFormFooter from '~/pages/login/ui/LoginFormFooter.vue'
import LoginFormLabel from '~/pages/login/ui/LoginFormLabel.vue'
import { Input } from '~/shared/ui/input'
import LoginFormErrorMessage from '~/pages/login/ui/LoginFormErrorMessage.vue'
import LoginForm from '~/pages/login/ui/LoginForm.vue'
import { signinValidationSchema } from '~/pages/login/model/signin-validation.schema'
import { useSignin } from '~/pages/login/model/use-signin.mutation'
import { useToasts } from '~/shared/model'
import { useVerifyOtp } from '~/pages/login/model/use-verify-otp.mutation'
import { Field as LoginFormField } from 'vee-validate'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'

const step = ref<0 | 1>(0)

const {
  handleSubmit,
  values: { email },
} = useForm({ validationSchema: signinValidationSchema })

const {
  error: signinError,
  isLoading: signinIsLoading,
  mutate: signin,
  status: signinStatus,
} = useSignin()

const onSubmit = handleSubmit(signin)

const { errorToastify } = useToasts()

watch(signinStatus, (status) => {
  if (status === 'success') {
    step.value = 1
  }

  if (status === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: signinError.value?.message || 'Неизвестная ошибка',
    })
  }
})

const {
  error: verifyOtpError,
  isLoading: verifyOtpIsLoading,
  mutate: verifyOtp,
  status: verifyOtpStatus,
} = useVerifyOtp()

const router = useRouter()

watch(verifyOtpStatus, (status) => {
  if (status === 'success') {
    router.push({ name: 'IndexPage', replace: true })
  }

  if (status === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: verifyOtpError.value?.message || 'Неизвестная ошибка',
    })
  }
})

const handleVerifyOtp = (value: string[]) => {
  verifyOtp({ code: value.join(''), type: 'SIGN_IN', email: email! })
}
</script>
