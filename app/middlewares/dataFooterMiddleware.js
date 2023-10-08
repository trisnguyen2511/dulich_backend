// const DataFooter = require("../models/DataFooter")

function validatePostDataFooter(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

module.exports = { validatePostDataFooter }
