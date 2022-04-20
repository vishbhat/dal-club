// @Author: Kunj Vijaykumar Patel
import { useState, useContext } from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  CardContent,
  Card,
  Typography,
} from "@mui/material";

import PageBanner from "../../Components/Users/PageBanner";
import axios from "../../Assets/config/axiosConfig";
import BlogBanner from "../../Assets/images/BlogBanner.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../State"


const NewBlog = () => {
  const navigate = useNavigate();

  const { siteAuth } = useContext(StateContext);

  const blogDefaultValues = {
    userId: 1,
    title: "",
    description: "",
    content: "",
    isVisible: 0,
  };

  const [blogValues, setFormValues] = useState(blogDefaultValues);
//This function is used to handle the changes in form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//This function used to submit the form. It calls the post API.
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/blogs/new/${siteAuth?.userDetails?.userId}`, blogValues)
      .then((res) => {
        if (res.data.success) {
          toast("BlogSubmitted!");
          navigate("/blogs");
        } else {
          toast.error(res?.data?.message || "Cannot submit Blog");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Cannot submit Blog");
      });
  };

  return (
    <div>
      <PageBanner title="Blogs" bannerImage={BlogBanner} />
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Grid container>
          <Grid item xs>
            <Card sx={{ width: "75%", boxShadow: 3, mx: "auto" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 2,
                    alignItems: "center",
                  }}
                >
                  New Blog
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      m: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ alignItems: "center" }}>
                      <TextField
                        fullWidth
                        required
                        label="Title"
                        name="title"
                        type="text"
                        sx={{ mb: 3 }}
                        value={blogValues.title}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        required
                        label="Description"
                        name="description"
                        type="text"
                        multiline
                        rows={4}
                        rowsmax={6}
                        sx={{ mb: 3 }}
                        value={blogValues.description}
                        onChange={handleInputChange}
                      />

                      <TextField
                        fullWidth
                        required
                        label="Content"
                        name="content"
                        type="text"
                        multiline
                        rows={7}
                        rowsmax={10}
                        sx={{ mb: 3 }}
                        value={blogValues.content}
                        onChange={handleInputChange}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ m: 1, width: "25ch" }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default NewBlog;
