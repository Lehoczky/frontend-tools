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
        @click="focusInput()"
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

      <button
        class="transition-color inline-flex items-center gap-1.5 rounded-md bg-base-500 px-4 py-2 ease-out hover:bg-base-400 active:scale-95 disabled:opacity-50 disabled:hover:bg-base-500 disabled:active:scale-100"
        :disabled="countingDown"
        @click="rawValue = '500'"
      >
        <IconTea class="h-5 w-5 fill-current" />
        Chamomile tea
      </button>

      <button
        class="transition-color inline-flex items-center gap-1.5 rounded-md bg-base-500 px-4 py-2 ease-out hover:bg-base-400 active:scale-95 disabled:opacity-50 disabled:hover:bg-base-500 disabled:active:scale-100"
        :disabled="countingDown"
        @click="rawValue = '800'"
      >
        <IconTea class="h-5 w-5 fill-current" />
        Fruit tea
      </button>

      <div class="relative h-10">
        <Transition name="slide-up">
          <button
            v-if="!countingDown"
            class="absolute inline-flex items-center gap-1.5 rounded-md bg-sky-800 px-4 py-2 will-change-transform hover:bg-sky-700 active:scale-95 disabled:opacity-50 disabled:hover:bg-sky-800 disabled:active:scale-100"
            :disabled="startButtonDisabled"
            @click="startCountdown()"
          >
            Start
            <IconPlay />
          </button>

          <button
            v-else
            class="absolute inline-flex items-center gap-1.5 rounded-md bg-rose-800 px-4 py-2 will-change-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            :disabled="!countingDown"
            @click="pauseCountdown()"
          >
            Pause
            <IconPause />
          </button>
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
          @click="closeNotificationAndStopBeeping()"
        >
          OK
        </button>
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
import { dropLeadingZeros, isDigit, secondsToDuration } from "~~/utils"

const MAX_INPUT_LENGTH = 6
const input = ref<HTMLInputElement>()
const editing = ref(false)
const rawValue = ref("")
const title = ref("Frontend Tools")
const countingDown = ref(false)
let countdownTimeout: ReturnType<typeof setTimeout> | undefined = undefined
const showNotification = ref(false)
const beepSound = new Audio(
  "data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
)
// TODO: Webworker to work with inactive tabs
const beepingInterval = useIntervalFn(() => beepSound.play(), 2500, {
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
  const leadingZeros = Array(numOfLeadingZeros).fill(0, 0, numOfLeadingZeros)
  return [...leadingZeros, ...valueAsNumbers]
})

const parsedSeconds = computed(() => {
  const [h1, h2, m1, m2, s1, s2] = numbers.value
  const hours = h1 * 10 + h2
  const minutes = m1 * 10 + m2
  const seconds = s1 * 10 + s2
  return hours * 60 * 60 + minutes * 60 + seconds
})

const startCountdown = () => {
  countingDown.value = true
  const time = secondsInReadableForm(parsedSeconds.value)
  title.value = `${time} - Frontend Tools`
  countdownTimeout = setTimeout(() => decrementTime(), 1000)
}

const pauseCountdown = () => {
  countingDown.value = false
  title.value = "Frontend Tools"
  clearTimeout(countdownTimeout)
}

const decrementTime = () => {
  if (parsedSeconds.value > 1) {
    const seconds = parsedSeconds.value - 1
    rawValue.value = secondsToRawValue(seconds)
    title.value = `${secondsInReadableForm(seconds)} - Frontend Tools`
    countdownTimeout = setTimeout(() => decrementTime(), 1000)
  } else {
    countingDown.value = false
    rawValue.value = ""
    title.value = "Frontend Tools"
    showNotificationAndStartBeeping()
  }
}

const secondsInReadableForm = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToDuration(totalSeconds)

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

const secondsToRawValue = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToDuration(totalSeconds)
  const timeAsStringWithLeadingZeros = [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
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
