const mariadb = require('mariadb');

const config = {
    host: 'localhost',
    user: 'admin',
    password: 'a123',
    database: 'mydatabase'
}
const dbconector = mariadb.createPool(config);


module.exports = dbconector;