-- Sample Data
INSERT INTO departments (department_name) 
VALUES 
('Engineering'), 
('Human Resources'), 
('Sales'),
('Finance'),
('Marketing');

INSERT INTO roles (title, salary, department_id) 
VALUES 
('Software Engineer', 50000, 1), 
('HR Manager', 60000, 2),        
('Sales Manager', 70000, 3),     
('Financial Analyst', 80000, 4), 
('Marketing Coordinator', 90000, 5); 

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
('John', 'Doe', 1, NULL),  
('Jane', 'Smith', 2, NULL),
('Bob', 'Jones', 3, 1),    
('Alice', 'Brown', 4, NULL), 
('Charlie', 'Davis', 5, 2); 