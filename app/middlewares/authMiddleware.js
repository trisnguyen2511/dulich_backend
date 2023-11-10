const { verifyToken } = require("../../Util/Authentication")
const User = require("../models/User")
const { TOKEN_EXPIRED, TOKEN_SUCCESS, TOKEN_FAILED } = require('../../Util/Constant')
const bcrypt = require("bcrypt")

function authToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Token require",
            })
        }
        const token = req.headers.authorization.slice(7)
        switch (verifyToken(token)) {
            case TOKEN_EXPIRED:
                return res.status(405).json({
                    status: "Error 405: Token expired",
                    message: "Token expired",
                });
            case TOKEN_FAILED:
                return res.status(400).json({
                    status: "Error 400: Bad Request",
                    message: "Authorization failed",
                })
            default:
                next()
                break;
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
    // return password.match(
    //     // Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    // )
    return true
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

        console.log(bodyRequest)

        // if (!bodyRequest.userName) {
        //     return res.status(400).json({
        //         status: "Error 400: Bad Request",
        //         message: "username is required",
        //     })
        // }

        if (!userName) {
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

        if (!bodyRequest.oldPassword) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "oldPassword is required",
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

        const validPassword = await bcrypt.compare(
            bodyRequest.oldPassword,
            userCheck.password
        )
        if (!validPassword) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Old password fail",
            })
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authToken, validateRegister, validateChangePassword }
