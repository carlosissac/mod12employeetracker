const inquirer = require('inquirer');
const constab = require('console.table');
const { Department } = require('./orm/department');
const { Employee } = require('./orm/employee');
const { Role } = require('./orm/role');
const { EmployeeView } = require('./orm/employeeview');
const { ManagerView } = require('./orm/managerview');
const { BudgetView } = require('./orm/budgetview');

const dept = new Department();
const emp = new Employee();
const rol = new Role();
const empvw = new EmployeeView();
const mgrvw = new ManagerView();
const bdgtvw = new BudgetView();

general = async () => {
//const array = await emp.getAll();
//console.log(array);
//const array = await emp.getSingle(2);
//console.log(array);
//emp.post('karyn','Clarke','2','1');
//emp.put('10','karyn','CLARKE','NULL','4');
//emp.delete('10');

//const array = await dept.getAll();
//console.log(array);
//const array = await dept.getSingle(2);
//console.log(array);
//dept.post('');
//dept.put('9','New Product Introduction');
//const str = await dept.delete('9');
//console.log(str);

//const array = await rol.getAll();
//console.log(array);
//const array = await rol.getSingle(3);
//console.log(array);
//const array = await rol.post('New Product Engineer','115000','3');
//console.log(array);
//rol.put('9','New Product Engineer','','4');
//rol.delete('9');

//const array = await empvw.getAllSortByDeptID();
//console.log(array);
//const array = await empvw.getAllSortByEmpID();
//console.log(array);
//const array = await empvw.getAllSortByManagerID();
//console.log(array);
//const array = await mgrvw.getAllSortByDeptID();
//console.log(array);
//const array = await mgrvw.getAllSortByDeptID();
//console.log(array);
const array = await bdgtvw.getAllSortByDeptID();
console.log(array);

};


general();
