const getHomepage = (req, res) => {
    res.send('Hello cac ban!')
}

const getForm = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage: getHomepage,
    getForm: getForm
}