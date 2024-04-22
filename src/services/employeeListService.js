const db = require('../models/index')

var initModelsMySQL = require("../models/mysql/init-models");
var models = initModelsMySQL(db.MYSQL);

var initModelsSqlserver = require("../models/sqlserver/init-models");
var modelsql = initModelsSqlserver(db.SQLSERVER);

async function getListEmployee() {
    try {

        const employees = await models.employee.findAll(
            {
                attributes: ['idEmployee', 'VacationDays']
            }
        );


        const personal = await modelsql.PERSONAL.findAll({
            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_GENDER', 'ETHNICITY', 'SHAREHOLDER_STATUS'],
            as: 'PERSONAL',
            include: [
                {
                    model: modelsql.BENEFIT_PLANS,
                    attributes: ['BENEFIT_PLANS_ID', 'DEDUCTABLE', 'PERCENTAGE_COPAY'],
                    as: 'BENEFIT_PLANS',
                },

            ]
        })

        const jobHistory = await modelsql.JOB_HISTORY.findAll({
            attributes: ['DEPARTMENT'],
            include: [
                {
                    model: modelsql.EMPLOYMENT,
                    attributes: ['EMPLOYMENT_ID', 'EMPLOYMENT_STATUS'],
                    as: 'EMPLOYMENT'
                }
            ]
        });


        const data = employees.map(item => {
            const { idEmployee, VacationDays } = item;
            return {
                idEmployee,
                VacationDays
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
                CURRENT_GENDER,
                ETHNICITY,
                SHAREHOLDER_STATUS,
                FROFIT: DEDUCTABLE * PERCENTAGE_COPAY,
            };
        });


        const test = jobHistory.map(item => {
            const { DEPARTMENT, EMPLOYMENT: { EMPLOYMENT_ID, EMPLOYMENT_STATUS } } = item;
            return {
                DEPARTMENT,
                EMPLOYMENT_ID,
                EMPLOYMENT_STATUS
            };
        });

        const combinedData = test.map((item, index) => {
            return {
                ...newData[index],
                ...item,
            };
        });





        const mergeData = combinedData.map((item) => {
            const matchData = data.find((data) => data.idEmployee === item.PERSONAL_ID);
            const mergedItem = { ...item, ...matchData };
            const { idEmployee, BENEFIT_PLANS_ID, EMPLOYMENT_ID, ...rest } = mergedItem;
            return rest;
        })



        return mergeData;

    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getListEmployee
};