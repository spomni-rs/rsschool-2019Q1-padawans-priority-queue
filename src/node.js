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

    //     one                  >     one
    //    /   \                 >    /   \
    //  two   three             >  two   five(this)
    //        /   \             >        /   \
    //     four  five(this)     >     four   three
    //            /     \       >            /   \
    //          six    seven    >          six   seven

    let five = this;
    let six = this.left; // {Node|null}
    let seven = this.right; // {Node|null}

    this.left = null;
    this.right = null;

    //     one                  >     one
    //    /   \                 >    /   \
    //  two   three             >  two   five(this)
    //        /   \             >        /   \
    //     four  five(this)     >     four   three
    //                          >            /   \
    //          six    seven    >          six   seven

    let three = this.parent;
    let one = three.parent;

    let whereWasFive = three._whatChildIs(five);

    if (one){
      if (one.left === three){
        one.removeChild(three);
        one.left = five;
        five.parent = one;
      } else {
        one.removeChild(three);
        one.right = five;
        five.parent = one;
      }
    }

    //     one                  >     one
    //    /   \                 >    /   \
    //  two  five(this)         >  two   five(this)
    //                          >        /   \
    //     three                >     four   three
    //     /  \                 >            /   \
    //  four       six    seven >          six   seven

    if (whereWasFive === 'left'){

      let four = three.right;

      if (four){
        three.removeChild(four);
        five._appendChildRight(four);
      }

      five._appendChildLeft(three);

    } else if (whereWasFive === 'right'){

      let four = three.left;

      if (four){
        three.removeChild(four);
        five._appendChildLeft(four);
      }

      five._appendChildRight(three);
    }

    //     one                  >     one
    //    /   \                 >    /   \
    //  two  five(this)         >  two   five(this)
    //         /   \            >        /   \
    //      four   three        >     four   three
    //                          >            /   \
    //         six    seven     >          six   seven

    if (six){
      three._appendChildLeft(six);
    }

    if (seven){
      three._appendChildRight(seven);
    }


  }

  _appendChildLeft(node){
    if (this.left !== null){
      this.removeChild(this.left);
    }

    this.left = node;
    node.parent = this;
  }

  _appendChildRight(node){
    if (this.right !== null){
      this.removeChild(this.right);
    }

    this.right = node;
    node.parent = this;
  }

  _whatChildIs(node){
    if (node === this.left){
      return 'left'
    } else if (node === this.right){
      return 'right';
    } else {
      null
    }
  }
}

module.exports = Node;
