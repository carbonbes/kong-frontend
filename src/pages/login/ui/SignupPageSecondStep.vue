<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-16">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col items-center gap-2">
        <p class="text-lg font-bold">Введите код</p>
        <p class="text-gray-500">Он был отправлен на указанную почту</p>
      </div>

      <PinInputRoot v-model="otp" @complete="handleComplete">
        <PinInputInput
          v-for="(key, index) in 6"
          :key
          :index
          :disabled="isLoading"
        />
      </PinInputRoot>
    </div>

    <div class="flex flex-col items-center gap-2">
      <p class="text-gray-500">Не пришел код?</p>

      <Button
        :disabled="isLoading"
        variant="secondary"
        @click="handleVerifyOtp"
      >
        Отправить снова
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { useVerifyOtp } from '~/pages/login/model/use-verify-otp.mutation'
import { useToasts } from '~/shared/model'
import { injectSignupPageContext } from '~/pages/login/ui/SignupPage.vue'

const otp = ref<string[]>([])

const {
  formValues: { email },
} = injectSignupPageContext()

const { error, isLoading, mutate: verifyOtp, status } = useVerifyOtp()
const { errorToastify } = useToasts()

watch(status, (value) => {
  if (value === 'success') {
  }

  if (value === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: error.value?.message || 'Неизвестная ошибка',
    })
  }
})

const handleVerifyOtp = () => {
  verifyOtp({
    code: otp.value.join(''),
    type: 'SIGN_UP',
    email: email!,
  })
}

const handleComplete = () => {
  handleVerifyOtp()
}
</script>
