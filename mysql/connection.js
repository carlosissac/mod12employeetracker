var mysql = require('mysql2/promise');

    getConnection = async () => {
        const c = await mysql.createPool ({
            connectionLimit: 20,
            host:'localhost',
            port: 3306,
            namedPlaceholders: true,
            user: 'root',
            password: null,
            database: 'employeeTracker'
        });
        return c.getConnection();
    }

module.exports = { getConnection };
