'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PayRates', {
      idPayRates: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PayRatesName:{
        allowNull: false,
        type: Sequelize.STRING
      },
      Value:{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      TaxPercentage:{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      PayType:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      PayAmount:{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      PT_LevelC:{
        allowNull: false,
        type: Sequelize.DOUBLE
      }
  
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PayRates');
  }
};