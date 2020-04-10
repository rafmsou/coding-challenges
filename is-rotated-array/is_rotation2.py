# Is One Array a Rotation of Another?
# Write a function that returns True if one array is a rotation of another.

# Example: [1, 2, 3, 4, 5, 6, 7] is a rotation of [4, 5, 6, 7, 1, 2, 3].
# NOTE: There are no duplicates in each of these arrays.

def is_rotation(list1, list2):
    if len(list1) != len(list2):
        return False

    start_val_in_l1 = list1[0]
    l2_start_idx = -1

    for i in range(len(list2)):
        if list2[i] == start_val_in_l1:
            l2_start_idx = i

    if l2_start_idx == -1:
        return False

    for i in range(len(list1)):
        l2_idx = (l2_start_idx + i) % len(list1)
        if list1[i] != list2[l2_idx]:
            return False

    return True

# NOTE: The following input values will be used for testing your solution.
list1 = [1, 2, 3, 4, 5, 6, 7]
list2a = [4, 5, 6, 7, 8, 1, 2, 3]
print(is_rotation(list1, list2a))
# should return False.

list2b = [4, 5, 6, 7, 1, 2, 3]
print(is_rotation(list1, list2b))
# should return True.

list2c = [4, 5, 6, 9, 1, 2, 3]
print(is_rotation(list1, list2c))
# should return False.

list2d = [4, 6, 5, 7, 1, 2, 3]
print(is_rotation(list1, list2d))
# should return False.

list2e = [4, 5, 6, 7, 0, 2, 3]
print(is_rotation(list1, list2e))
# should return False.

list2f = [1, 2, 3, 4, 5, 6, 7]
print(is_rotation(list1, list2f))
# should return True.

list2g = [3, 4, 5, 6, 7, 1, 2]
print(is_rotation(list1, list2g))
# should return True.
