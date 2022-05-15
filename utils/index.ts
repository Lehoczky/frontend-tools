import { round, dropWhile, first, countBy } from "lodash-es"

export const toREMWithFixedPrecision = (number: unknown, precision = 3) => {
  return round(Number(number) / 16, precision)
}

export const toPX = (number: unknown) => Number(number) * 16

export const isDigit = (string: string) => /^\d+$/.test(string)

export const startsWithDigit = (string: string) => isDigit(first(string))

export const hasOneDot = (string: string) => countBy(string)["."] === 1

export const endsWithDot = (string: string) => string.endsWith(".")

export const dropLeadingZeros = (value: string) => {
  return dropWhile(value, (letter) => letter === "0").join("")
}

export const secondsToDuration = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor(totalSeconds / 60) % 60
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}
