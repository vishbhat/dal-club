// @Author: Kunj Vijaykumar Patel
const express = require("express");
const {
  getBlogList,
  getBlog,
  postBlog,
  deleteBlog,
  updateBlog
} = require("../controllers/blogs.controller");

const BlogsRouter = express.Router();

BlogsRouter.get("/", getBlogList);
BlogsRouter.get("/:blogId", getBlog);
BlogsRouter.post("/new/:userId", postBlog);
BlogsRouter.delete("/delete/:blogId", deleteBlog);
BlogsRouter.post("/update/:blogId", updateBlog);

module.exports = BlogsRouter;
