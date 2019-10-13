const Node = require('./node');

class MaxHeap {
	constructor() {
    this.clear();
	}

  push(data, priority) {
    let node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

	pop() {
    if (this.isEmpty()){
      return;
    }

    const root = this.detachRoot();
    this.restoreRootFromLastInsertedNode(root);
    this.shiftNodeDown(this.root);

    return root.data;
	}

  detachRoot() {
    const root = this.root;
    this.root = null;

    const rootIndex = this.parentNodes.indexOf(root);
    if (rootIndex > -1){
      this.parentNodes.shift();
    }

    return root;
  }

  restoreRootFromLastInsertedNode(detached) {

    let last = this.parentNodes.pop();

    if (last === undefined){
      return;
    }

    let parent = last.parent;

    if (parent !== null){
      parent.removeChild(last);

      if ( parent !== detached
        && parent.left !== null
      ){
        this.parentNodes.unshift(parent);
      }
    }


    this.root = last;

    if (detached.left){
      last._setChild(detached.left, 'left');
    }

    if (detached.right){
      last._setChild(detached.right, 'right');
    }

    if (last.right === null){
      this.parentNodes.unshift(last);
    }

  }

	size() {
    if (this.isEmpty()){
      return 0;
    }

    let heapHigh = (() => {
      let node = this.root;
      let res = 1;

      while (node.left !== null){
        res++;
        node = node.left
      }

      return res;
    })();

    let lowLevelNodesCount = (() => {
      let res = 0;
      let start = this.parentNodes.length - 1;

      for (let i=start; i>-1; i--){
        if (this.parentNodes[i].left === null){
          res++;
        } else {
          break;
        }
      }

      return res;
    })();

    let size = Math.pow(heapHigh - 1, 2) + lowLevelNodesCount;

    return size;
	}

	isEmpty() {
    if (this.root === null) return true;
    return false;
	}

	clear() {
    this.root = null;
    this.parentNodes = [];
	}

	insertNode(node) {
    if (this.isEmpty()){
      this.root = node;
      this.parentNodes.push(node);
    } else {
      let parent = this.parentNodes[0];
      parent.appendChild(node);
      this.parentNodes.push(node);

      if (parent.right !== null){
        this.parentNodes.shift();
      }
    }
	}

	shiftNodeUp(node) {

    if (node.parent === null){
      this.root = node;
      node.parent = null;
    } else if (node.priority > node.parent.priority){

      if (node.right === null){
        const nodeIndex = this.parentNodes.indexOf(node);
        const parentIndex = this.parentNodes.indexOf(node.parent);

        this.parentNodes[nodeIndex] = node.parent;
        this.parentNodes[parentIndex] = node;
      }

      node.swapWithParent();
      this.shiftNodeUp(node);
    }
	}

	shiftNodeDown(node) {
    if (node === null){
      return;
    }

    let left = node.left;
    let right = node.right;

    if ( right !== null
      && right.priority > node.priority
      && right.priority > left.priority
    ){
      this._swapNodeWithParent(right);
      this.shiftNodeDown(node);
      return;
    }

    if ( left !== null
      && left.priority >= node.priority
    ){
      this._swapNodeWithParent(left);
      this.shiftNodeDown(node);
      return;
    }
  }

  _swapNodeWithParent(node){
    let parent = node.parent;

    if (parent === null){
      return;
    }

    if (parent === this.root){
      this.root = node;
    }

    node.swapWithParent();
    this._swapInParentnodes(node, parent);
  }

  _swapInParentnodes(first, second){
    let firstIndex = this.parentNodes.indexOf(first);
    let secondIndex = this.parentNodes.indexOf(second);

    if (firstIndex !== -1){
      this.parentNodes[firstIndex] = second;
    }

    if (secondIndex !== -1){
      this.parentNodes[secondIndex] = first;
    }
  }
}

module.exports = MaxHeap;