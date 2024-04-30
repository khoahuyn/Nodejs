const db = require('../models/index')

const initModelsMySQL = require("../models/mysql/init-models");
const models = initModelsMySQL(db.MYSQL);

async function getAllEmployees() {
    try {
        const data = await models.employee.findAll();
        return data;
    } catch (error) {
        throw new Error('Lỗi khi truy vấn Employee:', error);
    }
}

module.exports = {
    getAllEmployees
};