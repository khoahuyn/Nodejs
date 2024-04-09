'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const process = require('process');
const config = require('../config/config');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';

const db = {};
const sql = {};

const sequelizeMySQL = new Sequelize(config.development.mysql)
const sequelizeSqlServer = new Sequelize(config.development.sqlserver)



fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // const model = require(path.join(__dirname, file))(sequelizeSqlServer, Sequelize.DataTypes);
    // Or
    // const model = require(path.join(__dirname, file))(sequelizeMySQL, Sequelize.DataTypes);
    // db[model.name] = model;
    const modelName = `${path.basename(file, '.js')}-${process.env.NODE_ENV || 'development'}`; // Use environment variable for dynamic naming

    const model = require(path.join(__dirname, file))(
      // Choose the appropriate Sequelize instance based on the model name
      modelName.includes('mysql') ? sequelizeMySQL : sequelizeSqlServer,
      Sequelize.DataTypes
    );
  });
  


// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    // Check if models belong to the same database before associating
    if (db[modelName].sequelize === sequelizeSqlServer) {
      // Associate models within SQL Server
      db[modelName].associate(db);
    } else if (db[modelName].sequelize === sequelizeMySQL) {
      // Associate models within MySQL (if applicable)
      // db[modelName].associate(db); // Adjust as needed
    }
  }
});

db.sequelizeSqlServer = sequelizeSqlServer;
db.sequelizeMySQL = sequelizeMySQL;
db.Sequelize = Sequelize;

module.exports = db;






