import { TreeNode } from './manageEmployees'

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(tree: TreeNode, employeeName: string) {
  const employee = findNode(tree, employeeName)
  const employeeCopy = JSON.parse(JSON.stringify(employee))
  const boss = findNode(tree, employeeCopy.data.boss)
  return boss;
}
/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(tree: TreeNode, employeeName: string) {
  const employeeNode = findNode(tree, employeeName)
  const subordinates = employeeNode.subordinates
  return subordinates
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
/**
 * Helper function that uses recursion to look for a specific employee in our tree
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode} employee
 */

export function findNode(tree: TreeNode, employeeName: string) {
  if (tree.data.name === employeeName) {
    return tree;
  } else if (tree.subordinates.length) {
    let node: TreeNode;
    for (let i = 0; !node && i < tree.subordinates.length; i++) {
      node = findNode(tree.subordinates[i], employeeName)
    }
    return node;
  } else return null;
}
