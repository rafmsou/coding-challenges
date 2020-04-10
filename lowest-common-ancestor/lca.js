
class Node {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

function lca(head, j, k) {

  if (j === k) return j

  const jancestors = findAncestorsFor(j, head)
  if (jancestors.length === 0) return null

  const kancestors = findAncestorsFor(k, head)
  if ( kancestors.length === 0) return null

  let lca = jancestors[0]
  for (let i = 1; i < Math.max(jancestors.length, kancestors.length); i++) {
    if (jancestors[i] !== kancestors[i]) {
      return lca
    } else {
      lca = jancestors[i]
    }
  }

  return lca
}

function findAncestorsFor(val, node, ancestors = []) {

  if (!node) {
    return []
  }

  if (val === node.value) {
    return ancestors.concat(node.value)
  }

  return [
    ...findAncestorsFor(val, node.left, ancestors.concat(node.value)),
    ...findAncestorsFor(val, node.right, ancestors.concat(node.value)),
  ]
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
const head1 = createTree(mapping1, 0)
// This tree is:
// head1 = 0
//        / \
//       1   2
//      /\   /\
//     3  4 5  6


const mapping2 = {5: [1, 4], 1: [3, 8], 4: [9, 2], 3: [6, 7]}
const head2 = createTree(mapping2, 5)
// This tree is:
//  head2 = 5
//        /   \
//       1     4
//      /\    / \
//     3  8  9  2
//    /\
//   6  7


console.log(lca(head1, 1, 5)) // should return 0
console.log(lca(head1, 3, 1)) // should return 1
console.log(lca(head1, 1, 4)) // should return 1
console.log(lca(head1, 0, 5)) // should return 0
console.log(lca(head2, 4, 7)) // should return 5
console.log(lca(head2, 3, 3)) // should return 3
console.log(lca(head2, 8, 7)) // should return 1
console.log(lca(head2, 3, 0)) // should return None (0 does not exist in the tree)
