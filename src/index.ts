// Main code goes here
import { findLowestEmployee, getBoss, getEmployee, getSubordinates } from "./getEmployees";
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee } from "./manageEmployees";
import {employees as data} from './employees.json'

function main() {
    const tree = generateCompanyStructure(data);

    const newEmployee = {
        name: "Jeb",
        jobTitle: "Executive Assistant",
        salary: "70000",
        boss: "Sarah"
    }

    console.log("\n");

    hireEmployee(tree, newEmployee, "Sarah");
    fireEmployee(tree, "Alicia");
    promoteEmployee(tree, "Jared");
    demoteEmployee(tree, "Xavier", "Maria");

    console.log("\n");

    console.log(`[getBoss]: Bill's boss is ${getBoss(tree, "Bill").value.name}`);
    const subordinateNames = getSubordinates(tree, "Maria").map((subordinate) => subordinate.value.name).join(', ');
    console.log(`[getSubordinate]: Maria's subordinates are ${subordinateNames}`)
}

main()
