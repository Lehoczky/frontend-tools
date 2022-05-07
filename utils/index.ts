/**
 *
 * @see {@link https://stackoverflow.com/a/18358056/10876366}
 */
export const toFixedPrecision = (number: number, precision = 3) => {
  return +(Math.round((number + `e+${precision}`) as any) + `e-${precision}`)
}
