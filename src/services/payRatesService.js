const db = require('../models/index')

async function getAllPayRates() {
    try {
        const data = await db.sequelize.query(
            `SELECT * From PayRates `,
            {
              type: db.sequelize.QueryTypes.SELECT,
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