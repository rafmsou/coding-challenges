
/**
 
 Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

 Example 1:

  Input: "babad"
  Output: "bab"
  Note: "aba" is also a valid answer.
 
 Example 2:

  Input: "cbbd"
  Output: "bb"

*/

var longestPalindrome = function(s) {
  if (s.length == 0) return ''
  if (s.length == 1 || isPalindrome(s)) return s

  let str = ''
  let largest = ''

  for (let i=0; i<s.length; i++) {
    str = s[i]
    for (let j=i+1; j<s.length; j++) {
      str += s[j]
      if (isPalindrome(str)) {
        if (str.length > largest.length) {
          largest = str
        }
      }
    }
  }

  return largest.length == 0 ? s[0] : largest
};

function isPalindrome(s) {
  const firstChar = s[0], lastChar = s[s.length - 1]
  const secondChar = s[1], secondLastChar = s[s.length - 2]

  if (firstChar != lastChar || secondChar != secondLastChar)
    return false

  return s == s.split('').reverse().join('')
}

