import Types from './types'
import * as employeesJSON from './employees.json';
import Employee from './types';
import getBoss from './getEmployees'

export default class TreeNode {
    data: Employee;
    subordinates: TreeNode[];

    constructor(data: Employee) {
        this.data = data
        this.subordinates = [];
    }
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */

export function generateCompanyStructure(employees: Array<Employee>) {
    console.log("Normalizing JSON file...");
    const normalizedEmployees = employeesJSON.employees.map((employee: Employee) => {
        let newName: string = employee.name.split("@")[0];
        newName = newName[0].toUpperCase() + newName.slice(1);
        employee.name = newName;
        return employee;
    });


    const root = new TreeNode(normalizedEmployees[0]) // set the root of the tree to the CEO
    employees.splice(1).forEach((employee: Employee) => {
        hireEmployee(root, employee, employee.boss);
    });

    return root;
}
/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(tree: TreeNode, newEmployee: Employee, bossName: string) {
    const boss = getFutureBoss(tree, bossName);
    const employee = new TreeNode(newEmployee);
    boss.subordinates.push(employee);
    console.log(`[hireEmployee]: Added new employee (${employee.data.name}) with ${boss.data.name} as their boss`);
}

function getFutureBoss(treeNode: TreeNode, bossName: string) {
    if (treeNode.data.name === bossName) return treeNode;

    if (treeNode.subordinates.length) {
        let boss: TreeNode = null;
        for (let i = 0; i < treeNode.subordinates.length && !boss; i++) {
            boss = getFutureBoss(treeNode.subordinates[i], bossName);
        }
        return boss;
    }

    return null;
}


/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
function fireEmployee() {}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
function promoteEmployee() {}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee() {}
