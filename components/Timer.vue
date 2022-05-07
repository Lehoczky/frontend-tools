<template>
  <article class="p-article">
    <h2 class="mb-article-heading text-3xl">Timer</h2>

    <div class="flex items-end gap-4">
      <div
        class="flex rounded-md bg-base-500 px-5 py-4 outline-none ring-gray-600 text-xl focus-within:ring"
        :class="{
          'text-opacity-50': editing,
        }"
        @click="input.focus()"
      >
        <div :class="{ 'opacity-50': editing && rawValue.length <= 5 }">
          {{ numbers[0] }}
        </div>
        <div :class="{ 'opacity-50': editing && rawValue.length <= 4 }">
          {{ numbers[1] }}
        </div>
        <div
          class="mr-2"
          :class="{ 'opacity-50': editing && rawValue.length <= 4 }"
        >
          h
        </div>
        <div :class="{ 'opacity-50': editing && rawValue.length <= 3 }">
          {{ numbers[2] }}
        </div>
        <div :class="{ 'opacity-50': editing && rawValue.length <= 2 }">
          {{ numbers[3] }}
        </div>
        <div
          class="mr-2"
          :class="{ 'opacity-50': editing && rawValue.length <= 2 }"
        >
          m
        </div>
        <div :class="{ 'opacity-50': editing && rawValue.length <= 1 }">
          {{ numbers[4] }}
        </div>
        <div :class="{ 'opacity-50': editing && rawValue.length === 0 }">
          {{ numbers[5] }}
        </div>
        <div :class="{ 'opacity-50': editing && rawValue.length === 0 }">s</div>

        <input
          ref="input"
          v-model="rawValue"
          type="tel"
          class="sr-only"
          :maxlength="MAX_INPUT_LENGTH"
          @keypress="preventNonNumericInput($event)"
          @focus="editing = true"
          @blur="editing = false"
        />
      </div>

      <button
        class="rounded-md bg-sky-800 px-4 py-2 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        :disabled="buttonDisabled"
        @click="startCountdown()"
      >
        Start
      </button>
    </div>

    <Transition>
      <div
        v-if="showNotification"
        class="notification fixed top-20 right-7 grid grid-cols-[min-content_auto] gap-x-9 gap-y-2 rounded-md py-2.5 pl-4 pr-10 text-sm"
      >
        <IconCheckCircle class="row-span-2 self-center text-green-500" />
        <div class="tracking-wide">Timer finished!</div>
        <button
          class="transition-color justify-self-end rounded-md px-2 py-1 ease-out hover:bg-base-400 active:scale-95"
          @click="closeNotificationAndStopBeeping()"
        >
          OK
        </button>
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
import { useTitle } from "@vueuse/core"
import { dropWhile } from "lodash-es"

import { beep, isDigit } from "~~/utils"

const MAX_INPUT_LENGTH = 6
const input = ref<HTMLInputElement>()
const editing = ref(false)
const rawValue = ref("")
const numbers = ref<number[]>([0, 0, 0, 0, 0, 0])
const parsedSeconds = ref(0)
const title = useTitle()
const originalTitle = title.value
const countingDown = ref(false)
const showNotification = ref(false)
const beepingInterval = useIntervalFn(beep, 2500, {
  immediate: false,
  immediateCallback: true,
})

const preventNonNumericInput = (event: KeyboardEvent) => {
  if (!isDigit(event.key)) {
    event.preventDefault()
  }
}

watch(rawValue, (newValue) => {
  const valueAsNumbers = Array.from(newValue, Number)
  const numOfLeadingZeros = MAX_INPUT_LENGTH - newValue.length
  const leadingZeros = Array(numOfLeadingZeros).fill(0, 0, numOfLeadingZeros)
  numbers.value = [...leadingZeros, ...valueAsNumbers]

  const [h1, h2, m1, m2, s1, s2] = numbers.value
  const hours = h1 * 10 + h2
  const minutes = m1 * 10 + m2
  const seconds = s1 * 10 + s2
  parsedSeconds.value = hours * 60 * 60 + minutes * 60 + seconds
})

const startCountdown = () => {
  countingDown.value = true
  const time = secondsInReadableForm(parsedSeconds.value)
  title.value = `${time} - ${originalTitle}`
  setTimeout(() => decrementTime(), 1000)
}

const decrementTime = () => {
  if (parsedSeconds.value > 1) {
    const seconds = parsedSeconds.value - 1
    rawValue.value = secondstoRawValue(seconds)
    title.value = `${secondsInReadableForm(seconds)} - ${originalTitle}`
    setTimeout(() => decrementTime(), 1000)
  } else {
    countingDown.value = false
    rawValue.value = ""
    title.value = originalTitle
    showNotificationAndStartBeeping()
  }
}

const secondsInReadableForm = (total_seconds: number) => {
  const hours = Math.floor(total_seconds / 3600)
  const minutes = Math.floor(total_seconds / 60) % 60
  const seconds = total_seconds % 60

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

const secondstoRawValue = (total_seconds: number) => {
  const hours = Math.floor(total_seconds / 3600)
  const minutes = Math.floor(total_seconds / 60) % 60
  const seconds = total_seconds % 60
  const timeAsStringWithLeadingZeros = [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .join("")

  return dropWhile(timeAsStringWithLeadingZeros, (x) => x === "0").join("")
}

const buttonDisabled = computed(
  () => countingDown.value || parsedSeconds.value === 0
)

const showNotificationAndStartBeeping = () => {
  showNotification.value = true
  beepingInterval.resume()
}

const closeNotificationAndStopBeeping = () => {
  showNotification.value = false
  beepingInterval.pause()
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition;
}

.v-enter-from,
.v-leave-to {
  @apply translate-x-7 opacity-0;
}

.notification {
  background: linear-gradient(
    to right,
    theme("colors.green.700") -10%,
    theme("colors.base.500") 40%
  );
}
</style>
