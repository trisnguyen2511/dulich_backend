const { verifyToken } = require("../../Util/Authentication")
const User = require("../models/User")

function authToken(req, res, next) {
    try {
        const token = req.headers.authorization.slice(7)
        if (verifyToken(token)) {
            next()
        } else {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Authorization failed",
            })
        }
    } catch (err) {
        next(err)
        // const error = {
        //     message: err.message,
        //     error: err,
        // }
        // res.status(400).json(error)
    }
}

const validatePasword = (password) => {
    return password.match(
        // Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
}

async function validateRegister(req, res, next) {
    try {
        let bodyRequest = req.body

        if (!bodyRequest.userName) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "username is required",
            })
        }

        if (!bodyRequest.password) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "password is required",
            })
        }

        if (!bodyRequest.fullName) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "fullName is required",
            })
        }

        if (!validatePasword(bodyRequest.password)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "password is not valid",
            })
        }

        const userCheck = await User.findOne({ userName: bodyRequest.userName })
        if (userCheck) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "User existed",
            })
        }
        next()
    } catch (err) {
        next(err)
    }
}

async function validateChangePassword(req, res, next) {
    try {
        let userName = req.params.username
        let bodyRequest = req.body

        // if (!bodyRequest.userName) {
        //     return res.status(400).json({
        //         status: "Error 400: Bad Request",
        //         message: "username is required",
        //     })
        // }

        if (!bodyRequest.password) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "password is required",
            })
        }

        if (!bodyRequest.fullName) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "fullName is required",
            })
        }

        if (!validatePasword(bodyRequest.password)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "password is not valid",
            })
        }

        const userCheck = await User.findOne({ userName: userName })
        if (!userCheck) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "User not exist",
            })
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authToken, validateRegister, validateChangePassword }
