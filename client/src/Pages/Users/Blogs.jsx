// @Author: Kunj Vijaykumar Patel
import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import PageBanner from "../../Components/Users/PageBanner";
import axios from "../../Assets/config/axiosConfig";
import BlogBanner from "../../Assets/images/BlogBanner.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  
  //Get blog API is called to show the blogs when the page is rendered
  useEffect(() => {
    axios
      .get("/blogs")
      .then((response) => {
        setBlogs(response.data.success ? response.data.blogs : []);
      })
      .catch((err) => {
        setBlogs([]);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  }, []);

  //This function is used to navigate the user to new page when new button is clicked
  const handleNew = () => {
    navigate(`/blogs/new`);
  };

  //This function is used to show the selected blog
  const handleClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div>
      <PageBanner title="Blogs" bannerImage={BlogBanner} />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Button variant="contained" onClick={() => handleNew()}>
            New
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4} mb={3}>
          {blogs
            ? blogs.length > 0
              ? blogs
                  .filter((x) => x.isVisible)
                  .map((blog) => {
                    return (
                      <Card
                        key={blog.blog_id}
                        sx={{ mb: 3 }}
                        onClick={() => handleClick(blog.blog_id)}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {blog.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {blog.description}
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                p: 1,
                                m: 1,
                                bgcolor: "background.paper",
                                borderRadius: 1,
                              }}
                            >
                              <Avatar src="" />
                              <Box ml={2}>
                                <Typography variant="subtitle2" component="p">
                                  Guy Clemons
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {blog.createdAt}
                                </Typography>
                              </Box>
                            </Box>
                          </CardActions>
                        </CardActionArea>
                      </Card>
                    );
                  })
              : "No results found."
            : "Fetching blogs."}
        </Grid>
      </Box>
    </div>
  );
};

export default Blogs;
