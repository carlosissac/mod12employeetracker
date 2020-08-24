const { getConnection } = require('../mysql/connection');

const ManagerView = function() {
    this.ID = 'ManagerView';
    this.objManager = {
        'ManagerID' : '',
        'ManagerFirstName' : '',
        'ManagerLastName' : ''
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
        this.objManager = {};
        this.objManager.ManagerID = element.manager_id;
        this.objManager.ManagerFirstName = element.manager_firstname;
        this.objManager.ManagerLastName = element.manager_lastname;
        array.push(this.objManager);
    });
    return array;
};

module.exports = { ManagerView };