const News = require("../models/news")

// [GET] /news
async function index(req, res) {
    const news = await News.find({})
    res.json(news)
}

// [POST] /news/newnews
async function newNews(req, res, next) {
    try {
        const newNews = req.body
        const m = await new News(newNews)

        const newNewsAdd = await m.save()
        res.json(newNewsAdd)
    } catch (err) {
        res.json(err.message)
    }
}

module.exports = { index, newNews }
