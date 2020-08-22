const db = require('../mysql/connection');

const Department = function() {
    this.ID = 'Department';
};

Department.prototype.getAll = async function() {
    const qString = 'SELECT * FROM employeeTracker.Departments;';
    console.log('Departments - List All Available');
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        res.forEach(element => {
            console.log(`${element.DepartmentID} .- ${element.DepartmentName}`);
        });
    });
};

Department.prototype.getSingle = async function(DepartmentID) {
    const qString = `SELECT * FROM employeeTracker.Departments WHERE DepartmentID = ${DepartmentID};`;
    console.log('Departments - Search Single');
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        res.forEach(element => {
            console.log(`DepartmentID: ${element.DepartmentID} - ${element.DepartmentName}`);
        });
    });
};

Department.prototype.post = async function(DepartmentName) {
    const query = 'INSERT INTO employeeTracker.Departments (DepartmentName)';
    const d1 = 'VALUES (';
    const d2 = ');';
    const dinsert = `'${DepartmentName}'`;
    const qString = query + ' ' + d1 + dinsert + d2;
    console.log(qString);
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        console.log(`New DepartmentID: ${res.insertId}`);
    });
};

Department.prototype.put = async function(DepartmentID, DepartmentName) {
    const qu = 'UPDATE employeeTracker.Departments ';
    const se = `SET DepartmentName = '${DepartmentName}' `;
    const wh = `WHERE DepartmentID = ${DepartmentID};`;
    qString = qu + se + wh;
    console.log(qString);
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        console.log(`Updated Department Rows: ${res.changedRows}`);
    });
};

Department.prototype.delete = async function(DepartmentID) {
    const qu = 'DELETE FROM employeeTracker.Departments ';
    const wh = `WHERE DepartmentID = ${DepartmentID};`;
    qString = qu + wh;
    console.log(qString);
    await db.query(qString, (err,res) => {
        if(err) {
            throw err;
        }
        console.log(`Deleted Department Rows: ${res.affectedRows}`);
    });
};

module.exports = { Department };