const express = require("express")
const router = express.Router()
const { validatePostDataFooter } = require("../app/middlewares/dataFooterMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { getDataFooter, updateDataFooter } = require("../app/controllers/dataFooterController")


router.post("/changefooter", authToken, validatePostDataFooter, updateDataFooter)
router.get("/getdatafooter", getDataFooter)


module.exports = router
