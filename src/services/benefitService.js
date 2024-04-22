const db = require('../models/index')

var initModelsMySQL = require("../models/mysql/init-models");
var models = initModelsMySQL(db.MYSQL);

var initModelsSqlserver = require("../models/sqlserver/init-models");
var modelsql = initModelsSqlserver(db.SQLSERVER);

async function getTotalBenefit() {
    try {

        const employees = await models.employee.findAll(
            {
                attributes: ['idEmployee']
            }
        );


        const personal = await modelsql.PERSONAL.findAll({
            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'SHAREHOLDER_STATUS', 'CURRENT_GENDER', 'ETHNICITY'],
            as: 'PERSONAL',
            include: [
                {
                    model: modelsql.BENEFIT_PLANS,
                    attributes: ['BENEFIT_PLANS_ID', 'DEDUCTABLE', 'PERCENTAGE_COPAY'],
                    as: 'BENEFIT_PLANS',
                },

            ]
        })


        const data = employees.map(item => {
            const { idEmployee } = item;
            return {
                idEmployee,
            };
        });

        const newData = personal.map(item => {
            const {
                PERSONAL_ID, CURRENT_FIRST_NAME, CURRENT_LAST_NAME, CURRENT_MIDDLE_NAME,
                CURRENT_GENDER, ETHNICITY, SHAREHOLDER_STATUS,
                BENEFIT_PLANS: { BENEFIT_PLANS_ID, DEDUCTABLE, PERCENTAGE_COPAY, } } = item;
            const FULLNAME = `${CURRENT_FIRST_NAME} ${CURRENT_MIDDLE_NAME || ''} ${CURRENT_LAST_NAME}`;
            return {
                FULLNAME,
                PERSONAL_ID,
                BENEFIT_PLANS_ID,
                CURRENT_FIRST_NAME,
                CURRENT_LAST_NAME,
                CURRENT_MIDDLE_NAME,
                SHAREHOLDER_STATUS,
                CURRENT_GENDER,
                ETHNICITY,
                FROFIT: DEDUCTABLE * PERCENTAGE_COPAY
            };
        });

        const mergeData = newData.map((item) => {
            const matchData = data.find((data) => data.idEmployee === item.PERSONAL_ID);
            const mergedItem = { ...item, ...matchData };
            const { idEmployee, PERSONAL_ID, BENEFIT_PLANS_ID, ...rest } = mergedItem;
            return rest;
        })



        return mergeData;

    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getTotalBenefit
};