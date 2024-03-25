'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PayRates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PayRates.init({
    idPayRates: DataTypes.INTEGER,
    PayRatesName: DataTypes.STRING,
    Value: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'PayRates',
  });
  return PayRates;
};