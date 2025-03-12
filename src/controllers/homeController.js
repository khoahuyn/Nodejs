const { getAllPayRates } = require('../services/payRatesService');
const { getEmployee } = require('../services/employeeService');

let test= async(req,res)=>{
    res.send('hello cac me')
}

let findAllPayRates= async(req,res)=>{
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getAllPayRates();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

let findEmployee= async(req,res)=>{
    try {
        // Gọi service để lấy tất cả PayRates
        const result = await getEmployee();

        // Trả về kết quả dưới dạng JSON`
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={
    test,findAllPayRates,findEmployee
}