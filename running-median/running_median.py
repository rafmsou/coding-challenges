from math import floor

import os
import sys
from heapq import heappush, heappop


class Solution:
    def __init__(self):
        self.min_heap = []
        self.max_heap = []

    def running_median(self, arr):
        cur_arr = []
        result = []
        for num in arr:
            if num == 22934:
                print(self.max_heap)
                print(self.min_heap)
            cur_arr = self.add_number(num)
            if num == 22934:
                print(self.max_heap)
                print(self.min_heap)
            result.append(self.get_median(cur_arr))
        return result

    def add_number(self, n=0):
        len_left = len(self.max_heap)
        len_right = len(self.min_heap)
        max_left = abs(self.max_heap[0]) if len_left > 0 else 0
        min_right = self.min_heap[0] if len_right > 0 else 0

        if len_left == 0:
            self.max_heap.append(n*-1)
            return

        if len_left == len_right:
            # equal length in both sides, need to decide where to put item
            if n >= max_left:
                heappush(self.min_heap, n)
            else:
                heappush(self.max_heap, n*-1)
        elif len_left > len_right:
            # need to put item on right to balance
            if n >= max_left:
                heappush(self.min_heap, n)
            else:
                # rebalance
                heappop(self.max_heap)
                heappush(self.min_heap, max_left)
                heappush(self.max_heap, n*-1)
        else:
            # need to put item on left to balance
            if n <= min_right:
                heappush(self.max_heap, n*-1)
            else:
                # rebalance
                heappop(self.min_heap)
                heappush(self.max_heap, min_right*-1)
                heappush(self.min_heap, n)

        # print(self.max_heap)
        # print(self.min_heap)

    def get_median(self, arr=[]):
        len_left = len(self.max_heap)
        len_right = len(self.min_heap)

        if len_left == 0:
            return 0

        if len_left == len_right:
            left_head = abs(self.max_heap[0])
            right_head = self.min_heap[0]
            return (left_head + right_head) / 2
        elif len_left > len_right:
            return abs(self.max_heap[0])
        else:
            return self.min_heap[0]


if __name__ == '__main__':
    s = Solution()
    a_count = int(input())
    a = []

    for _ in range(a_count):
        a_item = int(input())
        a.append(a_item)

    result = s.running_median(a)
    print('\n'.join(map(lambda s: "%.1f" % s, result)))
