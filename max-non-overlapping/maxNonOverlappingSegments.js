/**
Located on a line are N segments, numbered from 0 to N − 1, whose positions are given in arrays A and B.
For each I (0 ≤ I < N) the position of segment I is from A[I] to B[I] (inclusive).
The segments are sorted by their ends, which means that B[K] ≤ B[K + 1] for K such that 0 ≤ K < N − 1.
Two segments I and J, such that I ≠ J, are overlapping if they share at least one common point.
In other words, A[I] ≤ A[J] ≤ B[I] or A[J] ≤ A[I] ≤ B[J].
We say that the set of segments is non-overlapping if it contains no two overlapping segments.
The goal is to find the size of a non-overlapping set containing the maximal number of segments.
For example, consider arrays A, B such that:

    A[0] = 1    B[0] = 5
    A[1] = 3    B[1] = 6
    A[2] = 7    B[2] = 8
    A[3] = 9    B[3] = 9
    A[4] = 9    B[4] = 10
The segments are shown in the figure below.
The size of a non-overlapping set containing a maximal number of segments is 3. For example, possible sets are {0, 2, 3}, {0, 2, 4}, {1, 2, 3} or {1, 2, 4}. There is no non-overlapping set with four segments.
*/

const A = [], B = []

A[0] = 1
A[1] = 1
A[2] = 1

B[0] = 5
B[1] = 6
B[2] = 7

function solution(A, B) {

  if (A.length === 0) return 0

  let counter = 1
  let prevEnd = B[0]

  for (let i=1; i<A.length; i++) {
    if (A[i] > prevEnd) {
      counter++
      prevEnd = B[i]
    }
  }

  return counter
}

console.log(solution(A, B))
