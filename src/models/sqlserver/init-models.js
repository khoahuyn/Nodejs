const DataTypes = require("sequelize").DataTypes;
const _BENEFIT_PLANS = require("./BENEFIT_PLANS");
const _EMPLOYMENT = require("./EMPLOYMENT");
const _EMPLOYMENT_WORKING_TIME = require("./EMPLOYMENT_WORKING_TIME");
const _JOB_HISTORY = require("./JOB_HISTORY");
const _PERSONAL = require("./PERSONAL");

function initModelsSqlserver(sequelize) {
  const BENEFIT_PLANS = _BENEFIT_PLANS(sequelize, DataTypes);
  const EMPLOYMENT = _EMPLOYMENT(sequelize, DataTypes);
  const EMPLOYMENT_WORKING_TIME = _EMPLOYMENT_WORKING_TIME(sequelize, DataTypes);
  const JOB_HISTORY = _JOB_HISTORY(sequelize, DataTypes);
  const PERSONAL = _PERSONAL(sequelize, DataTypes);

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
