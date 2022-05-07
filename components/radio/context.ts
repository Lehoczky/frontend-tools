import { InjectionKey, Ref } from "vue"

export interface RadioGroupState {
  id: string
  value: Ref<unknown>
  change(nextValue: unknown): void
}

export const RadioGroupContext = Symbol(
  "RadioGroupContext"
) as InjectionKey<RadioGroupState>

export function useRadioGroupContext(component: string) {
  const context = inject(RadioGroupContext, null)

  if (context === null) {
    throw new Error(
      `<${component} /> is missing a parent <RadioGroup /> component.`
    )
  }

  return context
}
