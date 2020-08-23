var mysql = require('mysql2/promise');

    getConnection = async () => {
        const c = await mysql.createPool ({
            connectionLimit: 20,
            host:'localhost',
            port: 3306,
            namedPlaceholders: true,
            user: 'root',
            password: 'Htconem8',
            database: 'employeeTracker'
        });
        return c.getConnection();
    }

module.exports = { getConnection };
