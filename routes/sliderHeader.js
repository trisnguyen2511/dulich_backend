const express = require("express")
const router = express.Router()
const { validatePostSliderHeader } = require("../app/middlewares/sliderHeaderMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { changeSliderHeader, getSliderHeader } = require("../app/controllers/sliderHeaderController")


router.post("/changesliderheader", authToken, validatePostSliderHeader, changeSliderHeader)
router.get("/getsliderheader", getSliderHeader)


module.exports = router
