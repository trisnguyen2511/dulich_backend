const { Timestamp } = require("mongodb")
const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const SliderHeader = new Schema(
    {
        listURL: {
            type: Array,
        },
        description: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("SliderHeader", SliderHeader)