from math import floor

import os
import sys

def running_median(a):
    cur_arr = []
    result = []
    for num in a:
        cur_arr = add_number(cur_arr, num)
        result.append(get_median(cur_arr))
    return result

def add_number(arr = [], n = 0):
    for i, item in enumerate(arr):
        if n < item:
            arr.insert(i, n)
            return arr
    else:
        arr.append(n)
    return arr

def get_median(arr = []):
    median = 0

    if len(arr) == 1:
        return arr[0]

    is_odd = len(arr) % 2 != 0
    if is_odd:
        median_idx = floor(len(arr) / 2)
        median = arr[median_idx]
    else:
        median_idx_1 = floor((len(arr) - 1) / 2)
        median_idx_2 = floor(len(arr) / 2)
        median = (arr[median_idx_1] + arr[median_idx_2]) / 2

    return median

if __name__ == '__main__':
    a_count = int(input())
    a = []

    for _ in range(a_count):
        a_item = int(input())
        a.append(a_item)

    result = running_median(a)
    print('\n'.join(map(lambda s: "%.1f" % s, result)))
