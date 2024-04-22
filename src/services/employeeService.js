const db = require('../models/index')

var initModelsMySQL = require("../models/mysql/init-models");
var models = initModelsMySQL(db.MYSQL);

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