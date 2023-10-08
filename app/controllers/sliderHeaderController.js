const SliderHeader = require("../models/SliderHeader");
// const User = require("../models/User");

// [GET] /sliderheader/getsliderheader
async function getSliderHeader(req, res, next) {
  try {
    const slideHeader = await SliderHeader.findOne()
    res.status(200).json(
      {
        status: "Success 200: get slide header successful",
        slideHeader,
      }
    )
  } catch (err) {
    next(err)
  }
}

// [POST] /sliderheader/changesliderheader
async function changeSliderHeader(req, res, next) {
  try {
    const sliderHeader = await SliderHeader.findOne()
    const _sliderHeader = req.body;
    if (!sliderHeader) {
      const _newSliderHeader = new SliderHeader(_sliderHeader);
      await _newSliderHeader.save();
    } else {
      await sliderHeader.updateOne(_sliderHeader)
    }


    res.status(200).json(
      {
        status: "Success 200: update slider header successful",
      }
    )

  } catch (err) {
    next(err)
  }
}

module.exports = { getSliderHeader, changeSliderHeader };