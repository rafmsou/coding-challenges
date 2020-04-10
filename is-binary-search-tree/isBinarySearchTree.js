
class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

function isBinarySearchTree(node, lower = null, upper = null) {

  if (node === null) {
    return true
  }

  if (upper && node.value > upper) {
    return false
  }

  if (lower && node.value < lower) {
    return false
  }

  return isBinarySearchTree(node.left, lower, node.value)
    && isBinarySearchTree(node.right, node.value, upper)
}

function createTree(mapping, head_val) {
  const head = new Node(head_val)
  const nodes = {
    [head_val]: head
  }

  for (const k in mapping) {
    const val = mapping[k]
    if (val[0])
      nodes[val[0]] = new Node(val[0])
    if (val[1])
      nodes[val[1]] = new Node(val[1])
  }

  for (const k in mapping) {
    const val = mapping[k]
    if (nodes[val[0]])
      nodes[k].left = nodes[val[0]]
    if (nodes[val[1]])
      nodes[k].right = nodes[val[1]]
  }

  return head
}

const mapping1 = {0: [1, 2], 1: [3, 4], 2: [5, 6]}
const mapping2 = {3: [1]}
const mapping3 = {3: [1, 5], 1: [0, 2], 5: [4, 6]}
const mapping4 = {3: [1, 5], 1: [0, 4]}
const mapping5 = {3: [1, 4]}

console.log(isBinarySearchTree(createTree(mapping1, 0)))
console.log(isBinarySearchTree(createTree(mapping2, 3)))
console.log(isBinarySearchTree(createTree(mapping3, 3)))
console.log(isBinarySearchTree(createTree(mapping4, 3)))
console.log(isBinarySearchTree(createTree(mapping5, 3)))
