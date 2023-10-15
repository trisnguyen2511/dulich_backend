const jwt = require("jsonwebtoken")
const { TOKEN_EXPIRED, TOKEN_SUCCESS, TOKEN_FAILED } = require('../Util/Constant')

const expiresTime = "6000000" //100 phút

const createToken = (user) => {
    console.log(user)
    const token = jwt.sign({ user: user.userName }, process.env.JWT_KEY, {
        expiresIn: expiresTime,
    });
    return token
}

const verifyToken = (token) => {
    const { exp } = jwt.decode(token)

    if (Date.now() >= exp * 1000) {
        return TOKEN_EXPIRED;
    }

    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.log("Authentication error:", err.message)
            return TOKEN_FAILED
        } else {
            // console.log("decoded: ", decoded)
            return TOKEN_SUCCESS
        }
    })
}

module.exports = { createToken, verifyToken }