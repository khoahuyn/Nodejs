const DataTypes = require("sequelize").DataTypes;
const _employee = require("./employee");
const _payrates = require("./payrates");


function initModelsMySQL(sequelize) {
  const employee = _employee(sequelize, DataTypes);
  const payrates = _payrates(sequelize, DataTypes);

  employee.belongsTo(payrates, { as: "payrates", foreignKey: "PayRates_idPayRates"});
  payrates.hasMany(employee, { as: "employee", foreignKey: "PayRates_idPayRates"});

  return {
    employee,
    payrates,
  };
}

module.exports = initModelsMySQL;
module.exports.initModelsMySQL = initModelsMySQL;
module.exports.default = initModelsMySQL;
