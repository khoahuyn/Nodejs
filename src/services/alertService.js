const db = require('../models/index')

const { Sequelize, where } = require("sequelize");

const initModelsMySQL = require("../models/mysql/init-models");
const models = initModelsMySQL(db.MYSQL);

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

async function getListAnniversary() {
    try {

        const thresholdDays = 7;
        const today = new Date();

        const personal = await modelsql.PERSONAL.findAll({
            attributes: ["PERSONAL_ID", "CURRENT_FIRST_NAME", "CURRENT_LAST_NAME", "CURRENT_MIDDLE_NAME", "CURRENT_GENDER"],
            include: [
                {
                    attributes: ["EMPLOYMENT_ID", "HIRE_DATE_FOR_WORKING"],
                    model: modelsql.EMPLOYMENT,
                    required: true,
                    as: "EMPLOYMENT",
                }
            ],
            raw: true,
        })

        const anniversaryRemainder = personal.filter((person) => {
            const hireDate = new Date(person["EMPLOYMENT.HIRE_DATE_FOR_WORKING"]);
            const hireDateThisYear = new Date(today.getFullYear(), hireDate.getMonth(), hireDate.getDate());
            const diffTime = Math.abs(hireDateThisYear - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays <= thresholdDays;
        });

        return anniversaryRemainder;
    } catch (error) {
        return error.message;
    }
}


async function getListVacationDay() {
    try {

        const personals = await modelsql.PERSONAL.findAll({
            attributes: ["PERSONAL_ID", "CURRENT_FIRST_NAME", "CURRENT_LAST_NAME", "CURRENT_MIDDLE_NAME", "CURRENT_GENDER"],
            include: [
                {
                    model: modelsql.EMPLOYMENT,
                    as: "EMPLOYMENT",
                    attributes: ["EMPLOYMENT_ID", "EMPLOYMENT_STATUS"],
                    include: [
                        {
                            model: modelsql.EMPLOYMENT_WORKING_TIME,
                            as: "EMPLOYMENT_WORKING_TIME",
                            attributes: ["YEAR_WORKING", "MONTH_WORKING", "TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH"],
                            where: {
                                $and: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('YEAR_WORKING')), new Date().getFullYear()),
                            }
                        }
                    ]
                },
            ],
            raw: true
        });

        const mergeData = personals.map((item) => {
            const monthWorking = item['EMPLOYMENT.EMPLOYMENT_WORKING_TIME.MONTH_WORKING'];
            const totalVacation = item['EMPLOYMENT.EMPLOYMENT_WORKING_TIME.TOTAL_NUMBER_VACATION_WORKING_DAYS_PER_MONTH'];

            const totalVacationDaysCurrentYear = totalVacation * monthWorking;

            const mergedItem = { totalVacationDaysCurrentYear, ...item };
            return mergedItem;
        });

        const employes = await models.employee.findAll({
            attributes: ['idEmployee', 'LastName', 'FirstName', 'VacationDays'],
        })

        const employeesWithExcessVacation = employes.filter((employee) => {
            const matchData = mergeData.find(
                (data) => data.PERSONAL_ID === employee.idEmployee
            );

            return matchData.totalVacationDaysCurrentYear > employee.VacationDays;
        });

        const listData = employeesWithExcessVacation.map((employee) => {
            const matchData = mergeData.find(
                (data) => data.PERSONAL_ID === employee.idEmployee
            );

            return {
                idEmployee: employee.idEmployee,
                ...employee.dataValues,
                totalVacationDays: matchData.totalVacationDaysCurrentYear,
            }
        });

        return listData;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getListBirthdayRemainder, getListAnniversary, getListVacationDay
};