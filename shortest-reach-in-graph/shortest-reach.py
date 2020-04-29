# import time
from heapq import heappush, heappop

class Graph:
    def __init__(self, nodes_len):
        self.edges = [[] for _ in range(nodes_len)]
        self.len = nodes_len
        self.distances = [-1] * nodes_len
        self.heap = []

    def connect(self, source, target):
        self.edges[source].append(target)
        self.edges[target].append(source)

    def get_min_distance(self, source, neighbors, visited):
        src_dist = self.distances[source] if self.distances[source] > 0 else 0
        for node in neighbors:
            if visited[node] == False:
                new_dist = src_dist + 6
                cur_dist = self.distances[node]
                if cur_dist == -1 or cur_dist > new_dist:
                    self.distances[node] = new_dist
                    heappush(self.heap, (new_dist, node))

        if len(self.heap) > 0:
            return heappop(self.heap)
        else:
            return (None, None)

    def find_all_distances(self, source, visited):
        new_visited = visited[:]
        new_visited[source] = True
        neighbors = self.edges[source]
        _, next_node = self.get_min_distance(source, neighbors, visited)
        if next_node != None:
            self.find_all_distances(next_node, new_visited)

    def print_distances(self, source):
        del self.distances[source]
        distances_no_src = map(str, self.distances)
        print(' '.join(distances_no_src))

t = int(input())
for i in range(t):
    # start_time = time.time()
    n,m = [int(value) for value in input().split()]
    graph = Graph(n)
    for i in range(m):
        x,y = [int(x) for x in input().split()]
        graph.connect(x-1,y-1)
    s = int(input())
    visited = [False] * n

    # elapsed_time = time.time() - start_time
    # print(str.format('arranging took: {0}', elapsed_time))

    graph.find_all_distances(s-1, visited)
    # elapsed_time = time.time() - start_time
    # print(str.format('find_all_distances took: {0}', elapsed_time))

    graph.print_distances(s-1)
    # elapsed_time = time.time() - start_time
    # print(str.format('print_distances took: {0}', elapsed_time))
