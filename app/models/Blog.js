const { Timestamp } = require("mongodb")
const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Blog = new Schema(
    {
        title: {
            type: String,
            unique: [true, "title duplicate"],
            required: [true, "title required"],
        },
        slug: {
            type: String,
            unique: true,
            required: [true, "slug required"],
            unique: [true, "slug duplicate"]
        },
        image: {
            type: String,
            default: ''
        },
        brief: {
            type: String,
            required: [true, "brief required"],
        },
        content: {
            type: String,
            required: [true, "content required"],
        },
        // isRecommend: {
        //     type: Boolean,
        //     default: false
        // },
        deleted: {
            type: Boolean,
            default: false
        },
        description: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Blog", Blog)