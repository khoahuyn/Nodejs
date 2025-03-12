'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employee', {
      idEmployee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      EmployeeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, 
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      SSN: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PayRate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      VacationDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PaidToDate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      PaidLastYear: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      PayRates_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PayRates', 
          key: 'idPayRates', 
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employee');
  }
};