const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.getConnection((error, connection) => {
    if (error) {
        switch (error.code) {
            case "PROTOCOL_CONNECTION_LOST":
                console.log('Database Connection Lost');
            case "ER_CON_COUNT_ERROR":
                console.log('Database has too many connection');
            case "ECONNREFUSED":
                console.log('Database connection lost');
        }
    }

    if (connection) connection.release();

    return;
});

module.exports = pool;