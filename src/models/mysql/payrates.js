const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payrates', {
    idPayRates: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PayRateName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Value: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    TaxPercentage: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    PayType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PayAmount: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    PT_LevelC: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payrates',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPayRates" },
        ]
      },
    ]
  });
};
