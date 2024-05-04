const db = require('../models/index')

const initModelsMySQL = require("../models/mysql/init-models");
const models = initModelsMySQL(db.MYSQL);

const initModelsSqlserver = require("../models/sqlserver/init-models");
const modelsql = initModelsSqlserver(db.SQLSERVER);

async function getListEmployee() {
    try {

        const employees = await models.employee.findAll(
            {
                attributes: ['idEmployee', 'VacationDays', 'EmployeeNumber']
            }
        );


        const personal = await modelsql.PERSONAL.findAll({
            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_GENDER', 'ETHNICITY', 'SHAREHOLDER_STATUS', 'SOCIAL_SECURITY_NUMBER'],
            as: 'PERSONAL',
            // include: [
            //     {
            //         model: modelsql.BENEFIT_PLANS,
            //         attributes: ['BENEFIT_PLANS_ID', 'DEDUCTABLE', 'PERCENTAGE_COPAY'],
            //         as: 'BENEFIT_PLANS',
            //     },

            // ]
        })

        // const jobHistory = await modelsql.JOB_HISTORY.findAll({
        //     attributes: ['DEPARTMENT'],
        //     include: [
        //         {
        //             model: modelsql.EMPLOYMENT,
        //             attributes: ['EMPLOYMENT_ID', 'EMPLOYMENT_STATUS'],
        //             as: 'EMPLOYMENT'
        //         }
        //     ]
        // });


        const data = employees.map(item => {
            const { idEmployee, VacationDays, EmployeeNumber } = item;
            return {
                idEmployee,
                VacationDays,
                EmployeeNumber
            };
        });

        // BENEFIT_PLANS: { BENEFIT_PLANS_ID, DEDUCTABLE, PERCENTAGE_COPAY, }
        const newData = personal.map(item => {
            const {
                PERSONAL_ID, CURRENT_FIRST_NAME, CURRENT_LAST_NAME, CURRENT_MIDDLE_NAME,
                CURRENT_GENDER, ETHNICITY, SHAREHOLDER_STATUS, SOCIAL_SECURITY_NUMBER,
            } = item;
            const FULLNAME = `${CURRENT_FIRST_NAME} ${CURRENT_MIDDLE_NAME || ''} ${CURRENT_LAST_NAME}`;
            return {
                PERSONAL_ID,
                FULLNAME,
                // BENEFIT_PLANS_ID,
                CURRENT_FIRST_NAME,
                CURRENT_LAST_NAME,
                CURRENT_MIDDLE_NAME,
                CURRENT_GENDER,
                ETHNICITY,
                SHAREHOLDER_STATUS,
                SOCIAL_SECURITY_NUMBER
                // FROFIT: DEDUCTABLE * PERCENTAGE_COPAY,
            };
        });


        // const test = jobHistory.map(item => {
        //     const { DEPARTMENT, EMPLOYMENT: { EMPLOYMENT_ID, EMPLOYMENT_STATUS } } = item;
        //     return {
        //         DEPARTMENT,
        //         EMPLOYMENT_ID,
        //         EMPLOYMENT_STATUS
        //     };
        // });

        // const combinedData = test.map((item, index) => {
        //     return {
        //         ...newData[index],
        //         ...item,
        //     };
        // });





        const mergeData = newData.map((item) => {
            const matchData = data.find((data) => data.idEmployee === item.PERSONAL_ID);
            const mergedItem = { ...item, ...matchData };
            const { idEmployee, ...rest } = mergedItem;
            return rest;
        })



        return mergeData;

    } catch (error) {
        return error.message;
    }
}



async function addNewPersonalData(data) {
    try {
        const newPersonal = await modelsql.PERSONAL.create(data);
        if (!newPersonal) {
            throw new Error('Failed to create new personal data.');
        }

        const newEmployee = await models.employee.create({
            ...data,
            idEmployee: data.PERSONAL_ID,
            FirstName: data.CURRENT_FIRST_NAME + " " + data.CURRENT_MIDDLE_NAME,
            LastName: data.CURRENT_LAST_NAME,
            SSN: data.SOCIAL_SECURITY_NUMBER
        });

        if (!newEmployee) {
            throw new Error('Failed to create new employee data.');
        }

        return {
            personal: newPersonal,
            employee: newEmployee
        };
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getListEmployee, addNewPersonalData
};