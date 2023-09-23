// const { MongoClient, ServerApiVersion } = require("mongodb")
const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.DATABASE_MONGODB_URI

async function connect() {
    mongoose
        .connect(uri)
        .then(() => console.log("Connected!"))
        .catch(() => console.log("Connect failed !"))
}

module.exports = { connect }
