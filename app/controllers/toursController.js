const Tour = require("../models/Tour");
const User = require("../models/User");

// [GET] /tour
async function getAllTours(req, res, next) {
  try {
    const tours = await Tour.find({ deleted: false });
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
    countTour = await Tour.countDocuments({ deleted: false })

    listTour = await Tour.find({ deleted: false, isRecommend: true }).distinct('_id')

    tours = await Tour
      .find({ deleted: false }) // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec();

    res.status(200).json(
      {
        status: "Success 200: get tours successful",
        tours, // tour trên một page
        current: page, // page hiện tại
        totalPages: Math.ceil(countTour / perPage), // tổng số các page
        totalTours: countTour,
        listSelected: listTour
      }
    )

  } catch (err) {
    next(err)
  }
}

// [PUT] /tour/updateTour/:id
async function updateTour(req, res, next) {
  try {
    let id = req.params.id;
    const { title, price, brief, conten, image } = req.body

    // await User.updateOne({ _id: id }, { $set: { password: bodyRequest.password } });
    await Tour.findByIdAndUpdate(id, {
      title,
      price,
      image,
      brief,
      content
    })

    res.status(200).json(
      {
        status: "Success 200: update tours successful",
      }
    )

  } catch (err) {
    next(err)
  }
}

// [DELETE] /tour/deletetour/:id
async function deleteTour(req, res, next) {
  try {
    let id = req.params.id;

    // await User.updateOne({ _id: id }, { $set: { password: bodyRequest.password } });
    await Tour.findByIdAndUpdate(id, {
      deleted: true
    })

    res.status(200).json(
      {
        status: "Success 200: delete tours successful",
      }
    )

  } catch (err) {
    next(err)
  }
}


// [POST] /tour/recommend
async function postRecommentTour(req, res, next) {
  try {
    const listIdTour = req.body.listSelected;

    await Tour.updateMany({}, { isRecommend: false })

    await Tour.updateMany({ _id: { $in: listIdTour } },
      { $set: { isRecommend: true } },
      { multi: true })

    res.status(200).json({
      status: "Success 200: change tour successful",
    });
  } catch (err) {
    next(err)
  }
}


module.exports = { getAllTours, postNewTour, getPaginationTour, updateTour, deleteTour, postRecommentTour };