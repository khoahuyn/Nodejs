const db = require('../models/index');

async function getEmployee() {
  try {
    const data = await db.sequelize.query(
      `SELECT CONCAT(e.LastName, ' ', e.FirstName) AS Name ,e.VacationDays ,e.PayRate ,(pr.PayAmount *pr.TaxPercentage)as TotalIncome FROM Employee e 
      join PayRates pr on e.PayRates_id =pr.idPayRates `,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    return data;
  } catch (error) {
    throw new Error('Lỗi khi truy vấn Employee:', error);
  }
}

module.exports = {
  getEmployee,
};