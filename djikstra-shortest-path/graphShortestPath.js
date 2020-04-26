

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

const unvisited = {}
const distances = {}

function popMinUnvisited() {
  let min = MAX_NUM
  let minkey
  for (let [key, value] of Object.entries(unvisited)) {
    if (unvisited[key] < min) {
      min = unvisited[key]
      minkey = key
    }
  }
  delete unvisited[minkey]
  return minkey
}

function calcMinDistanceFromSource(sourceV) {
  sptArr[sourceV] = true
  distances[sourceV] = 0
  let neighbors = getNeighbors(sourceV)
  calcNeighborsDistance(sourceV, neighbors)
  let nextV

  while (Object.keys(sptArr).length < nodesLen) {
    nextV = popMinUnvisited()
    sptArr[nextV] = true
    neighbors = getNeighbors(nextV)
    calcNeighborsDistance(nextV, neighbors)
  }
}

function getNeighbors(vertex) {
 const edgesInVertex = edges[vertex]
 const neighbors = []
  for (let i = 0; i < edgesInVertex.length; i++) {
    if (!sptArr[i] && edgesInVertex[i] > 0) {
      neighbors.push(i)
    }
  }
  return neighbors
}

function calcNeighborsDistance(sourceV, neighbors) {
  for (const neighbor of neighbors) {
    if (!sptArr[neighbor]) {
      const edgeVal = edges[sourceV][neighbor]
      const newDist = (distances[sourceV] || 0) + edgeVal
      if (!distances[neighbor] || newDist < distances[neighbor]) {
        distances[neighbor] = newDist
        unvisited[neighbor] = newDist
      }
    }
  }
}

calcMinDistanceFromSource(0)
// console.log(getNeighbors(1))
// calcNeighborsDistance(0, [1,7])
// popMinUnvisited()
// calcNeighborsDistance(1, [2,7,0])
// unvisited
distances
// sptArr
