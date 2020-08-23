const { getConnection } = require('../mysql/connection');

const Role = function() {
    this.ID = 'Role';
    this.objRole = {
        'RoleID' : '',
        'RoleTitle' : '',
        'RoleSalary' : '',
        'DepartmentID' : ''
    };
};

Role.prototype.getAll = async function() {
    const qString = 'SELECT * FROM employeeTracker.Roles;';
    console.log(qString);
    const conn = await getConnection();
    const [rows, fields] = await conn.query(qString);
    conn.destroy();

    let array = [];
    rows.forEach(element => {
        this.objRole = {};
        this.objRole.RoleID = element.RoleID;
        this.objRole.RoleTitle = element.RoleTitle;
        this.objRole.RoleSalary = element.RoleSalary;
        this.objRole.DepartmentID = element.DepartmentID;
        array.push(this.objRole);
    });
    return array;
};

Role.prototype.getSingle = async function(RoleID) {
    if(RoleID !== '') {
        const qString = `SELECT * FROM employeeTracker.Roles WHERE RoleID = ${RoleID};`;
        console.log(qString);
        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
    
        let array = [];
        rows.forEach(element => {
            this.objRole = {};
            this.objRole.RoleID = element.RoleID;
            this.objRole.RoleTitle = element.RoleTitle;
            this.objRole.RoleSalary = element.RoleSalary;
            this.objRole.DepartmentID = element.DepartmentID;
            array.push(this.objRole);
        });
        return array;
    } else {
        return 'Role GetSingle NA';
    }
};

Role.prototype.post = async function(RoleTitle, RoleSalary, DepartmentID) {
    if(RoleTitle !== '') {
        if(RoleSalary !== '') {
            if(DepartmentID !== '') { 
                const query = 'INSERT INTO employeeTracker.Roles (RoleTitle, RoleSalary, DepartmentID) ';
                const d1 = 'VALUES (';
                const dinsert = `'${RoleTitle}', '${RoleSalary}', '${DepartmentID}'`;
                const d2 = ');';
                const qString = query + d1 + dinsert + d2;
                console.log(qString);

                const conn = await getConnection();
                const [rows, fields] = await conn.query(qString);
                conn.destroy();
                //New RoleID is returned
                return rows.insertId;
            } else {
                return 'Role Post NA';
            }
        } else {
            return 'Role Post NA';
        }
    } else {
        return 'Role Post NA';
    }
};

Role.prototype.genParamStr = function(obj) {
    let str = 'SET ';
    let rt = false;
    let rs = false;
    let di = false;

    if(obj.RoleTitle !== '') {
        rt = true;
        obj.RoleTitle = `'${obj.RoleTitle}'`;
    }
    if(obj.RoleSalary !== '') {
        rs = true;
        obj.RoleSalary = `'${obj.RoleSalary}'`;
    }
    if(obj.DepartmentID !== '') {
        di = true;
        obj.DepartmentID = `'${obj.DepartmentID}'`;
    } 

    if(rt) {
        str += `RoleTitle = ${obj.RoleTitle}`;
        if(rs || di) {
            str += `, `;
        }
    }
    if(rs) {
        str += `RoleSalary = ${obj.RoleSalary}`;
        if(di) {
            str += `, `;
        }
    }
    if(di) {
        str += `DepartmentID = ${obj.DepartmentID}`;
    }

    str += ` `;

    return str;
}

Role.prototype.put = async function(RoleID, RoleTitle, RoleSalary, DepartmentID) {
    if(RoleID !== '') {
        this.objRole = {};
        this.objRole.RoleID = RoleID;
        this.objRole.RoleTitle = RoleTitle;
        this.objRole.RoleSalary = RoleSalary;
        this.objRole.DepartmentID = DepartmentID;

        const queryString = 'UPDATE employeeTracker.Roles ';
        const paramStr = this.genParamStr(this.objRole);
        const whereString = `WHERE RoleID = ${this.objRole.RoleID};`;
        qString = queryString + paramStr + whereString;
        console.log(qString);

        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
        return `Role Update Status: ${rows.info}`;
    } else {
        return 'Role Put NA';
    }
};

Role.prototype.delete = async function(RoleID) {
    if(RoleID !== '') {
        const qu = 'DELETE FROM employeeTracker.Roles ';
        const wh = `WHERE RoleID = ${RoleID};`;
        qString = qu + wh;
        console.log(qString);

        const conn = await getConnection();
        const [rows, fields] = await conn.query(qString);
        conn.destroy();
        return `Role Deleted: ${rows.affectedRows}`;
    } else {
        return 'Role Put NA';
    }
};

module.exports = { Role };