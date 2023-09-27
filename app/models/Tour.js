const { Timestamp } = require("mongodb")
const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Tour = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: [true, "title required"],
        },
        price: {
            type: Number,
            required: [true, "price required"],
        },
        brief: {
            type: String,
            required: [true, "brief required"],
        },
        content: {
            type: String,
            required: [true, "content required"],
        },
        deleted: {
            type: Boolean,
            default: false
        },
        description: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Tour", Tour)

const tours =
    [
        {
            title: "Dũng Tàu",
            price: "100000",
            brief: "đi chơi cho zui thoi",
            content: "ngày này đi đâu , ngày kia đi đau, ngayf kỉa đi đâu luôn"

        },
        {
            title: "Dũng Tàu",
            price: "100000",
            brief: "đi chơi cho zui thoi",
            content: "ngày này đi đâu , ngày kia đi đau, ngayf kỉa đi đâu luôn"

        }, {
            title: "Dũng Tàu",
            price: "100000",
            brief: "đi chơi cho zui thoi",
            content: "ngày này đi đâu , ngày kia đi đau, ngayf kỉa đi đâu luôn"

        },
    ]