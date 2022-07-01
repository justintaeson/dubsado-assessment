import TreeNode from './manageEmployees'

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export default function getBoss(tree: TreeNode, employeeName: string) {
  if (tree.subordinates.map((subordinate) => subordinate.data.name).find(name => name === employeeName)) return tree;
  if (tree.subordinates.length) {
    let boss: TreeNode = null;
    for (let i = 0; i < tree.subordinates.length && !boss; i++) {
      boss = getBoss(tree.subordinates[i], employeeName);
      console.log('its working')
    }
    return boss;
  }
  return null;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
function getSubordinates() {

}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {

}
