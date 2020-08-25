const { getConnection } = require('../mysql/connection');

const Department = function() {
    this.ID = 'Department';
    this.objDep = {
        'DepartmentID' : '',
        'DepartmentName' : ''
    };
};

Department.prototype.getAll = async function() {
    const qString = 'SELECT * FROM employeeTracker.Departments;';
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objDep = {};
        this.objDep.DepartmentID = element.DepartmentID;
        this.objDep.DepartmentName = element.DepartmentName;
        array.push(this.objDep);
    });
    return array;
};

Department.prototype.getSingle = async function(DepartmentID) {
    if(DepartmentID !== '') {
        const qString = `SELECT * FROM employeeTracker.Departments WHERE DepartmentID = ${DepartmentID};`;
        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
    
        let array = [];
        rows.forEach(element => {
            this.objDep = {};
            this.objDep.DepartmentID = element.DepartmentID;
            this.objDep.DepartmentName = element.DepartmentName;
            array.push(this.objDep);
        });
        return array;
    } else {
        return 'Department GetSingle NA';
    }
};

Department.prototype.post = async function(DepartmentName) {
    if(DepartmentName !== '') {
        const query = 'INSERT INTO employeeTracker.Departments (DepartmentName) ';
        const d1 = 'VALUES (';
        const d2 = ');';
        const dinsert = `'${DepartmentName}'`;
        const qString = query + d1 + dinsert + d2;
    
        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
        //New DepartmentID is returned
        return rows.insertId;
    } else {
        return 'Department Post NA';
    }
};

Department.prototype.put = async function(DepartmentID, DepartmentName) {
    if(DepartmentID !== '') {
        if(DepartmentName !== '') {
            const qu = 'UPDATE employeeTracker.Departments ';
            const se = `SET DepartmentName = '${DepartmentName}' `;
            const wh = `WHERE DepartmentID = ${DepartmentID};`;
            qString = qu + se + wh;

            const conn = await getConnection();
            const [rows, fields] = await conn.query(qString);
            conn.destroy();
            return `Department Update Status: ${rows.info}`;
        } else {
            return 'Department Put NA';
        }    
    } else {
        return 'Department Put NA';
    }
};

Department.prototype.delete = async function(DepartmentID) {
    if(DepartmentID !== '') {
    const qu = 'DELETE FROM employeeTracker.Departments ';
    const wh = `WHERE DepartmentID = ${DepartmentID};`;
    qString = qu + wh;

    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();
    return `Department Deleted: ${rows.affectedRows}`;
    } else {
        return 'Department Delete NA';
    }
};

module.exports = { Department };