"""
Given an integer k and a string s, find the length of the longest substring that
contains at most k distinct characters.
For example, given s = "abcba" and k = 2, the longest substring with k
distinct characters is "bcb".
"""

def solution(S, K):
    result = 0
    pt1 = 0
    pt2 = 1
    seen = { S[pt1]: 1 }

    while pt1 < len(S):
        while len(seen.keys()) <= K and pt2 < len(S):
            if S[pt2] not in seen:
                if len(seen.keys()) == K:
                    break
                else:
                    seen[S[pt2]] = 0

            seen[S[pt2]] += 1
            pt2 += 1

        temp = sum(seen.values())
        result = max(temp, result)

        if S[pt1] in seen:
            seen[S[pt1]] -= 1
            if seen[S[pt1]] == 0:
                del seen[S[pt1]]

        pt1 += 1

    return result


print(solution('aabacbebebe', 3))
