const { getListBirthdayRemainder, getListAnniversary, getListVacationDay } = require('../services/alertService')



const findBirtDayAlert = async (req, res) => {
    try {
        const result = await getListBirthdayRemainder();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const findAniversary = async (req, res) => {
    try {
        const result = await getListAnniversary();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findVacationDay = async (req, res) => {
    try {
        const result = await getListVacationDay();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    findBirtDayAlert, findAniversary, findVacationDay
}