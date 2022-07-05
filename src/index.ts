import {employees} from './employees.json';
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee } from './manageEmployees';
import {findNode} from './getEmployees'

// Main code goes here
import { findLowestEmployee, getBoss, getEmployee, getSubordinates } from "./getEmployees";
import { generateCompanyStructure, hireEmployee, fireEmployee, promoteEmployee, demoteEmployee } from "./manageEmployees";
import {employees as data} from './employees.json'

function main() {

}

main()

/** EXPECTED OUTPUT
 * Normalizing JSON file...
Generating employee tree...
[hireEmployee]: Added new employee (Jeb) with Sarah as their boss
[fireEmployee]: Fired Alicia and replaced with Sal
[promoteEmployee]: Promoted Jared and made Bill his subordinate
[demoteEmployee]: Demoted employee (demoted Xavier and replaced with Maria)
[getBoss]: Bill's boss is Jared
[getSubordinate]: Maria's subordinates are Xavier, Morty, Jared
 */
