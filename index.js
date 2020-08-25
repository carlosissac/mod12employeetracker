const inquirer = require('inquirer');
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

const EmployeeTracker = function() {
    this.ID = 'EmployeeTracker';
    this.inquierElements();
    this.mainOptions();
};

EmployeeTracker.prototype.validateTextInput = function(text) {
    if(text !== ``) {
        return true
    }
    else {
        console.log(` NO INPUT DETECTED, TRY AGAIN`.brightRed)
    }
};

EmployeeTracker.prototype.inquierElements = function() {

    this.disp1 = {
        'EmployeeID' : '',
        'EmployeeFirstName' : '',
        'EmployeeLastName' : '',
        'RoleTitle' : '',
        'DepartmentTitle' : '',
        'RoleSalary' : '',
        'ManagerFullname': ''                  
    };

    this.disp2 = {
        'DepartmentID' : '',
        'DepartmentName' : '',
        'DepartmentBudget' : ''
    };

    this.disp3 = {
        'ManagerID' : '',
        'ManagerFirstName' : '',
        'ManagerLastName' : ''
    };

    this.disp4A = {
        'DepartmentID' : '',
        'DepartmentName' : ''
    };

    this.disp5 = {
        'RoleID' : '',
        'RoleTitle' : '',
        'RoleSalary' : ''
    };

    this.departmentid = {
        type: 'input',
        name: 'attribute', 
        message: 'Input DepartmentID :',
        validate: this.validateTextInput
    }

    this.managerid = {
        type: 'input',
        name: 'attribute', 
        message: 'Input ManagerID :',
        validate: this.validateTextInput
    }

    this.mainmenu = {
        type: 'list',
        name: 'mainmenu',//mainmenu
        message: 'EMPLOYEE TRACKER - MAIN MENU',
        choices: ['1.View Reports',
                '2.Admin Tasks',
                '3.Exit App']
    };

    this.viewreportsmenu = {
        type: 'list',
        name: 'viewreports',//viewreports
        message: 'VIEW REPORTS - OPTIONS',
        choices: ['1.View All Employees by ID',
            '2.View All Employees by Department',
            '3.View All Employees by Manager',
            '4.View All Available Departments',
            '5.View All Available Roles',
            '6.View Employees assigned to a Manager',
            '7.List All Department Budgets',
            '8.Search Department Budget']
    };

    this.admintasksmenu = {
        type: 'list',
        name: 'admintasksmenu',//admintasksmenu
        message: 'ADMIN TASKS - OPTIONS',
        choices: ['1.Create New Employee',
            '2.Delete Employee',
            '3.Assign Employee to Department',
            '4.Assign Employee to Manager',
            '5.Create New Departemt',
            '6.Update Department',
            '7.Delete Department',
            '8.Create New Role',
            '9.Update Role',
            'A.Delete Role',
            'B.Load Schema & Seed Data']
    };
};

EmployeeTracker.prototype.roleArrayHandler = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp5 = {};
        this.disp5.RoleID = element.RoleID;
        this.disp5.RoleTitle = element.RoleTitle;
        this.disp5.RoleSalary = element.RoleSalary;   
        disp_array.push(this.disp5);
    });
    if(!disp_array.length) {
        return 'managerArrayHandler - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.managerArrayHandler = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp3 = {};
        if (element.ManagerID !== null) {
            this.disp3.ManagerID = element.ManagerID;
            this.disp3.ManagerFirstName = element.ManagerFirstName;
            this.disp3.ManagerLastName = element.ManagerLastName;   
            disp_array.push(this.disp3);
        }
    });
    if(!disp_array.length) {
        return 'managerArrayHandler - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.departmentArrayHandler_A = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp2 = {};
        this.disp2.DepartmentID = element.DepartmentID;
        this.disp2.DepartmentName = element.DepartmentName;
        disp_array.push(this.disp2);
    });               
    if(!disp_array.length) {
        return 'departmentArrayHandler_A - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.departmentArrayHandler = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp2 = {};
        this.disp2.DepartmentID = element.DepartmentID;
        this.disp2.DepartmentName = element.DepartmentName;
        this.disp2.DepartmentBudget = element.DepartmentBudget;
        disp_array.push(this.disp2);
    });               
    if(!disp_array.length) {
        return 'departmentArrayHandler - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.managerArrayHandler = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp3 = {};
        if (element.ManagerID !== null) {
            this.disp3.ManagerID = element.ManagerID;
            this.disp3.ManagerFirstName = element.ManagerFirstName;
            this.disp3.ManagerLastName = element.ManagerLastName;   
            disp_array.push(this.disp3);
        }
    });
    if(!disp_array.length) {
        return 'managerArrayHandler - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.employeeArrayHandler = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp1 = {};
        this.disp1.EmployeeID = element.EmployeeID;
        this.disp1.EmployeeFirstName = element.EmployeeFirstName;
        this.disp1.EmployeeLastName = element.EmployeeLastName;
        this.disp1.RoleTitle = element.RoleTitle;
        this.disp1.DepartmentTitle = element.DepartmentTitle;
        this.disp1.RoleSalary = element.RoleSalary;
        this.disp1.ManagerFullname = element.ManagerFullname;    
        disp_array.push(this.disp1);
    });
    if(!disp_array.length) {
        return 'employeeArrayHandler - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.adminTasks = async function(option) {
    let i = option;
    while(i<8) {
        switch(i) {
            case 1:
                //1.Create New Employee

            break;
            case 2:
                //2.Delete Employee

            break;
            case 3:
                //3.Assign Employee to Department

            break;
            case 4:
                //4.Assign Employee to Manager

            break;
            case 5:
                //5.Create New Departemt

            break;
            case 6:
                //6.Update Department

            break;
            case 7:
                //7.Delete Department

            break;
            case 8:
                //8.Create New Role

            break;
            case 9:
                //9.Update Role

            break;
            case 'A':
                //A.Delete Role
            break;
            case 'B':
                //B.Renew Schema & Seed Data
            break;
            case 'C':
                //C.Load Schema & Seed Data
            break;
            default:
                console.log('viewReports Invalid');
            break;
        }
    }
};

EmployeeTracker.prototype.viewReports = async function(option) {
    let i = option;
    while(i<9) {
        switch(i) {
            case 1:
                //1.View All Employees by ID
                let disp_array1 = [];
                const array1 = await empvw.getAllSortByEmpID();
                disp_array1 = this.employeeArrayHandler(array1);
                console.table(disp_array1);
            break;
            case 2:
                //2.View All Employees by Department
                let disp_array2 = [];
                const array2 = await empvw.getAllSortByDeptID();
                disp_array2 = this.employeeArrayHandler(array2);             
                console.table(disp_array2);
            break;
            case 3:
                //3.View All Employees by Manager
                let disp_array3 = [];
                const array3 = await empvw.getAllSortByManagerID();
                disp_array3 = this.employeeArrayHandler(array3);   
                console.table(disp_array3);
            break;
            case 4:
                //4.View All Available Departments
                let disp_array4 = [];
                const array4 = await dept.getAll();
                disp_array4 = this.departmentArrayHandler_A(array4);   
                console.table(disp_array4);
            break;
            case 5:
                //5.View All Available Roles
                let disp_array5 = [];
                const array5 = await rol.getAll();
                disp_array5 = this.roleArrayHandler(array5);   
                console.table(disp_array5);
            break;
            case 6:
                //6.View Employees assigned to a Manager
                let disp_array6A = [];
                const array6A = await mgrvw.getAllSortByManagerID();
                disp_array6A = this.managerArrayHandler(array6A);               
                console.table(disp_array6A);

                const mngr = await inquirer.prompt(this.managerid);
                let disp_array6B = [];
                const array6B = await empvw.getSingleFindByManagerID(String(mngr.attribute));
                disp_array6B = this.employeeArrayHandler(array6B);           
                console.table(disp_array6B);
            break;
            case 7:
                //7.List All Department Budgets
                let disp_array7 = [];
                const array7 = await bdgtvw.getAllSortByDepartmentID();
                disp_array7 = this.departmentArrayHandler(array7);   
                console.table(disp_array7);
            break;
            case 8:
                //8.Search Department Budget
                let disp_array8A = [];
                const array8A = await bdgtvw.getAllSortByDepartmentID();
                disp_array8A = this.departmentArrayHandler_A(array8A);
                console.table(disp_array8A);

                const bdgt = await inquirer.prompt(this.departmentid);
                let disp_array8B = [];
                const array8B = await bdgtvw.getSingle(String(bdgt.attribute));
                disp_array8B = this.departmentArrayHandler(array8B);  
                console.table(disp_array8B);
            break;
            default:
                console.log('Invalid Options');
            break;
        }
        i = 9;
    }
};

EmployeeTracker.prototype.mainOptions = async function() {
    let i = 0;
    let j = 0;
    let k = 0;
    while(i<4) {
        const opt = await inquirer.prompt(this.mainmenu);
        i = Number(opt.mainmenu[0]);
        switch(i) {
            case 1:
                const vrm = await inquirer.prompt(this.viewreportsmenu);
                j = Number(vrm.viewreports[0]);
                await this.viewReports(j);
            break;
            case 2:
                const atm = await inquirer.prompt(this.admintasksmenu);
                k = Number(atm.admintasksmenu[0]);
            
            break;
            case 3:
                console.log('Exit Employee Tracker');
                i = 4;
            break;
            default:
                console.log('mainOptions Invalid');
            break;
        }
    }
};

tracker = new EmployeeTracker();

module.exports = { EmployeeTracker };