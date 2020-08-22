const db = require('../mysql/connection');

const Employee = function() {
    this.ID = 'Employee';
};

Employee.prototype.getAll = async function() {
    const qString = 'SELECT * FROM employeeTracker.Employees;';
    console.log('Employees - List All Available');
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        res.forEach(element => {
            console.log(`${element.EmployeeID} .- ${element.EmployeeFirstName} ${element.EmployeeLastName}, ManagerID:${element.ManagerID}, RoleID:${element.RoleID}`);
        });
    });
};


Employee.prototype.getSingle = async function(EmployeeID) {
    const qString = `SELECT * FROM employeeTracker.Employees WHERE EmployeeID = ${EmployeeID};`;
    console.log('Employee - Search Single');
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        res.forEach(element => {
            console.log(`${element.EmployeeID} .- ${element.EmployeeFirstName} ${element.EmployeeLastName}, ManagerID:${element.ManagerID}, RoleID:${element.RoleID}`);
        });
    });
};

Employee.prototype.post = async function(EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) {
    if((ManagerID === undefined) || (ManagerID === '')) {
        ManagerID = 'NULL';
    }
    if((EmployeeFirstName === undefined) || (EmployeeLastName === undefined) || (RoleID === undefined)) {
        console.log('Employee POST Invalid Input');
    } else {
        const query = 'INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) ';
        const d1 = 'VALUES (';
        const dinsert = `'${EmployeeFirstName}', '${EmployeeLastName}', ${ManagerID}, ${RoleID}`;
        const d2 = ');';
        const qString = query + d1 + dinsert + d2;
        console.log(qString);

        await db.query(qString, (err,res) => {
            if(err) {
                throw err;
            }
            console.log(`New EmployeeID: ${res.insertId}`);
        });
    }
};

Employee.prototype.put = async function(EmployeeID, EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) {
    const queryString = 'UPDATE employeeTracker.Employees ';
    let inputString = 'SET ';
    const whereString = `WHERE EmployeeID = ${EmployeeID};`;
    let query = '';
    let efn = true;
    let eln = true;
    let ri = true;

    if((EmployeeID !== undefined) || (EmployeeID !== '')) {
        if((ManagerID === undefined) || (ManagerID === '')) {
            ManagerID = 'NULL';
        }
        if((EmployeeFirstName === undefined) || (EmployeeFirstName === '')) {
            efn = false;
        }
        if((EmployeeLastName === undefined) || (EmployeeLastName === '')) {
            eln = false;
        }
        if((RoleID === undefined) || (RoleID === '')) {
            ri = false;
        }
        if(efn) {
            inputString += `EmployeeFirstName = '${EmployeeFirstName}'`;
            if(eln||ri) {
                inputString += `, `;
            }
        }
        if(eln) {
            inputString += `EmployeeLastName = '${EmployeeLastName}'`;
            if(ri) {
                inputString += `, `;
            }
        }
        if(ri) {
            inputString += `RoleID = '${RoleID}'`;
        }
        inputString += ` `;
        qString = queryString + inputString + whereString;
        await db.query(qString, (err,res) => {
            if(err) {
                throw err;
            }
            console.log(`Employee Rows Update: ${res.changedRows}`);
        });
    } else {
        console.log('EmployeeID Required');
    }
};

Employee.prototype.delete = async function(EmployeeID) {
    const qu = 'DELETE FROM employeeTracker.Employees ';
    const wh = `WHERE EmployeeID = ${EmployeeID};`;
    qString = qu + wh;
    console.log(qString);

    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        console.log(`Deleted Employee Rows: ${res.affectedRows}`);
    });
};

module.exports = { Employee };