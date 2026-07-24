<template>
  <Primitive v-bind="primitiveProps" class="tabular-nums">
    {{ countdown }}
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import type { CountdownProps } from './countdown.props.interface'

const {
  format = 'mm:ss',
  seconds,
  ...primitiveProps
} = defineProps<CountdownProps>()

const { remaining } = useCountdown(Number(seconds), { immediate: true })

const ms = computed(() => remaining.value * 1000)

const countdown = useDateFormat(ms, format)
</script>
