package AlgoExpert.findClosestToBST.findCLosest;

class Program {
  public static int findClosestValueInBst(BST tree, int target) {
		return findClosestValueInBstree(tree, target, tree.value);
	}
	
	public static int findClosestValueInBstree(BST tree, int target, int closest) {
		BST currentNode = tree;
		while (currentNode != null) {
      // Math.abs() return the absolute value, either positive or negative, return as it is.
      // Presume closest = left, 12 - 5 = 6, 12 - 10 = 2; 6 > 2, so the right is nearer to target.
			if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
				closest = currentNode.value;
			}
      // Since the left is always smaller than right, here 12 > 10, so the currentNode != currentNode.left
			if (target < currentNode.value) {
				currentNode = currentNode.left;
			} else if (target > currentNode.value) {
				currentNode = currentNode.right;
			} else {
				break;
			}
		}
		return closest;
	}
	
	static class BST {
		public int value;
		public BST left;
		public BST right;
		
		public BST(int value) {
			this.value = value;
		}
	}
	
}

// In a Binary Search Tree, retuns the closest value to the target value provided.
// {
//   "tree": {
//     "nodes": [
//       {"id": "10", "left": "5", "right": "15", "value": 10},
//       {"id": "15", "left": "13", "right": "22", "value": 15},
//       {"id": "22", "left": null, "right": null, "value": 22},
//       {"id": "13", "left": null, "right": "14", "value": 13},
//       {"id": "14", "left": null, "right": null, "value": 14},
//       {"id": "5", "left": "2", "right": "5-2", "value": 5},
//       {"id": "5-2", "left": null, "right": null, "value": 5},
//       {"id": "2", "left": "1", "right": null, "value": 2},
//       {"id": "1", "left": null, "right": null, "value": 1}
//     ],
//     "root": "10"
//   },
//   "target": 12
// }