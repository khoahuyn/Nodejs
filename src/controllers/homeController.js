const { getAllEmployees } = require('../services/employeeService');
const { getAllPersonnal } = require('../services/personService');
const { getTotalIncome } = require('../services/totalService');
const { getTotalVacation } = require('../services/vacationService');
const { getTotalBenefit } = require('../services/benefitService');
const { getListEmployee } = require('../services/employeeListService');



let test = async (req, res) => {
    res.send('hello cac me')
}

let findAllEmplyee = async (req, res) => {
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getAllEmployees();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

let findAllPersonal = async (req, res) => {
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getAllPersonnal();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

let findTotalIncome = async (req, res) => {
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getTotalIncome();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


let findTotalVacation = async (req, res) => {
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getTotalVacation();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

let findTotalBenefit = async (req, res) => {
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getTotalBenefit();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

let findAll = async (req, res) => {
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getListEmployee();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}





module.exports = {
    test, findAllPersonal, findAllEmplyee, findTotalIncome, findTotalVacation,findTotalBenefit,findAll
}