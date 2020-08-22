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
	DepartmentID int NOT NULL,
    PRIMARY KEY (RoleID),
    KEY DepartmentID (DepartmentID),
    CONSTRAINT Roles_ibfk_1 FOREIGN KEY (DepartmentID) REFERENCES employeeTracker.Departments (DepartmentID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employeeTracker.Employees (
    EmployeeID INTEGER NOT NULL AUTO_INCREMENT,
    EmployeeFirstName VARCHAR(30) NOT NULL,
    EmployeeLastName VARCHAR(30) NOT NULL,
	ManagerID INTEGER,
    RoleID INTEGER NOT NULL,
    PRIMARY KEY (EmployeeID),
    KEY RoleID (RoleID),
    CONSTRAINT Employees_ibfk_1 FOREIGN KEY (RoleID) REFERENCES employeeTracker.Roles (RoleID) ON DELETE CASCADE ON UPDATE CASCADE
);