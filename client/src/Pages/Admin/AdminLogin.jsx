// @Author: Anamika Ahmed
import { useContext, useState } from "react"
import { styled } from '@mui/system';
import { Box, TextField, Button } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify"
import {useNavigate } from "react-router-dom";
import { StateContext } from "../../State";

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

const AdminLogin = () => {

    const navigate = useNavigate();
    const { modifySiteAuth } = useContext(StateContext)

  
    // Handles add login form input changes
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
        console.log("The form values are",formValues);
    
        axios.post("/admin/login", formValues).then((res) => {
            console.log("The result is ",res.data.success);
            if(res.data.success==1) {
              toast.success("Logged in Successfully!")
              modifySiteAuth("isLoggedIn", true)
              modifySiteAuth("isAdmin", true)
              modifySiteAuth("token", res.data.token)
              axios.defaults.headers.common["Authorization"] = res.data.token
              navigate("/admin/dashboard")
            } else {
              toast.error(res?.data?.message || "Please enter your admin credentials correctly")
            }
          })
          .catch((err) => {
            toast.error("Invalid Admin Credentials. Please enter email and password correctly.")
          });
    };

    const defaultValues = {
        admin_email: "",
        admin_password: ""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>Admin Sign-in Form</h1>
                </ItemTitleContainer>

                <form onSubmit={handleSubmit}

                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'left' }}>
                        <TextField
                            required
                            label="Enter your email address"
                            id="admin_email"
                            type="email"
                            sx={{ m: 1 }}
                            value={formValues.admin_email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Enter your password"
                            id="admin_password"
                            type="password"
                            sx={{ m: 1 }}
                            value={formValues.admin_password}
                            onChange={handleInputChange}
                        />                    
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}> 
                               
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '25ch' }} type="submit"> Login </Button>
                    </Box>
                </form>
            </TheList>
        </JobsContainer>
    )
}

export default AdminLogin;