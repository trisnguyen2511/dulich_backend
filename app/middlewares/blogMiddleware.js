const { slugify } = require("../../Util/slug");
const Blog = require("../models/Blog")
const mongoose = require('mongoose');

async function validateCreateBlog(req, res, next) {
    try {
        const slug = slugify(req.body.title)
        const checkblog = await Blog.findOne({ slug: slug })
        if (checkblog) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Blog Exists",
            })
        }

        next()
    } catch (err) {
        res.json(err)
    }
}

function validateGetPaginationBlog(req, res, next) {
    try {
        console.log(req.body)
        next()
    } catch (err) {
        res.json(err)
    }
}

async function validateUpdateBlog(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id)
        console.log(blog)
        if (!blog) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Blog Id not Exists",
            })
        }
        next()
    } catch (err) {
        res.json(err)
    }
}

async function validateDeleteBlog(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id)
        console.log(blog)
        if (!blog) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "Blog Id not Exists",
            })
        }
        next()
    } catch (err) {
        res.json(err)
    }
}
// async function validatePostRecommentBlog(req, res, next) {
//     try {
//         const listIdBlog = req.body.listSelected
//         // console.log(listIdBlog)
//         // if (Array.isArray(listIdBlog)) {

//         // console.log(listIdBlog.every((id) => {
//         //     return mongoose.Types.ObjectId.isValid(id)
//         // }))

//         if (!listIdBlog.every((id) => {
//             return mongoose.Types.ObjectId.isValid(id)
//         })) {
//             return res.status(400).json({
//                 status: "Error 400: Bad Request",
//                 message: "inval data",
//             })
//         }
//         // } else {
//         //     return res.status(400).json({
//         //         status: "Error 400: Bad Request",
//         //         message: "inval data",
//         //     })
//         // }

//         next()
//     } catch (err) {
//         res.json(err)
//     }
// }

async function validateGetDetailBlog(req, res, next) {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "Error 400: Bad Request",
                message: "id invalid",
            })
        }
        next()
    } catch (err) {
        res.json(err)
    }
}


module.exports = { validateCreateBlog, validateGetPaginationBlog, validateUpdateBlog, validateDeleteBlog, validateGetDetailBlog }
