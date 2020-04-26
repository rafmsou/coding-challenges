

const nodesLen = 9
const sptArr = {}
const MAX_NUM = Number.MAX_VALUE
const edges = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0]
];

const distances = {}

function popWithMinDistance(queue = []) {
  let min = MAX_NUM
  let minIndex = null
  for (let i = 0; i < queue.length; i++) {
    if (distances[queue[i]] < min) {
      min = queue[i]
      minIndex = i
    }
  }
  queue.splice(minIndex, 1)
  return min
}

function calcMinDistanceFromSource(sourceV) {
  let neighbors = [sourceV]
  distances[sourceV] = 0

  while (Object.keys(sptArr).length < nodesLen) {
    let nextV = popWithMinDistance(neighbors)
    sptArr[nextV] = true
    neighbors = getNeighbors(nextV, neighbors)
    calcNeighborsDistance(nextV, neighbors)
  }
}

function getNeighbors(vertex, neighbors) {
 const edgesInVertex = edges[vertex]
  for (let i = 0; i < edgesInVertex.length; i++) {
    if (!sptArr[i] && edgesInVertex[i] > 0 && !neighbors.includes(i)) {
      neighbors.push(i)
    }
  }
  return neighbors
}

function calcNeighborsDistance(sourceV, neighbors) {
  for (const neighbor of neighbors) {
    if (!sptArr[neighbor]) {
      const edgeVal = edges[sourceV][neighbor]
      const newDist = edgeVal > 0 ? distances[sourceV] + edgeVal : MAX_NUM
      if (!distances[neighbor] || newDist < distances[neighbor]) {
        distances[neighbor] = newDist
      }
    }
  }
}

calcMinDistanceFromSource(0)
// calcNeighborsDistance(0, [1,7])
// calcNeighborsDistance(1, [2,7,0])
// unvisited
distances
// sptArr
