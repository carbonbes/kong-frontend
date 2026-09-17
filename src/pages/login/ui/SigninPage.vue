<template>
  <div class="p-4 size-full">
    <div
      v-show="step === 0"
      class="size-full flex items-center justify-center"
      data-testid="login-page/signin/first-step"
    >
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormField v-slot="{ componentField, errorMessage }" name="email">
          <LoginFormItem>
            <LoginFormLabel
              :error="!!errorMessage"
              for="email"
              data-testid="login-page/signin/first-step/email-input-label"
            >
              Почта
            </LoginFormLabel>

            <Input
              v-bind="componentField"
              type="email"
              :disabled="signinIsLoading"
              :error="!!errorMessage"
              data-testid="login-page/signin/first-step/email-input"
            />

            <LoginFormErrorMessage
              name="email"
              data-testid="login-page/signin/first-step/email-input-error-message"
            />
          </LoginFormItem>
        </LoginFormField>

        <LoginFormFooter>
          <Button
            :disabled="signinIsLoading"
            type="submit"
            data-testid="login-page/signin/first-step/submit-button"
          >
            Войти
          </Button>

          <Button
            as-child
            class="flex items-center justify-center"
            :disabled="signinIsLoading"
            variant="tertiary"
            data-testid="login-page/signin/first-step/signup-button"
          >
            <NuxtLink :to="{ name: 'SignupPage' }">
              У меня нет аккаунта
            </NuxtLink>
          </Button>
        </LoginFormFooter>
      </LoginForm>
    </div>

    <div
      v-if="step === 1"
      class="size-full flex flex-col justify-between"
      data-testid="login-page/signin/second-step"
    >
      <Button
        circle
        :disabled="verifyOtpIsLoading"
        variant="tertiary"
        class="self-start"
        data-testid="login-page/signin/second-step/back-button"
        @click="step = 0"
      >
        <Icon name="tabler:arrow-left" class="size-6" />
      </Button>

      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <p class="text-lg font-bold">Введите код</p>
          <p class="text-gray-500">Он был отправлен на указанную почту</p>
        </div>

        <PinInputRoot v-model="otp" @complete="handleVerifyOtp">
          <PinInputInput
            v-for="(key, index) in 6"
            :key
            :index
            :disabled="verifyOtpIsLoading"
            :data-testid="`login-page/signin/second-step/otp-input-${index}`"
          />
        </PinInputRoot>
      </div>

      <div class="flex flex-col items-center justify-end gap-2">
        <p class="text-gray-500">Не пришел код?</p>

        <TemporalDisabledButton
          :disabled="resendOtpIsLoading"
          :duration="60"
          immediate
          variant="secondary"
          data-testid="login-page/signin/second-step/resend-otp-button"
          @click="handleResendOtp"
        >
          Отправить снова
        </TemporalDisabledButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import LoginFormItem from '~/pages/login/ui/LoginFormItem.vue'
import LoginFormFooter from '~/pages/login/ui/LoginFormFooter.vue'
import LoginFormLabel from '~/pages/login/ui/LoginFormLabel.vue'
import { Input } from '~/shared/ui/input'
import LoginFormErrorMessage from '~/pages/login/ui/LoginFormErrorMessage.vue'
import LoginForm from '~/pages/login/ui/LoginForm.vue'
import { signinValidationSchema } from '~/pages/login/model/signin-validation.schema'
import { Field as LoginFormField } from 'vee-validate'
import { TemporalDisabledButton } from '~/shared/ui/temporal-disabled-button'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { signin } from '~/shared/api'

const step = ref<0 | 1>(0)

const { handleSubmit, values } = useForm({
  validationSchema: signinValidationSchema,
})

const { errorToastify } = useToasts()

const { isLoading: signinIsLoading, mutate: signinMutation } = useMutation({
  mutation: signin,

  onSuccess() {
    step.value = 1
  },

  onError(error) {
    errorToastify({
      title: 'Ошибка',
      description: error.message,
    })
  },
})

const onSubmit = handleSubmit(signinMutation)

const otp = ref<string[]>([])

const { isLoading: verifyOtpIsLoading, mutate: verifyOtp } = useVerifyOtp()

const handleVerifyOtp = () => {
  verifyOtp({
    code: otp.value.join(''),
    type: 'SIGN_IN',
    email: values.email!,
  })
}

const { isLoading: resendOtpIsLoading, mutate: resendOtp } = useResendOtp()

const handleResendOtp = () =>
  resendOtp({ email: values.email!, type: 'SIGN_IN' })
</script>
