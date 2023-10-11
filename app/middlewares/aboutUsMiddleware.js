
function validatePostAboutUsHome(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

function validatePostAboutUsDetail(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

module.exports = { validatePostAboutUsHome, validatePostAboutUsDetail }
