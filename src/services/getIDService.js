const db = require('../models/index')

const initModelsSqlserver = require("../models/sqlserver/init-models");
const modelsql = initModelsSqlserver(db.SQLSERVER);

const initModelsMySQL = require("../models/mysql/init-models");
const models = initModelsMySQL(db.MYSQL);

async function getAllBenefit() {
    try {
        const data = await modelsql.BENEFIT_PLANS.findAll();
        return data;
    } catch (error) {
        throw new Error('Lỗi khi truy vấn Personal:', error);
    }
}

async function getAllPayRate() {
    try {
        const data = await models.payrates.findAll();
        return data;
    } catch (error) {
        throw new Error('Lỗi khi truy vấn Personal:', error);
    }
}

module.exports = {
    getAllBenefit,getAllPayRate
};