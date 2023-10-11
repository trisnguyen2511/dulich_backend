const AboutUsDetail = require("../models/AboutUsDetail");
const AboutUsHome = require("../models/AboutUsHome");
// const User = require("../models/User");

// [GET] /aboutus/getaboutdetail
async function getDataAboutUsDetail(req, res, next) {
    try {
        const data = await AboutUsDetail.findOne()
        res.status(200).json(
            {
                status: "Success 200: get data about us detail successful",
                data,
            }
        )
    } catch (err) {
        next(err)
    }
}

// [GET] /aboutus/getabouthome
async function getDataAboutUsHome(req, res, next) {
    try {
        const data = await AboutUsHome.findOne()
        res.status(200).json(
            {
                status: "Success 200: get data about us home successful",
                data,
            }
        )
    } catch (err) {
        next(err)
    }
}

// [POST] /aboutus/update-about-us-detail
async function updateDataAboutUsDetail(req, res, next) {
    try {
        // let id = req.params.id;

        const data = await AboutUsDetail.findOne()
        const _data = req.body;
        if (!data) {
            const _newData = new AboutUsDetail(_data);
            await _newData.save();
        } else {
            await data.updateOne(_data)
        }

        res.status(200).json(
            {
                status: "Success 200: update data successful",
            }
        )

    } catch (err) {
        next(err)
    }
}

// [POST] /aboutus/update-about-us-home
async function updateDataAboutUsHome(req, res, next) {
    try {

        const data = await AboutUsHome.findOne()
        const _data = req.body;
        if (!data) {
            const _newData = new AboutUsHome(_data);
            await _newData.save();
        } else {
            await data.updateOne(_data)
        }

        res.status(200).json(
            {
                status: "Success 200: update data successful",
            }
        )

    } catch (err) {
        next(err)
    }
}

module.exports = { updateDataAboutUsHome, updateDataAboutUsDetail, getDataAboutUsHome, getDataAboutUsDetail };