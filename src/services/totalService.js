const db = require('../models/index')

var initModelsMySQL = require("../models/mysql/init-models");
var models = initModelsMySQL(db.MYSQL);

var initModelsSqlserver = require("../models/sqlserver/init-models");
var modelsql = initModelsSqlserver(db.SQLSERVER);

async function getTotalIncome() {
    try {

        const employees = await models.employee.findAll(
            {
                attributes: ['idEmployee', 'PayRates_idPayRates'],
                include: [
                    {
                        model: models.payrates,
                        attributes: ['idPayRates', 'Value', 'TaxPercentage'],
                        as: 'payrates'
                    }
                ]
            }
        );


        const jobHistory = await modelsql.JOB_HISTORY.findAll({
            attributes: ['DEPARTMENT'],
            include: [
                {
                    model: modelsql.EMPLOYMENT,
                    attributes: ['EMPLOYMENT_ID', 'EMPLOYMENT_STATUS'],
                    as: 'EMPLOYMENT',
                    include: [
                        {
                            model: modelsql.PERSONAL,
                            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'SHAREHOLDER_STATUS', 'CURRENT_GENDER', 'ETHNICITY',],
                            as: 'PERSONAL',
                        }
                    ]
                }
            ]
        });


        const data = employees.map(item => {
            const { idEmployee, payrates: { Value, TaxPercentage } } = item;
            return {
                idEmployee,
                SALARY: Value * (100 - TaxPercentage) / 100,
            };
        });

        const newData = jobHistory.map(item => {
            const { DEPARTMENT, EMPLOYMENT: { EMPLOYMENT_ID, EMPLOYMENT_STATUS, PERSONAL } } = item;
            const FULLNAME = `${PERSONAL.CURRENT_FIRST_NAME} ${PERSONAL.CURRENT_MIDDLE_NAME || ''} ${PERSONAL.CURRENT_LAST_NAME}`;
            return {
                FULLNAME,
                ...PERSONAL.dataValues,
                EMPLOYMENT_STATUS,
                DEPARTMENT,
                EMPLOYMENT_ID,
            };
        });

        const mergeData = newData.map((item) => {
            const matchData = data.find((data) => data.idEmployee === item.PERSONAL_ID);
            const mergedItem = { ...item, ...matchData };
            const { idEmployee, PERSONAL_ID, EMPLOYMENT_ID, ...rest } = mergedItem;
            return rest;
        })


        return mergeData;

    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getTotalIncome
};