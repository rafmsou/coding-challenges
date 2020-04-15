"""
Given a list A (size N) of positive integer (between 0 to 1000),
you have to merge all the elements of the list by summing 2 elements at a time and adding the previous result.

For example, O = { P, Q, R }, can be merged in 3 different way:

1. first merge P with Q, then merge the result with R
2. first merge P with R, then merge the result with Q
3. first merge R with Q, then merge the result with P
You have to find the smallest sum required to merge the list and return it.

For example, A = { 100, 250, 1000 }, the 3 potential merging strategies are:

1. merge P with Q: 350; result with R: 1350; total: 1700
2. merge P with R: 1100; result with R: 1350; total: 2450
3. merge P with Q: 1250; result with R: 1350; total: 2600

The smallest sum is 1700.
"""

import heapq

items = [20, 40, 40, 50]
heapq.heapify(items)

cost = 0
cursum = 0

while len(items) > 0:
  curval = heapq.heappop(items)
  nextval = heapq.heappop(items)
  curcost = curval + nextval
  cost += curcost

  if len(items) > 0:
    heapq.heappush(items, curcost)

print(cost)
