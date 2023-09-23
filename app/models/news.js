const { Timestamp } = require("mongodb")
const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const News = new Schema(
    {
        title: {
            type: String,
            required: [true, "title required"],
        },
        body: {
            type: String,
            required: [true, "body required"],
        },
        description: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("News", News)
