const { getListBirthdayRemainder } = require('../services/alertService')



const findBirtDayAlert = async (req, res) => {
    try {
        const result = await getListBirthdayRemainder();

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    findBirtDayAlert
}