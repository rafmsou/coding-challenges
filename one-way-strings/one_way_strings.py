# Check if edit distance between two strings is one
# An edit between two strings is one of the following changes.

# Add a character
# Delete a character
# Change a character
# Given two string s1 and s2, find if s1 can be converted to s2 with exactly one edit. Expected time complexity is O(m+n) where m and n are lengths of two strings.

# Examples:

# Input:  s1 = "geeks", s2 = "geek"
# Output: yes
# Number of edits is 1

# Input:  s1 = "geeks", s2 = "geeks"
# Output: no
# Number of edits is 0

# Input:  s1 = "geaks", s2 = "geeks"
# Output: yes
# Number of edits is 1

# Input:  s1 = "peaks", s2 = "geeks"
# Output: no
# Number of edits is 2

def is_one_away(s1, s2):
    if s1 == s2:
        return True

    if abs(len(s1) - len(s2)) > 1:
        return False

    operation = 'change' if len(s1) == len(s2) else 'remove'

    if operation == 'change':
        return change(s1, s2)
    else:
        [longer, smaller] = [s1, s2] if len(s1) > len(s2) else [s2, s1]
        return remove(longer, smaller)


def change(s1, s2):
    for i in range(len(s1)):
        new_s1 = s1[0:i] + s1[i+1:]
        new_s2 = s2[0:i] + s2[i+1:]
        if new_s1 == new_s2:
            return True

    return False


def remove(longer, smaller):
    for i in range(len(longer)):
        # compare longer without the char at i index
        longer_stripped = longer[:i] + longer[i+1:]
        if longer_stripped == smaller:
            return True

    return False

# NOTE: The following input values will be used for testing your solution.
print(is_one_away("abcde", "abcd"))  # should return True
print(is_one_away("abde", "abcde"))  # should return True
print(is_one_away("a", "a"))  # should return True
print(is_one_away("abcdef", "abqdef"))  # should return True
print(is_one_away("abcdef", "abccef"))  # should return True
print(is_one_away("abcdef", "abcde"))  # should return True
print(is_one_away("aaa", "abc"))  # should return False
print(is_one_away("abcde", "abc"))  # should return False
print(is_one_away("abc", "abcde"))  # should return False
print(is_one_away("abc", "bcc"))  # should return False
