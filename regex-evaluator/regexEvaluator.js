
/**
  Regex evaluator coding problem from Google (Youtube).

  There are three cases here:
    - * (star) match. Matches any number of the previous character
    - . (dot) match. Matches any character
    - [a-z] match. Matches a simple character within a-z

  We need to track the match type, current char and current pattern.
 */
function match(str, pattern) {
  if (str.length === 0 || pattern.length === 0) return false

  let strIdx = 0
  let patternIdx = 0
  let starMatching = false

  while (patternIdx < pattern.length && strIdx < str.length) {
    const charToMatch = pattern[patternIdx]
    starMatching = pattern[patternIdx + 1] === '*'

    if (starMatching) {
      let [nextMatchIndex, nextSingleCharMatch] = getNextSingleCharMatch(pattern, patternIdx)
      // if charToMatch is a wildcard (.) we move strIdx until we find the next single char match
      if (charToMatch === '.') {
        if (str[strIdx] === nextSingleCharMatch) {
          patternIdx = nextMatchIndex + 1
          strIdx += 1
        } else if (nextSingleCharMatch && !str[strIdx + 1]) {
          return false
        } else {
          strIdx += 1
        }
      } else {
        // charToMatch is any [a-z] char. If current str char equals charToMatch we move str index
        // otherwise we only move pattern index
        if (str[strIdx] === charToMatch)
          strIdx += 1
        else
          patternIdx += 2
      }
    } else {
      if (charToMatch === str[strIdx] || charToMatch === '.') {
        strIdx += 1
        patternIdx += 1
      } else {
        return false
      }
    }
  }

  return strIdx === str.length
}

function parsePattern(pattern) {
  const result = []
  let idx = 0

  while (idx < pattern.length) {
    if (pattern[idx].match(/[a-z]/) && pattern[idx+1] !== '*') {
      result.push(pattern[idx])
      idx++
    } else {
      result.push(pattern[idx] + pattern[idx+1])
      idx += 2
    }
  }

  return result
}

function getNextSingleCharMatch(pattern, startIdx) {
  for (let i = startIdx + 2; i < pattern.length; i++) {
    if (pattern[i].match(/[a-z]/) && pattern[i+1] !== '*') {
      return [i, pattern[i]]
    }
  }

  return [0, null]
}

// console.log(match('dcccc', 'c*d*e*ccc*'))
console.log(parsePattern('c*d*e*ccc*'))

