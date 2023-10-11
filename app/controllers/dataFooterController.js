const DataFooter = require("../models/DataFooter");
// const User = require("../models/User");

// [GET] /datafooter/getdatafooter
async function getDataFooter(req, res, next) {
  try {
    const dataFooter = await DataFooter.findOne()
    // if (!dataFooter) {

    // }
    res.status(200).json(
      {
        status: "Success 200: get data footer successful",
        dataFooter,
      }
    )
  } catch (err) {
    next(err)
  }
}

// [POST] /datafooter/changeFooter
async function updateDataFooter(req, res, next) {
  try {
    // let id = req.params.id;

    const dataFooter = await DataFooter.findOne()
    const _dataFooter = req.body;
    if (!dataFooter) {
      const _newDataFooter = new DataFooter(_dataFooter);
      await _newDataFooter.save();
    } else {
      const { companyName, email, phoneNumber, address } = req.body
      // await User.updateOne({ _id: id }, { $set: { password: bodyRequest.password } });
      await dataFooter.updateOne(_dataFooter)
    }


    res.status(200).json(
      {
        status: "Success 200: update data footer successful",
      }
    )

  } catch (err) {
    next(err)
  }
}

module.exports = { getDataFooter, updateDataFooter };