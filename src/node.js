class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;

    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left === null){
      this.left  = node;
    } else if (this.right === null){
      this.right = node;
    } else {
      return;
    }

    node.parent = this;
  }

  removeChild(node) {
    if (node === this.left){
      this.left = null;
    } else if (node === this.right){
      this.right = null;
    } else {
      throw new Error("The passed node is not a child.");
    }

    node.parent = null;
  }

  remove() {
    if (this.parent !== null){
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {

    if (this.parent === null){
      return;
    }

    let child = this;
    let parent = this.parent;

    const childBuff = {
      parent: child.parent,
      left: child.left,
      right: child.right
    }

    const parentBuff = {
      parent: parent.parent,
      left: parent.left,
      right: parent.right
    }

    if (parentBuff.parent === null){
      child.parent = null;
    } else {
      parentBuff.parent._replaceChild(parent, child);
    }

    if (parentBuff.left === child){
      child._setChild(parent, 'left');
      child._setChild(parentBuff.right, 'right');
    } else {
      child._setChild(parentBuff.left, 'left');
      child._setChild(parent, 'right')
    }

    parent._setChild(childBuff.left, 'left');
    parent._setChild(childBuff.right, 'right');

  }

  _replaceChild(oldChild, newChild){
    if (oldChild === this.left){
      this._setChild(newChild, 'left');
    } else if (oldChild === this.right){
      this._setChild(newChild, 'right');
    } else {
      throw new Error('The node "oldChild" is not a child of the node "this".')
    }
  }

  _setChild(child, position){
    if (position === 'left'){
      this.left = child;
    } else if (position === 'right'){
      this.right = child;
    } else {
      throw new Error('The option position is not equal to the "left" or "right" strings.')
    }

    if (child && child !== null){
      child.parent = this;
    }
  }


}

module.exports = Node;
