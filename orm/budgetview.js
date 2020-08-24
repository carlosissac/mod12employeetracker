const { getConnection } = require('../mysql/connection');

const BudgetView = function() {
    this.ID = 'BudgetView';
    this.objBudget = {
        'DepartmentID' : '',
        'DepartmentName' : '',
        'DeparmentBudget' : ''
    };
};

BudgetView.prototype.getAllSortByDeptID = async function() {
    const qString = 'SELECT * FROM employeeTracker.departmetbudgetviewsortbydepartmentid;';
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objBudget = {};
        this.objBudget.DepartmentID = element.department_id;
        this.objBudget.DepartmentName = element.department_title;
        this.objBudget.DepartmentBudget = element.budget;
        array.push(this.objBudget);
    });
    return array;
};

module.exports = { BudgetView };