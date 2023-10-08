// const DataFooter = require("../models/DataFooter")

function validatePostSliderHeader(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

module.exports = { validatePostSliderHeader }
