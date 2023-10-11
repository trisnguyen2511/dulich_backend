const express = require("express")
const router = express.Router()
const { validatePostAboutUsDetail, validatePostAboutUsHome } = require("../app/middlewares/aboutUsMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { getDataAboutUsDetail, getDataAboutUsHome, updateDataAboutUsDetail, updateDataAboutUsHome } = require("../app/controllers/aboutUsController")


router.post("/update-about-us-home", authToken, validatePostAboutUsHome, updateDataAboutUsHome)
router.post("/update-about-us-detail", authToken, validatePostAboutUsDetail, updateDataAboutUsDetail)
router.get("/getDataAboutUsHome", getDataAboutUsHome)
router.get("/getDataAboutUsDetail", getDataAboutUsDetail)


module.exports = router
