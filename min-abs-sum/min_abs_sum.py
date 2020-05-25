def solution(A):
    N = len(A)
    M = 0

    for i in range(N):
        A[i] = abs(A[i])
        M = max(A[i], M)

    S = sum(A)

    dp = [0] * (S + 1)
    dp[0] = 1
    for j in range(N):
        for i in range(S // 2 + 1, -1, -1):
            if (dp[i] == 1) and (i + A[j] <= S):
                dp[i + A[j]] = 1

    result = S

    for i in range(S // 2 + 1):
        if dp[i] == 1:
            result = min(result, S - 2 * i)
    return result


A = [3,3,3,3]

print(solution(A))
