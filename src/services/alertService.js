const db = require('../models/index')

const { Sequelize, where } = require("sequelize");


const initModelsSqlserver = require("../models/sqlserver/init-models");
const modelsql = initModelsSqlserver(db.SQLSERVER);

async function getListBirthdayRemainder() {
    try {

        const today = new Date();

        const people = await modelsql.PERSONAL.findAll({
            attributes: ["PERSONAL_ID", "CURRENT_FIRST_NAME", "CURRENT_LAST_NAME", "CURRENT_MIDDLE_NAME", "BIRTH_DATE", "CURRENT_GENDER"],
            where: {
                $and: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('BIRTH_DATE')), today.getMonth() + 1),
            }
        })


        return people;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getListBirthdayRemainder
};