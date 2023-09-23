const { model, default: mongoose } = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const User = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "username required"],
    },
    password: {
        type: String,
        required: true,
        // match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    },
    fullName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("User", User)
