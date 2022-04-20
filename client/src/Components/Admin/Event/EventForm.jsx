// @Author: Vishnu Sumanth
import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import axios from "../../../Assets/config/axiosConfig";
import Alert from "react-popup-alert";
import { uploadFile } from "react-s3";
import Dropzone from "react-dropzone-uploader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-dropzone-uploader/dist/styles.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Input = styled("input")({
  display: "none",
});
function EventForm() {
  const navigate = useNavigate();
  const [lbl, setLbl] = useState({
    ht1: "",
    ht2: "",
    ht3: "",
    ht4: "",
    ht5: "",
    error1: false,
    error2: false,
    error3: false,
    error4: false,
    error5: false,
    error6: false,
  });
  function onClose() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  const imageRef = useRef();
  const [formData, updateForm] = useState({
    eventName: "",
    EventDes: "",
    date1: new Date(),
    date2: new Date(),
    sp: "",
    gp: "",
    pp: "",
    ss: 0,
    gs: 0,
    ps: 0,
    image: "",
    select: "Movies",
    mxs: 1,
  });
  const [file, updateFile] = useState("");
  function updateSelect(event) {
    updateForm({ ...formData, select: event.target.value });
  }
  const [alert, setAlert] = React.useState({
    type: "error",
    text: "This is a alert message",
    show: false,
  });
  function updateEventName(event) {
    if (event.target.value === "") {
      setLbl({ ...lbl, ht1: "field should not be empty", error1: true });
    } else {
      setLbl({ ...lbl, ht1: " ", error1: false });
    }
    updateForm({
      ...formData,
      eventName: event.target.value,
      image:
        "https://webproject5709.s3.amazonaws.com/eventimages/" +
        event.target.value +
        ".jpg",
    });
  }
  function updateTextArea(event) {
    if (event.target.value === "") {
      setLbl({ ...lbl, ht2: "field should not be empty", error2: true });
    } else {
      setLbl({ ...lbl, ht2: " ", error2: false });
    }
    updateForm({ ...formData, EventDes: event.target.value });
  }
  function updatDate1(event) {
    updateForm({ ...formData, date1: event });
  }
  function updatDate2(event) {
    if (event < formData.date1) {
      setLbl({ ...lbl, error6: true });

      console.log("wrong");
      toast.error("Event start date cannot be before booking date");
      //   setAlert({
      //     type: "error",
      //     text: "Event start date cannot be before booking date",
      //     show: true,
      //   });
    } else {
      setLbl({ ...lbl, error6: false });

      onClose();
    }
    updateForm({ ...formData, date2: event });
  }
  function updateSp(event) {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "") {
      setLbl({ ...lbl, ht3: "field cannot be empty", error3: true });
    } else {
      setLbl({ ...lbl, ht3: " ", error3: false });
    }
    if (!regex.test(event.target.value)) {
      setLbl({ ...lbl, ht3: "Price should be numeric", error3: true });
    } else {
      setLbl({ ...lbl, ht3: " ", error3: false });
    }

    updateForm({ ...formData, sp: event.target.value });
  }
  function updateGp(event) {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "") {
      setLbl({ ...lbl, ht4: "field cannot be empty", error4: true });
    } else {
      setLbl({ ...lbl, ht4: " ", error4: false });
    }
    if (!regex.test(event.target.value)) {
      setLbl({ ...lbl, ht4: "Price should be numeric", error4: true });
    } else {
      setLbl({ ...lbl, ht4: " ", error4: false });
    }

    updateForm({ ...formData, gp: event.target.value });
  }
  function updatePp(event) {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === "") {
      setLbl({ ...lbl, ht5: "field cannot be empty", error5: true });
    } else {
      setLbl({ ...lbl, ht5: " ", error5: false });
    }
    if (!regex.test(event.target.value)) {
      setLbl({ ...lbl, ht5: "Price should be numeric", error5: true });
    } else {
      setLbl({ ...lbl, ht5: " ", error5: false });
    }

    updateForm({ ...formData, pp: event.target.value });
  }
  function updateSs(event) {
    if (event.target.value < 0) {
      updateForm({ ...formData, ss: 0 });
    } else {
      updateForm({ ...formData, ss: event.target.value });
    }
  }
  function updateGs(event) {
    if (event.target.value < 0) {
      updateForm({ ...formData, gs: 0 });
    } else {
      updateForm({ ...formData, gs: event.target.value });
    }
  }
  function updatePs(event) {
    if (event.target.value < 0) {
      updateForm({ ...formData, ps: 0 });
    } else {
      updateForm({ ...formData, ps: event.target.value });
    }
  }
  function updateMxs(event) {
    if (event.target.value < 1) {
      updateForm({ ...formData, mxs: 1 });
      toast.error("Atleast one seat should be allowed");
    } else {
      updateForm({ ...formData, mxs: event.target.value });
    }
  }
  async function updateImage(event) {
    event.preventDefault();

    // updateForm({ ...formData, image: event.target.files[0] });

    updateFile(event.target.files[0]);

    const images = new FormData();
    console.log("lol", file);
    console.log(formData.eventName);
    images.append("file", event.target.files[0]);
    images.append("eventName", formData.eventName);
    console.log(images);
    try {
      const i = await axios.post("events/image", images, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      toast.error("image upload failed");
    }

    // var bucket = {
    //   bucketName: "webproject5709",
    //   key: formData.eventName + ".jpg",
    //   region: process.env.REGION,
    //   accessKeyId: process.env.ACCESS_KEY,
    //   secretAccessKey: process.env.SECRET_KEY,
    // };
  }
  function sendForm(event) {
    console.log("lol");
    // var bucket = {
    //   bucket: "webproject5709",
    //   key: formData.eventName + ".jpg",
    //   location: process.env.REGION,
    //   accessKeyId: process.env.ACCESS_KEY,
    //   secretAccessKey: process.env.SECRET_KEY,
    // };
    // updateForm({ ...formData, image: event.target.value });
    // // var bucket = {
    // //   Bucket: "webproject5709",
    // //   Key: formData.eventName + ".jpg",
    // //   Body: imageRef.current.files[0],
    // // };
    // console.log(imageRef.current.files[0]);
    // uploadFile(imageRef.current.files[0], bucket)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // var fd = new FormData();
    // fd.append("image", imageRef.current.files[0], formData.eventName);
    // updateForm({ ...formData, image: imageRef.current.files[0] });
    console.log(lbl);
    if (
      lbl.error1 ||
      lbl.error2 ||
      lbl.error3 ||
      lbl.error4 ||
      lbl.error5 ||
      lbl.error6
    ) {
      setAlert({
        type: "error",
        text: "Form incomplete",
        show: true,
      });
      toast.error("form incompelete");

      console.log("working");
    } else {
      console.log(formData);
      axios
        .post("/events/add-event", formData)
        .then(function (response) {
          console.log(response);
          updateForm({
            eventName: "",
            EventDes: "",
            date1: new Date(),
            date2: new Date(),
            sp: "",
            gp: "",
            pp: "",
            ss: 0,
            gs: 0,
            ps: 0,
            image: "",
            select: "",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      setAlert({
        type: "success",
        text: "event added",
        show: true,
      });
      toast.success("Event Added");
      navigate("/admin/dashboard/events");
    }

    event.preventDefault();
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <div style={{ flex: "8" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            style={{ maxWidth: "700px", margin: "0px auto" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              <TextField
                onChange={updateEventName}
                error={lbl.error1}
                required
                id="outlined-required"
                label="Event name"
                defaultValue={formData.eventName}
                helperText={lbl.ht1}
                fullWidth
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Event Description"
                multiline
                required
                rows={4}
                value={formData.EventDes}
                helperText={lbl.ht2}
                error={lbl.error2}
                onChange={updateTextArea}
                fullWidth
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ ml: 2 }}
              >
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="dsl">Category</InputLabel>
                  <Select
                    labelId="lId"
                    id="dss"
                    value={formData.select}
                    label="Category"
                    onChange={updateSelect}
                  >
                    <MenuItem value={"Movies"}>Movies</MenuItem>
                    <MenuItem value={"Conference"}>Conference</MenuItem>
                    <MenuItem value={"Drama"}>Drama</MenuItem>
                    <MenuItem value={"Concert"}>Concert</MenuItem>
                    <MenuItem value={"Game"}>Game</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <DesktopDatePicker
                    label="Booking allowed date"
                    inputFormat="MM/dd/yyyy"
                    value={formData.date1}
                    onChange={updatDate1}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 200 }}>
                  <DesktopDatePicker
                    label="Event start date"
                    inputFormat="MM/dd/yyyy"
                    value={formData.date2}
                    onChange={updatDate2}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              </Stack>
            </LocalizationProvider>

            <div>
              <TextField
                error={lbl.error3}
                id="SP"
                label="Silver price"
                color="secondary"
                defaultValue={formData.sp}
                onChange={updateSp}
                variant="standard"
                helperText={lbl.ht3}
              />
              <TextField
                error={lbl.error4}
                id="GP"
                label="Gold price"
                color="warning"
                defaultValue={formData.gp}
                onChange={updateGp}
                variant="standard"
                helperText={lbl.ht4}
              />
              <TextField
                error={lbl.error5}
                id="PP"
                label="Platinum price"
                color="success"
                defaultValue={formData.pp}
                onChange={updatePp}
                variant="standard"
                helperText={lbl.ht5}
              />
            </div>
            <div>
              <TextField
                id="SSM"
                label="SilverSeats"
                type="number"
                color="secondary"
                value={formData.ss}
                onChange={updateSs}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="GSM"
                label="Gold Seats"
                type="number"
                value={formData.gs}
                onChange={updateGs}
                color="warning"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="PSM"
                label="Platunum Seats"
                type="number"
                value={formData.ps}
                onChange={updatePs}
                color="success"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="AS"
                label="Allowed Seats"
                type="number"
                value={formData.mxs}
                onChange={updateMxs}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{ alignItems: "center", marginTop: "20px" }}>
              <Stack direction="row" spacing={2}>
                <label>upload event image:</label>
                <br />
                <label htmlFor="contained-button-file">
                  <Input
                    onChange={updateImage}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
                <Button onClick={sendForm} variant="contained">
                  Add Eevent
                </Button>
              </Stack>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
