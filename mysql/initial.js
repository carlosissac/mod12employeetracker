const { getConnection } = require('./connection');

const Initial = function() {
    this.ID = 'Initial';
};

Initial.prototype.initialDepartment = async function(DepartmentName) {
    const query = 'INSERT INTO employeeTracker.Departments (DepartmentName) ';
    const d1 = 'VALUES (';
    const d2 = ');';
    const dinsert = `'${DepartmentName}'`;
    const qString = query + d1 + dinsert + d2;
    
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();
    console.log(`Initial Insert DepartmentID: ${rows.insertId}`);
};

Initial.prototype.initialRoles = async function(RoleTitle, RoleSalary, DepartmentID) {
    const query = 'INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID) ';
    const d1 = 'VALUES (';
    const d2 = ');';
    const dinsert = `'${RoleTitle}', '${RoleSalary}', ${DepartmentID}`;
    const qString = query + d1 + dinsert + d2;
    
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();
    console.log(`Initial Insert RolesID: ${rows.insertId}`);
};

Initial.prototype.initialEmployees = async function(EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) {
    const query = 'INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) ';
    const d1 = 'VALUES (';
    const d2 = ');';
    const dinsert = `'${EmployeeFirstName}', '${EmployeeLastName}', ${ManagerID}, ${RoleID}`;
    const qString = query + d1 + dinsert + d2;
    
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();
    console.log(`Initial Insert EmployeeID: ${rows.insertId}`);
};

module.exports = { Initial };