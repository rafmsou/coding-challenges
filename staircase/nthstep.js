/**
  Problem:
  There's a staircase with N steps, and you can climb 1 or 2 steps at a time.
  Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

  For example, if N is 4, then there are 5 unique ways:

  1, 1, 1, 1
  2, 1, 1
  1, 2, 1
  1, 1, 2
  2, 2

  What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X?
  For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time. Generalize your function to take in X.
 */

// solution I first came up with
function nthstep(numbers, step, acc = [], sum = 0) {
  const result = []
  for (let i = 0; i < numbers.length; i++) {
    const curval = numbers[i]
    const newsum = curval + sum
    if (newsum < step) {
      result.push(...nthstep(numbers, step, acc.concat(curval), newsum))
    } else if (newsum === step) {
      result.push(acc.concat(curval))
    }
  }
  return result
}

// optimal solutions
function nthstep2(numbers, step, acc = 0) {
  if (step < 0) return 0
  if (step === 0) return 1

  for (const n of numbers) {
    acc += nthstep2(numbers, step - n)
  }

  return acc
}

// this is so much better in python
function nthstep3(numbers, step) {
  const cache = Array.from({ length: step + 1 }, () => 0)
  cache[0] = 1

  for (let i = 1; i <= step; i++) {
    for (const n of numbers) {
      if (i-n >= 0) {
        cache[i] += cache[i-n]
      }
    }
  }

  return cache[cache.length - 1]
}


console.time('nthstep')
console.log(nthstep([1,2,3], 4).length)
console.timeEnd('nthstep')

console.time('nthstep2')
console.log(nthstep2([1,2,3], 4))
console.timeEnd('nthstep2')

console.time('nthstep3')
console.log(nthstep3([1,2,3], 4))
console.timeEnd('nthstep3')
