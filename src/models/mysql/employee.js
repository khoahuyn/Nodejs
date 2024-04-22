const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    idEmployee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    EmployeeNumber: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    LastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    SSN: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    PayRate: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    PayRates_idPayRates: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'payrates',
        key: 'idPayRates'
      }
    },
    VacationDays: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PaidToDate: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: true
    },
    PaidLastYear: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PayRates_idPayRates" },
          { name: "EmployeeNumber" },
        ]
      },
      {
        name: "Employee Number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EmployeeNumber" },
        ]
      },
      {
        name: "fk_Employee_Pay Rates_idx",
        using: "BTREE",
        fields: [
          { name: "PayRates_idPay" },
        ]
      },
    ]
  });
};
