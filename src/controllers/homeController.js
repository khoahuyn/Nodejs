const { getAllBenefit, getAllPayRate } = require('../services/getIDService');
const { getTotalIncome } = require('../services/totalService');
const { getTotalVacation } = require('../services/vacationService');
const { getTotalBenefit } = require('../services/benefitService');
const { getListEmployee, addNewPersonalData, findById, updatePersonalData, deletePersonalData } = require('../services/employeeListService');



const test = async (req, res) => {
    res.send('hello cac me')
}



const findAllBenefit = async (req, res) => {
    try {
        const result = await getAllBenefit();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findAllPayrate = async (req, res) => {
    try {
        const result = await getAllPayRate();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findTotalIncome = async (req, res) => {
    try {
        const result = await getTotalIncome();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const findTotalVacation = async (req, res) => {
    try {
        const result = await getTotalVacation();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findTotalBenefit = async (req, res) => {
    try {
        const result = await getTotalBenefit();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findAll = async (req, res) => {
    try {
        const result = await getListEmployee();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const addNewPersonal = async (req, res) => {
    try {
        const newPersonal = req.body;
        const newEmployee = req.body;
        const newEmployment = req.body;
        const newJobHistory = req.body;

        const result = await addNewPersonalData(newPersonal, newEmployee, newEmployment, newJobHistory);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const findByPK = async (req, res) => {
    try {
        const _id = req.params.id;

        const result = await findById(_id);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updatePersonal = async (req, res) => {
    try {
        const newPersonalData = req.body;

        const _id = req.params.id;

        const result = await updatePersonalData(newPersonalData, _id);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deletePersonal = async (req, res) => {
    try {

        const _id = req.params.id;

        const result = await deletePersonalData(_id);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    test, findAllBenefit, findAllPayrate, findTotalIncome,
    findTotalVacation, findTotalBenefit, findAll, addNewPersonal,
    findByPK, updatePersonal, deletePersonal
}