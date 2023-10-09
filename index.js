const express = require("express")
const db = require("./config/database/mongodb.js")
const app = express()
const cors = require("cors")
const port = 4000
const { route } = require("./routes")
const { errorHandler } = require("./app/middlewares/ErrorHandler.js")

app.use(express.json())
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
    // cors()
)

db.connect()
app.use(errorHandler)

route(app)


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
