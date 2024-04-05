require('dotenv').config();
const config = {
  development: {
    mysql: {
      username: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      logging: false,
    },
    sqlserver: {
      username: process.env.SQL_NAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      dialect: "mssql",
      logging: false
    }

    // "username": process.env.SQL_NAME,
    // "password": process.env.SQL_PASSWORD,
    // "database": process.env.SQL_DATABASE,
    // "host": process.env.SQL_HOST,
    // "port": process.env.SQL_PORT,
    // "dialect": "mysql",
    // "logging": false

    // username: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // dialect: "mysql",
    // logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}

module.exports = config
