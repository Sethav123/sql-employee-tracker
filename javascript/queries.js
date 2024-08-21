const pool = require('./connection.js');

class Database {
//View all departments
  viewAllDepartments() {
    const sql = 'SELECT id, department_name AS name FROM departments';
    return pool.query(sql).then(({ rows }) => {
      console.log("Departments:");
      rows.forEach(row => console.log(`ID: ${row.id}, Name: ${row.name}`)); 
    });
  }
//View all roles
  viewAllRoles() {
    const sql = `
      SELECT roles.id, roles.title, roles.salary, departments.department_name AS department 
      FROM roles 
      LEFT JOIN departments ON roles.department_id = departments.id`;
    return pool.query(sql).then(({ rows }) => {
      console.log("Roles:");
      rows.forEach(row => console.log(`ID: ${row.id}, Title: ${row.title}, Salary: ${row.salary}, Department: ${row.department}`)); 
    });
  }
//View all employees
  viewAllEmployees() {
    const sql = `
      SELECT employees.id, 
             employees.first_name, 
             employees.last_name, 
             roles.title, 
             departments.department_name AS department, 
             roles.salary, 
             manager.first_name AS manager_first_name, 
             manager.last_name AS manager_last_name
      FROM employees
      LEFT JOIN roles ON roles.id = employees.role_id
      LEFT JOIN departments ON departments.id = roles.department_id
      LEFT JOIN employees manager ON manager.id = employees.manager_id
      ORDER BY employees.id ASC`;
  
    return pool.query(sql).then(({ rows }) => {
      console.log("Employees:");
      rows.forEach(({ id, first_name, last_name, title, department, salary, manager_first_name, manager_last_name }) => {
        const managerName = manager_first_name && manager_last_name 
                           ? `${manager_first_name} ${manager_last_name}` 
                           : 'None';
        console.log(`ID: ${id}, Name: ${first_name} ${last_name}, Title: ${title}, Department: ${department}, Salary: ${salary}, Manager: ${managerName}`);
      });
    });
  }
//add department
  addDepartment(department_name) {
    const sql = 'INSERT INTO departments (department_name) VALUES ($1)';
    return pool.query(sql, [department_name]).then(() => {
      console.log(`Department added!`);
    });
  }
//add role
  addRole(title, salary, department_id) {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
    return pool.query(sql, [title, salary, department_id]).then(() => {
      console.log(`Role added!`);
    });
  }
//add employee
  addEmployee(first_name, last_name, role_id, manager_id) {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    return pool.query(sql, [first_name, last_name, role_id, manager_id]).then(() => {
      console.log(`Employee added!`);
    });
  }
//update employee
  updateEmployeeRole(employee_id, role_id) {
    const sql = 'UPDATE employees SET role_id = $1 WHERE id = $2';
    return pool.query(sql, [role_id, employee_id]).then((result) => {
      if (result.rowCount === 0) {
        console.log('Employee not found.');
      } else {
        console.log(`Role updated!`);
      }
    });
  }
}

module.exports = new Database();