const db = require('../mysql/connection');

const Role = function() {
    this.ID = 'Role';
};

Role.prototype.getAll = async function() {
    const qString = 'SELECT * FROM employeeTracker.Roles;';
    console.log('Roles - List All Available');
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        res.forEach(element => {
            console.log(`${element.RoleID} .- ${element.RoleTitle}, Salary: ${element.RoleSalary}`);
        });
    });
};

Role.prototype.getSingle = async function(RoleID) {
    const qString = `SELECT * FROM employeeTracker.Roles WHERE RoleID = ${RoleID};`;
    console.log('Roles - Search Single');
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        res.forEach(element => {
            console.log(`${element.RoleID} .- ${element.RoleTitle} ${element.RoleSalary}`);
        });
    });
};

Role.prototype.post = async function(RoleTitle, RoleSalary, DepartmentID) {
    if((RoleTitle === undefined) || (RoleSalary === undefined)) {
        console.log('Role POST Invalid Input');
    } else {
        const query = 'INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID) ';
        const d1 = 'VALUES (';
        const dinsert = `'${RoleTitle}', '${RoleSalary}', '${DepartmentID}'`;
        const d2 = ');';
        const qString = query + d1 + dinsert + d2;
        console.log(qString);

        await db.query(qString, (err,res) => {
            if(err) {
                throw err;
            }
            console.log(res);
            console.log(`New RoleID: ${res.insertId}`);
        });
    }
};

Role.prototype.put = async function(RoleID, RoleTitle, RoleSalary, DepartmentID) {
    const queryString = 'UPDATE employeeTracker.Roles ';
    let inputString = 'SET ';
    const whereString = `WHERE RoleID = ${RoleID};`;
    let query = '';
    let rt = true;
    let rs = true;
    let di = true;

    if((RoleID !== undefined) || (RoleID !== '')) {
        if((RoleTitle === undefined) || (RoleTitle === '')) {
            rt = false;
        }
        if((RoleSalary === undefined) || (RoleSalary === '')) {
            rs = false;
        }
        if((DepartmentID === undefined) || (DepartmentID === '')) {
            di = false;
        }
        if(rt) {
            inputString += `RoleTitle = '${RoleTitle}'`;
            if(rs||di) {
                inputString += `, `;
            }
        }
        if(rs) {
            inputString += `RoleSalary = '${RoleSalary}'`;
            if(di) {
                inputString += `, `;
            }
        }
        if(di) {
            inputString += `DepartmentID = '${DepartmentID}'`;
        }
        inputString += ` `;
        qString = queryString + inputString + whereString;
        console.log(qString);
        await db.query(qString, (err,res) => {
            if(err) {
                throw err;
            }
            console.log(`Roles Rows Update: ${res.changedRows}`);
        });
    } else {
        console.log('RoleID Required');
    }
};

Role.prototype.delete = async function(RoleID) {
    const qu = 'DELETE FROM employeeTracker.Roles ';
    const wh = `WHERE RoleID = ${RoleID};`;
    qString = qu + wh;
    console.log(qString);

    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        console.log(`Deleted Row Rows: ${res.affectedRows}`);
    });
};

module.exports = { Role };