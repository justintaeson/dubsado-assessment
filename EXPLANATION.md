# Dubsado Technical Assessment

In this assessment, my goal was to build an employee management system using Node and Typescript.

## Instructions on how to install and run your code

- Type `yarn` or `yarn install` to install all the dependencies.
- Type `yarn start` to run & build the program.

## Any noteworthy logic/style decisions you made? If so, what is your reasoning?

- To make my life simpler, I created a getEmployee function that returns you a node from a tree through recursion.
- A lot of the functions that are used in this project are based off the getEmployee function.
- In terms of printing to the console, I decided to console log all the functions in the manageEmployee within it's respective file while I console logged the getEmployees functions in the index module. This is primarily because the getEmployee functions are used often in the manageEmployees module meaning they'd be constantly console logged if the console log is placed in getEmployees.

## Possible Improvements

- Because I'm not the most experienced in tree traversing, the only solution around for me was using recursion. Because of this though, I ran into a lot of issues especially with the call stack. If I had more time, I'd look into other ways of traversing a tree such a breadth first search.
- There were a few times that I used for loops only because it was the only thing that made sense in my mind. If I had more time, I can clean up the code be more consistent in terms of for loops and higher-level functions.

## What is the time complexity of each function in your code?

- `generateCompanyStructure`
  - O(n^2): calls another function—hireEmployees—which will then traverses the tree again
- `hireEmployee`
  - O(n): traverses once to look for node n
- `fireEmployee`
  - O(n): traverses the tree to look for boss node & employee node
- `promoteEmployee`
  - O(n): traverses the tree to look for boss node & employee node; only has 1 for loop
- `demoteEmployee`
  - O(n): traverses the tree to look for subordinate node & employee node; only has 1 for loop
- `getBoss`
  - O(n): traverses once to look for node n
- `getSubordinates`
  - O(n): traverses once to look for node n

## There are two functions that have very similar logic and could be merged into one. Which functions do you think can be merged and why?

- The `promoteEmployee` and `demoteEmployee` functions have very similar logic and could be merged into one. This is because both functions use the same concept of finding a node and moving it either up or down the tree.
