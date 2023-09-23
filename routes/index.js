const newsRouter = require("./news")
const userRouter = require("./auth")
const tourRouter = require("./tour")
const { authToken } = require("../app/middlewares/authMiddleware")
const { errorHandler } = require("../app/middlewares/ErrorHandler")
const { createToken } = require("../Util/Authentication")

async function route(app) {
    // app.get("/", (req, res) => {
    //     res.send("Hello World!")
    // })
    app.use("/news", authToken, newsRouter)

    app.use("/user", userRouter)

    app.use("/tour", tourRouter)

    app.get("/", (req, res) => {
        const user = {
            username: "tris",
            password: "123456",
        }
        const token = createToken(user)
        res.send(token)
    })

    app.use(errorHandler)
}

module.exports = { route }
