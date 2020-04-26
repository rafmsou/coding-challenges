const MinHeap = require('./minHeap');
const assert = require('assert');

// minHeap pop all items in ascending order

const heap = new MinHeap();
heap.push(50);
heap.push(60);
heap.push(20);
heap.push(30);
heap.push(40);
heap.push(10);

assert(heap.pop() === 10, "pop 10 from heap failed");
assert(heap.pop() === 20, "pop 20 from heap failed");
assert(heap.pop() === 30, "pop 30 from heap failed");
assert(heap.pop() === 40, "pop 40 from heap failed");
assert(heap.pop() === 50, "pop 50 from heap failed");
assert(heap.pop() === 60, "pop 60 from heap failed");
assert(heap.pop() === undefined, "popping empty heap should return undefined");
