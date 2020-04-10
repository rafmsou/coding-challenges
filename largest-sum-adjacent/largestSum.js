/**
  Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
  For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
  Follow-up: Can you do this in O(N) time and constant space?
 */

function largestSumNonAdjacent(numbers) {

  let sumIncl = 0
  let sumExcl = 0
  let sumExclNew = 0

  for (const n of numbers) {
    sumExclNew = (sumExcl > sumIncl) ? sumExcl : sumIncl
    sumIncl = sumExcl + n
    sumExcl = sumExclNew
  }

  return (sumExcl > sumIncl) ? sumExcl : sumIncl
}

console.log(largestSumNonAdjacent([5,1,1,5]))
console.log(largestSumNonAdjacent([2,4,6,2,5]))
console.log(largestSumNonAdjacent([4,7,20,40,2]))
