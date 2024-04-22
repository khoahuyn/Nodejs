const Sequelize = require('sequelize');
const config = require('../config/config');


const sequelizeMySQL = new Sequelize(config.development.mysql)
const sequelizeSqlServer = new Sequelize(config.development.sqlserver)

const db = {
  MYSQL:sequelizeMySQL,
  SQLSERVER:sequelizeSqlServer
};
module.exports=db






