const db = require('../models/index')
const { format } = require('date-fns')

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


        const employment = await modelsql.EMPLOYMENT.findAll({
            attributes: ['EMPLOYMENT_STATUS'],
            as: 'EMPLOYMENT',
            include: [
                {
                    model: modelsql.PERSONAL,
                    attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'SHAREHOLDER_STATUS', 'CURRENT_GENDER', 'ETHNICITY', 'CURRENT_ADDRESS_2'],
                    as: 'PERSONAL'
                },

            ]
        })


        // const personal = await modelsql.PERSONAL.findAll({
        //     attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_GENDER', 'ETHNICITY', 'SHAREHOLDER_STATUS', 'SOCIAL_SECURITY_NUMBER'],
        //     as: 'PERSONAL',
        //     include: [
        //         {
        //             model: modelsql.BENEFIT_PLANS,
        //             attributes: ['BENEFIT_PLANS_ID', 'DEDUCTABLE', 'PERCENTAGE_COPAY'],
        //             as: 'BENEFIT_PLANS',
        //         },

        //     ]
        // })

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
            const { idEmployee, ...rest } = mergedItem;
            return rest;
        })



        // const newData = personal.map(item => {
        //     const {
        //         PERSONAL_ID, CURRENT_FIRST_NAME, CURRENT_LAST_NAME, CURRENT_MIDDLE_NAME,
        //         CURRENT_GENDER, ETHNICITY, SHAREHOLDER_STATUS, SOCIAL_SECURITY_NUMBER,
        //     } = item;
        //     const FULLNAME = `${CURRENT_FIRST_NAME} ${CURRENT_MIDDLE_NAME || ''} ${CURRENT_LAST_NAME}`;
        //     return {
        //         PERSONAL_ID,
        //         FULLNAME,
        //         CURRENT_FIRST_NAME,
        //         CURRENT_LAST_NAME,
        //         CURRENT_MIDDLE_NAME,
        //         CURRENT_GENDER,
        //         ETHNICITY,
        //         SHAREHOLDER_STATUS,
        //         SOCIAL_SECURITY_NUMBER
        //     };
        // });


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





        // const mergeData = newData.map((item) => {
        //     const matchData = data.find((data) => data.idEmployee === item.PERSONAL_ID);
        //     const mergedItem = { ...item, ...matchData };
        //     const { idEmployee, ...rest } = mergedItem;
        //     return rest;
        // })


        return mergeData;

    } catch (error) {
        return error.message;
    }
}


async function addNewPersonalData(data) {
    try {
        const {
            firstName, middleName, lastName, gender, benefitid
            , birthDay, ssNumber, driver, zip, phoneNumber, email, marital, address, address2, country, ethnicity, status, employstatus,
            prname, vacations, prid, pd, py, ecode, workcode, number, depart, hireDate, terminationDate, month, totalnumber
        } = data

        const maxIdEmployee = await modelsql.PERSONAL.max('PERSONAL_ID');


        const newPersonal = await modelsql.PERSONAL.create({
            PERSONAL_ID: maxIdEmployee + 1,
            CURRENT_FIRST_NAME: firstName,
            CURRENT_LAST_NAME: lastName,
            CURRENT_MIDDLE_NAME: middleName,
            BIRTH_DATE: format(new Date(birthDay), "yyyy-MM-dd"),
            SOCIAL_SECURITY_NUMBER: ssNumber,
            DRIVERS_LICENSE: driver,
            CURRENT_ADDRESS_1: address,
            CURRENT_ADDRESS_2: address2,
            CURRENT_CITY: address,
            CURRENT_COUNTRY: country,
            CURRENT_ZIP: zip,
            CURRENT_GENDER: gender,
            CURRENT_PHONE_NUMBER: phoneNumber,
            CURRENT_PERSONAL_EMAIL: email,
            CURRENT_MARITAL_STATUS: marital,
            ETHNICITY: ethnicity,
            SHAREHOLDER_STATUS: status,
            BENEFIT_PLAN_ID: benefitid
        });


        const newEmployee = await models.employee.create({
            idEmployee: maxIdEmployee + 1,
            EmployeeNumber: maxIdEmployee + 1,
            FirstName: firstName + " " + middleName,
            LastName: lastName,
            SSN: ssNumber,
            PayRate: prname,
            VacationDays: vacations,
            PayRates_idPayRates: prid,
            PaidToDate: pd,
            PaidLastYear: py,
        });


        const newEmployment = await modelsql.EMPLOYMENT.create({
            EMPLOYMENT_ID: maxIdEmployee + 1,
            PERSONAL_ID: maxIdEmployee + 1,
            EMPLOYMENT_STATUS: employstatus,
            EMPLOYMENT_CODE: ecode,
            WORKERS_COMP_CODE: workcode,
            NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH: number,
            HIRE_DATE_FOR_WORKING: format(new Date(hireDate), "yyyy-MM-dd"),
            TERMINATION_DATE: format(new Date(terminationDate), "yyyy-MM-dd"),
            REHIRE_DATE_FOR_WORKING: format(new Date(terminationDate), "yyyy-MM-dd"),
            LAST_REVIEW_DATE: format(new Date(terminationDate), "yyyy-MM-dd")
        })

        const newJobHistory = await modelsql.JOB_HISTORY.create({
            JOB_HISTORY_ID: maxIdEmployee + 1,
            EMPLOYMENT_ID: maxIdEmployee + 1,
            DEPARTMENT: depart
        })

        const newEmployment_WorkingTime = await modelsql.EMPLOYMENT_WORKING_TIME.create({
            EMPLOYMENT_WORKING_TIME_ID: maxIdEmployee + 1,
            EMPLOYMENT_ID: maxIdEmployee + 1,
            YEAR_WORKING: format("2024-02-04", "yyyy-MM-dd"),
            MONTH_WORKING: month,
            TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH: totalnumber
        })


        return {
            personal: newPersonal,
            employee: newEmployee,
            employment: newEmployment,
            job: newJobHistory,
            working: newEmployment_WorkingTime
        };
    } catch (error) {
        return error.message
    }
}


async function findById(id) {
    try {
        const Personal = await modelsql.PERSONAL.findByPk(id, {
            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'BIRTH_DATE', 'CURRENT_MIDDLE_NAME', 'CURRENT_GENDER'
                , 'CURRENT_PERSONAL_EMAIL', 'ETHNICITY', 'SHAREHOLDER_STATUS', 'CURRENT_PHONE_NUMBER', 'CURRENT_COUNTRY',
                'BENEFIT_PLAN_ID', 'SOCIAL_SECURITY_NUMBER', 'DRIVERS_LICENSE', 'CURRENT_ADDRESS_1'
                , 'CURRENT_ZIP', 'CURRENT_MARITAL_STATUS', 'CURRENT_ADDRESS_2'],
        });

        const Employee = await models.employee.findOne({
            where: { idEmployee: id },
            attributes: ['idEmployee', 'VacationDays', 'EmployeeNumber',
                'PayRates_idPayRates', 'PayRate', 'PaidToDate', 'PaidLastYear']
        });

        const Employement = await modelsql.EMPLOYMENT.findByPk(id, {
            attributes: ['EMPLOYMENT_ID', 'PERSONAL_ID', 'EMPLOYMENT_STATUS'
                , 'NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH', 'EMPLOYMENT_CODE'
                , 'WORKERS_COMP_CODE', 'HIRE_DATE_FOR_WORKING', 'TERMINATION_DATE'
            ]
        });


        const JobHistory = await modelsql.JOB_HISTORY.findByPk(id, {
            attributes: ['DEPARTMENT']
        });

        const Employment_WorkingTime = await modelsql.EMPLOYMENT_WORKING_TIME.findByPk(id, {
            attributes: ['MONTH_WORKING', 'TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH']
        });





        return {
            firstName: Personal.CURRENT_FIRST_NAME,
            lastName: Personal.CURRENT_LAST_NAME,
            middleName: Personal.CURRENT_MIDDLE_NAME,
            birthDay: Personal.BIRTH_DATE,
            driver: Personal.DRIVERS_LICENSE,
            address: Personal.CURRENT_ADDRESS_1,
            address2: Personal.CURRENT_ADDRESS_2,
            country: Personal.CURRENT_COUNTRY,
            zip: Personal.CURRENT_ZIP,
            gender: Personal.CURRENT_GENDER,
            phoneNumber: Personal.CURRENT_PHONE_NUMBER,
            email: Personal.CURRENT_PERSONAL_EMAIL,
            ethnicity: Personal.ETHNICITY.trimEnd(),
            marital: Personal.CURRENT_MARITAL_STATUS,
            status: Personal.SHAREHOLDER_STATUS,
            ssNumber: Personal.SOCIAL_SECURITY_NUMBER,
            prname: Employee.PayRate,
            vacations: Employee.VacationDays,
            pd: Employee.PaidToDate,
            py: Employee.PaidLastYear,
            prid: Employee.PayRates_idPayRates,
            number: Employement.NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH,
            ecode: Employement.EMPLOYMENT_CODE,
            workcode: Employement.WORKERS_COMP_CODE,
            benefitid: Personal.BENEFIT_PLAN_ID,
            employstatus: Employement.EMPLOYMENT_STATUS,
            hireDate: Employement.HIRE_DATE_FOR_WORKING,
            terminationDate: Employement.TERMINATION_DATE,
            depart: JobHistory.DEPARTMENT,
            month: Employment_WorkingTime.MONTH_WORKING,
            totalnumber: Employment_WorkingTime.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH
        };


    } catch (error) {
        return error.message
    }
}




async function updatePersonalData(data, id) {
    try {
        const {
            firstName, middleName, lastName, gender, benefitid
            , birthDay, ssNumber, driver, zip, phoneNumber, email, marital, address, address2, country, ethnicity, status, employstatus,
            prname, vacations, prid, pd, py, ecode, workcode, number, depart, hireDate, terminationDate, month, totalnumber
        } = data


        await modelsql.PERSONAL.update({
            CURRENT_FIRST_NAME: firstName,
            CURRENT_LAST_NAME: lastName,
            CURRENT_MIDDLE_NAME: middleName,
            BIRTH_DATE: format(new Date(birthDay), "yyyy-MM-dd"),
            SOCIAL_SECURITY_NUMBER: ssNumber,
            DRIVERS_LICENSE: driver,
            CURRENT_ADDRESS_1: address,
            CURRENT_ADDRESS_2: address2,
            CURRENT_CITY: address,
            CURRENT_COUNTRY: country,
            CURRENT_ZIP: zip,
            CURRENT_GENDER: gender,
            CURRENT_PHONE_NUMBER: phoneNumber,
            CURRENT_PERSONAL_EMAIL: email,
            CURRENT_MARITAL_STATUS: marital,
            ETHNICITY: ethnicity,
            SHAREHOLDER_STATUS: status,
            BENEFIT_PLAN_ID: benefitid
        }, {
            where: { PERSONAL_ID: id },
        }
        );


        await models.employee.update({
            FirstName: firstName + " " + middleName,
            LastName: lastName,
            SSN: ssNumber,
            PayRate: prname,
            VacationDays: vacations,
            PayRates_idPayRates: prid,
            PaidToDate: pd,
            PaidLastYear: py,
        }, {
            where: { idEmployee: id },
        });

        await modelsql.EMPLOYMENT.update({
            EMPLOYMENT_STATUS: employstatus,
            EMPLOYMENT_CODE: ecode,
            WORKERS_COMP_CODE: workcode,
            NUMBER_DAYS_REQUIREMENT_OF_WORKING_PER_MONTH: number,
            HIRE_DATE_FOR_WORKING: format(new Date(hireDate), "yyyy-MM-dd"),
            TERMINATION_DATE: format(new Date(terminationDate), "yyyy-MM-dd"),
        }, {
            where: { EMPLOYMENT_ID: id },
        });


        await modelsql.JOB_HISTORY.update({
            DEPARTMENT: depart
        }, {
            where: { JOB_HISTORY_ID: id },
        });


        await modelsql.EMPLOYMENT_WORKING_TIME.update({
            MONTH_WORKING: month,
            TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH: totalnumber
        }, {
            where: { EMPLOYMENT_WORKING_TIME_ID: id },
        })



        return { message: 'Personal data update successfully' };

    } catch (error) {
        return error.message
    }
}

async function deletePersonalData(id) {
    try {
        await modelsql.PERSONAL.destroy({
            where: { PERSONAL_ID: id },
        });


        await models.employee.destroy({
            where: { idEmployee: id },
        });

        await modelsql.EMPLOYMENT.destroy({
            where: { EMPLOYMENT_ID: id },
        });

        await modelsql.JOB_HISTORY.destroy({
            where: { JOB_HISTORY_ID: id },
        })

        await modelsql.EMPLOYMENT_WORKING_TIME.destroy({
            where: { EMPLOYMENT_WORKING_TIME_ID: id },
        })

        return { message: 'Personal data deleted successfully' };

    } catch (error) {
        return error.message
    }
}

module.exports = {
    getListEmployee, addNewPersonalData, findById, updatePersonalData, deletePersonalData
};