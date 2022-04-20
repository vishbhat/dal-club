// @Author: Vishwanath Suresh
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/system'
import axios from "../../Assets/config/axiosConfig";
import PageBanner from "../../Components/Users/PageBanner";
import CareersBanner from "../../Assets/images/careers-banner.jpeg";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { DropzoneArea } from 'material-ui-dropzone';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

const FormTab = styled('div')(({ theme }) => ({
    margin: "10px",
    padding: theme.spacing(1),
    boxShadow: "0 0 10px -1px",
    borderRadius: "10px",
    border: "1px solid lightgray",
    color: theme.palette.secondary.main
}))

const JobApplication = () => {
    const navigate = useNavigate();
    let { jobId } = useParams();
    const [activeJob, setActiveJob] = useState({})

    // Fetches user selected job details
    useEffect(() => {
        axios.get(`/careers/${jobId}`)
            .then(response => {
                setActiveJob(response.data.job)
            }).catch(err => {
                setActiveJob({})
                toast.error(err?.response?.data?.message || "Something went wrong")
            })
    }, [jobId])

    const defaultValues = {
        firstName: "",
        lastName: "",
        dob: "",
        phNumber: "",
        email: "",
        address: ""
    };

    const [formValues, setFormValues] = useState(defaultValues);
    const [resume, setResume] = useState(null);

    // Handles job application form inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === 'firstName' || id === 'lastName') {
            const onlyText = /^[A-Za-z ]+$/;
            if (value === "" || onlyText.test(value)) {
                setFormValues(prevState => ({
                    ...prevState,
                    [id]: value
                }))
            }
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [id]: value
            }))
        }
    };

    // Handles job application submission
    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        Object.keys(formValues).map(function (keyName, keyIndex) {
            return (formData.append(keyName, formValues[keyName]))
        })
        formData.append('jobId', jobId);

        if (!resume || resume.length === 0) {
            toast.error("Upload the resume!")
        } else {
            formData.append('resume', resume);
            // Multipart data sent to handle file
            axios.post("/careers/applyJob", formData, {
                headers: { 'content-type': 'multipart/form-data' }
            }).then((res) => {
                if (res.data.success) {
                    toast("Application Submitted!")
                    navigate("/careers")
                } else {
                    toast.error(res?.data?.message || "Cannot submit Application")
                }
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || "Cannot submit Application")
                });
        }
    };

    return (
        <div>
            <PageBanner title="Careers" bannerImage={CareersBanner} />
            <Box sx={{ flexGrow: 1, m: 1 }}>
                <Grid container>
                    <Grid item xs>
                        <FormTab style={{ height: '93.5%' }}>
                            {(() => {
                                if (activeJob) {
                                    return (
                                        <>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Grid item xs container>
                                                        <Grid item xs>
                                                            <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold', mb: 2 }} >{activeJob.title}</Box>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography variant="body2" color="text.secondary" align="right">
                                                                Posted on {activeJob.created_at && activeJob.created_at.split("T")[0]}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Typography variant="body2">
                                                        ${activeJob.salary} an hour
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {activeJob.job_type}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" align="justify">
                                                        {activeJob.details}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                }
                            })()}
                        </FormTab>
                    </Grid>
                    <Grid item xs>
                        <FormTab>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'center' }}>
                                    <Box sx={{ alignItems: 'center' }}>
                                        <TextField
                                            required
                                            label="First Name"
                                            id="firstName"
                                            type="text"
                                            sx={{ m: 1, width: '30ch' }}
                                            value={formValues.firstName}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            required
                                            label="Last Name"
                                            id="lastName"
                                            type="text"
                                            sx={{ m: 1, width: '30ch' }}
                                            value={formValues.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            required
                                            label="Date of Birth"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id="dob"
                                            type="date"
                                            sx={{ m: 1, width: '30ch' }}
                                            value={formValues.dob}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            required
                                            label="Phone Number"
                                            id="phNumber"
                                            type="number"
                                            sx={{ m: 1, width: '30ch' }}
                                            value={formValues.phNumber}
                                            onChange={handleInputChange}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            required
                                            label="Email"
                                            id="email"
                                            type="email"
                                            sx={{ m: 1, width: '30ch' }}
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            required
                                            label="Address"
                                            id="address"
                                            type="text"
                                            sx={{ m: 1, width: '30ch' }}
                                            value={formValues.address}
                                            onChange={handleInputChange}
                                        />
                                    </Box>
                                    <Box sx={{ m: 1, width: '62ch' }}>
                                        <DropzoneArea
                                            acceptedFiles={['application/pdf']}
                                            filesLimit={1}
                                            dropzoneText={"Drag and drop the resume here or click"}
                                            onChange={(files) => setResume(files[0])}
                                            useChipsForPreview={true}
                                        />
                                    </Box>
                                    <Button variant="contained" sx={{ m: 1, width: '25ch' }} type="submit"> Submit Application </Button>
                                </Box>
                            </form>
                        </FormTab></Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default JobApplication;