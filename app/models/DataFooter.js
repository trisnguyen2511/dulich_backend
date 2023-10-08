const { Timestamp } = require("mongodb")
const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const DataFooter = new Schema(
    {
        title: {
            type: String,
            unique: true,
            default: 'dataFooter'
        },
        companyName: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        description: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("DataFooter", DataFooter)