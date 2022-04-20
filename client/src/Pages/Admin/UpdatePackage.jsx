// @Author: Kunj Vijaykumar Patel
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";

import { Box, TextField, Button, Switch, Typography } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PackageContainer = styled("div")({
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

const UpdatePackage = () => {
  const navigate = useNavigate();
  let { packageId } = useParams();
  const [currentPackage, setCurrentPackage] = useState({});
  const [packageValues, setPackageValues] = useState({});

  //Get API is called to get the details of selected package
  useEffect(() => {
    axios
      .get(`/packages/${packageId}`)
      .then((response) => {
        setCurrentPackage(response.data.subscriptionPackage);
        setPackageValues(response.data.subscriptionPackage);
      })
      .catch((err) => {
        setCurrentPackage({});
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  }, [packageId]);
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (event.target.name == "isActive") value = event.target.checked;
    setPackageValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //This fucntion is used to handle the form submission. It calls the post API to submit the form.
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/packages/update/${packageId}`, packageValues)
      .then((res) => {
        if (res.data.success) {
          toast("Package Updated!");
          navigate("/admin/packages");
        } else {
          toast.error(res?.data?.message || "Cannot Update Package");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Cannot Update Package");
      });
  };

  return (
    <PackageContainer>
      <TheBox>
        <ContentTitle>
          <h1>Update Package</h1>
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
              label="Name"
              name="name"
              type="text"
              sx={{ mb: 3 }}
              defaultValue={currentPackage.name}
              value={packageValues.name}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              required
              label="Price"
              name="price"
              type="text"
              sx={{ mb: 3 }}
              defaultValue={currentPackage.price}
              value={packageValues.price}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              required
              label="Type {silver, gold, platinum}"
              name="type"
              type="text"
              sx={{ mb: 3 }}
              defaultValue={currentPackage.type}
              value={packageValues.type}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant="subtitle2" component="p">
              Visible
            </Typography>
            <Switch
              name="isActive"
              checked={packageValues.isActive ? packageValues.isActive : false}
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
    </PackageContainer>
  );
};

export default UpdatePackage;
