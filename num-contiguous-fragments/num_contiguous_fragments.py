
"""
You are given an array A of N integers and an integer S.
Your task is to compute how many ways one can choose a contiguous fragment of A
that has an arithmetic mean equal to S.
The arithmetic mean (average) of a fragment is the sum of the elements of the fragment divided by its length.
For example, the arithmetic mean of [1, 4, 4, 5] is 14/4 = 3.5.

Write a function:
class Solution { public int solution(int[] A, int S); }
which returns the number of contiguous fragments of A whose arithmetic means are equal to S.
If the result is greater than 1,000,000,000, your function should return 1,000,000,000.

Examples:
Given A = [2, 1, 3] and S = 2, your function should return 3, since the arithmetic means of fragments [2], [1, 3] and [2, 1, 3] are equal to 2.
Given A = [0, 4, 3, −1] and S = 2, your function should return 2, since fragments [0, 4] and [4, 3, −1] have an arithmetic mean equal to 2.
Given A = [2, 1, 4] and S = 3, your function should return 0, since there exist no contiguous fragments whose arithmetic mean is equal to 3.
"""
import collections
def solution(A, S):
    seen = collections.defaultdict(int)
    curr = 0
    seen[0] = 1
    ret = 0
    for item in A:
        curr += item - S
        print(curr)
        ret += seen[curr]
        seen[curr] += 1

    print(seen)
    return ret


A = [0,4,3,-1]
print(solution(A, 2))
