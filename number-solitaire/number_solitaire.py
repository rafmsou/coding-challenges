# import sys

A = [-1, -2, -3, -4, -3, -8, -5, -2, -3, -4, -5, -6, -1]
#   [-1, -3, -4, -5, -4, -9, -6, -5, -7, -8, -9, -11, -6]

def solution(A):
    for j in xrange(1,len(A)):
        A[j] += max(A[max(0,j-6):j])
    return A[-1]

print(solution(A))
