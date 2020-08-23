const { getConnection } = require('../mysql/connection');

const Employee = function() {
    this.ID = 'Employee';
    this.objEmp = {
        'EmployeeID' : '',
        'EmployeeFirstName' : '',
        'EmployeeLastName' : '',
        'ManagerID' : '',
        'RoleID' : '' 
    };
};

Employee.prototype.getAll = async function() {
    const qString = 'SELECT * FROM employeeTracker.Employees;';
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objEmp = {};
        this.objEmp.EmployeeID = element.EmployeeID;
        this.objEmp.EmployeeFirstName = element.EmployeeFirstName;
        this.objEmp.EmployeeLastName = element.EmployeeLastName;
        this.objEmp.ManagerID = element.ManagerID;
        this.objEmp.RoleID = element.RoleID;
        array.push(this.objEmp);
    });
    return array;
};

Employee.prototype.getSingle = async function(EmployeeID) {
    if(EmployeeID !== '') {
        const qString = `SELECT * FROM employeeTracker.Employees WHERE EmployeeID = ${EmployeeID};`;
        console.log(qString);
        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();

        let array = [];
        rows.forEach(element => {
            this.objEmp = {};
            this.objEmp.EmployeeID = element.EmployeeID;
            this.objEmp.EmployeeFirstName = element.EmployeeFirstName;
            this.objEmp.EmployeeLastName = element.EmployeeLastName;
            this.objEmp.ManagerID = element.ManagerID;
            this.objEmp.RoleID = element.RoleID;
            array.push(this.objEmp);
        });
        return array;
    } else {
        return 'Employee GetSingle NA';
    }
};

Employee.prototype.post = async function(EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) {
    if(EmployeeFirstName !== '') {
        if(EmployeeLastName !== '') {
            if(RoleID !== '') { 
                if(ManagerID === '') {
                    ManagerID = 'NULL';
                }
                const query = 'INSERT INTO employeeTracker.Employees (EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) ';
                const d1 = 'VALUES (';
                const dinsert = `'${EmployeeFirstName}', '${EmployeeLastName}', ${ManagerID}, ${RoleID}`;
                const d2 = ');';
                const qString = query + d1 + dinsert + d2;
                console.log(qString);

                const conn = await getConnection();
                const [rows, fields] = await conn.query(qString);
                conn.destroy();
                //New EmployeeID is returned
                return rows.insertId;

            } else {
                return 'Employee Post NA';
            }
        } else {
            return 'Employee Post NA';
        }
    } else {
        return 'Employee Post NA';
    }
};

Employee.prototype.genParamStr = function(obj) {
    let str = 'SET ';
    let efn = false;
    let eln = false;
    let mi = false;
    let ri = false;

    if(obj.EmployeeFirstName !== '') {
        efn = true;
        obj.EmployeeFirstName = `'${obj.EmployeeFirstName}'`;
    }
    if(obj.EmployeeLastName !== '') {
        eln = true;
        obj.EmployeeLastName = `'${obj.EmployeeLastName}'`;
    }
    if(obj.ManagerID !== '') {
        mi = true;
        if(obj.ManagerID !== 'NULL') {
            obj.ManagerID = `'${obj.ManagerID}'`;
        } 
    }
    if(obj.RoleID !== '') {
        ri = true;
        obj.RoleID = `'${obj.RoleID}'`;
    } 

    if(efn) {
        str += `EmployeeFirstName = ${obj.EmployeeFirstName}`;
        if(eln || mi || ri) {
            str += `, `;
        }
    }
    if(eln) {
        str += `EmployeeLastName = ${obj.EmployeeLastName}`;
        if(mi || ri) {
            str += `, `;
        }
    }
    if(mi) {
        str += `ManagerID = ${obj.ManagerID}`;
        if(ri) {
            str += `, `;
        }
    }
    if(ri) {
        str += `RoleID = ${obj.RoleID}`;
    }  
    str += ` `;

    return str;
}

Employee.prototype.put = async function(EmployeeID, EmployeeFirstName, EmployeeLastName, ManagerID, RoleID) {
    if(EmployeeID !== '') {
        this.objEmp = {};
        this.objEmp.EmployeeID = EmployeeID;
        this.objEmp.EmployeeFirstName = EmployeeFirstName;
        this.objEmp.EmployeeLastName = EmployeeLastName;
        this.objEmp.ManagerID = ManagerID;
        this.objEmp.RoleID = RoleID;
        
        const queryString = 'UPDATE employeeTracker.Employees ';
        const paramStr = this.genParamStr(this.objEmp);
        const whereString = `WHERE EmployeeID = ${this.objEmp.EmployeeID};`;
        qString = queryString + paramStr + whereString;
        console.log(qString);

        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
        return `Employee Update Status: ${rows.info}`;
    } else {
        return 'Employee Put NA';
    }
};

Employee.prototype.delete = async function(EmployeeID) {
    if(EmployeeID !== '') {
        const qu = 'DELETE FROM employeeTracker.Employees ';
        const wh = `WHERE EmployeeID = ${EmployeeID};`;
        qString = qu + wh;
        console.log(qString);

        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
        return `Employee Deleted: ${rows.affectedRows}`;
    } else {
        return 'Employee Put NA';
    }
};

module.exports = { Employee };