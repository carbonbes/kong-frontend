<template>
  <div
    class="h-full grid sm:flex sm:flex-col sm:justify-center sm:gap-20 grid-rows-3"
  >
    <Button
      :disabled="verifyOtpIsLoading"
      variant="secondary"
      class="w-fit gap-2"
      @click="emits('back')"
    >
      <Icon name="tabler:arrow-left" class="size-6" />
      <p>Назад</p>
    </Button>

    <div
      class="relative sm:static h-fit flex flex-col items-center gap-8 self-center sm:self-auto"
    >
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

      <Button
        class="relative before:absolute before:inset-0 before:w-(--timer-progress) before:bg-black/50 overflow-hidden"
        :disabled="isCountdownActive || resendOtpIsLoading"
        :style="{ '--timer-progress': timerProgress }"
        variant="secondary"
        @click="handleResendOtp"
      >
        Отправить снова
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { type OtpType, useAuthQueryOptions } from '~/shared/model'
import { Button } from '~/shared/ui/button'
import { verifyOtp, type VerifyOtpOptions } from '../api/verify-otp'
import { resendOtp, type ResendOtpOptions } from '../api/resend-otp'

const { email, type } = defineProps<{ email: string; type: OtpType }>()

const emits = defineEmits<{ back: [] }>()

const { errorToastify, successToastify } = useToasts()
const queryCache = useQueryCache()
const authQueryOptions = useAuthQueryOptions()
const router = useRouter()

const otp = ref<string[]>([])

const { isLoading: verifyOtpIsLoading, mutate: verifyOtpMutation } =
  useMutation({
    mutation: (options: VerifyOtpOptions) => verifyOtp(options),

    onError: () => {
      errorToastify({
        title: 'Ошибка',
        description: 'Неверный, либо несуществующий код',
      })
    },

    onSuccess: ({ user }) => {
      successToastify({
        title: 'Верный код',
        description: 'Перенаправление на главную страницу...',
      })

      queryCache.setQueryData(authQueryOptions.key, user)
      queryCache.cancelQueries({ key: authQueryOptions.key })

      router.push({ name: 'FeedPage' })
    },
  })

const handleVerifyOtp = () => {
  verifyOtpMutation({
    code: otp.value.join(''),
    type,
    email,
  })
}

const { isLoading: resendOtpIsLoading, mutate: resendOtpMutation } =
  useMutation({
    mutation: (options: ResendOtpOptions) => resendOtp(options),

    onError: () => {
      errorToastify({
        title: 'Ошибка',
        description: 'Не удалось отправить код',
      })
    },

    onSuccess: () => {
      successToastify({
        title: 'Готово',
        description: 'Код отправлен на вашу почту',
      })
    },
  })

const handleResendOtp = () => {
  resendOtpMutation({ email, type })
  start(60)
}

const { isActive: isCountdownActive, remaining, start } = useCountdown(60)

onMounted(start)

const timerProgress = computed(
  () => `${Math.ceil((remaining.value / 60) * 100)}%`,
)
</script>
