DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;

CREATE TABLE employeeTracker.Departments (
    DepartmentID INTEGER NOT NULL AUTO_INCREMENT,
    DepartmentName VARCHAR(30) NOT NULL,
    DepartmentCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (DepartmentID)
);

CREATE TABLE employeeTracker.Roles (
    RoleID INTEGER NOT NULL AUTO_INCREMENT,
    RoleTitle VARCHAR(30) NOT NULL,
    RoleSalary DECIMAL(19,2) NOT NULL,
    RoleCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	DepartmentID INTEGER NOT NULL,
    PRIMARY KEY (RoleID),
    KEY DepartmentID (DepartmentID),
    CONSTRAINT Roles_ibfk_1 FOREIGN KEY (DepartmentID) REFERENCES employeeTracker.Departments (DepartmentID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employeeTracker.Employees (
    EmployeeID INTEGER NOT NULL AUTO_INCREMENT,
    EmployeeFirstName VARCHAR(30) NOT NULL,
    EmployeeLastName VARCHAR(30) NOT NULL,
	ManagerID INTEGER NULL,
    RoleID INTEGER NOT NULL,
    PRIMARY KEY (EmployeeID),
    KEY RoleID (RoleID),
    CONSTRAINT Employees_ibfk_1 FOREIGN KEY (RoleID) REFERENCES employeeTracker.Roles (RoleID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE VIEW employeeTracker.employeeViewSortByEmployeeID
AS
SELECT  emp.EmployeeID employee_id,  
		emp.EmployeeFirstName first_name, 
        emp.EmployeeLastName last_name,
        rol.RoleID role_id, 
        rol.RoleTitle role_title,
        dept.DepartmentID department_id,
        dept.DepartmentName department_title,
        rol.RoleSalary role_salary,
        emp.ManagerID AS manager_id,
		CONCAT(emp2.EmployeeFirstName, ' ' ,emp2.EmployeeLastName) AS manager_fullname
FROM employeeTracker.Employees emp
	INNER JOIN employeeTracker.Roles rol
		ON emp.RoleID = rol.RoleID
	INNER JOIN employeeTracker.Departments dept
		ON rol.RoleID = dept.DepartmentID
	LEFT JOIN employeeTracker.Employees emp2
		ON emp2.EmployeeID =  emp.ManagerID
	ORDER BY
		emp.EmployeeID;

CREATE VIEW employeeTracker.employeeViewSortByDepartmentID
AS
SELECT  emp.EmployeeID employee_id,  
		emp.EmployeeFirstName first_name, 
        emp.EmployeeLastName last_name,
        rol.RoleID role_id, 
        rol.RoleTitle role_title,
        dept.DepartmentID department_id,
        dept.DepartmentName department_title,
        rol.RoleSalary role_salary,
        emp.ManagerID AS manager_id,
		CONCAT(emp2.EmployeeFirstName, ' ' ,emp2.EmployeeLastName) AS manager_fullname
FROM employeeTracker.Employees emp
	INNER JOIN employeeTracker.Roles rol
		ON emp.RoleID = rol.RoleID
	INNER JOIN employeeTracker.Departments dept
		ON rol.RoleID = dept.DepartmentID
	LEFT JOIN employeeTracker.Employees emp2
		ON emp2.EmployeeID =  emp.ManagerID
	ORDER BY
		dept.DepartmentID, 
        emp.EmployeeID;

CREATE VIEW employeeTracker.employeeViewSortByManagerID
AS
SELECT  emp.EmployeeID employee_id,  
		emp.EmployeeFirstName first_name, 
        emp.EmployeeLastName last_name,
        rol.RoleID role_id, 
        rol.RoleTitle role_title,
        dept.DepartmentID department_id,
        dept.DepartmentName department_title,
        rol.RoleSalary role_salary,
        emp.ManagerID AS manager_id,
		CONCAT(emp2.EmployeeFirstName, ' ' ,emp2.EmployeeLastName) AS manager_fullname
FROM employeeTracker.Employees emp
	INNER JOIN employeeTracker.Roles rol
		ON emp.RoleID = rol.RoleID
	INNER JOIN employeeTracker.Departments dept
		ON rol.RoleID = dept.DepartmentID
	LEFT JOIN employeeTracker.Employees emp2
		ON emp2.EmployeeID =  emp.ManagerID
	ORDER BY
		emp.ManagerID,
        emp.EmployeeID;

CREATE VIEW employeeTracker.departmetBudgetViewSortByDepartmentID
AS
SELECT  dept.DepartmentID department_id,
        dept.DepartmentName department_title,
        SUM(rol.RoleSalary) budget
FROM employeeTracker.Employees emp
	INNER JOIN employeeTracker.Roles rol
		ON emp.RoleID = rol.RoleID
	INNER JOIN employeeTracker.Departments dept
		ON rol.RoleID = dept.DepartmentID
	LEFT JOIN employeeTracker.Employees emp2
		ON emp2.EmployeeID =  emp.ManagerID
	GROUP BY dept.DepartmentID
    ORDER BY dept.DepartmentID;

CREATE VIEW employeeTracker.managerViewSortManagerID
AS
SELECT  
		DISTINCT emp.ManagerID AS manager_id,
		emp2.EmployeeFirstName AS manager_firstname,  
        emp2.EmployeeLastName AS manager_lastname
FROM employeeTracker.Employees emp
	LEFT JOIN employeeTracker.Employees emp2
		ON emp2.EmployeeID =  emp.ManagerID
	ORDER BY
		emp.ManagerID;