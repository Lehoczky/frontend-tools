<template>
  <article class="p-article">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <h2 class="mb-article-heading text-3xl">Timer</h2>

    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div
        class="flex cursor-text rounded-md bg-base-500 px-5 py-4 outline-none ring-gray-600 text-xl focus-within:ring"
        :class="{
          'text-opacity-50': editing,
        }"
        @click="focusInput"
      >
        <div
          :class="{
            'opacity-50': editing && rawValue.length <= 5,
            'opacity-0': !editing && numbers[0] === 0 && rawValue.length <= 5,
          }"
        >
          {{ numbers[0] }}
        </div>
        <div
          :class="{
            'opacity-50': editing && rawValue.length <= 4,
            'opacity-0': !editing && numbers[1] === 0 && rawValue.length <= 4,
          }"
        >
          {{ numbers[1] }}
        </div>
        <div
          class="mr-2"
          :class="{
            'opacity-50': editing && rawValue.length <= 4,
            'opacity-0': !editing && numbers[1] === 0 && rawValue.length <= 4,
          }"
        >
          h
        </div>
        <div
          :class="{
            'opacity-50': editing && rawValue.length <= 3,
            'opacity-0': !editing && numbers[2] === 0 && rawValue.length <= 3,
          }"
        >
          {{ numbers[2] }}
        </div>
        <div
          :class="{
            'opacity-50': editing && rawValue.length <= 2,
            'opacity-0': !editing && numbers[3] === 0 && rawValue.length <= 2,
          }"
        >
          {{ numbers[3] }}
        </div>
        <div
          class="mr-2"
          :class="{
            'opacity-50': editing && rawValue.length <= 2,
            'opacity-0': !editing && numbers[3] === 0 && rawValue.length <= 2,
          }"
        >
          m
        </div>
        <div
          :class="{
            'opacity-50': editing && rawValue.length <= 1,
            'opacity-0': !editing && numbers[4] === 0 && rawValue.length <= 1,
          }"
        >
          {{ numbers[4] }}
        </div>
        <div
          :class="{
            'opacity-50': editing && rawValue.length === 0,
          }"
        >
          {{ numbers[5] }}
        </div>
        <div
          :class="{
            'opacity-50': editing && rawValue.length === 0,
          }"
        >
          s
        </div>

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

      <Button :disabled="countingDown" @click="rawValue = '500'">
        <IconTea class="h-5 w-5 fill-current" />
        Chamomile tea
      </Button>

      <Button :disabled="countingDown" @click="rawValue = '800'">
        <IconTea class="h-5 w-5 fill-current" />
        Fruit tea
      </Button>

      <div class="relative h-10">
        <Transition name="slide-up">
          <Button
            v-if="!countingDown"
            class="absolute will-change-transform"
            color="blue"
            :disabled="startButtonDisabled"
            @click="countingDown = true"
          >
            Start
            <IconPlay />
          </Button>

          <Button
            v-else
            class="absolute will-change-transform"
            color="red"
            :disabled="!countingDown"
            @click="countingDown = false"
          >
            Pause
            <IconPause />
          </Button>
        </Transition>
      </div>
    </div>

    <Transition name="slide-left">
      <div
        v-if="showNotification"
        class="notification fixed top-20 right-7 grid grid-cols-[min-content_auto] gap-x-9 gap-y-2 rounded-md py-2.5 pl-4 pr-10 text-sm"
      >
        <IconCheckCircle class="row-span-2 self-center text-green-500" />
        <div class="tracking-wide">Timer finished!</div>
        <button
          class="transition-color justify-self-end rounded-md px-2 py-1 ease-out hover:bg-base-400 active:scale-95"
          @click="closeNotificationAndStopBeeping"
        >
          OK
        </button>
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
import {
  dropLeadingZeros,
  isDigit,
  loadBeepSound,
  secondsToDuration,
} from "~~/utils"

const MAX_INPUT_LENGTH = 6
const input = ref<HTMLInputElement>()
const editing = ref(false)
const rawValue = ref("")
const title = ref("Frontend Tools")

const countingDown = ref(false)
const showNotification = ref(false)
let beepSound: HTMLAudioElement | undefined = undefined
const beepingInterval = useIntervalFn(() => void beepSound.play(), 2500, {
  immediate: false,
  immediateCallback: true,
})

const focusInput = () => {
  input.value.selectionStart = input.value.value.length
  input.value.focus()
}

const preventNonNumericInput = (event: KeyboardEvent) => {
  if (!isDigit(event.key)) {
    event.preventDefault()
  }
}

const numbers = computed(() => {
  const valueAsNumbers = Array.from(rawValue.value, Number)
  const numOfLeadingZeros = MAX_INPUT_LENGTH - rawValue.value.length
  const leadingZeros = new Array(numOfLeadingZeros).fill(
    0,
    0,
    numOfLeadingZeros
  )
  return [...leadingZeros, ...valueAsNumbers]
})

const parsedSeconds = computed(() => {
  const [h1, h2, m1, m2, s1, s2] = numbers.value
  const hours = h1 * 10 + h2
  const minutes = m1 * 10 + m2
  const seconds = s1 * 10 + s2
  return hours * 60 * 60 + minutes * 60 + seconds
})

const decrementTime = () => {
  if (parsedSeconds.value > 1) {
    const seconds = parsedSeconds.value - 1
    rawValue.value = secondsToRawValue(seconds)
    title.value = `${secondsInReadableForm(seconds)} - Frontend Tools`
  } else {
    countingDown.value = false
    rawValue.value = ""
    showNotificationAndStartBeeping()
  }
}

const { startInterval, pauseInterval } = useBackgroundInterval(decrementTime)

watch(countingDown, (newValue) => {
  if (newValue) {
    if (!beepSound) {
      beepSound = loadBeepSound()
    }
    const time = secondsInReadableForm(parsedSeconds.value)
    title.value = `${time} - Frontend Tools`
    startInterval()
  } else {
    title.value = "Frontend Tools"
    pauseInterval()
  }
})

const secondsInReadableForm = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToDuration(totalSeconds)

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

const secondsToRawValue = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToDuration(totalSeconds)
  const timeAsStringWithLeadingZeros = [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .join("")

  return dropLeadingZeros(timeAsStringWithLeadingZeros)
}

const startButtonDisabled = computed(
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
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition duration-250 ease-out;
}

.slide-up-enter-from {
  @apply translate-y-7 opacity-0;
}

.slide-up-leave-to {
  @apply -translate-y-7 opacity-0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition;
}

.slide-left-enter-from,
.slide-left-leave-to {
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
