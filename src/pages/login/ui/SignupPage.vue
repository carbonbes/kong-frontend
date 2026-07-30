<template>
  <LoginPage>
    <div v-show="step === 0" class="size-full flex items-center justify-center">
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormFieldGroup>
          <LoginFormField
            v-slot="{ componentField, errorMessage }"
            name="email"
          >
            <LoginFormItem>
              <LoginFormLabel :error="!!errorMessage" for="email">
                Почта
              </LoginFormLabel>

              <Input
                v-bind="componentField"
                :disabled="signupIsLoading"
                :error="!!errorMessage"
                type="email"
              />

              <LoginFormErrorMessage name="email" />
            </LoginFormItem>
          </LoginFormField>

          <LoginFormField v-slot="{ componentField, errorMessage }" name="name">
            <LoginFormItem>
              <LoginFormLabel :error="!!errorMessage" for="name">
                Имя
              </LoginFormLabel>

              <Input
                v-bind="componentField"
                :disabled="signupIsLoading"
                :error="!!errorMessage"
                type="text"
              />

              <LoginFormErrorMessage name="name" />
            </LoginFormItem>
          </LoginFormField>

          <LoginFormField
            v-slot="{ errorMessage, handleBlur, handleChange, value }"
            name="gender"
          >
            <LoginFormItem>
              <LoginFormLabel :error="!!errorMessage" for="gender">
                Гендер
              </LoginFormLabel>

              <SelectRoot
                :model-value="value"
                @update:model-value="handleChange"
              >
                <SelectTrigger as-child>
                  <LoginFormSelectTrigger
                    :disabled="signupIsLoading"
                    :error="!!errorMessage"
                    name="gender"
                    @blur="handleBlur"
                  >
                    <SelectValue />
                    <SelectIcon />
                  </LoginFormSelectTrigger>
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent>
                    <SelectViewport>
                      <SelectItem value="male">
                        <SelectItemText>Мужской</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>

                      <SelectItem value="female">
                        <SelectItemText>Женский</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>

                      <SelectItem value="other">
                        <SelectItemText>Другой</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>

              <LoginFormErrorMessage name="gender" />
            </LoginFormItem>
          </LoginFormField>
        </LoginFormFieldGroup>

        <LoginFormFooter>
          <Button :disabled="signupIsLoading" type="submit">
            Зарегистрироваться
          </Button>

          <Button
            as-child
            class="flex items-center justify-center"
            :disabled="signupIsLoading"
            variant="tertiary"
          >
            <NuxtLink :to="{ name: 'SigninPage' }">
              У меня есть аккаунт
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
        <Button
          circle
          :disabled="verifyOtpIsLoading"
          variant="tertiary"
          class="self-start"
          @click="step = 0"
        >
          <Icon name="tabler:arrow-left" class="size-6" />
        </Button>

        <div class="flex flex-col items-center gap-2">
          <p class="text-xl font-bold">Введите код</p>
          <p class="text-gray-400">Он был отправлен на указанную почту</p>
        </div>

        <PinInputRoot v-model="otp" @complete="handleVerifyOtp">
          <PinInputInput
            v-for="(key, index) in 6"
            :key
            :index
            :disabled="verifyOtpIsLoading"
          />
        </PinInputRoot>
      </div>

      <div class="flex flex-col items-center gap-2">
        <p class="text-gray-400">Не пришел код?</p>

        <TemporalDisabledButton
          :disabled="verifyOtpIsLoading"
          immediate
          :timer="60"
          variant="secondary"
          @click="handleVerifyOtp"
        >
          Отправить снова
        </TemporalDisabledButton>
      </div>
    </div>
  </LoginPage>
</template>

<script setup lang="ts">
import LoginPage from '~/pages/login/ui/LoginPage.vue'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '~/shared/ui/select'
import { Button } from '~/shared/ui/button'
import LoginFormLabel from '~/pages/login/ui/LoginFormLabel.vue'
import LoginFormErrorMessage from '~/pages/login/ui/LoginFormErrorMessage.vue'
import LoginFormFieldGroup from '~/pages/login/ui/LoginFormFieldGroup.vue'
import LoginFormItem from '~/pages/login/ui/LoginFormItem.vue'
import LoginFormFooter from '~/pages/login/ui/LoginFormFooter.vue'
import LoginFormSelectTrigger from '~/pages/login/ui/LoginFormSelectTrigger.vue'
import LoginForm from '~/pages/login/ui/LoginForm.vue'
import { signupValidationSchema } from '~/pages/login/model/signup-validation.schema'
import { useSignup } from '~/pages/login/model/use-signup.mutation'
import { useVerifyOtp } from '~/pages/login/model/use-verify-otp.mutation'
import { useToasts } from '~/shared/model'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { Input } from '~/shared/ui/input'
import { Field as LoginFormField } from 'vee-validate'
import { TemporalDisabledButton } from '~/shared/ui/temporal-disabled-button'

const step = ref<0 | 1>(0)

const { handleSubmit, values } = useForm({
  validationSchema: signupValidationSchema,
})

const {
  error: signupError,
  isLoading: signupIsLoading,
  mutate: signup,
  status: signupStatus,
} = useSignup()

const onSubmit = handleSubmit(signup)

const { errorToastify } = useToasts()

watch(signupStatus, (status) => {
  if (status === 'success') {
    step.value = 1
  }

  if (status === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: signupError.value?.message || 'Неизвестная ошибка',
    })
  }
})

const otp = ref<string[]>([])

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

const handleVerifyOtp = () => {
  verifyOtp({ code: otp.value.join(''), type: 'SIGN_UP', email: values.email! })
}
</script>
