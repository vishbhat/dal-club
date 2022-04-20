// @Author: Kunj Vijaykumar Patel
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
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

const IndivdualBlog = () => {
  let { blogId } = useParams();
  const [blog, setBlog] = useState({});
  //API is called to show the selected blog
  useEffect(() => {
    axios
      .get(`/blogs/${blogId}`)
      .then((response) => {
        setBlog(response.data.success ? response.data.blog : {});
      })
      .catch((err) => {
        setBlog([]);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  }, [blogId]);

  return (
    <div>
      <PageBanner title="Blogs" bannerImage={BlogBanner} />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={3}>
          <Card key={blog.blog_id} sx={{ mb: 3 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {blog.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {blog.content}
                </Typography>
              </CardContent>
            </CardActionArea>
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
                  <Typography variant="subtitle2" component="h4">
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
          </Card>
        </Grid>
      </Box>
    </div>
  );
};

export default IndivdualBlog;
