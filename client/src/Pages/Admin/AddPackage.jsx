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
import { useState } from "react";

const PackageContainer = styled("div")({
  flex: "8",
  width: "100%",
  display: "grid",
  gap: "1em",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
});
const PackageBox = styled("div")({
  width: "100%",
  flex: "4",
});
const AddPackage = () => {
  const navigate = useNavigate();

  const packageDefaultValues = {
    name: "",
    price: "",
    type: "",
    isActive: 0,
  };

  const [packageValues, setPackageFormValues] = useState(packageDefaultValues);

  //This function is used to handle the changes in form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPackageFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // This function is used to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/packages/new", packageValues)
      .then((res) => {
        if (res.data.success) {
          toast("Package has been added!");
          navigate("/admin/packages");
        } else {
          toast.error(res?.data?.message || "Cannot add package");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Cannot add package");
      });
  };

  return (
    <PackageContainer>
      <PackageBox>
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
                    New Package
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
                          label="Name"
                          name="name"
                          type="text"
                          sx={{ mb: 3 }}
                          value={packageValues.name}
                          onChange={handleInputChange}
                        />
                        <TextField
                          fullWidth
                          required
                          label="Price"
                          name="price"
                          type="text"
                          sx={{ mb: 3 }}
                          value={packageValues.price}
                          onChange={handleInputChange}
                        />
                        <TextField
                          fullWidth
                          required
                          label="Type"
                          name="type"
                          type="text"
                          sx={{ mb: 3 }}
                          value={packageValues.type}
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
      </PackageBox>
    </PackageContainer>
  );
};
export default AddPackage;
