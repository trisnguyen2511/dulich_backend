const jwt = require("jsonwebtoken")

const expiresTime = "6000000" //100 phút

const createToken = (user) => {
    const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
        expiresIn: expiresTime,
    })
    return token
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.log("Authentication error:", err.message)
            return false
        } else {
            console.log("decoded: ", decoded)
            return true
        }
    })
}

module.exports = { createToken, verifyToken }