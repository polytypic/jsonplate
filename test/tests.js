import * as R from "ramda"
import * as S from "schemation"

import * as U from "../src/jsonplate"

function show(x) {
  switch (typeof x) {
  case "string":
  case "object":
    return JSON.stringify(x)
  default:
    return `${x}`
  }
}

const run = expr => eval(`(R, S, U) => ${expr}`)(R, S, U)

const testEq = (expr, expect) => it(`${expr} => ${show(expect)}`, () => {
  const actual = run(expr)
  if (!R.equals(actual, expect))
    throw new Error(`Expected: ${show(expect)}, actual: ${show(actual)}`)
})

describe("transform", () => {
  testEq('U.transform(R.ifElse(S.matches(S.number), R.add(1), R.identity), [{x: 1}, {y: 2}, {z: 3}])', [{x: 2}, {y: 3}, {z: 4}])
})

describe("rewrite", () => {
  testEq('U.rewrite(R.ifElse(S.matches(S.and(S.number, S.not(0))), R.add(-1), R.identity), [1, 2, 3])', [0, 0, 0])
})
