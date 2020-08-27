const inquirer = require('inquirer');
const { Department } = require('./orm/department');
const { Employee } = require('./orm/employee');
const { Role } = require('./orm/role');
const { EmployeeView } = require('./orm/employeeview');
const { ManagerView } = require('./orm/managerview');
const { BudgetView } = require('./orm/budgetview');
const { DepartmentView } = require('./orm/departmentview');

const dept = new Department();
const emp = new Employee();
const rol = new Role();
const empvw = new EmployeeView();
const mgrvw = new ManagerView();
const bdgtvw = new BudgetView();
const dptvw = new DepartmentView();

const EmployeeTracker = function() {
    this.ID = 'EmployeeTracker';
    this.empcrt_lock = 0;
    this.empdel_lock = 0;
    this.empdpt_lock = 0;
    this.empmgr_lock = 0;
    this.dptcrt_lock = 0;
    this.dptudt_lock = 0;
    this.rolcrt_lock = 0;
    this.rolupt_lock = 0;
    this.emp_id = 0;
    this.mgr_id = 0;
    this.rol_id = 0;
    this.rol_name = '';
    this.rol_salary = '';
    this.dept_id = '';
    this.dept_name = '';
    this.inquierElements();
    this.mainOptions();
};

EmployeeTracker.prototype.validatetextinput = function(text) {
    if(text !== '') {
        return true;
    }
    else {
        console.log(' NO INPUT DETECTED, TRY AGAIN');
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

    this.disp6 = {
        'RoleID' : '',
        'RoleName' : '',
        'DepartmentName' : '',
        'RoleSalary' : ''
    };

    this.employeefirstname = {
        type: 'input',
        name: 'attribute', 
        message: 'Input Employee First Name :',
        validate: this.validatetextinput
    };

    this.employeelastname = {
        type: 'input',
        name: 'attribute', 
        message: 'Input Employee Last Name :',
        validate: this.validatetextinput
    };

    this.managerid = {
        type: 'input',
        name: 'attribute', 
        message: 'Input ManagerID (Optional - Can Be Left Blank) :'
    };

    this.managerid_A = {
        type: 'input',
        name: 'attribute', 
        message: 'Input ManagerID From Employee List :'
    };

    this.employeeid = {
        type: 'input',
        name: 'attribute', 
        message: 'Input EmployeeID :',
        validate: this.validatetextinput
    };

    this.roleid = {
        type: 'input',
        name: 'attribute', 
        message: 'Input RoleID :',
        validate: this.validatetextinput
    };

    this.roleid_A = {
        type: 'input',
        name: 'attribute', 
        message: 'Input RoleID in order to Assign New Role in New Department :',
        validate: this.validatetextinput
    };

    this.rolename = {
        type: 'input',
        name: 'attribute', 
        message: 'Input RoleName :',
        validate: this.validatetextinput
    };

    this.rolename_A = {
        type: 'input',
        name: 'attribute', 
        message: 'Input RoleName (Optional - Can Be Left Blank):'
    };

    this.rolesalary = {
        type: 'input',
        name: 'attribute', 
        message: 'Input RoleSalary :',
        validate: this.validatetextinput
    };

    this.rolesalary_A = {
        type: 'input',
        name: 'attribute', 
        message: 'Input RoleSalary (Optional - Can Be Left Blank):'
    };

    this.departmentid = {
        type: 'input',
        name: 'attribute', 
        message: 'Input DepartmentID :',
        validate: this.validatetextinput
    };

    this.departmentid_A = {
        type: 'input',
        name: 'attribute', 
        message: 'Input DepartmentID (Optional - Can Be Left Blank):'
    };

    this.departmentname = {
        type: 'input',
        name: 'attribute', 
        message: 'Input Department Name :',
        validate: this.validatetextinput
    };

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
        this.disp5.RoleName = element.RoleName;
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

EmployeeTracker.prototype.departmentArrayHandler_C = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp6 = {};
        this.disp6.RoleID = element.RoleID;
        this.disp6.RoleName = element.RoleName;
        this.disp6.DepartmentID = element.DepartmentID;
        this.disp6.DepartmentName = element.DepartmentName;
        this.disp6.RoleSalary = element.RoleSalary;
        disp_array.push(this.disp6);
    });               
    if(!disp_array.length) {
        return 'departmentArrayHandler_6 - No Records Were Found By Search';
    } else {
        return disp_array;
    }
};

EmployeeTracker.prototype.departmentArrayHandler_B = function(array) {
    let disp_array = [];
    array.forEach(element => {
        this.disp6 = {};
        this.disp6.RoleID = element.RoleID;
        this.disp6.RoleName = element.RoleName;
        this.disp6.DepartmentName = element.DepartmentName;
        this.disp6.RoleSalary = element.RoleSalary;
        disp_array.push(this.disp6);
    });               
    if(!disp_array.length) {
        return 'departmentArrayHandler_6 - No Records Were Found By Search';
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
        this.disp1.RoleName = element.RoleName;
        this.disp1.DepartmentName = element.DepartmentName;
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

EmployeeTracker.prototype.captureDepartmentID = async function(array) {
    this.dept_id = 0;
    this.dept_id = await inquirer.prompt(this.departmentid);
    let lock = false;
    array.forEach(element => {
        if(Number(this.dept_id.attribute) === Number(element.DepartmentID)) {
            lock = true;
        }
    });
    if(lock) {
        return;
    } else {
        console.log('captureDepartmentID - Department Not Found - Try Again');
        await this.captureDepartmentID(array);
    }
};

EmployeeTracker.prototype.captureDepartmentID_A = async function(array) {
    this.dept_id = 0;
    this.dept_id = await inquirer.prompt(this.departmentid_A);
    let lock = false;
    array.forEach(element => {
        if(Number(this.dept_id.attribute) === Number(element.DepartmentID)) {
            lock = true;
        }
    });
    if(lock) {
        return;
    } else {
        console.log('captureDepartmentID - Department Not Found - Try Again');
        await this.captureDepartmentID(array);
    }
};

EmployeeTracker.prototype.captureDepartmentName = async function(array) {
    this.dept_name = '';
    this.dept_name = await inquirer.prompt(this.departmentname);
    let lock = true;
    let i = 0;
    array.forEach(element => {
        if(String(this.dept_name.attribute) === String(element.DepartmentName)) {
            lock = false;
        }
        i++;
    });
    if(lock) {
        return;
    } else {
        console.log('captureDepartmentName - New Department Already Exists - Try Again');
        await this.captureDepartmentName(array);
    }
};

EmployeeTracker.prototype.captureDepartmentName_A = async function(array) {
    this.dept_name = '';
    this.dept_name = await inquirer.prompt(this.departmentname);
    let lock = true;
    let i = 0;
    array.forEach(element => {
        if((String(this.rol_name.attribute) === String(element.RoleName)) && 
        (String(this.dept_name.attribute) === String(element.DepartmentName))) {
            lock = false;
        }
        i++;
    });
    if(lock) {
        return;
    } else {
        console.log('captureDepartmentName - New RoleName-DepartmentName Already Exists - Try Again');
        await this.captureDepartmentName_A(array);
    }
};

EmployeeTracker.prototype.captureDepartmentName_B = async function(array) {
    this.dept_name = '';
    this.dept_name = await inquirer.prompt(this.departmentname_A);
    let lock = true;
    let i = 0;
    array.forEach(element => {
        if(String(this.dept_name.attribute) === String(element.DepartmentName)) {
            lock = false;
        }
        i++;
    });
    if(lock) {
        return;
    } else {
        console.log('captureDepartmentName - New Department Already Exists - Try Again');
        await this.captureDepartmentName(array);
    }
};


EmployeeTracker.prototype.captureEmployeeID = async function(array) {
    this.emp_id = 0;
    this.emp_id = await inquirer.prompt(this.employeeid);
    let lock = false;
    array.forEach(element => {
        if(Number(this.emp_id.attribute) === Number(element.EmployeeID)) {
            lock = true;
        }
    });
    if(lock) {
        return;
    } else {
        console.log('captureEmployeeID - Employee Not Found - Try Again');
        await this.captureEmployeeID(array);
    }
};

EmployeeTracker.prototype.captureManagerID_A = async function(array) {
    this.mgr_id = 0;
    this.mgr_id = await inquirer.prompt(this.managerid);
    let lock = false;
    
    if(this.mgr_id.attribute !== '') {
        array.forEach(element => {
            if(Number(this.mgr_id.attribute) === Number(element.EmployeeID)) {
                lock = true;
            }
        });
    } else {
        lock = true;
    }
    if(lock) {
        return;
    } else {
        console.log('captureManagerID - Manager Not Found - Try Again');
        await this.captureManagerID_A(array);
    }
};

EmployeeTracker.prototype.captureManagerID_B = async function(array) {
    this.mgr_id = 0;
    this.mgr_id = await inquirer.prompt(this.managerid_A);
    let lock = false;
    if(this.mgr_id.attribute !== this.emp_id.attribute) {
        array.forEach(element => {
            if(Number(this.mgr_id.attribute) === Number(element.EmployeeID)) {
                lock = true;
            }
        });
    } else {
        lock = false;
    }
    if(lock) {
        return;
    } else {
        console.log('captureManagerID - Search NotFound or Employee and Managers IDs are the same - Try Again');
        await this.captureManagerID_B(array);
    }
};

EmployeeTracker.prototype.captureRoleID_A = async function(array) {
    this.rol_id = 0;
    this.rol_id = await inquirer.prompt(this.roleid_A);
    let lock = false;
    array.forEach(element => {
        if(Number(this.rol_id.attribute) === Number(element.RoleID)) {
            lock = true;
        }
    });
    if(lock) {
        return;
    } else {
        console.log('captureRoleID - Role Not Found - Try Again');
        await this.captureRoleID_A(array);
    }
};

EmployeeTracker.prototype.captureRoleID = async function(array) {
    this.rol_id = 0;
    this.rol_id = await inquirer.prompt(this.roleid);
    let lock = false;
    array.forEach(element => {
        if(Number(this.rol_id.attribute) === Number(element.RoleID)) {
            lock = true;
        }
    });
    if(lock) {
        return;
    } else {
        console.log('captureRoleID - Role Not Found - Try Again');
        await this.captureRoleID(array);
    }
};

EmployeeTracker.prototype.roleUpdate = async function() {
    this.rolupt_lock = 0;
    while(this.rolupt_lock<5) {
        switch(this.rolupt_lock) {
            case 0:
                //Role Name
                let disp_array0 = [];
                const array0 = await dptvw.getAllSortByDepartmentID();
                disp_array0 = this.departmentArrayHandler_C(array0);
                console.table(disp_array0);

                await this.captureRoleID(disp_array0);
                this.rolupt_lock++;
            break;
            case 1:
                //Role Name
                this.rol_name = '';
                this.rol_name = await inquirer.prompt(this.rolename_A);
                this.rolupt_lock++;
            break;
            case 2:
                //Role Salary
                this.rol_salary = '';
                this.rol_salary = await inquirer.prompt(this.rolesalary_A);
                this.rolupt_lock++;
            break;
            case 3:
                //Select Department ID
                let disp_array2 = [];
                const array2 = await dept.getAll();
                disp_array2 = this.departmentArrayHandler_A(array2);
                console.table(disp_array2);

                await this.captureDepartmentID_A(disp_array2);
                this.rolupt_lock++;
            break;
            case 4:
                //Query Update
                const ret = await rol.put(String(this.rol_id.attribute),String(this.rol_name.attribute),String(this.rol_salary.attribute),String(this.dept_id.attribute));
                console.log(`New Department ID : ${ret}`);
                this.rolupt_lock++;
            break;
            default:
                console.log('roleUpdate NA');
                this.rolupt_lock = 5;
            break;
        }
    }
};

EmployeeTracker.prototype.roleCreate = async function() {
    let disp_array0 = [];
    this.rolupt_lock = 0;
    while(this.rolupt_lock<4) {
        switch(this.rolupt_lock) {
            case 0:
                //Role Name
                const array0 = await dptvw.getAllSortByDepartmentID();
                disp_array0 = this.departmentArrayHandler_B(array0);   
                console.table(disp_array0);

                this.captureRoleID(disp_array0);          
                this.rolupt_lock++;
            break;
            case 1:
                //Role Salary
                this.rol_salary = '';
                this.rol_salary = await inquirer.prompt(this.rolesalary);
                this.rolupt_lock++;
            break;
            case 2:
                //Select Department ID
                let disp_array2 = [];
                const array2 = await dept.getAll();
                disp_array2 = this.departmentArrayHandler_A(array2);
                console.table(disp_array2);

                await this.captureDepartmentID(disp_array2);
                this.rolupt_lock++;
            break;
            case 3:
                //Query
                const ret = await rol.post(String(this.rol_name.attribute),String(this.rol_salary.attribute),String(this.dept_id.attribute));
                console.log(`New Department ID : ${ret}`);
                this.rolupt_lock++;
            break;
            default:
                console.log('roleCreate NA');
                this.rolupt_lock = 4;
            break;
        }
    }
};

EmployeeTracker.prototype.departmentCreate = async function() {
    this.dptcrt_lock = 0;
    while(this.dptcrt_lock<2) {
        switch(this.dptcrt_lock) {
            case 0:
                //DepartmentID
                let disp_array0 = [];
                const array0 = await dept.getAll();
                disp_array0 = this.departmentArrayHandler_A(array0);
                console.table(disp_array0);

                await this.captureDepartmentName(disp_array0);
                this.dptcrt_lock++;
            break;
            case 1:
                //Query
                const ret = await dept.post(String(this.dept_id.attribute));
                console.log(`New Department ID : ${ret}`);
                this.dptcrt_lock++;
            break;
            default:
                console.log('employeeCreate NA');
                this.dptcrt_lock = 2;
            break;
        }
    }
};

EmployeeTracker.prototype.departmentDelete = async function() {
    this.dptdel_lock = 0;
    while(this.dptdel_lock<2) {
        switch(this.dptdel_lock) {
            case 0:
                //Display Department list
                let disp_array0 = [];
                const array0 = await dept.getAll();
                disp_array0 = this.departmentArrayHandler_A(array0);
                console.table(disp_array0);

                await this.captureDepartmentID(disp_array0);
                this.dptdel_lock++;
            break;
            case 1:
                let ret = await dept.delete(this.dept_id.attribute);
                console.log(ret);
                this.dptdel_lock++;
            break;
            default:
                console.log('employeeDelete NA');
                this.dptdel_lock = 2;
            break;
        }
    }
};

EmployeeTracker.prototype.departmentUpdate = async function() {
    this.dptudt_lock = 0;
    while(this.dptudt_lock<3) {
        switch(this.dptudt_lock) {
            case 0:
                //Display Department list
                let disp_array0 = [];
                const array0 = await dept.getAll();
                disp_array0 = this.departmentArrayHandler_A(array0);
                console.table(disp_array0);

                await this.captureDepartmentID(disp_array0);
                this.dptudt_lock++;
            break;
            case 1:
                // Capture Department Name
                this.dept_name = await inquirer.prompt(this.departmentname);
                this.dptudt_lock++;
            break;
            case 2:
                //Query 
                let ret = await dept.put(String(this.dept_id.attribute), String(this.dept_name.attribute));
                console.log(`Return : ${ret}`);
                this.dptudt_lock++;
            break;
            default:
                console.log('departmentUpdate NA');
                this.dptudt_lock = 3;
            break;
        }
    }
};

EmployeeTracker.prototype.employeeAssignManager = async function() {
    let disp_array0 = [];
    this.empmgr_lock = 0;
    while(this.empmgr_lock<3) {
        switch(this.empmgr_lock) {
            case 0:
                //List & Select Employee
                const array0 = await empvw.getAllSortByEmpID();
                disp_array0 = this.employeeArrayHandler(array0);
                console.table(disp_array0);

                await this.captureEmployeeID(disp_array0);
                this.empmgr_lock++;
            break;
            case 1:
                //Select Mgr from Employee ID
                await this.captureManagerID_B(disp_array0);
                this.empmgr_lock++;
            break;
            case 2:
                //Query 
                let ret = await emp.put(String(this.emp_id.attribute),'','',String(this.mgr_id.attribute),'');
                console.log(`Return : ${ret}`);
                this.empmgr_lock++;
            break;
            default:
                console.log('employeeAssignManager NA');
                this.empmgr_lock = 3;
            break;
        }
    }
};

EmployeeTracker.prototype.employeeAssignDepartment = async function() {
    this.empdpt_lock = 0;
    while(this.empdpt_lock<3) {
        switch(this.empdpt_lock) {
            case 0:
                //List & Select Employee
                let disp_array0 = [];
                const array0 = await empvw.getAllSortByEmpID();
                disp_array0 = this.employeeArrayHandler(array0);
                console.table(disp_array0);

                await this.captureEmployeeID(disp_array0);
                this.empdpt_lock++;
            break;
            case 1:
                //List & Select RoleID-Department
                let disp_array1 = [];
                const array1 = await dptvw.getAllSortByDepartmentID();
                disp_array1 = this.departmentArrayHandler_B(array1);   
                console.table(disp_array1);

                await this.captureRoleID_A(disp_array1);
                this.empdpt_lock++;
            break;
            case 2:
                //Query 
                let ret = await emp.put(String(this.emp_id.attribute),'','','',String(this.rol_id.attribute));
                console.log(`Return : ${ret}`);
                this.empdpt_lock++;
            break;
            default:
                console.log('employeeAssignDepartment NA');
                this.empdpt_lock = 3;
            break;
        }
    }
};

EmployeeTracker.prototype.employeeDelete = async function() {
    this.empdel_lock = 0;
    while(this.empdel_lock<2) {
        switch(this.empdel_lock) {
            case 0:
                //Display Employee list
                let disp_array = [];
                const array = await empvw.getAllSortByEmpID();
                disp_array = this.employeeArrayHandler(array);
                console.table(disp_array);

                await this.captureEmployeeID(disp_array);
                this.empdel_lock++;
            break;
            case 1:
                let ret = await emp.delete(this.emp_id.attribute);
                console.log(ret);
                this.empdel_lock++;
            break;
            default:
                console.log('employeeDelete NA');
                this.empdel_lock = 3;
            break;
        }
    }
};

EmployeeTracker.prototype.employeeCreate = async function() {
    let efn = '';
    let eln = '';
    let mi = '';
    let ri = '';
    this.empcrt_lock = 0;
    while(this.empcrt_lock<5) {
        switch(this.empcrt_lock) {
            case 0:
                //EmployeeFirstName
                efn = await inquirer.prompt(this.employeefirstname);
                this.empcrt_lock++;
            break;
            case 1:
                //EmployeeLastName
                eln = await inquirer.prompt(this.employeelastname);
                this.empcrt_lock++;
            break;
            case 2:
                //ManagerID (Optional)
                let disp_array2 = [];
                const array2 = await empvw.getAllSortByEmpID();
                disp_array2 = this.employeeArrayHandler(array2);   
                console.table(disp_array2);

                await this.captureManagerID_A(disp_array2);
                this.empcrt_lock++;
            break;
            case 3:
                //RoleID
                let disp_array3 = [];
                const array3 = await rol.getAll();
                disp_array3 = this.roleArrayHandler(array3);   
                console.table(disp_array3);

                await this.captureRoleID(disp_array3);
                this.empcrt_lock++;
            break;
            case 4:
                //Query
                const newEmpID = await emp.post(efn.attribute,eln.attribute,this.mgr_id.attribute,this.rol_id.attribute);
                console.log(`New Employee ID ${newEmpID}`);
                this.empcrt_lock++;
            break;
            default:
                console.log('employeeCreate NA');
                this.empcrt_lock = 5;
            break;
        }
    }
};

EmployeeTracker.prototype.adminTasks = async function(option) {
    let i = option;
    while(i<13) {
        switch(i) {
            case 1:
                //1.Create New Employee
                await this.employeeCreate();
            break;
            case 2:
                //2.Delete Employee
                await this.employeeDelete();
            break;
            case 3:
                //3.Assign Employee to Department
                await this.employeeAssignDepartment();
            break;
            case 4:
                //4.Assign Employee to Manager
                await this.employeeAssignManager();
            break;
            case 5:
                //5.Create New Departemt
                await this.departmentCreate();
            break;
            case 6:
                //6.Update Department
                await this.departmentUpdate();
            break;
            case 7:
                //7.Delete Department
                await this.departmentDelete();
            break;
            case 8:
                //8.Create New Role
                await this.roleCreate();
            break;
            case 9:
                //9.Update Role
                await this.roleUpdate();
            break;
            case 'A':
                //A.Delete Role
            break;
            case 'B':
                //B.Renew Schema & Seed Data
            break;
            default:
                console.log('viewReports Invalid');
            break;
        }
        i = 13;
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
                const array5 = await dptvw.getAllSortByDepartmentID();
                disp_array5 = this.departmentArrayHandler_B(array5);      
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
                await this.adminTasks(k);
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