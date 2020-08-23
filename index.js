const inquirer = require('inquirer');
const constab = require('console.table');
const { Department } = require('./orm/department');
const { Employee } = require('./orm/employee');
const { Role } = require('./orm/role');

const dept = new Department();
const emp = new Employee();
const rol = new Role();

//dept.getAll();
//dept.getSingle(2);
//dept.post('Facilities');
//dept.put(9,'InfoSec');
//dept.delete(7);

general = async () => {

//const array = await emp.getAll();
//console.log(array);
//const array = await emp.getSingle(2);
//console.log(array);
//emp.post('karyn','Clarke','2','1');
//emp.put('10','karyn','CLARKE','NULL','4');
//emp.delete('10');

};


general();

//const allemp = await emp.getAll();
//console.log(allemp);
//emp.getSingle(2);
//emp.post('Echo', 'Echo', '', 4);
//emp.put(11,'','','','5');
//emp.delete(11);

//rol.getAll();
//rol.getSingle(2);
//rol.post('Production Engineer', '135000', 2);
//rol.put(11,'','','5');
//rol.delete(11);
