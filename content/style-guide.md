# Web Style Guide

<!-- https://github.com/ryanmcdermott/clean-code-javascript -->
<!-- https://github.com/airbnb/javascript -->
<!-- https://google.github.io/styleguide/jsguide.html -->

## Variables

### Use meaningful and pronounceable variable names

```ts
// Bad
const yyyymmdstr = moment().format("YYYY/MM/DD")

// Good
const currentDate = moment().format("YYYY/MM/DD")
```

### Don't abbreviate

Using complete words results in more readable code. Not everyone knows all your abbreviations.

```ts
// Bad
let e = new Error()
let e = document.createEvent("Event")

// Good
let error = new Error()
let event = document.createEvent("Event")
```

There can be exceptions when using abbreviations are conventional:

- indexes in `for` loops, like `i` and `j`
- library related conventions, like `req`, `res`, `ctx` when using express.js

Enforced by: [eslint unicorn - prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md)

### Avoid Mental Mapping

Explicit is better than implicit.

```ts
// Bad
const locations = ["Austin", "New York", "San Francisco"]
locations.forEach((l) => {
  doStuff()
  doSomeOtherStuff()
  // ...
  // ...
  // ...
  // Wait, what is `l` for again?
  dispatch(l)
})

// Good
const locations = ["Austin", "New York", "San Francisco"]
locations.forEach((location) => {
  doStuff()
  doSomeOtherStuff()
  // ...
  // ...
  // ...
  dispatch(location)
})
```

### Don't use magic numbers

A **magic number** is a numeric literal that is used in the code without any explanation of its meaning. The use of magic numbers makes programs less readable and hence more difficult to maintain and update.

```ts
// Bad
function getTotal(subtotal: number) {
  const total = subtotal + 9.95
  return total + total * 0.1
}

// Good
const SHIPPING_FEE = 9.95
const SALES_TAX = 0.1

function getTotal(subtotal: number) {
  const total = subtotal + SHIPPING_FEE
  return total + total * SALES_TAX
}
```

Exceptions can be when using `0` or `-1` in array indexes, but prefer to use utility functions instead:

```ts
// Can be okay
const array = [0, 1, 2]
const firstElement = array[0]
const lastElement = array[array.length - 1]

// Better
import { first, last } from "lodash-es"

const array = [0, 1, 2]
const firstElement = first(array)
const lastElement = last(array)
```

Enforced by: [eslint - no-magic-numbers](https://eslint.org/docs/latest/rules/no-magic-numbers#rule-details)

### Use explanatory variables

Prefer to use more variables when they can be used to give meaning to intermediate values.

```ts
// Bad
const address = "One Infinite Loop, Cupertino 95014"
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
)

// Good
const address = "One Infinite Loop, Cupertino 95014"
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
const [_, city, zipCode] = address.match(cityZipCodeRegex) || []
saveCityZipCode(city, zipCode)
```

### Don't add unneeded context

If your class/object name tells you something, don't repeat that in your variable name.

```ts
// Bad
const car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue",
}

// Good
const car = {
  make: "Honda",
  model: "Accord",
  color: "Blue",
}
```

## Numbers

## Strings

## Arrays

## Objects

## Functions

### Don't use flags as function parameters

Flags tell your user that this function does more than one thing. Functions should do one thing. Split out your functions if they are following different code paths based on a boolean.

```ts
// Bad
function createFile(name: string, temporary: boolean) {
  if (temporary) {
    fs.create(`./temp/${name}`)
  } else {
    fs.create(name)
  }
}

// Good
function createFile(name: string) {
  fs.create(name)
}

function createTemporaryFile(name: string) {
  createFile(`./temp/${name}`)
}
```

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

## Control structures

### Encapsulate conditionals

```ts
//  Bad
if (fsm.state === "fetching" && isEmpty(listNode)) {
  // ...
}

// Good
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode)
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}

// Still good
const shouldShowSpinner = fsm.state === "fetching" && isEmpty(listNode)
if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```

### Prefer `for-of` loops

Many developers default to writing for `(let i = 0; i < ...` loops to iterate over arrays. However, in many of those arrays, the loop iterator variable (e.g. `i`) is only used to access the respective element of the array. In those cases, a `for-of` loop is easier to read and write.

```ts
// Bad
for (let i = 0; i < array.length; i++) {
  console.log(array[i])
}

// Good
for (const element of array) {
  console.log(element)
}
```

Enforced by: [typescript-eslint - prefer-for-of](https://typescript-eslint.io/rules/prefer-for-of)

## Comments

### Only comment things that have business logic complexity

Comments are an apology, not a requirement. Good code _mostly_ documents itself.

```ts
// Bad
function hashIt(data: string) {
  // The hash
  let hash = 0

  // Length of string
  const length = data.length

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i)
    // Make the hash
    hash = (hash << 5) - hash + char
    // Convert to 32-bit integer
    hash &= hash
  }
}

// Good
function hashIt(data: string) {
  let hash = 0
  const length = data.length

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i)
    hash = (hash << 5) - hash + char

    // Convert to 32-bit integer
    hash &= hash
  }
}
```

### Don't commit commented out code

With modern revision control available, there is no reason to save commented-out code to your repository.

```ts
// Bad
doStuff()
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();

// Good
doStuff()
```

### Don't have journal comments

Remember, use version control! There's no need for dead code, commented code, and especially journal comments. Use `git log` to get history!

```ts
// Bad

/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a: any, b: any) {
  return a + b
}

// Good
function combine(a: any, b: any) {
  return a + b
}
```

### Avoid positional markers

They usually just add noise. Let the functions and variable names along with the proper indentation and formatting give the visual structure to your code.

```ts
// Bad

////////////////////////////////////////////////////////////////////////////////
// Scope Model Instantiation
////////////////////////////////////////////////////////////////////////////////
scope.model = {
  menu: "foo",
  nav: "bar",
}

////////////////////////////////////////////////////////////////////////////////
// Action setup
////////////////////////////////////////////////////////////////////////////////
const actions = function () {
  // ...
}

// Good
scope.model = {
  menu: "foo",
  nav: "bar",
}

const actions = function () {
  // ...
}
```

## TypeScript only

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
