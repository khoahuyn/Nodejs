var DataTypes = require("sequelize").DataTypes;
var _employee = require("./employee");
var _payrates = require("./payrates");


function initModelsMySQL(sequelize) {
  var employee = _employee(sequelize, DataTypes);
  var payrates = _payrates(sequelize, DataTypes);

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
