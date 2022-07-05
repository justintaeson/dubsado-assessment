import { findNode, getBoss } from './getEmployees';
import * as employeesJSON from './employees.json';
import Employee from './types';

export class TreeNode {
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
    const normalEmployees = employeesJSON.employees.map((employee: Employee) => {
        if (employee.name.includes('@')){
            let newName: string = ''
            for (let i = 0; i < employee.name.indexOf('@'); i++){
                if (i === 0){
                    newName += employee.name[i].toUpperCase()
                    continue;
                }
                newName += employee.name[i]
            }
            employee.name = newName
        }
        return employee
    });

    console.log('Generating employee tree...')
    const root = new TreeNode(normalEmployees[0])
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
    const boss: TreeNode = findNode(tree, bossName);
    const employee = new TreeNode(newEmployee);
    boss.subordinates.push(employee);
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name: string) {
    const employee = findNode(tree, name)
    const boss = getBoss(tree, employee.data.name)
    const employeeIndex = boss.subordinates.indexOf(employee)
    if (employee.subordinates.length){
        const randomSubordinate = Math.floor(Math.random() * employee.subordinates.length);
        boss.subordinates.push(employee.subordinates[randomSubordinate])
        boss.subordinates.splice(employeeIndex, 1)
        console.log(`[fireEmployee]: Fired ${employee.data.name} and replaced with ${boss.subordinates[employeeIndex].data.name}`);
    } else {
        boss.subordinates.splice(employeeIndex, 1)
        console.log(`[fireEmployee]: Fired ${employee.data.name} and replaced with ${boss.subordinates[employeeIndex].data.name}`);
    }
    return tree
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employeeName: string) {
    let employee: TreeNode = findNode(tree, employeeName)
    let boss: TreeNode = getBoss(tree, employeeName)

    const employeeCopy: TreeNode = JSON.parse(JSON.stringify(employee))
    const bossCopy: TreeNode = JSON.parse(JSON.stringify(boss))
    boss.data.name = employeeCopy.data.name
    boss.data.jobTitle = employeeCopy.data.jobTitle
    boss.data.salary = employeeCopy.data.salary

    employee.data.name = bossCopy.data.name
    employee.data.jobTitle = bossCopy.data.jobTitle
    employee.data.salary = bossCopy.data.salary
    console.log(`[promoteEmployee]: Promoted ${boss.data.name} and made ${employee.data.name} his subordinate`)
}


/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(tree: TreeNode, employeeName: string, subordinateName: string) {

    let demotedEmployee: TreeNode = getBoss(tree, subordinateName) // Xavier
    let newBoss: TreeNode = findNode(tree, subordinateName) // Maria
    const demotedEmployeeIndex: number = demotedEmployee.subordinates.indexOf(newBoss)
    demotedEmployee.subordinates[demotedEmployeeIndex] = demotedEmployee
    const demotedEmployeeName = demotedEmployee.subordinates[demotedEmployeeIndex].data.name
    demotedEmployee = newBoss
    console.log(`[demoteEmployee]: Demoted employee (demoted ${demotedEmployeeName} and replaced with ${demotedEmployee.data.name})`)
    return tree;

}
