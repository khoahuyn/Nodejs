const db = require('../models/index')

async function getAllPersonnal() {
    try {
        const data = await db.sequelizeSqlServer.query(
            `SELECT * From Personal `,
            {
              type: db.sequelizeSqlServer.QueryTypes.SELECT,
            }
          );
        return data;
    } catch (error) {
        throw new Error('Lỗi khi truy vấn Personal:', error);
    }
}

module.exports = {
    getAllPersonnal
};