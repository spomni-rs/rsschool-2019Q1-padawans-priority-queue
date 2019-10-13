const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize) {
    if (typeof(maxSize) === 'number'){
      this.maxSize = maxSize | 0;
    } else {
      this.maxSize = 30;
    }

    this.heap = new MaxHeap();
  }

	push(data, priority) {
	  if (this.heap.size() === this.maxSize){
        throw new Error('The queue is full.');
      }

      this.heap.push(data, priority);
	}

	shift() {
	  if (this.heap.isEmpty()){
	    throw new Error('The queue is empty.');
	  }
      return this.heap.pop();
	}

	size() {
      return this.heap.size();
	}

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;