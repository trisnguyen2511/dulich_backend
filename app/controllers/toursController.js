const Tour = require("../models/Tour");

// [GET] /tour
async function getAllTours(req, res, next) {
  try {
    const tours = await Tour.find();
    res.status(200).json(
      {
        status: "Success 200: get tours successful",
        tours,
      }
    )
  } catch (err) {
    next(err)
  }
}

// [POST] /tour/newtour
async function postNewTour(req, res, next) {
  try {
    const tour = req.body;
    const _tour = new Tour(tour);
    const newTourAdd = await _tour.save();

    res.status(200).json({
      status: "Success 200: register tour successful",
      tourId: newTourAdd._id, // You can return the tour ID or any other important fields.
    });
  } catch (err) {
    next(err)
  }
}

// [GET] /tour/getPaginationTour
async function getPaginationTour(req, res, next) {
  try {
    let perPage = req.query.perpage || 12; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1;
    countTour = await Tour.countDocuments()

    tours = await Tour
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec();

    res.status(200).json(
      {
        status: "Success 200: get tours successful",
        tours, // tour trên một page
        current: page, // page hiện tại
        totalPages: Math.ceil(countTour / perPage) // tổng số các page
      }
    )

  } catch (err) {
    next(err)
  }
}

module.exports = { getAllTours, postNewTour, getPaginationTour };