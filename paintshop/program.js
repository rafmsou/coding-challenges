/**
 * NodeJS version: 8.11
 * Author: Rafael Sousa
 * Algorithm: The general idea is to generate all possible solutions with
 * a cartesian product of all the customers preferences having gloss colors take precedence over matte colors.
 * Also, detect impossible cases upfront: conflicts between single preference customers which we can't solve.
 *
 * To do list:
 * - Add unit tests
 *
 * How to run it: node program.js < sample-input1.txt
 */


/**
 Calculates the cartesian product between multiple sets.
 Uses a generator function to return the product of combinations instead of building and returning
 all at once.

 Ex.:
 product(
   ['small', 'medium', 'large'],
   ['red', 'green', 'blue'],
   ['shirt', 'jeans', 'shoes']
 )
 >> [["small", "red", "shirt"], ["small", "red", "jeans"] ...
 */

function* product(head, ...tail) {
  const remainder = tail.length > 0 ? product(...tail) : [[]]
  for (let r of remainder) for (let h of head) yield [h, ...r]
}

module.exports.product = product

function getBaseColors(length) {
  return Array.from(
    { length },
    i => ({ paint: 'G', overridable: true })
  )
}

function validateCombination(length, combination, customersPrefs, baseColors) {
  // initialize combination with base color set
  const combo = Array.from({ length }, (_, idx) => baseColors[idx])

  const valid = combination.every(pref => {
    const idx = pref.color - 1
    if (
      combo[idx] &&
      combo[idx].paint !== pref.paint &&
      !combo[idx].overridable
    ) {
      return false
    }

    combo[idx] = Object.assign({}, combo[idx], pref)
    return true
  })

  if (!valid) {
    return false
  }

  // check if this solution satifies all customers
  if (!allCustomersAreHappy(combo, customersPrefs)) {
    return false
  }

  return combo.map(c => c.paint).join(' ')
}

function allCustomersAreHappy(combo, customersPrefs) {
  return customersPrefs.every(prefs => {
    return prefs.some(p => combo[p.color - 1].paint === p.paint)
  })
}

// sorts preferences so that we have gloss colors first
const sortPrefs = (a, b) => {
  if ((a.paint || a[1]) === 'G' && (b.paint || b[1]) === 'M') {
    return -1
  }
  if ((a.paint || a[1]) === 'M' && (b.paint || b[1]) === 'G') {
    return 1
  }
  return (a.color || a[0]) - (b.color || b[0])
}

function parseCustomersPrefs(input, baseColors) {
  const parsedResult = []
  const rawResult = []

  input
    .filter(line => line.trim() !== '')
    .forEach(line => {
      const parsedPrefs = []
      const rawPrefs = []

      const prefs = line.split(' ')
      if (prefs.length % 2 !== 0) {
        throw `Invalid prefs for customer: ${line}`
      }

      const chunkSize = 2
      while (prefs.length) {
        const [color, paint] = prefs.splice(0, chunkSize)
        rawPrefs.push(`${color}${paint}`)
        parsedPrefs.push({
          color: parseInt(color, 10),
          paint,
        })
      }

      // if customer has only one preference make it a constraint
      if (parsedPrefs.length === 1) {
        const { color, paint } = parsedPrefs[0]

        // identify cases where its impossible to solve upfront
        if (baseColors[color - 1].paint !== paint) {
          if (baseColors[color - 1].overridable === true) {
            baseColors[color - 1].paint = paint
            baseColors[color - 1].overridable = false
          } else {
            console.error('No solution exists')
            process.exit(1)
          }
        }
      }

      // this single customer preference don't need to be checked again
      // since it is guaranteed to be available with `baseColors.overridable = false`
      const automaticallySatisfied = parsedPrefs.some(
        p => baseColors[p.color - 1].overridable === false
      )

      if (automaticallySatisfied === false) {
        parsedResult.push(parsedPrefs.sort(sortPrefs))
        rawResult.push(rawPrefs.sort(sortPrefs))
      }
    })

  return [parsedResult, rawResult]
}

function parseInput(input) {
  if (input.length > 0) {
    const ncolors = parseInt(input.shift(), 10)
    const baseColors = getBaseColors(ncolors)

    // parse customers prefs and fill baseColors with paints guaranteed to be in the solution (single prefs)
    const prefs = parseCustomersPrefs(input, baseColors)

    return { ncolors, prefs, baseColors }
  }

  return null
}

// this is where all the fun begins
function main(input) {
  const { ncolors, prefs, baseColors } = parseInput(input)

  for (let combination of product(...prefs)) {
    console.log(combination);

    const solution = validateCombination(ncolors, combination, prefs, baseColors)
    if (solution) {
      console.log(solution)
      process.exit(0)
    }
  }

  console.error('No solution exists')
  process.exit(1)
}

// read the input file as a stream and starts processing it
process.stdin.resume()
process.stdin.setEncoding('ascii')

let raw_input = ''
process.stdin.on('data', data => raw_input += data)
process.stdin.on('end', () => main(raw_input.split('\n')))
