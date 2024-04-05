'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    idEmployee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, 
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SSN: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PayRate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    VacationDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PaidToDate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    PaidLastYear: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    PayRates_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PayRates', 
        key: 'idPayRates', 
      },
    },
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};