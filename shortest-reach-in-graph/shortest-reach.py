import time

class Graph:
    def __init__(self, nodes_len):
        self.edges = [[] for _ in range(nodes_len)]
        self.len = nodes_len
        self.distances = [-1] * nodes_len

    def connect(self, source, target):
        self.edges[source].append(target)
        self.edges[target].append(source)

    def find_all_distances(self, source, visited, cur_dist = 6):
        visited[source] = True
        for node in self.edges[source]:
            if visited[node] == False:
                if self.distances[node] == -1 or self.distances[node] > cur_dist:
                    self.distances[node] = cur_dist
                    self.find_all_distances(node, visited.copy(), cur_dist + 6)

    def print_distances(self, source):
        distances_no_src = [str(x) for (i, x) in enumerate(self.distances) if i != source]
        print(' '.join(distances_no_src))

t = int(input())
for i in range(t):
    start_time = time.time()
    n,m = [int(value) for value in input().split()]
    graph = Graph(n)
    for i in range(m):
        x,y = [int(x) for x in input().split()]
        graph.connect(x-1,y-1)
    s = int(input())
    visited = [False] * n

    elapsed_time = time.time() - start_time
    print(str.format('arranging took: {0}', elapsed_time))

    graph.find_all_distances(s-1, visited)
    elapsed_time = time.time() - start_time
    print(str.format('find_all_distances took: {0}', elapsed_time))

    graph.print_distances(s-1)
    elapsed_time = time.time() - start_time
    print(str.format('print_distances took: {0}', elapsed_time))
