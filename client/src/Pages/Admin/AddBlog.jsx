// @Author: Kunj Vijaykumar Patel
import {
  Box,
  TextField,
  Button,
  Grid,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { StateContext } from "../../State";

const BlogsContainer = styled("div")({
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
const AddBlog = () => {
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

  //This function is used to handle the changes in form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // This function is used to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/blogs/new/${siteAuth?.userDetails?.userId}`, blogValues)
      .then((res) => {
        if (res.data.success) {
          toast("BlogSubmitted!");
          navigate("/admin/blogs");
        } else {
          toast.error(res?.data?.message || "Cannot submit Blog");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Cannot submit Blog");
      });
  };

  return (
    <BlogsContainer>
      <TheBox>
        <Box>
          <Grid>
            <Grid item xs>
              <Card sx={{ width: "100%", boxShadow: 3, mx: "auto" }}>
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
      </TheBox>
    </BlogsContainer>
  );
};
export default AddBlog;
