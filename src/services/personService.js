const db = require('../models/index')

const initModelsSqlserver = require("../models/sqlserver/init-models");
const models = initModelsSqlserver(db.SQLSERVER);

async function getAllPersonnal() {
    try {
        const data = await models.PERSONAL.findAll();
        return data;
    } catch (error) {
        throw new Error('Lỗi khi truy vấn Personal:', error);
    }
}

module.exports = {
    getAllPersonnal
};