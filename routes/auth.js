const express = require("express")
const router = express.Router()
const { validateRegister, validateChangePassword } = require("../app/middlewares/authMiddleware")

const { register, login, changePassword } = require("../app/controllers/authController")

router.post("/register", validateRegister, register)
router.post("/login", login)
router.post("/changepassword/:username", validateChangePassword, changePassword)

module.exports = router
