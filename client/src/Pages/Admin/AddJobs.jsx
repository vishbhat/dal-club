// @Author: Vishwanath Suresh
import { useState } from "react"
import { styled } from '@mui/system';
import { Box, TextField, Button } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify"
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

const AddJobs = () => {

    const navigate = useNavigate();

    // Handles add job form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    // Handles add job submit
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/careers/addJob", formValues).then((res) => {
            if(res.data.success) {
              toast("Job Posted!")
              navigate("/admin/careers")
            } else {
              toast.error(res?.data?.message || "Cannot Post Job")
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Cannot Post Job")
          });
    };

    const defaultValues = {
        title: "",
        description: "",
        details: "",
        job_type: "",
        salary: "",
        vacancies: ""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>Create a Job Posting</h1>
                </ItemTitleContainer>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'left' }}>
                        <TextField
                            required
                            label="Job Title"
                            id="title"
                            type="text"
                            sx={{ m: 1 }}
                            value={formValues.title}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Job Description"
                            id="description"
                            type="text"
                            sx={{ m: 1 }}
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            multiline
                            label="Job Details"
                            id="details"
                            type="text"
                            sx={{ m: 1 }}
                            rows={6}
                            value={formValues.details}
                            onChange={handleInputChange}
                        />
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}> 
                            <TextField
                                required
                                label="Job Type"
                                id="job_type"
                                type="text"
                                placeholder="Part-time/Full-time"
                                sx={{ m: 1 }}
                                value={formValues.job_type}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                label="Salary"
                                id="salary"
                                type="number"
                                placeholder="Per hour in $"
                                sx={{ m: 1 }}
                                value={formValues.salary}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                label="Vacancies"
                                id="vacancies"
                                type="number"
                                sx={{ m: 1 }}
                                value={formValues.vacancies}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '25ch' }} type="submit"> Add Posting </Button>
                    </Box>
                </form>
            </TheList>
        </JobsContainer>
    )
}

export default AddJobs;