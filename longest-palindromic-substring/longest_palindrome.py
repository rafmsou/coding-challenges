
def longest_palindrome(s):
    if len(s) == 0:
        return ''
    if len(s) == 1:
        return s[0]

    s_reverse = reverse(s)
    if s == s_reverse:
        return s

    return lcs_palindrome(s, s_reverse, len(s), len(s_reverse))

def reverse(s):
    str = ''
    for i in s:
        str = i + str
    return str

def is_palindrome(s):
    if s[0] != s[-1]:
        return False
    s_reverse = reverse(s)
    return s == s_reverse

# Returns the longest common
# substring of X[0..m-1] and Y[0..n-1] that is a palindrome
def lcs_palindrome(X, Y, m, n):
    s_table = [['' for k in range(n+1)] for l in range(m+1)]
    result = X[0]

    # Following steps to build
    # table[m+1][n+1] in bottom up fashion
    for i in range(m + 1):
        for j in range(n + 1):
            if (i == 0 or j == 0):
                s_table[i][j] = ''
            elif (X[i-1] == Y[j-1]):
                s_table[i][j] = s_table[i-1][j-1] + X[i-1]
                s_table[i-1][j-1] = ''
                if len(result) < len(s_table[i][j]) and is_palindrome(s_table[i][j]):
                    result = s_table[i][j]
            else:
                s_table[i][j] = ''
    return result

# Driver code
if __name__ == "__main__" :
    print(longest_palindrome('abacdfgdcaba'))
