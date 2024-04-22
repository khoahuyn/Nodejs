const db = require('../models/index')

var initModelsMySQL = require("../models/mysql/init-models");
const PERSONAL = require('../models/sqlserver/PERSONAL');
var models = initModelsMySQL(db.MYSQL);

var initModelsSqlserver = require("../models/sqlserver/init-models");
var modelsql = initModelsSqlserver(db.SQLSERVER);

async function getTotalVacation() {
    try {

        const employees = await models.employee.findAll(
            {
                attributes: ['idEmployee', 'VacationDays']
            }
        );


        const employment = await modelsql.EMPLOYMENT.findAll({
            attributes: ['EMPLOYMENT_STATUS'],
            as: 'EMPLOYMENT',
            include: [
                {
                    model: modelsql.PERSONAL,
                    attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'SHAREHOLDER_STATUS', 'CURRENT_GENDER', 'ETHNICITY'],
                    as: 'PERSONAL'
                },

            ]
        })


        const data = employees.map(item => {
            const { idEmployee, VacationDays } = item;
            return {
                idEmployee,
                VacationDays,
            };
        });

        const newData = employment.map(item => {
            const { EMPLOYMENT_STATUS, PERSONAL } = item
            const FULLNAME = `${PERSONAL.CURRENT_FIRST_NAME} ${PERSONAL.CURRENT_MIDDLE_NAME || ''} ${PERSONAL.CURRENT_LAST_NAME}`;
            return {
                FULLNAME,
                ...PERSONAL.dataValues,
                EMPLOYMENT_STATUS
            };
        });

        const mergeData = newData.map((item) => {
            const matchData = data.find((data) => data.idEmployee === item.PERSONAL_ID);
            const mergedItem = { ...item, ...matchData };
            const { idEmployee, PERSONAL_ID, ...rest } = mergedItem;
            return rest;
        })



        return mergeData;

    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getTotalVacation
};