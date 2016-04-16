import * as R from "ramda"

const isObject = x => x && x.constructor === Object
const isArray = x => x && x.constructor === Array
const isAggregate = R.anyPass([isObject, isArray])

const descend = R.curry((w2w, w) => isAggregate(w) ? R.map(w2w, w) : w)
const substUp = R.curry((h2h, w) => descend(h2h, descend(substUp(h2h), w)))

export const transform = R.curry((w2w, w) => w2w(substUp(w2w, w)))

export const rewrite = R.curry(
  (w2wO, w) =>
    transform(w0 => {const w1 = w2wO(w0)
                     if (R.equals(w0, w1))
                       return w0
                     else
                       return rewrite(w2wO, w1)
                    },
              w))
