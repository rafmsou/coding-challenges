
module.exports = class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._siftDown(this.heap.length-1, 0);
  }

  pop() {
    let min;
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      min = this.heap[0];
      this.heap[0] = last;
      this._siftUp(0);
    } else {
      min = last;
    }
    return min;
  }

  _siftUp(index) {
    const endIndex = this.heap.length;
    const fromIndex = index;
    const curItem = this.heap[index];
    // Bubble up the smaller child until hitting a leaf.
    let childIndex = 2*index + 1;  // leftmost child position
    while (childIndex < endIndex) {
      // Set childIndex to index of smaller child.
      const rightIndex = childIndex + 1;
      if (rightIndex < endIndex && this.heap[childIndex] > this.heap[rightIndex]) {
        childIndex = rightIndex;
      }
      // Move the smaller child up.
      this.heap[index] = this.heap[childIndex];
      index = childIndex;
      childIndex = 2*index + 1;
    }
    // The leaf at index is empty now.  Put curItem there, and bubble it up
    // to its final resting place (by sifting its parents down).
    this.heap[index] = curItem;
    this._siftDown(index, fromIndex);
  }

  _siftDown(fromIndex, toIndex = 0) {
    const fromItem = this.heap[fromIndex];
    // follow the path to the root, moving parents down until finding a place
    // fromItem fits.
    while (fromIndex > toIndex) {
      const parentIndex = (fromIndex - 1) >> 1;
      const parent = this.heap[parentIndex];
      if (fromItem < parent) {
        this.heap[fromIndex] = parent;
        fromIndex = parentIndex;
        continue;
      }
      break;
    }
    this.heap[fromIndex] = fromItem;
  }
}
