const express = require("express")
const router = express.Router()
const { validateRegister, validateChangePassword } = require("../app/middlewares/authMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware");

const { register, login, changePassword, getAllUser } = require("../app/controllers/authController")
router.get("/all-user", authToken, getAllUser);
router.post("/register", validateRegister, register)
router.post("/login", login)
router.put("/change-password/:username", validateChangePassword, changePassword)

module.exports = router