const db = require('../models/index')

async function getAllPayRates() {
    try {
        const data = await db.sequelizeMySQL.query(
            `SELECT * From payrates `,
            {
              type: db.sequelizeMySQL.QueryTypes.SELECT,
            }
          );
        return data;
    } catch (error) {
        throw new Error('Lỗi khi truy vấn PayRates:', error);
    }
}

module.exports = {
    getAllPayRates
};