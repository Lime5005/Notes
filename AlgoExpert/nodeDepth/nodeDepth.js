// Write a function to calculate the depth of node, providing the left child and right child of each node in a node binary tree.
// {
//   "tree": {
//     "nodes": [
//       {"id": "1", "left": "2", "right": null, "value": 1},
//       {"id": "2", "left": null, "right": null, "value": 2}
//     ],
//     "root": "1"
//   }
// }
// Output: 1

// {
//   "tree": {
//     "nodes": [
//       {"id": "1", "left": "2", "right": "3", "value": 1},
//       {"id": "2", "left": null, "right": null, "value": 2},
//       {"id": "3", "left": null, "right": null, "value": 3}
//     ],
//     "root": "1"
//   }
// }
// Output: 2
function nodeDepths(root, depth = 0) {
    if (root == null) {
        return 0
    }
    return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)
}

// This is the class of the input binary tree.
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// Recursive function