'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employee', [{
      idEmployee: 25,
      EmployeeNumber: 2,
      LastName: "Nguyen",
      FirstName: "Duc",
      SSN: 5,
      PayRate: "tokuda",
      VacationDays: 5,
      PaidToDate: 2.5,
      PaidLastYear: 9.5,
      PayRates_id: 6005
    }]);
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
