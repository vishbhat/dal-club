// @Author: Vishwanath Suresh
import { useState, useEffect } from "react"
import { Grid, Box, Stack, Typography, Button } from "@mui/material";
import PageBanner from "../../Components/Users/PageBanner";
import { styled } from '@mui/system'
import axios from "../../Assets/config/axiosConfig";
import CareersBanner from "../../Assets/images/careers-banner.jpeg";
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom";

const JobTab = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0 0 10px -1px",
    },
    borderRadius: "10px",
    border: "1px solid lightgray",
    textAlign: 'left',
    color: theme.palette.secondary.main
}))

const ActiveJobTab = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius: "10px",
    border: "1px solid lightgray",
    boxShadow: "0 0 5px -1px",
    textAlign: 'left',
    color: theme.palette.secondary.main
}))

const Careers = () => {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [activeJob, setActiveJob] = useState({})

    // Fetches all available jobs
    useEffect(() => {
        axios.get("/careers")
            .then(response => {
                setJobs(response.data.success ? response.data.jobs : [])
                setActiveJob([...response.data.jobs][0])
            }).catch((err) => {
                setJobs([])
                toast.error(err?.response?.data?.message || "Something went wrong")
            })
    }, [])

    // Sets the user clicked job to active
    const handleClick = job => {
        setActiveJob(job);
    };

    // Redirects to Job Application Page
    const handleSubmit = (jobId) => {
        navigate(`/careers/application/${jobId}`)
    }

    return (
        <div>
            <PageBanner title="Careers" bannerImage={CareersBanner} />
            <Box sx={{ flexGrow: 1, m: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Stack spacing={1}>
                            {jobs ? jobs.length > 0 ? jobs.map(job => {
                                return (
                                    <JobTab key={job.job_id}>
                                        <div onClick={() => handleClick(job)} >
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item >
                                                    <Typography fontSize={"1rem"} fontWeight="bold" gutterBottom>
                                                        {job.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography variant="body2">
                                                        ${job.salary} an hour
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {job.job_type}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" align="justify">
                                                        {job.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </JobTab>
                                );
                            }): "No results found." : "Fetching events."}
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <ActiveJobTab style={{height: '97.5%'}}>{(() => {
                            if (activeJob) {
                                return (
                                    <div>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Grid item xs container >
                                                        <Grid item xs>
                                                            <Typography fontSize={"1.2rem"} fontWeight="bold" gutterBottom>
                                                                {activeJob.title}
                                                            </Typography>
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
                                                <Grid item>
                                                <Button variant="contained" onClick={() => handleSubmit(activeJob.job_id)}>Apply Now</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            }
                        })()}</ActiveJobTab>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Careers;