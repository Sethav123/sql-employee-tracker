const inquirer = require('inquirer');
const db = require('./javascript/queries.js');

//prompts user for how they want to interact with employees database
const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ]).then(({ choices }) => {
  //determines which method from queries.js to use based on answer to prompt
    switch (choices) {
      case 'View all departments':
        db.viewAllDepartments().then(() => promptUser());
        break;
      case 'View all roles':
        db.viewAllRoles().then(() => promptUser());
        break;
      case 'View all employees':
        db.viewAllEmployees().then(() => promptUser());
        break;
      case 'Add a department':
        addNewDepartment();
        break;
      case 'Add a role':
        addNewRole();
        break;
      case 'Add an employee':
        addNewEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
    }
  });
};
//prompt for adding new department
const addNewDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: 'Enter the name of this department:'
    }
  ]).then(({ department_name }) => {
    //call method to add department
    db.addDepartment(department_name).then(() => promptUser());
  });
};
//prompt for adding new role
const addNewRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of this role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of this role:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID of this role:'
    }
  ]).then(({ title, salary, department_id }) => {
    //call method to add role
    db.addRole(title, salary, department_id).then(() => promptUser());
  });
};
//prompt for adding new employee
const addNewEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for this employee:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for this employee:',
      default: null
    }
  ]).then(({ first_name, last_name, role_id, manager_id }) => {
    //call method to add employee
    db.addEmployee(first_name, last_name, role_id, manager_id).then(() => promptUser());
  });
};
//prompt for updating employee role
const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the new role ID for this employee:'
    }
  ]).then(({ employee_id, role_id }) => {
    //call method to update employee role
    db.updateEmployeeRole(employee_id, role_id).then(() => promptUser());
  });
};
//start application
promptUser();