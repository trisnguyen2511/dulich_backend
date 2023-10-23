const express = require("express")
const router = express.Router()
const { validateCreateBlog, validateGetPaginationBlog, validateUpdateBlog, validateDeleteBlog, validateGetDetailBlog } = require("../app/middlewares/blogMiddleware")
const { authToken } = require("../app/middlewares/authMiddleware")
const { getAllBlogs, postNewBlog, getPaginationBlog, updateBlog, deleteBlog, getDetailBlog, getDetailBlogSlug, getPaginationShortBlog } = require("../app/controllers/blogController")


router.post("/newblog", authToken, validateCreateBlog, postNewBlog)

router.get("/getPaginationBlog", validateGetPaginationBlog, getPaginationBlog)

router.get("/getPaginationShortBlog", validateGetPaginationBlog, getPaginationShortBlog)

router.get("/detailBlog/:id", validateGetDetailBlog, getDetailBlog)

router.get("/detailBlogSlug/:slug", getDetailBlogSlug)

router.put("/updateBlog/:id", authToken, validateUpdateBlog, updateBlog)

router.delete("/deleteblog/:id", authToken, validateDeleteBlog, deleteBlog)

// router.post("/postRecommentBlog", authToken, validatePostRecommentBlog, postRecommentBlog)

router.get("/", getAllBlogs)


module.exports = router
