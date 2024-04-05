'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PayRates', [ {
      idPayRates:7001,
      PayRatesName: 'Tien Mat',
      Value: 2500,
      TaxPercentage:5.8,
      PayType:2,
      PayAmount:580000.53,
      PT_LevelC:5.5
    },
    {
      idPayRates:6005,
      PayRatesName: 'Ngan Hang',
      Value: 2800,
      TaxPercentage:9.2,
      PayType:3,
      PayAmount:90000.44,
      PT_LevelC:6.3
    },
    {
      idPayRates:4001,
      PayRatesName: 'MoMo',
      Value: 3000,
      TaxPercentage:5.6,
      PayType:1,
      PayAmount:250000.64,
      PT_LevelC:7.4
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
