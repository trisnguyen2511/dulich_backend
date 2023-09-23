const express = require("express")
const router = express.Router()
const { validateCreateTour, validateGetPaginationTour } = require("../app/middlewares/tourMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { getAllTours, postNewTour, getPaginationTour } = require("../app/controllers/toursController")


router.post("/newtour", authToken, validateCreateTour, postNewTour)

router.get("/getPaginationTour", authToken, validateGetPaginationTour, getPaginationTour)

router.get("/", getAllTours)


module.exports = router
