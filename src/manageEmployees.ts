import { employees as db } from "./employees.json";
import { getEmployee, getBoss } from "./getEmployees";

interface Employee {
    name: string;
    jobTitle: string;
    salary: string;
    boss: string;
}

export class TreeNode {
    value: Employee;
    descendants: TreeNode[];

    constructor(value: Employee) {
        this.value = value;
        this.descendants = [];
    }
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Employee[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure(employees: Employee[]) {
    console.log("Normalizing JSON file...");
    const normalEmployees = db.map((employee: Employee) => {
        if (employee.name.includes('@')) {
            let newName: string = ''
            for (let i = 0; i < employee.name.indexOf('@'); i++) {
                if (i === 0) {
                    newName += employee.name[i].toUpperCase()
                    continue;
                }
                newName += employee.name[i]
            }
            employee.name = newName
        }
        return employee
    });

    console.log("Generating employee tree...");

    const companyRoot = new TreeNode(normalEmployees[0]);
    employees.splice(1).forEach((employee: Employee) => {
        hireEmployee(companyRoot, employee, employee.boss);
    });

    return companyRoot;
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
    const boss = getEmployee(tree, newEmployee.boss);
    const employee = new TreeNode(newEmployee);
    boss.descendants.push(employee);
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * PSEUDOCODE
 * get firedEmployee from tree
 * if firedEmployee descendants array is populated:
 *  select a random subordinate as replacement
 *  remove replacement from firedEmployee's subordinates
 *  all firedEmployee subordinates must point to replacement as parent node
 *  replacement must add firedEmployee subordinates to descendants
 *  replacement adds firedEmployee's boss to parent node
 *  parent/boss node adds replacement into descendants
 * parent/boss node should find index of firedEmployee in descendants and remove it
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name: string) {
    const employee = getEmployee(tree, name) //Alicia
    const boss = getBoss(tree, employee.value.name) // Sarah
    const employeeIndex = boss.descendants.indexOf(employee)
    if (employee.descendants.length) {
        const randomIndex = Math.floor(Math.random() * employee.descendants.length);
        const randomSubordinate = employee.descendants[randomIndex]
        boss.descendants.push(randomSubordinate)
        boss.descendants.splice(employeeIndex, 1)
        console.log(`[fireEmployee]: Fired ${employee.value.name} and replaced with ${boss.descendants[boss.descendants.length-1].value.name}`);
    } else {
        boss.descendants.splice(employeeIndex, 1)
        console.log(`[fireEmployee]: Fired ${employee.value.name} and replaced with ${boss.descendants[employeeIndex].value.name}`);
    }
    return tree
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *

 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employeeName: string) {
    const employee: TreeNode = getEmployee(tree, employeeName); //Jared
    const boss: TreeNode = getBoss(tree, employeeName); //Bill
    let employeeIndex: number;
    for (let i = 0; i < boss.descendants.length; i++){
        if (boss.descendants[i].value.name === employee.value.name){
            employeeIndex = i
        }
    }
    const bossSubordinatesCopy = JSON.parse(JSON.stringify(boss.descendants));
    const employeeSubordinatesCopy = JSON.parse(JSON.stringify(employee.descendants));
    employee.descendants = bossSubordinatesCopy; // jared = jared + nick
    boss.descendants = employeeSubordinatesCopy

    employee.descendants[0] = boss // now jared = bill + nick
    employee.descendants.map(descendant => {
        descendant.value.boss = employee.value.name
    })
    const higherBoss = getBoss(tree, boss.value.name)
    const bossIndex = higherBoss.descendants.indexOf(boss)
    higherBoss.descendants[bossIndex] = employee
    employee.descendants.push(boss)
    employee.descendants.splice(0,1)

    console.log(`[promoteEmployee]: Promoted ${employee.value.name} and made ${boss.value.name} their subordinate`);
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinate and swaps places in the hierarchy.
 *
 * SIMILAR TO PROMOTEEMPLOYEE FUNCTION!!!
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(tree: TreeNode, employeeName: string, subordinateName: string) {
    const employee: TreeNode = getEmployee(tree, employeeName); // xavier
    const subordinate: TreeNode = getEmployee(tree, subordinateName)
    let employeeIndex: number;
    for (let i = 0; i < employee.descendants.length; i++) {
        if (employee.descendants[i].value.name === subordinateName) {
            employeeIndex = i
        }
    }
    const employeeSubordinatesCopy = JSON.parse(JSON.stringify(employee.descendants));
    const subSubordinatesCopy = JSON.parse(JSON.stringify(subordinate.descendants));
    subordinate.descendants = employeeSubordinatesCopy;
    employee.descendants = subSubordinatesCopy

    const higherBoss = getBoss(tree, employee.value.name)
    const bossIndex = higherBoss.descendants.indexOf(employee)
    higherBoss.descendants[bossIndex] = subordinate
    subordinate.descendants = employeeSubordinatesCopy;
    subordinate.descendants.push(employee)
    subordinate.descendants.map(descendant => {
        descendant.value.boss = subordinate.value.name
    })
    subordinate.descendants.splice(0,1)

    console.log(`[demoteEmployee]: Demoted employee (demoted ${employee.value.name} and replaced with ${subordinate.value.name})`);
}
