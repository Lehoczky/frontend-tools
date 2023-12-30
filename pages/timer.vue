<template>
  <div>
    <h1 class="mb-article-heading text-3xl">Timer</h1>

    <div class="mb-12 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end">
      <TimerInput
        v-model="rawValue"
        :disabled="countingDown"
        @keyup.enter="startCountdown"
        @keyup.space="startCountdown"
      >
        <template #default="{ editing, caretPosition }">
          <TimerDigit
            :fade="editing && rawValue.length <= 5"
            :hide="!editing && numbers[0] === 0 && rawValue.length <= 5"
            :show-caret="editing && caretPosition === 5"
          >
            {{ numbers[0] }}
          </TimerDigit>
          <TimerDigit
            :fade="editing && rawValue.length <= 4"
            :hide="!editing && numbers[1] === 0 && rawValue.length <= 4"
            :show-caret="editing && caretPosition === 4"
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
            :show-caret="editing && caretPosition === 3"
          >
            {{ numbers[2] }}
          </TimerDigit>
          <TimerDigit
            :fade="editing && rawValue.length <= 2"
            :hide="!editing && numbers[3] === 0 && rawValue.length <= 2"
            :show-caret="editing && caretPosition === 2"
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
            :show-caret="editing && caretPosition === 1"
          >
            {{ numbers[4] }}
          </TimerDigit>
          <TimerDigit
            :fade="editing && rawValue.length === 0"
            :show-caret="editing && caretPosition === 0"
          >
            {{ numbers[5] }}
          </TimerDigit>
          <TimerCharacter :fade="editing && rawValue.length === 0">
            s
          </TimerCharacter>
        </template>
      </TimerInput>

      <TimerControlButtons
        v-model:counting-down="countingDown"
        :start-disabled="startButtonDisabled"
      />
    </div>

    <div class="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-3">
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
import { MAX_INPUT_LENGTH } from "@/components/Timer/TimerInput.vue"

const rawValue = ref("")
const title = ref("Timer")

const countingDown = ref(false)
const showNotification = ref(false)
const beep = useBeeping()

useHead({ title })

const numbers = computed(() => {
  const valueAsNumbers = Array.from(rawValue.value, Number)
  const numOfLeadingZeros = MAX_INPUT_LENGTH - rawValue.value.length
  const leadingZeros = new Array(numOfLeadingZeros).fill(
    0,
    0,
    numOfLeadingZeros,
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
  () => countingDown.value || parsedSeconds.value === 0,
)

function startCountdown() {
  countingDown.value = true
}

const showNotificationAndStartBeeping = () => {
  showNotification.value = true
  beep.resume()
}

const closeNotificationAndStopBeeping = () => {
  showNotification.value = false
  beep.pause()
}
</script>
