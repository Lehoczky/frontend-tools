import { round } from "lodash-es"

export const toREMWithFixedPrecision = (number: unknown, precision = 3) => {
  return round(Number(number) / 16, precision)
}

export const toPX = (number: unknown) => Number(number) * 16
