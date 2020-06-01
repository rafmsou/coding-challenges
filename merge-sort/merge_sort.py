
def merge_sort(arr):
    if len(arr) < 2:
        return arr

    middle = len(arr) // 2
    left = merge_sort(arr[:middle])
    right = merge_sort(arr[middle:])
    return merge(left, right)

def merge(left, right):
    res = []
    i, j = 0, 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            res.append(left[i])
            i += 1
        else:
            # right is smaller than left
            res.append(right[j])
            j += 1

    return res + left[i:] + right[j:]

print(merge_sort([1,0,1,0]))
