DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;

CREATE TABLE employeeTracker.Roles (
    RoleID INTEGER NOT NULL AUTO_INCREMENT,
    RoleTitle VARCHAR(30) NOT NULL,
    RoleSalary DECIMAL(19,2) NOT NULL,
    RoleCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (RoleID)
);

CREATE TABLE employeeTracker.Departments (
    DepartmentID INTEGER NOT NULL AUTO_INCREMENT,
    DepartmentName VARCHAR(30) NOT NULL,
    DepartmentCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (DepartmentID)
);

CREATE TABLE employeeTracker.Employees (
    EmployeeID INTEGER NOT NULL AUTO_INCREMENT,
    EmployeeFirstName VARCHAR(30) NOT NULL,
    EmployeeLastName VARCHAR(30) NOT NULL,
    RoleID INTEGER NOT NULL,
    ManagerID INTEGER NOT NULL,
    DepartmentID INTEGER NOT NULL,
    PRIMARY KEY (EmployeeID),
    KEY RoleID (RoleID),
    KEY DepartmentID (DepartmentID),
    CONSTRAINT Employees_ibfk_1 FOREIGN KEY (RoleID) REFERENCES employeeTracker.Roles (RoleID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT Employees_ibfk_2 FOREIGN KEY (DepartmentID) REFERENCES employeeTracker.Departments (DepartmentID) ON DELETE CASCADE ON UPDATE CASCADE
);

