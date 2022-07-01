import {employees} from './employees.json';
import * as ManageEmployees from './manageEmployees';

// Main code goes here
function main() {
    console.log(ManageEmployees.generateCompanyStructure(employees));
}

main()
