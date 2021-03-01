const mysql = require('mysql2');

const Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodedb',
    password: 'webcom123'
});

module.exports = Pool.promise(); // Promise