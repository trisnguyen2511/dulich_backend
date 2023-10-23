const express = require("express")
const router = express.Router()
const { validateCreateTour, validateGetPaginationTour, validateUpdateTour, validateDeleteTour, validatePostRecommentTour, validateGetDetailTour } = require("../app/middlewares/tourMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { getAllTours, postNewTour, getPaginationTour, updateTour, deleteTour, postRecommentTour, getDetailTour, getPaginationShortTour, getTourHot } = require("../app/controllers/toursController")


router.post("/newtour", authToken, validateCreateTour, postNewTour)

router.get("/getPaginationTour", validateGetPaginationTour, getPaginationTour)

router.get("/getPaginationShortTour", validateGetPaginationTour, getPaginationShortTour)

router.get("/getTourHot", getTourHot)

router.get("/detailTour/:id", validateGetDetailTour, getDetailTour)

router.put("/updateTour/:id", authToken, validateUpdateTour, updateTour)

router.delete("/deletetour/:id", authToken, validateDeleteTour, deleteTour)

router.post("/postRecommentTour", authToken, validatePostRecommentTour, postRecommentTour)

router.get("/", getAllTours)


module.exports = router
