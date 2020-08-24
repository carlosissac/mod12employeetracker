const { getConnection } = require('../mysql/connection');

const EmployeeView = function() {
    this.ID = 'EmployeeView';
    this.objEmp = {
        'EmployeeID' : '',
        'EmployeeFirstName' : '',
        'EmployeeLastName' : '',
        'RoleID' : '',
        'RoleTitle' : '',
        'DepartmentID' : '',
        'DepartmentTitle' : '',
        'RoleSalary' : '',
        'ManagerID' : '',
        'ManagerFullname' : '' 
    };
};

EmployeeView.prototype.getAllSortByDeptID = async function() {
    const qString = 'SELECT * FROM employeeTracker.employeeviewsortbydepartmentid;';
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objEmp = {};
        this.objEmp.EmployeeID = element.employee_id;
        this.objEmp.EmployeeFirstName = element.first_name;
        this.objEmp.EmployeeLastName = element.last_name;
        this.objEmp.RoleID = element.role_id;
        this.objEmp.RoleTitle = element.role_title;
        this.objEmp.DepartmentID = element.department_id;
        this.objEmp.DepartmentTitle = element.department_title;
        this.objEmp.RoleSalary = element.role_salary;
        this.objEmp.ManagerID = element.manager_id;
        this.objEmp.ManagerFullname = element.manager_fullname;
        array.push(this.objEmp);
    });
    return array;
};

EmployeeView.prototype.getAllSortByEmpID = async function() {
    const qString = 'SELECT * FROM employeeTracker.employeeviewsortbyemployeeid;';
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objEmp = {};
        this.objEmp.EmployeeID = element.employee_id;
        this.objEmp.EmployeeFirstName = element.first_name;
        this.objEmp.EmployeeLastName = element.last_name;
        this.objEmp.RoleID = element.role_id;
        this.objEmp.RoleTitle = element.role_title;
        this.objEmp.DepartmentID = element.department_id;
        this.objEmp.DepartmentTitle = element.department_title;
        this.objEmp.RoleSalary = element.role_salary;
        this.objEmp.ManagerID = element.manager_id;
        this.objEmp.ManagerFullname = element.manager_fullname;
        array.push(this.objEmp);
    });
    return array;
};

EmployeeView.prototype.getAllSortByManagerID = async function() {
    const qString = 'SELECT * FROM employeeTracker.employeeviewsortbymanagerid;';
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objEmp = {};
        this.objEmp.EmployeeID = element.employee_id;
        this.objEmp.EmployeeFirstName = element.first_name;
        this.objEmp.EmployeeLastName = element.last_name;
        this.objEmp.RoleID = element.role_id;
        this.objEmp.RoleTitle = element.role_title;
        this.objEmp.DepartmentID = element.department_id;
        this.objEmp.DepartmentTitle = element.department_title;
        this.objEmp.RoleSalary = element.role_salary;
        this.objEmp.ManagerID = element.manager_id;
        this.objEmp.ManagerFullname = element.manager_fullname;
        array.push(this.objEmp);
    });
    return array;
};

module.exports = { EmployeeView };