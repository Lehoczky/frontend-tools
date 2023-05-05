<template>
  <div>
    <h1 class="mb-article-heading text-3xl">Timer</h1>

    <div class="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div
        class="flex cursor-text rounded-md bg-base-500 px-5 py-4 text-xl outline-none ring-gray-600 focus-within:ring"
        :class="{
          'text-opacity-50': editing,
        }"
        @click="focusInput"
      >
        <TimerDigit
          :fade="editing && rawValue.length <= 5"
          :hide="!editing && numbers[0] === 0 && rawValue.length <= 5"
        >
          {{ numbers[0] }}
        </TimerDigit>
        <TimerDigit
          :fade="editing && rawValue.length <= 4"
          :hide="!editing && numbers[1] === 0 && rawValue.length <= 4"
        >
          {{ numbers[1] }}
        </TimerDigit>
        <TimerCharacter
          class="mr-2"
          :fade="editing && rawValue.length <= 4"
          :hide="!editing && numbers[1] === 0 && rawValue.length <= 4"
        >
          h
        </TimerCharacter>
        <TimerDigit
          :fade="editing && rawValue.length <= 3"
          :hide="!editing && numbers[2] === 0 && rawValue.length <= 3"
        >
          {{ numbers[2] }}
        </TimerDigit>
        <TimerDigit
          :fade="editing && rawValue.length <= 2"
          :hide="!editing && numbers[3] === 0 && rawValue.length <= 2"
        >
          {{ numbers[3] }}
        </TimerDigit>
        <TimerCharacter
          class="mr-2"
          :fade="editing && rawValue.length <= 2"
          :hide="!editing && numbers[3] === 0 && rawValue.length <= 2"
        >
          m
        </TimerCharacter>
        <TimerDigit
          :fade="editing && rawValue.length <= 1"
          :hide="!editing && numbers[4] === 0 && rawValue.length <= 1"
        >
          {{ numbers[4] }}
        </TimerDigit>
        <TimerDigit :fade="editing && rawValue.length === 0">
          {{ numbers[5] }}
        </TimerDigit>
        <TimerCharacter :fade="editing && rawValue.length === 0">
          s
        </TimerCharacter>

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

      <TimerControlButtons
        v-model:counting-down="countingDown"
        :start-disabled="startButtonDisabled"
      />
    </div>

    <div class="flex flex-wrap gap-4">
      <Button :disabled="countingDown" @click="rawValue = '500'">
        <IconTea class="h-5 w-5 fill-current" />
        Chamomile tea
      </Button>

      <Button :disabled="countingDown" @click="rawValue = '800'">
        <IconTea class="h-5 w-5 fill-current" />
        Fruit tea
      </Button>

      <Button :disabled="countingDown" @click="rawValue = '2500'">
        <IconChicken class="h-5 w-5 fill-current" />
        Chicken
      </Button>

      <Button :disabled="countingDown" @click="rawValue = '1500'">
        <IconCurry class="h-5 w-5 fill-current" />
        Chickpea Curry
      </Button>
    </div>

    <TransitionSlideInLeft>
      <LazyTimerNotification
        v-if="showNotification"
        @ok="closeNotificationAndStopBeeping"
      />
    </TransitionSlideInLeft>
  </div>
</template>

<script setup lang="ts">
import { dropLeadingZeros, isDigit, secondsToDuration } from "~~/utils"

const MAX_INPUT_LENGTH = 6
const input = ref<HTMLInputElement>()
const editing = ref(false)
const rawValue = ref("")
const title = ref("Timer")

const countingDown = ref(false)
const showNotification = ref(false)
const beep = useBeeping()

useHead({ title })

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
    title.value = `${secondsInReadableForm(seconds)}`
  } else {
    countingDown.value = false
    rawValue.value = ""
    showNotificationAndStartBeeping()
  }
}

const { startInterval, pauseInterval } = useBackgroundInterval(decrementTime)

watch(countingDown, (newValue) => {
  if (newValue) {
    beep.load()
    const time = secondsInReadableForm(parsedSeconds.value)
    title.value = `${time}`
    startInterval()
  } else {
    title.value = "Timer"
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
  beep.resume()
}

const closeNotificationAndStopBeeping = () => {
  showNotification.value = false
  beep.pause()
}
</script>
