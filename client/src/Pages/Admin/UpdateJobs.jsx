// @Author: Vishwanath Suresh
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/system';
import { Box, TextField, Button } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const JobsContainer = styled('div')({
    flex: '8',
    width: '100%',
    display: 'grid',
    gap: '1em',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
});

const TheList = styled('div')({
    width: '100%',
    flex: '4'
});

const ItemTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const UpdateJobs = () => {

    const navigate = useNavigate();
    let { jobId } = useParams();
    const [activeJob, setActiveJob] = useState({})
    const [formValues, setFormValues] = useState({});

    // Fetches existing job data to preload the update form
    useEffect(() => {
        axios.get(`/careers/${jobId}`)
            .then(response => {
                setActiveJob(response.data.job)
                setFormValues(response.data.job)
            }).catch(err => {
                setActiveJob({})
                toast.error(err?.response?.data?.message || "Something went wrong")
            })
    }, [jobId])

    // Handles update form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    // Handles update form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`/careers/updateJob/${jobId}`, formValues).then((res) => {
            if(res.data.success) {
              toast("Job Posting Updated!")
              navigate("/admin/careers")
            } else {
              toast.error(res?.data?.message || "Cannot Update Job Posting")
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Cannot Update Job Posting")
          });
    };

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>Update a Job Posting</h1>
                </ItemTitleContainer>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'left' }}>
                        <TextField
                            required
                            label="Job Title"
                            id="title"
                            type="text"
                            sx={{ m: 1 }}
                            defaultValue={activeJob.title}
                            value={formValues.title}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            label="Job Description"
                            id="description"
                            type="text"
                            sx={{ m: 1 }}
                            defaultValue={activeJob.description}
                            value={formValues.description}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            multiline
                            label="Job Details"
                            id="details"
                            type="text"
                            sx={{ m: 1 }}
                            rows={6}
                            defaultValue={activeJob.details}
                            value={formValues.details}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}> 
                            <TextField
                                required
                                label="Job Type"
                                id="job_type"
                                type="text"
                                placeholder="Part-time/Full-time"
                                sx={{ m: 1 }}
                                defaultValue={activeJob.job_type}
                                value={formValues.job_type}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required
                                label="Salary"
                                id="salary"
                                type="number"
                                placeholder="Per hour in $"
                                sx={{ m: 1 }}
                                defaultValue={activeJob.salary}
                                value={formValues.salary}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required
                                label="Vacancies"
                                id="vacancies"
                                type="number"
                                sx={{ m: 1 }}
                                defaultValue={activeJob.vacancies}
                                value={formValues.vacancies}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '25ch' }} type="submit"> Update Posting </Button>
                    </Box>
                </form>
            </TheList>
        </JobsContainer>
    )
}

export default UpdateJobs;