var DataTypes = require("sequelize").DataTypes;
var _BENEFIT_PLANS = require("./BENEFIT_PLANS");
var _EMPLOYMENT = require("./EMPLOYMENT");
var _EMPLOYMENT_WORKING_TIME = require("./EMPLOYMENT_WORKING_TIME");
var _JOB_HISTORY = require("./JOB_HISTORY");
var _PERSONAL = require("./PERSONAL");

function initModelsSqlserver(sequelize) {
  var BENEFIT_PLANS = _BENEFIT_PLANS(sequelize, DataTypes);
  var EMPLOYMENT = _EMPLOYMENT(sequelize, DataTypes);
  var EMPLOYMENT_WORKING_TIME = _EMPLOYMENT_WORKING_TIME(sequelize, DataTypes);
  var JOB_HISTORY = _JOB_HISTORY(sequelize, DataTypes);
  var PERSONAL = _PERSONAL(sequelize, DataTypes);

  PERSONAL.belongsTo(BENEFIT_PLANS, { as: "BENEFIT_PLANS", foreignKey: "BENEFIT_PLAN_ID"});
  BENEFIT_PLANS.hasMany(PERSONAL, { as: "PERSONAL", foreignKey: "BENEFIT_PLAN_ID"});
  EMPLOYMENT_WORKING_TIME.belongsTo(EMPLOYMENT, { as: "EMPLOYMENT", foreignKey: "EMPLOYMENT_ID"});
  EMPLOYMENT.hasMany(EMPLOYMENT_WORKING_TIME, { as: "EMPLOYMENT_WORKING_TIME", foreignKey: "EMPLOYMENT_ID"});
  JOB_HISTORY.belongsTo(EMPLOYMENT, { as: "EMPLOYMENT", foreignKey: "EMPLOYMENT_ID"});
  EMPLOYMENT.hasMany(JOB_HISTORY, { as: "JOB_HISTORY", foreignKey: "EMPLOYMENT_ID"});
  EMPLOYMENT.belongsTo(PERSONAL, { as: "PERSONAL", foreignKey: "PERSONAL_ID"});
  PERSONAL.hasMany(EMPLOYMENT, { as: "EMPLOYMENT", foreignKey: "PERSONAL_ID"});
  return {
    BENEFIT_PLANS,
    EMPLOYMENT,
    EMPLOYMENT_WORKING_TIME,
    JOB_HISTORY,
    PERSONAL,
  };
}
module.exports = initModelsSqlserver;
module.exports.initModelsSqlserver = initModelsSqlserver;
module.exports.default = initModelsSqlserver;
