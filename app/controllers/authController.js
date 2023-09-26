const User = require("../models/User")
const bcrypt = require("bcrypt")
const { createToken } = require("../../Util/Authentication")

//[GET]/user/all-user
async function getAllUser(req, res, next) {
    try {
        const allUser = await User.find({}, '-password');
        res.status(201).send({
            status: "Success 201: Register successful",
            users: allUser,
        });
    } catch (err) {
        next(err);
    }
}

// [POST] /user/register
async function register(req, res, next) {
    try {
        let bodyRequest = req.body

        let user = new User(bodyRequest)
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        const _user = await user.save()
        res.status(201).send({
            status: "Success 201: Register successful",
        })
    } catch (err) {
        next(err)
    }
}

// [PUT] /user/change-password
async function changePassword(req, res, next) {
    try {
        let userName = req.params.username
        let bodyRequest = req.body

        const salt = await bcrypt.genSalt(10)
        bodyRequest.password = await bcrypt.hash(bodyRequest.password, salt)
        await User.updateOne({ userName: userName }, { $set: { password: bodyRequest.password } });

        res.status(201).send({
            status: "Success 201: update password successful",
        })
    } catch (err) {
        next(err)
    }
}

// [POST] /user/login
async function login(req, res, next) {
    try {
        let bodyRequest = req.body
        const user = await User.findOne({ userName: bodyRequest.userName })
        if (user) {
            const validPassword = await bcrypt.compare(
                bodyRequest.password,
                user.password
            )
            if (validPassword) {
                const token = createToken(user)
                res.status(200).json({ status: "ok", token })
            } else {
                res.status(400).json({ status: "fail", message: "Password invalid!!!" })
            }
        } else {
            res.status(401).json({ status: "fail", message: "User invalid!!!" })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { register, login, changePassword, getAllUser };