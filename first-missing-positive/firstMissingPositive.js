
/**
 Find the smallest positive number missing from an unsorted array | Set 1
 You are given an unsorted array with both positive and negative elements.
 You have to find the smallest positive number missing from the array in O(n) time using constant extra space.
 You can modify the original array.

  Examples

  Input:  {2, 3, 7, 6, 8, -1, -10, 15}
  Output: 1

  Input:  { 2, 3, -7, 6, 8, 1, -10, 15 }
  Output: 4

  Input: {1, 1, 0, -1, -2}
  Output: 2
 */

function firstMissingNumber(arr) {
  const positives = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      positives[arr[i] - 1] = true
    }
  }

  if (positives.length == 0) return 1

  for (let i = 0; i < positives.length; i++) {
    if (!positives[i]) {
      return i + 1
    }
  }

  // in case all numbers in between 0 and n are filled
  return positives.length + 1
}

const numbers = [1,2,0]
console.log(firstMissingNumber(numbers))
