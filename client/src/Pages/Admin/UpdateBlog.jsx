// @Author: Kunj Vijaykumar Patel
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";

import { Box, TextField, Button, Switch, Typography } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BlogContainer = styled("div")({
  flex: "8",
  width: "100%",
  display: "grid",
  gap: "1em",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
});

const TheBox = styled("div")({
  width: "100%",
  flex: "4",
});

const ContentTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const UpdateBlog = () => {
  const navigate = useNavigate();
  let { blogId } = useParams();
  const [activeBlog, setActiveBlog] = useState({});
  const [blogValues, setBlogValues] = useState({});

  //Get API is called to get the details of selected blog
  useEffect(() => {
    axios
      .get(`/blogs/${blogId}`)
      .then((response) => {
        setActiveBlog(response.data.blog);
        setBlogValues(response.data.blog);
      })
      .catch((err) => {
        setActiveBlog({});
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  }, [blogId]);
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (event.target.name == "isVisible") value = event.target.checked;
    console.log(1000, value);
    setBlogValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //This fucntion is used to handle the form submission. It calls the post API to submit the form.
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/blogs/update/${blogId}`, blogValues)
      .then((res) => {
        if (res.data.success) {
          toast("Blog Posting Updated!");
          navigate("/admin/blogs");
        } else {
          toast.error(res?.data?.message || "Cannot Update Blog Posting");
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Cannot Update Blog Posting"
        );
      });
  };

  return (
    <BlogContainer>
      <TheBox>
        <ContentTitle>
          <h1>Update Blog Posting</h1>
        </ContentTitle>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 1,
              p: 2,
              alignItems: "left",
              boxShadow: 3,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              required
              label="Title"
              name="title"
              type="text"
              sx={{ mb: 3 }}
              defaultValue={activeBlog.title}
              value={blogValues.title}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
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
              defaultValue={activeBlog.description}
              value={blogValues.description}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
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
              defaultValue={activeBlog.content}
              value={blogValues.content}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant="subtitle2" component="p">
              Visible
            </Typography>
            <Switch
              name="isVisible"
              checked={blogValues.isVisible ? blogValues.isVisible : false}
              onClick={handleInputChange}
            />

            <Button
              variant="contained"
              sx={{ m: 1, width: "25ch" }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      </TheBox>
    </BlogContainer>
  );
};

export default UpdateBlog;
