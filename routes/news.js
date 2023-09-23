const express = require("express")
const router = express.Router()
const { validateCreateNews } = require("../app/middlewares/newsMiddleware")

const { newNews, index } = require("../app/controllers/newsController")

router.post("/newNews", validateCreateNews, newNews)

router.get("/", index)

module.exports = router
