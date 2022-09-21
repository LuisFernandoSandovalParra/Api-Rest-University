require('dotenv').config();
const mariadb = require('mariadb');

const config = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE
}
const dbconector = mariadb.createPool(config);


module.exports = dbconector;