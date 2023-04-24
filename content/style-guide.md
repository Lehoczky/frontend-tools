# Web Style Guide

## Variables

## Numbers

## Strings

## Arrays

## Objects

## Functions

### Only use arrow shorthand callback when the code fits into one line

```ts
// Bad
const reallyLongVariableName = computed(
  () => Math.pow(10, 10) + Math.round(2.1)
)

// Good
const reallyLongVariableName = computed(() => {
  return Math.pow(10, 10) + Math.round(2.1)
})

// Still good - fits into one line
const reallyLongVariableName = computed(() => Math.pow(10, 10))
```

### Prefer callback shorthand for unbound named functions

```ts
// Bad
;[0, 1, 2].forEach((x) => console.log(x))

// Good
;[0, 1, 2].forEach(console.log)
```

## Classes

## TypeScript

## Vue

## Formatting

### Use [Prettier](https://prettier.io/)

Why?

- automatically enforced style guide
- programmers won't need to think about how they should format their code
- programmers can focus on how their code works
- consistency across every source file
- code will always feel familiar, regardless who wrote it

::callout

#summary
Why not use linters for formatting?

#content
Although linters usually have rules regarding formatting, their maintainers are moving away from them, and recommend using prettier too.

- [Eslint has moved away](https://eslint.org/blog/2020/05/changes-to-rules-policies) from stylistic rules:

> Stylistic rules are frozen - we won't be adding any more options to stylistic rules. We've learned that there's no way to satisfy everyone's personal preferences, and most of the rules already have a lot of difficult-to-understand options. Stylistic rules are those related to spacing, conventions, and generally anything that does not highlight an error or a better way to do something.

- The typescript-eslint team [directly recommends prettier](https://typescript-eslint.io/linting/troubleshooting/formatting/):

> We strongly recommend against using ESLint for formatting. We strongly recommend using Prettier, dprint, or an equivalent instead.

- Stylelint [deprecated all their stylistic rules](https://stylelint.io/migration-guide/to-15/#deprecated-stylistic-rules):

> We've deprecated 76 of the rules that enforce stylistic conventions, e.g. indentation.
>
> When we created these rules, pretty printers (like Prettier) didn't exist. They now offer a better way to consistently format code, especially whitespace. Linters and pretty printers are complementary tools that work together to help you write consistent and error-free code.

::

### No semicolons

Why?

- Less characters, cleaner source files
- easier to navigate to the end of each line
- easier to extend method chains

Enforced by: [Prettier - Semi](https://prettier.io/docs/en/options.html#semicolons)

::callout

#summary
Why are they turned on for prettier by default?

#content
They are turned on by default to prevent parsing bugs, but they are [less relevant in TypeScript](https://medium.com/@eugenkiss/dont-use-semicolons-in-typescript-474ccfe4bdb3) and generally when programmers write cleaner code.

Example to avoid errors with simply writing cleaner code:

```ts
// This is a popular example arguing for semicolons,
// lines starting with `[` would usually introduce runtime errors
;["purple", "red"].forEach(console.log)
```

```ts
// Instead, just store the array in a variable.
// Now we know what the the array represents.
const colors = ["purple", "red"]
colors.forEach(console.log)
```

::
