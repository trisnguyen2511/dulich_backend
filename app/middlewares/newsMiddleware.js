function validateCreateNews(req, res, next) {
    try {
        // const newNews = req.body
        console.log(req.body)
        next()
        // const newNewsAdd = await m.save()
        // res.json(newNewsAdd)
    } catch (err) {
        res.json(err)
    }
}

module.exports = { validateCreateNews }
