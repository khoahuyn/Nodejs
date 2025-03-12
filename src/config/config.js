require('dotenv').config();
const config = {
  "development": {
    "username": process.env.MSQL_NAME,
    "password": process.env.MSQL_PASSWORD,
    "database": "payroll",
    "host": process.env.MSQL_HOST,
    "port": process.env.MSQL_PORT,
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config
