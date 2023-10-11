const { Timestamp } = require("mongodb")
const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AboutUsDetail = new Schema(
    {
        data: {
            type: String,
        },
        description: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("AboutUsDetail", AboutUsDetail)