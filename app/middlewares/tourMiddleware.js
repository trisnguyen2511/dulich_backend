const Tour = require("../models/Tour")
const mongoose = require('mongoose');

function validateCreateTour(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

function validateGetPaginationTour(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

async function validateUpdateTour(req, res, next) {
    try {
        const tour = await Tour.findById(req.params.id)
        console.log(tour)
        if (!tour) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Tour Id not Exists",
            })
        }
        next()
    } catch (err) {
        res.json(err)
    }
}

async function validateDeleteTour(req, res, next) {
    try {
        const tour = await Tour.findById(req.params.id)
        console.log(tour)
        if (!tour) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Tour Id not Exists",
            })
        }
        next()
    } catch (err) {
        res.json(err)
    }
}
async function validatePostRecommentTour(req, res, next) {
    try {
        const listIdTour = req.body.listSelected
        // console.log(listIdTour)
        // if (Array.isArray(listIdTour)) {

        // console.log(listIdTour.every((id) => {
        //     return mongoose.Types.ObjectId.isValid(id)
        // }))

        if (!listIdTour.every((id) => {
            return mongoose.Types.ObjectId.isValid(id)
        })) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "inval data",
            })
        }
        // } else {
        //     return res.status(400).json({
        //         status: "Error 400: Bad Request",
        //         message: "inval data",
        //     })
        // }

        next()
    } catch (err) {
        res.json(err)
    }
}


module.exports = { validateCreateTour, validateGetPaginationTour, validateUpdateTour, validateDeleteTour, validatePostRecommentTour }
