INSERT INTO employeeTracker.Departments (DepartmentName)
VALUES ('Enterprise Platform');
INSERT INTO employeeTracker.Departments (DepartmentName)
VALUES ('Marketplace Acceleration');
INSERT INTO employeeTracker.Departments (DepartmentName)
VALUES ('Business Intelligence');
INSERT INTO employeeTracker.Departments (DepartmentName)
VALUES ('Quality Services');

INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Technology Manager', '150000', '1');
INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Product Owner', '145000', '2');
INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Firmware Engineer', '135000', '3');
INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Software Engineer', '135000', '4');
INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Technology Lead', '145000', '1');
INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Scrum Master', '135000', '2');
INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID)
VALUES ('Engineering Intern', '135000', '3');

INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID)
VALUES ('Beki', 'Gonzales', NULL, 1);
INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID)
VALUES ('Keith', 'Billings', NULL, 3);
INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID)
VALUES ('Tiana', 'Husted', 2, 6);
INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID)
VALUES ('Heather', 'Stolz', 1, 2);
INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID)
VALUES ('Mike', 'Kelly', 2, 4);