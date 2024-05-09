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


        const employment = await modelsql.EMPLOYMENT.findAll({
            attributes: ['EMPLOYMENT_STATUS'],
            as: 'EMPLOYMENT',
            include: [
                {
                    model: modelsql.PERSONAL,
                    attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'SHAREHOLDER_STATUS', 'CURRENT_GENDER', 'ETHNICITY', 'CURRENT_COUNTRY'],
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



        // console.log(lengthData)
        // BENEFIT_PLANS: { BENEFIT_PLANS_ID, DEDUCTABLE, PERCENTAGE_COPAY, }
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



// async function addNewPersonalData(data) {
//     try {
//         const newPersonal = await modelsql.PERSONAL.create(data);


//         const newEmployee = await models.employee.create({
//             ...data,
//             idEmployee: data.PERSONAL_ID,
//             FirstName: data.CURRENT_FIRST_NAME + " " + data.CURRENT_MIDDLE_NAME,
//             LastName: data.CURRENT_LAST_NAME,
//             SSN: data.SOCIAL_SECURITY_NUMBER
//         });



//         return {
//             personal: newPersonal,
//             employee: newEmployee
//         };
//     } catch (error) {
//         return error.message
//     }
// }

async function addNewPersonalData(data) {
    try {
        const {
            employeeId, firstName, middleName, lastName, gender, benefitid
            , birthDay, ssNumber, phoneNumber, email, address, country, ethnicity, status, employstatus,
            vacations, prid
        } = data

        // autoIncrement: true,

        const employee= await getListEmployee();
        const lengthData=employee.length;
        
        const newPersonal = await modelsql.PERSONAL.create({
            PERSONAL_ID: lengthData + 1,
            CURRENT_FIRST_NAME: firstName,
            CURRENT_LAST_NAME: lastName,
            CURRENT_MIDDLE_NAME: middleName,
            SOCIAL_SECURITY_NUMBER: ssNumber,
            CURRENT_COUNTRY: country,
            CURRENT_GENDER: gender,
            CURRENT_PHONE_NUMBER: phoneNumber,
            CURRENT_PERSONAL_EMAIL: email,
            ETHNICITY: ethnicity,
            SHAREHOLDER_STATUS: status,
            BENEFIT_PLAN_ID: benefitid
        });


        const newEmployee = await models.employee.create({
            idEmployee: lengthData + 1,
            EmployeeNumber: lengthData + 1,
            FirstName: firstName + " " + middleName,
            LastName: lastName,
            SSN: ssNumber,
            VacationDays: vacations,
            PayRates_idPayRates: prid
        });


        const newEmployment = await modelsql.EMPLOYMENT.create({
            EMPLOYMENT_ID: lengthData + 1,
            PERSONAL_ID: lengthData + 1,
            EMPLOYMENT_STATUS: employstatus
        })

        return {
            personal: newPersonal,
            employee: newEmployee,
            employment: newEmployment
        };
    } catch (error) {
        return error.message
    }
}


async function findById(id) {
    try {
        const Personal = await modelsql.PERSONAL.findByPk(id, {
            attributes: ['PERSONAL_ID', 'CURRENT_FIRST_NAME', 'CURRENT_LAST_NAME', 'CURRENT_MIDDLE_NAME', 'CURRENT_GENDER', 'CURRENT_PERSONAL_EMAIL', 'ETHNICITY', 'SHAREHOLDER_STATUS', 'SOCIAL_SECURITY_NUMBER', 'CURRENT_PHONE_NUMBER', 'CURRENT_COUNTRY'],
        });

        const Employee = await models.employee.findOne({
            where: { idEmployee: id },
            attributes: ['idEmployee', 'VacationDays', 'EmployeeNumber', 'PayRates_idPayRates']
        });




        return {
            firstName: Personal.CURRENT_FIRST_NAME,
            lastName: Personal.CURRENT_LAST_NAME,
            middleName: Personal.CURRENT_MIDDLE_NAME,
            ssNumber: Personal.SOCIAL_SECURITY_NUMBER,
            country: Personal.CURRENT_COUNTRY,
            gender: Personal.CURRENT_GENDER,
            phoneNumber: Personal.CURRENT_PHONE_NUMBER,
            email: Personal.CURRENT_PERSONAL_EMAIL,
            ethnicity: Personal.ETHNICITY,
            status: Personal.SHAREHOLDER_STATUS,
            vacations: Employee.VacationDays,
            prid: Employee.PayRates_idPayRates
        };


    } catch (error) {
        return error.message
    }
}

// async function updatePersonalData(data, id) {
//     try {
//         await modelsql.PERSONAL.update(data, {
//             where: { PERSONAL_ID: id },
//         });


//         await models.employee.update({
//             FirstName: data.CURRENT_FIRST_NAME + " " + data.CURRENT_MIDDLE_NAME,
//             LastName: data.CURRENT_LAST_NAME,
//             SSN: data.SOCIAL_SECURITY_NUMBER,
//             VacationDays: data.VacationDays,
//             PayRates_idPayRates: data.PayRates_idPayRates
//         }, {
//             where: { idEmployee: id },
//         });



//         return { message: 'Personal data create successfully' };

//     } catch (error) {
//         return error.message
//     }
// }


async function updatePersonalData(data, id) {
    try {
        const {
            employeeId, firstName, middleName, lastName, gender, benefitid
            , birthDay, ssNumber, phoneNumber, email, address, country, ethnicity, status, employstatus,
            vacations, prid
        } = data


        await modelsql.PERSONAL.update({
            CURRENT_FIRST_NAME: firstName,
            CURRENT_LAST_NAME: lastName,
            CURRENT_MIDDLE_NAME: middleName,
            SOCIAL_SECURITY_NUMBER: ssNumber,
            CURRENT_COUNTRY: country,
            CURRENT_GENDER: gender,
            CURRENT_PHONE_NUMBER: phoneNumber,
            CURRENT_PERSONAL_EMAIL: email,
            ETHNICITY: ethnicity,
            SHAREHOLDER_STATUS: status,
        }, {
            where: { PERSONAL_ID: id },
        }
        );


        await models.employee.update({
            FirstName: firstName + " " + middleName,
            LastName: lastName,
            SSN: ssNumber,
            VacationDays: vacations,
            PayRates_idPayRates: prid
        }, {
            where: { idEmployee: id },
        });



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


        return { message: 'Personal data deleted successfully' };

    } catch (error) {
        return error.message
    }
}

module.exports = {
    getListEmployee, addNewPersonalData, findById, updatePersonalData, deletePersonalData
};