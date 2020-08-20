class Node {
  constructor() {
    this.data = [];
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert = (record) => {
    if (this.root === null) {
      this.root = new Node();
      this.root.data.push(record);
    } else this.insertNode(this.root, record);
  };

  insertNode = (parent, record) => {
    if (record.date < parent.data[0].date) {
      if (parent.left === null) {
        parent.left = new Node();
        parent.left.data.push(record);
      } else {
        this.insertNode(parent.left, record);
      }
    } else if (record.date > parent.data[0].date) {
      if (parent.right === null) {
        parent.right = new Node();
        parent.right.data.push(record);
      } else {
        this.insertNode(parent.right, record);
      }
    } else {
      parent.data.push(record);
    }
  };

  search = (node, date) => {
    if (node === null) return [];
    else if (date < node.data[0].date) return this.search(node.left, date);
    else if (date > node.data[0].date) return this.search(node.right, date);
    else return node.data;
  };
}


export function constructBST(records) {
    let bst = new BST()
    records.forEach((record) => {
        bst.insert(record)
    })
    return bst
}