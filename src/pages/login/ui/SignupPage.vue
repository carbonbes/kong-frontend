<template>
  <LoginPage>
    <div v-show="step === 0" class="size-full flex items-center justify-center">
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormFieldGroup class="self-center">
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

    <div v-if="step === 1" class="size-full flex flex-col justify-between">
      <Button
        circle
        :disabled="verifyOtpIsLoading"
        variant="tertiary"
        class="self-start"
        @click="step = 0"
      >
        <Icon name="tabler:arrow-left" class="size-6" />
      </Button>

      <div class="flex flex-col items-center gap-8">
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

      <div class="flex flex-col items-center justify-end gap-2">
        <p class="text-gray-400">Не пришел код?</p>

        <TemporalDisabledButton
          :disabled="verifyOtpIsLoading"
          immediate
          :timer="60"
          variant="secondary"
          @click="handleResendOtp"
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
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { Input } from '~/shared/ui/input'
import { Field as LoginFormField } from 'vee-validate'
import { TemporalDisabledButton } from '~/shared/ui/temporal-disabled-button'
import { useVerifyOtp } from '~/pages/login/model/use-verify-otp.mutation.ts'
import { useToasts } from '~/shared/model'
import { signup } from '~/pages/login/api'

const step = ref<0 | 1>(0)

const { handleSubmit, values } = useForm({
  validationSchema: signupValidationSchema,
})

const { errorToastify } = useToasts()

const { isLoading: signupIsLoading, mutate: signupMutation } = useMutation({
  mutation: signup,

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

const onSubmit = handleSubmit(signupMutation)

const otp = ref<string[]>([])

const { isLoading: verifyOtpIsLoading, mutate: verifyOtp } = useVerifyOtp()

const handleVerifyOtp = () => {
  verifyOtp({
    code: otp.value.join(''),
    type: 'SIGN_UP',
    email: values.email!,
  })
}

const handleResendOtp = () =>
  signupMutation({
    email: values.email!,
    name: values.name!,
    gender: values.gender!,
  })
</script>
