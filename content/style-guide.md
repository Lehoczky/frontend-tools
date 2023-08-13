# Web Style Guide

<!-- https://github.com/ryanmcdermott/clean-code-javascript -->
<!-- https://github.com/airbnb/javascript -->
<!-- https://google.github.io/styleguide/tsguide.html -->
<!-- https://github.com/rwaldron/idiomatic.js -->

All code in any code-base should look like a single person typed it, no matter how many people contributed.

> "Arguments over style are pointless. There should be a style guide, and you should follow it"
>
> Rebecca Murphey

## Variables

### Don't use `var`

`const` and `let` are block scoped, like variables in most other languages. `var` in JavaScript is function scoped, which can cause difficult to understand bugs. Don't use it.

```ts
// Bad
var value = 42

// Good
const foo = 42
let bar = 42
```

**Enforced with:** [no-var](https://eslint.org/docs/latest/rules/no-var)

### Prefer `const` over `let`

If a variable is never reassigned, using the `const` declaration is better.

`const` declaration tells readers, “this variable is never reassigned,” reducing cognitive load and improving maintainability.

```ts
const foo = otherValue // Use if "foo" never changes.
let bar = someValue // Use if "bar" is ever assigned into later on.
```

**Enforced with:** [prefer-const](https://eslint.org/docs/latest/rules/prefer-const)

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

**Additional Reading:**

- [Alienating the Audience: How Abbreviations Hamper Scientific Communication](https://www.psychologicalscience.org/observer/alienating-the-audience-how-abbreviations-hamper-scientific-communication)
- [Why You Should Stop Using Acronyms Right Now](https://www.inc.com/jeff-steen/why-you-should-stop-using-acronyms-right-now.html)

**Enforced with:** [unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md)

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

**Enforced with:** [no-magic-numbers](https://eslint.org/docs/latest/rules/no-magic-numbers#rule-details)

### Use explanatory variables

Prefer to use more variables when they can be used to give meaning to intermediate values.

```ts
// Bad
const address = "One Infinite Loop, Cupertino 95014"
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2],
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

### Use numeric separators

Long numbers can become really hard to read, so cutting it into groups of digits, separated with a `_`, is important to keep your code clear. See more at: [MDN - Numeric separators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators)

```ts
// Bad
const foo = 1234444

// Good
const foo = 1_234_444
```

**Enforced with:** [unicorn/numeric-separators-style](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md)

### Prefer `Number.isNaN()` over `isNaN()`

The [Number.isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) static method determines whether the passed value is the number value [NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN).

Despite the name, the purpose of the [isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) function isn't to check whether a value is `NaN`. Instead, the purpose is to check whether a value cannot be coerced to a number. This can lead to unexpected results. Check the examples below:

```ts
isNaN(NaN) // true
isNaN(Number.NaN) // true
isNaN(0 / 0) // true
isNaN("NaN") // true
isNaN(undefined) // true
isNaN({}) // true
isNaN("blabla") // true
isNaN(true) // false
isNaN(null) // false
isNaN(37) // false
isNaN("37") // false
isNaN("37.37") // false
isNaN("") // false
isNaN(" ") // false

Number.isNaN(NaN) // true
Number.isNaN(Number.NaN) // true
Number.isNaN(0 / 0) // true
Number.isNaN("NaN") // false
Number.isNaN(undefined) // false
Number.isNaN({}) // false
Number.isNaN("blabla") // false
Number.isNaN(true) // false
Number.isNaN(null) // false
Number.isNaN(37) // false
Number.isNaN("37") // false
Number.isNaN("37.37") // false
Number.isNaN("") // false
Number.isNaN(" ") // false
```

## Strings

### Strings that cause the line to go over 80 characters should not be written across multiple lines using string concatenation

Broken strings are painful to work with and make code less searchable.

```ts
// bad
const errorMessage =
  "This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast."

// bad
const errorMessage =
  "This is a super long error that was thrown because " +
  "of Batman. When you stop to think about how Batman had anything to do " +
  "with this, you would get nowhere fast."

// good
const errorMessage =
  "This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast."
```

### When programmatically building up strings, use template strings instead of concatenation

```ts
// bad
function sayHi(name: string) {
  return "How are you, " + name + "?"
}

// bad
function sayHi(name: string) {
  return ["How are you, ", name, "?"].join()
}

// good
function sayHi(name: string) {
  return `How are you, ${name}?`
}
```

**Why?**

Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

**Enforced with:** [prefer-template](https://eslint.org/docs/latest/rules/prefer-template)

### Prefer `.includes()` over `.indexOf()` when checking for existence or non-existence

Strings have [.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) in addition to [.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf). Prefer `.includes()` over comparing the value of `.indexOf()`.

```ts
// Bad
str.indexOf("foo") > -1
str.indexOf("foo") === -1

// Good
str.includes("foo")
!str.includes("foo")
```

**Enforced with:** [unicorn/prefer-includes](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md)

### Prefer the spread operator over `String.split('')`

```ts
// Bad
const characters = string.split("")

// Good
const characters = [...string]
```

**Enforced with:** [unicorn/prefer-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md)

### Prefer `String.startsWith()` and `String.endsWith()`

There are multiple ways to verify if a string starts or ends with a specific string, such as `foo.indexOf('bar') === 0`{lang="ts"}. As of ES2015, the most common way in JavaScript is to use [String.startsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) and [String.endsWith()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith). Keeping to those methods consistently helps with code readability.

```ts
// Bad
foo[0] === "b"
foo.charAt(0) === "b"
foo.indexOf("bar") === 0
foo.slice(0, 3) === "bar"
foo.substring(0, 3) === "bar"
foo.match(/^bar/) != null
;/^bar/.test(foo)

// ends with
foo[foo.length - 1] === "b"
foo.charAt(foo.length - 1) === "b"
foo.lastIndexOf("bar") === foo.length - 3
foo.slice(-3) === "bar"
foo.substring(foo.length - 3) === "bar"
foo.match(/bar$/) != null
;/bar$/.test(foo)

// Good
foo.startsWith("bar")
foo.endsWith("bar")
```

**Enforced with:** [typescript-eslint/prefer-string-starts-ends-with](https://typescript-eslint.io/rules/prefer-string-starts-ends-with)

## Arrays

### Combine multiple `Array.push()` into one call

[Array.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) accepts multiple arguments. Multiple calls should be combined into one.

```ts
// Bad
foo.push(1)
foo.push(2, 3)

// Good
foo.push(1, 2, 3)
```

**Enforced with:** [unicorn/no-array-push-push](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-push-push.md)

### Don't use `Array.reduce`

[Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) usually result in hard-to-read and [less performant](https://www.richsnapp.com/article/2019/06-09-reduce-spread-anti-pattern) code. In almost every case, it can be replaced by [.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), or a [for-of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop.

> All code using array.reduce should be rewritten without array.reduce so it's readable by humans
>
> [Jake Archibald](https://twitter.com/jaffathecake/status/1213077702300852224)

**Exception**: It's only somewhat useful in the rare case of summing up numbers

```ts
// Bad
array.reduce(reducer, initialValue)

// Good
let result = initialValue

for (const element of array) {
  result += element
}

// Still Good
array.reduce((total, value) => total + value)
```

**Enforced with:** [unicorn/no-array-reduce](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md)

### Prefer `Array.find` over first or last element from `.filter`

[Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) and [Array.findLast()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast) breaks the loop as soon as it finds a match and doesn't create a new array.

```ts
// Bad
const item = array.filter((x) => isUnicorn(x))[0]
const [item] = array.filter((x) => isUnicorn(x))

// Good
const item = array.find((x) => isUnicorn(x))
const item = array.findLast((x) => isUnicorn(x))
```

**Enforced with:** [unicorn/prefer-array-find](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md)

### Prefer `Array.flat()` over legacy techniques to flatten arrays

ES2019 introduced a new method [Array.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) that flatten arrays.

```ts
// Bad
const foo = array.flatMap((x) => x)
const foo = array.reduce((a, b) => [...a, ...b], [])
const foo = [].concat(...array)
const foo = _.flatten(array)

// Good
const foo = array.flat()
```

**Enforced with:** [unicorn/prefer-array-flat](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md)

### Prefer `.includes()` over `.indexOf()` and `Array.some()` when checking for existence or non-existence

Arrays have [.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) in addition to [.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf). Prefer `.includes()` over comparing the value of `.indexOf()`.

[Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) is intended for more complex needs. If you are just looking for the index where the given item is present, the code can be simplified to use `Array.includes()`. This applies to any search with a literal, a variable, or any expression that doesn't have any explicit side effects. However, if the expression you are looking for relies on an item related to the function (its arguments, the function self, etc.), the case is still valid.

```ts
// Bad
x.indexOf("foo") != -1
x.indexOf("foo") === -1
const isFound = foo.some((x) => x === "foo")

// Good
x.includes("foo")

// Still Good, `some` isn't used to find a literal value in the array
const isFound = foo.some((x) => x == undefined)
const isFound = foo.some((x) => x !== "foo")
const isFound = foo.some((x) => y.x === "foo")
```

**Enforced with:** [typescript-eslint/prefer-includes](https://typescript-eslint.io/rules/prefer-includes/)

### Prefer` Array.flatMap()` over `Array.map().flat()`

[Array.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) performs [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [Array.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) in one step.

```ts
// Bad
const foo = bar.map((element) => unicorn(element)).flat()
const foo = bar.map((element) => unicorn(element)).flat(1)

// Good
const foo = bar.flatMap((element) => unicorn(element))
const foo = bar.map((element) => unicorn(element)).flat(2)
const foo = bar.flat().map((element) => unicorn(element))
```

**Enforced with:** [unicorn/prefer-array-flat-map](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md)

### Prefer `Array.some()` over `Array.filter().length` or `Array.find()` check

```ts
// Bad
const hasUnicorn = array.filter(element => isUnicorn(element)).length > 0;
const hasUnicorn = array.filter(element => isUnicorn(element)).length !== 0;
const hasUnicorn = array.filter(element => isUnicorn(element)).length >= 1;
if (array.find(element => isUnicorn(element))) {
	// …
}
const foo = array.find(element => isUnicorn(element)) ? bar : baz;
const hasUnicorn = array.find(element => isUnicorn(element) !== undefined;


// Good
const hasUnicorn = array.some(element => isUnicorn(element));
if (array.some(element => isUnicorn(element))) {
	// …
}
const foo = array.find(element => isUnicorn(element)) || bar;
```

**Enforced with:** [unicorn/prefer-array-some](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md)

### Prefer the spread operator over `Array.from()`, `Array.concat()` and `Array.slice()`

Enforces the use of [the spread operator (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) over outdated patterns. This also helps keep consistency by using a single flexible operator instead of:

- [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Array.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [Array.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

```ts
// Bad
Array.from(set).map((element) => foo(element))
const array = array1.concat(array2)
const copy = array.slice()

// Good
;[...set].map((element) => foo(element))
const array = [...array1, ...array2]
const copy = [...array]
```

**Enforced with:** [unicorn/prefer-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md)

## Objects

### Use object method shorthand

```ts
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value
  },
}

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value
  },
}
```

**Enforced with:** [object-shorthand](https://eslint.org/docs/latest/rules/object-shorthand)

### Use property value shorthand

```ts
const lukeSkywalker = "Luke Skywalker"

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
}

// good
const obj = {
  lukeSkywalker,
}
```

**Enforced with:** [object-shorthand](https://eslint.org/docs/latest/rules/object-shorthand)

### Use object destructuring when accessing and using multiple properties of an object

Destructuring saves you from creating temporary references for those properties, and from repetitive access of the object. Repeating object access creates more repetitive code, requires more reading, and creates more opportunities for mistakes. Destructuring objects also provides a single site of definition of the object structure that is used in the block, rather than requiring reading the entire block to determine what is used.

```ts
interface User {
  firstName: string
  lastName: string
}

// bad
function getFullName(user: User) {
  const firstName = user.firstName
  const lastName = user.lastName

  return `${firstName} ${lastName}`
}

// good
function getFullName(user: User) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

// best
function getFullName({ firstName, lastName }: User) {
  return `${firstName} ${lastName}`
}
```

**Enforced with:** [prefer-destructuring](https://eslint.org/docs/latest/rules/prefer-destructuring)

### Use object destructuring for multiple return values, not array destructuring

```ts
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom]
}

// the caller needs to think about the order of return data
const [left, __, top] = processInput(input)

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom }
}

// the caller selects only the data they need
const { left, top } = processInput(input)
```

**Why?**

You can add new properties over time or change the order of things without breaking call sites.

### Don't use useless fallback when spreading in object literals

Spreading [falsy values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) in object literals won't add any unexpected properties, so it's unnecessary to add an empty object as fallback.

```ts
// Bad
const object = { ...(foo || {}) }
const object = { ...(foo ?? {}) }

// Good
const object = { ...foo }
const array = [...(foo || [])]
```

**Enforced with:** [unicorn/no-useless-fallback-in-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md)

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

### Function Declarations

Prefer `function foo() { ... }` to declare top-level named functions.

Top-level arrow functions _may_ be used, for example to provide an explicit type annotation.

```ts
// Bad
const foo = () => {
  // ...
}

// Good
function foo() {
  // ...
}

interface SearchFunction {
  (source: string, subString: string): boolean
}

const fooSearch: SearchFunction = (source, subString) => {
  // ...
}
```

### Only use arrow shorthand callback when the code fits into one line

```ts
// Bad
const reallyLongVariableName = computed(
  () => Math.pow(10, 10) + Math.round(2.1),
)

// Good
const reallyLongVariableName = computed(() => {
  return Math.pow(10, 10) + Math.round(2.1)
})

// Still good - fits into one line
const reallyLongVariableName = computed(() => Math.pow(10, 10))
```

### Prefer passing a function reference directly to iterator methods

```ts
// Bad
;[0, 1, 2].forEach((x) => console.log(x))

// Good
;[0, 1, 2].forEach(console.log)
```

## Classes

### Avoid useless constructors

It is unnecessary to provide an empty constructor or one that simply delegates into its parent class because ES2015 provides a default class constructor if one is not specified. However constructors with parameter properties, visibility modifiers or parameter decorators should not be omitted even if the body of the constructor is empty.

```ts
// Bad
class UnnecessaryConstructor {
  constructor() {}
}

class UnnecessaryConstructorOverride extends Base {
  constructor(value: number) {
    super(value)
  }
}

// Good
class DefaultConstructor {}

class ParameterProperties {
  constructor(private myService) {}
}

class ParameterDecorators {
  constructor(@SideEffectDecorator myService) {}
}

class NoInstantiation {
  private constructor() {}
}
```

**Enforced with:** [typescript-eslint/no-useless-constructor](https://typescript-eslint.io/rules/no-useless-constructor)

### Don't use `#private` fields

Do not use private fields (also known as private identifiers), instead, use TypeScript's visibility annotations:

```ts
// Bad
class Clazz {
  #ident = 1
}

// Good
class Clazz {
  private ident = 1
}
```

**Why?**

Private identifiers cause substantial emit size and performance regressions when down-leveled by TypeScript, and are unsupported before ES2015. They can only be downleveled to ES2015, not lower. At the same time, they do not offer substantial benefits when static type checking is used to enforce visibility.

### Don't use explicit `public` accessibility modifiers

TypeScript allows placing explicit `public`, `protected`, and `private` accessibility modifiers in front of class members. The modifiers exist solely in the type system and just serve to describe who is allowed to access those members.

Leaving off accessibility modifiers makes for less code to read and write. Members are `public` by default.

```ts
// Bad
class Foo {
  public bar = 1
  private asd = 2
}

// Good
class Foo {
  bar = 1
  private asd = 2
}
```

**Enforced with:** [typescript-eslint/explicit-member-accessibility](https://typescript-eslint.io/rules/explicit-member-accessibility)

### Prefer parameter properties

Rather than plumbing an obvious initializer through to a class member, use a TypeScript [parameter property](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties).

```ts
// Bad
class Foo {
  private readonly barService: BarService

  constructor(barService: BarService) {
    this.barService = barService
  }
}

// Good
class Foo {
  constructor(private readonly barService: BarService) {}
}
```

### Field initializers

If a class member is not a parameter, initialize it where it's declared, which sometimes lets you drop the constructor entirely.

```ts
// Bad
class Foo {
  private readonly userList: string[]

  constructor() {
    this.userList = []
  }
}

// Good
class Foo {
  private readonly userList: string[] = []
}
```

### Class methods must use `this`

Class methods should use `this` or be made into a static method unless an external library or framework requires using specific non-static methods. Being an instance method should indicate that it behaves differently based on properties of the receiver.

Another alternative is to pull the function out of the class declaration

```ts
// Bad
class Foo {
  bar() {
    console.log("bar")
  }
}

// Good
class Foo {
  bar() {
    console.log(this.bar)
  }
}

class Foo {
  static bar() {
    console.log("bar")
  }
}
```

**Enforced with:** [class-methods-use-this](https://eslint.org/docs/latest/rules/class-methods-use-this)

### Container Classes

Do not create container classes with static methods or properties for the sake of namespacing.

```ts
// Bad
export class Container {
  static FOO = 1
  static bar() {
    return 1
  }
}

// Good
export const FOO = 1
export function bar() {
  return 1
}
```

**Why?**

- Wrapper classes add extra cognitive complexity to code without adding any structural improvements
  - Whatever would be put on them, such as utility functions, are already organized by virtue of being in a module.
  - As an alternative, you can `import * as ...` the module to get all of them in a single object.
- IDEs can't provide as good suggestions for static class or namespace imported properties when you start typing property names
- It's more difficult to statically analyze code for unused variables, etc. when they're all on the class ([see: Finding dead code (and dead types) in TypeScript](https://effectivetypescript.com/2020/10/20/tsprune/)).

**Enforced with:** [no-extraneous-class](https://typescript-eslint.io/rules/no-extraneous-class)

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

### Don't use short circuiting operators in place of control statements

```ts
// bad
!isRunning && startRunning()

// good
if (!isRunning) {
  startRunning()
}
```

### Prefer ternary expressions over simple `if-else` statements

"simple" means the consequent and alternate are each one line and have the same basic type and form.

Using an `if-else` statement typically results in more lines of code than a single-line ternary expression, which leads to an unnecessarily larger codebase that is more difficult to maintain.

Additionally, using an `if-else` statement can result in defining variables using `let` or `var` solely to be reassigned within the blocks. This leads to variables being unnecessarily mutable.

```ts
// Bad
function unicorn() {
  if (test) {
    return a
  } else {
    return b
  }
}

if (test) {
  throw new Error("foo")
} else {
  throw new Error("bar")
}

let foo
if (test) {
  foo = 1
} else {
  foo = 2
}

// Good
function unicorn() {
  return test ? a : b
}

const error = test ? new Error("foo") : new Error("bar")
throw error

const foo = test ? 1 : 2
```

**Enforced with:** [unicorn/prefer-ternary](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md)

### Don't nest ternary expressions

Nesting ternary expressions can make code more difficult to understand.

```ts
// Bad
const thing = foo ? bar : baz === qux ? quxx : foobar

// Good
const thing = foo ? bar : foobar

let thing
if (foo) {
  thing = bar
} else if (baz === qux) {
  thing = quxx
} else {
  thing = foobar
}
```

**Enforced with:** [unicorn/no-nested-ternary](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md)

### Don't ignore the return value of ternary expression

Use `if-else` blocks when you don't care about the value of the ternary expression left and right side.

```ts
// Bad
a ? b() : c()

// Good
const value = a ? b() : c()

function foo(a, b, c) {
  return a ? b() : c()
}
```

**Enforced with:** [typescript-eslint/no-unused-expressions](https://typescript-eslint.io/rules/no-unused-expressions/)

### Prefer using a logical operator over a ternary

Don't use ternary operators when simpler logical operator alternatives exist.

```ts
// Bad
foo ? foo : bar
foo.bar ? foo.bar : foo.baz
foo?.bar ? foo.bar : baz
!bar ? foo : bar

// Good
foo ?? bar
foo || bar
foo ? bar : baz
foo.bar ?? foo.baz
foo?.bar ?? baz
```

**Enforced with:** [unicorn/prefer-logical-operator-over-ternary](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md)

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

**Enforced with:** [typescript-eslint/prefer-for-of](https://typescript-eslint.io/rules/prefer-for-of)

## Exceptions

### Instantiate Errors using new

Always use `new Error()` when instantiating exceptions, instead of just calling `Error()`. Both forms create a new `Error` instance, but using new is more consistent with how other objects are instantiated.

```ts
// Bad
throw Error("Foo is not a valid bar.")

// Good
throw new Error("Foo is not a valid bar.")
```

**Enforced with:** [unicorn/throw-new-error](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v46.0.0/docs/rules/throw-new-error.md)

### Only throw Errors

JavaScript (and thus TypeScript) allow throwing arbitrary values. However if the thrown value is not an `Error`, it does not get a stack trace filled in, making debugging hard.

```ts
// Bad
throw "oh noes!"

// Good
throw new Error("oh noes!")
```

**Enforced with:** [typescript-eslint/no-throw-literal](https://typescript-eslint.io/rules/no-throw-literal)

### Pass message to built-in `Error`

A message should be passed when creating an instance of a built-in `Error` object, which leads to more readable and debuggable code.

```ts
// Bad
throw Error()
throw Error("")

// Good
throw Error("Unexpected property.")
```

**Enforced with:** [unicorn/error-message](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md)

### Use "error" as parameter name in `catch` clauses

Error parameters [shouldn't be abbreviated](#dont-abbreviate), and they are more searchable if they always have the same name.

```ts
// Bad
try {
  doSomething()
} catch (e: unknown) {
  // ...
}

try {
  doSomething()
} catch (err: unknown) {
  // ...
}

try {
  doSomething()
} catch (exception: unknown) {
  // ...
}

// Good
try {
  doSomething()
} catch (error: unknown) {
  // ...
}
```

**Exception:** Descriptive names, for example, `fsError` or `authenticationError`.

```ts
try {
  login()
} catch (authenticationError: unknown) {
  // ...
}
```

**Enforced with:** [unicorn/catch-error-name](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md)

### Assert thrown errors are instances of `Error`

When catching errors, code _should_ assume that all thrown errors are instances of `Error`. Type checks can still be made for `Error` subclasses like `if(error instanceof AxiosError...`.

```ts
// Bad
try {
  doSomething()
} catch (error: unknown) {
  if (error instanceof Error) {
    displayError(error.message)
  }
}

// Good
try {
  doSomething()
} catch (error: unknown) {
  assertIsError(error)
  displayError(error.message)
}

function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw error
  }
}
```

Exception handlers must not defensively handle non-`Error` types unless the called API is conclusively known to throw non-`Errors` in violation of the above rule. In that case, a comment should be included to specifically identify where the non-`Errors` originate.

```ts
try {
  badApiThrowingStrings()
} catch (error: unknown) {
  // Note: bad API throws strings instead of errors.
  if (typeof error === "string") {
    //  ...
  }
}
```

**Why?**

Avoid [overly defensive programming](https://en.wikipedia.org/wiki/Defensive_programming#Offensive_programming). Repeating the same defenses against a problem that will not exist in most code leads to boiler-plate code that is not useful.

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

## JSDoc

### Use complete sentences

Make sure that:

- descriptions start with an uppercase alphabetical character
- paragraphs start with an uppercase alphabetical character
- sentences end with a period, question mark, or exclamation mark

```ts
// Bad
/**
 * this is a foo function
 */
function foo(bar) {}

/**
 * @param bar: bar is the first parameter
 */
function foo(bar) {}

// Good
/**
 * This is a foo function.
 *
 * @param bar: Bar is the first parameter.
 */
function foo(bar) {}
```

**Enforced with:** [jsdoc/require-description-complete-sentence](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description-complete-sentence.md)

### Add empty line after the description, but not between tags

```ts
// Bad
/**
 * This is a foo function.
 * @param bar: Bar is the first parameter.
 * @param asd: Asd is the second parameter.
 */
function foo(bar, asd) {}

/**
 * This is a foo function.
 *
 * @param bar: Bar is the first parameter.
 *
 * @param asd: Asd is the second parameter.
 */
function foo(bar, asd) {}

// Good
/**
 * This is a foo function.
 *
 * @param bar: Bar is the first parameter.
 * @param asd: Asd is the second parameter.
 */
function foo(bar, asd) {}
```

**Enforced with:** [jsdoc/tag-lines](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md)

### Always use types for params in JavaScript

Adding type information in JSDoc will allow auto-completion and type checking in editors and helps finding type related bugs.

```js
// Bad
/**
 * @param bar
 */
function foo(bar) {}

// Good
/**
 * @param {number} bar
 */
function foo(bar) {}
```

**Enforced with:** [jsdoc/require-param-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-type.md)

### Don't use JSDoc types with TypeScript

JSDoc type declarations are redundant in TypeScript

```ts
// Bad
/**
 * @param {number} bar
 */
function foo(bar: number) {}

/**
 * @param {number} bar
 */
function foo(bar) {}

// Good
/**
 * @param bar
 */
function foo(bar: number) {}
```

**Enforced with:** [jsdoc/no-types](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md)

### Place documentation prior to decorators

```ts
// Bad
@Component({
  selector: "foo",
  template: "bar",
})
/** Component that prints "bar". */
export class FooComponent {}

// Good
/** Component that prints "bar". */
@Component({
  selector: "foo",
  template: "bar",
})
export class FooComponent {}
```

## Type assertions

### Use `as` for type assertions

TypeScript provides two syntaxes for "type assertions":

- angle brackets: `<Type>value`
- as: `value as Type`

Use the latter as it's more readable, and does not conflict with `tsx` syntax.

```ts
// Bad
const y = <Foo>z

// Good
const x = z as Foo
```

### Prefer type annotations for object literals

Prefer type annotations (`: Foo`) instead of type assertions (`as Foo`) to specify the type of an object literal. This allows detecting refactoring bugs when the fields of an interface change over time.

```ts
// Bad
interface Foo {
  bar: number
  baz?: string // was "bam", but later renamed to "baz".
}

const foo = {
  bar: 123,
  bam: "abc", // no error!
} as Foo

function func() {
  return {
    bar: 123,
    bam: "abc", // no error!
  } as Foo
}

// Good
interface Foo {
  bar: number
  baz?: string
}

const foo: Foo = {
  bar: 123,
  bam: "abc", // complains about "bam" not being defined on Foo.
}

function func(): Foo {
  return {
    bar: 123,
    bam: "abc", // complains about "bam" not being defined on Foo.
  }
}
```

## Modules

### Add an empty line after import statements

```ts
// Bad
import * as foo from "foo"
const FOO = "BAR"

// Good
import * as foo from "foo"

const FOO = "BAR"
```

**Enforced with:** [import/newline-after-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md)

### Only use named exports

Do not use default exports. This ensures that all imports follow a uniform pattern.

```ts
// Bad
export default class Foo { ... }

// Good
export class Foo { ... }
```

**Why?**

Default exports provide no canonical name, which makes central maintenance difficult with relatively little benefit to code owners, including potentially decreased readability:

```ts
import Foo from "./bar" // Legal.
import Bar from "./bar" // Also legal.
```

## Vue

## Formatting

### Use Prettier

Every file should be formatted with [Prettier](https://prettier.io/).

Why?

- automatically enforced style guide
- programmers won't need to think about how they should format their code
- programmers can focus on how their code works
- consistency across every source file
- code will always feel familiar, regardless who wrote it

::info

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

- easier to navigate to the end of each line
- easier to extend or reorder method chains

**Enforced with:** [Semi](https://prettier.io/docs/en/options.html#semicolons)

::info

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
