import {employees} from './employees.json';
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee } from './manageEmployees';
import {findNode} from './getEmployees'

// Main code goes here
function main() {
    const tree = generateCompanyStructure(employees);
    const newEmployee = {
        name: 'Jeb',
        jobTitle: 'TBD',
        boss: 'Sarah',
        salary: 'TBD'
    }
    console.log("\n");
    hireEmployee(tree, newEmployee, newEmployee.boss)
    console.log(`[hireEmployee]: Added new employee (${newEmployee.name}) with ${newEmployee.boss} as their boss`);
    fireEmployee(tree, 'Alicia');
    promoteEmployee(tree, 'Jared')
    demoteEmployee(tree, 'Xavier', 'Maria')
    console.log("\n");
    console.log(`[getBoss]: Bill's boss is ${findNode(tree, "Bill").data.boss}`);
}

main()
