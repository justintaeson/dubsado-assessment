
    }
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Employee[]} employees array of employees
 * @returns {TreeNode}
 */

                    newName += employee.name[i].toUpperCase()
                    continue;
                }
                newName += employee.name[i]
            }
            employee.name = newName
        }
        return employee
    });



/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(tree: TreeNode, newEmployee: Employee, bossName: string) {

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

}
