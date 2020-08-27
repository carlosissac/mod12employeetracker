const { getConnection } = require('../mysql/connection');

const DepartmentView = function() {
    this.ID = 'DepartmentView';
    this.objDepartment = {
        'DepartmentID' : '',
        'DepartmentName' : '',
        'RoleID' : '',
        'RoleTitle' : '',
        'RoleSalary' : ''
    };
};

DepartmentView.prototype.getAllSortByDepartmentID = async function() {
    const qString = 'SELECT * FROM employeeTracker.departmetviewsortbydepartmentid;';
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objDepartment = {};
        this.objDepartment.DepartmentID = element.department_id;
        this.objDepartment.DepartmentName = element.department_title;
        this.objDepartment.RoleID = element.role_id;
        this.objDepartment.RoleName = element.role_title;
        this.objDepartment.RoleSalary = element.role_salary;
        array.push(this.objDepartment);
    });
    return array;
};

module.exports = { DepartmentView };