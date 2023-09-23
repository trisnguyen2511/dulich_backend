function validateCreateTour(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

function validateGetPaginationTour(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}



module.exports = { validateCreateTour, validateGetPaginationTour }
