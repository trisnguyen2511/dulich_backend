const { slugify } = require("../../Util/slug");
const Blog = require("../models/Blog");
const User = require("../models/User");

// [GET] /blog
async function getAllBlogs(req, res, next) {
    try {
        const blogs = await Blog.find({ deleted: false });
        res.status(200).json(
            {
                status: "Success 200: get blogs successful",
                blogs,
            }
        )
    } catch (err) {
        next(err)
    }
}

// [POST] /blog/newblog
async function postNewBlog(req, res, next) {
    try {
        let blog = req.body;

        const slug = slugify(blog.title)
        blog = { ...blog, slug }
        const _blog = new Blog(blog);
        const newBlogAdd = await _blog.save();


        res.status(200).json({
            status: "Success 200: register blog successful",
            blogId: newBlogAdd._id, // You can return the blog ID or any other important fields.
        });
    } catch (err) {
        next(err)
    }
}

// [GET] /blog/getPaginationBlog
async function getPaginationBlog(req, res, next) {
    try {
        let perPage = req.query.perpage || 12; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.query.page || 1;
        countBlog = await Blog.countDocuments({ deleted: false })

        // listBlog = await Blog.find({ deleted: false }).distinct('_id')

        blogs = await Blog
            .find({ deleted: false }) // find tất cả các data
            .sort({ updatedAt: -1 })
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec();

        res.status(200).json(
            {
                status: "Success 200: get blogs successful",
                blogs, // blog trên một page
                current: page, // page hiện tại
                totalPages: Math.ceil(countBlog / perPage), // tổng số các page
                totalBlogs: countBlog,
                // listSelected: listBlog
            }
        )

    } catch (err) {
        next(err)
    }
}

// [GET] /blog/getPaginationShortBlog
async function getPaginationShortBlog(req, res, next) {
    try {
        let perPage = req.query.perpage || 12; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.query.page || 1;
        countBlog = await Blog.countDocuments({ deleted: false })

        blogs = await Blog
            .find({ deleted: false }, 'title brief image createdAt updatedAt') // find tất cả các data
            .sort({ updatedAt: -1 })
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec();

        res.status(200).json(
            {
                status: "Success 200: get blogs successful",
                blogs, // blog trên một page
                current: page, // page hiện tại
                totalPages: Math.ceil(countBlog / perPage), // tổng số các page
                totalBlogs: countBlog,
            }
        )

    } catch (err) {
        next(err)
    }
}


// [GET] /blog/detailBlog:id
async function getDetailBlog(req, res, next) {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(400).json(
                {
                    status: "Error 400: Blog not exists",
                    // blog
                }
            )
        }

        return res.status(200).json(
            {
                status: "Success 200: get blogs successful",
                blog
            }
        )

    } catch (err) {
        next(err)
    }
}

// [GET] /blog/detailBlogSlug:slug
async function getDetailBlogSlug(req, res, next) {
    try {
        const slug = req.params.slug
        const blog = await Blog.findOne({ slug: slug })

        if (!blog) {
            return res.status(400).json(
                {
                    status: "Error 400: Blog not exists",
                    // blog
                }
            )
        }

        return res.status(200).json(
            {
                status: "Success 200: get blogs successful",
                blog
            }
        )

    } catch (err) {
        next(err)
    }
}

// [PUT] /blog/updateBlog/:id
async function updateBlog(req, res, next) {
    try {
        let id = req.params.id;
        const { title, brief, content, image, description } = req.body
        const slug = slugify(title)

        // await User.updateOne({ _id: id }, { $set: { password: bodyRequest.password } });
        await Blog.findByIdAndUpdate(id, {
            title,
            slug,
            image,
            brief,
            description,
            content
        })
        res.status(200).json(
            {
                status: "Success 200: update blogs successful",
            }
        )
    } catch (err) {
        next(err)
    }
}

// [DELETE] /blog/deleteblog/:id
async function deleteBlog(req, res, next) {
    try {
        let id = req.params.id;

        // await User.updateOne({ _id: id }, { $set: { password: bodyRequest.password } });
        await Blog.findByIdAndUpdate(id, {
            deleted: true
        })

        res.status(200).json(
            {
                status: "Success 200: delete blogs successful",
            }
        )

    } catch (err) {
        next(err)
    }
}


// // [POST] /blog/recommend
// async function postRecommentBlog(req, res, next) {
//     try {
//         const listIdBlog = req.body.listSelected;

//         await Blog.updateMany({}, { isRecommend: false })

//         await Blog.updateMany({ _id: { $in: listIdBlog } },
//             { $set: { isRecommend: true } },
//             { multi: true })

//         res.status(200).json({
//             status: "Success 200: change blog successful",
//         });
//     } catch (err) {
//         next(err)
//     }
// }


module.exports = { getAllBlogs, postNewBlog, deleteBlog, updateBlog, getDetailBlog, getPaginationShortBlog, getPaginationBlog, getDetailBlogSlug };