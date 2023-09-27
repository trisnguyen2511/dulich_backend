const express = require("express")
const router = express.Router()
const { validateCreateTour, validateGetPaginationTour, validateUpdateTour, validateDeleteTour } = require("../app/middlewares/tourMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { getAllTours, postNewTour, getPaginationTour, updateTour, deleteTour } = require("../app/controllers/toursController")


router.post("/newtour", authToken, validateCreateTour, postNewTour)

router.get("/getPaginationTour", validateGetPaginationTour, getPaginationTour)

router.put("/updateTour/:id", authToken, validateUpdateTour, updateTour)

router.delete("/deletetour/:id", authToken, validateDeleteTour, deleteTour)

router.get("/", getAllTours)


module.exports = router
