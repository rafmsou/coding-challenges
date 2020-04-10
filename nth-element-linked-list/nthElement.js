/**
  Implement a function that finds and returns the nth node in a linked list, counting from the end.
  Your function should take a linked list (its head element) and n, a positive integer as its arguments.

  Examples:
  head = 7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> (null / None)
  The third element of head counting from the end is 3.

  head2 = 1 -> 2 -> 3 -> 4 -> (null / None)
  The fourth element of head2 counting from the end is 1.

  If the given n is larger than the number of nodes in the list, return null / None.
 */

class Node {
  constructor(value, child) {
    this.value = value
    this.child = child || null
  }
}

function nth(head, n) {
  // set the right and left pointers to head
  let right = head, left = head

  // move the right pointer n - 1 times, (n - 1 since the pointer is already at head)
  for (let i = 0; i < n - 1; i++) {
    if (right === null) {
      return null
    }

    right = right.child
  }

  // here, right pointer has 3 elements offset from left
  // then we should move those two pointers until right pointer is at the first element
  // the final value would be the left pointer
  while (right.child) {
    right = right.child
    left = left.child
  }

  return left.value
}

let current = new Node(1)
for (let i = 2; i < 8; i++) current = new Node(i, current)
const head1 = current

current = new Node(4)
for (let i = 3; i > 0; i--) current = new Node(i, current)
const head2 = current

console.log(nth(head1, 7))
console.log(nth(head2, 4))
