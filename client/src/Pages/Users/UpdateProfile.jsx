// @Author: Anamika Ahmed
import { useState } from "react"
import { styled } from '@mui/system';
import { useParams } from "react-router-dom";
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

const UpdateProfile = () => {

    const navigate = useNavigate();
    let { user_id } = useParams();



    // Handles add job form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post(`/users/profile/update/${user_id}`, formValues)
          .then((res) => {
            if (res.data.success) {
              toast("User Profile Updated!");
            } else {
              toast.error(res?.data?.message || "Cannot Update User Profile");
            }
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message || "Cannot Update User Profile"
            );
          });
      };

    const defaultValues = {
        user_name: "",
        user_email: "",
        user_password: ""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>Update Profile</h1>
                </ItemTitleContainer>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'left' }}>
                    <TextField
                           
                            label="Edit your username"
                            id="user_name"
                            type="text"
                            sx={{ m: 1 }}
                            value={formValues.user_name}
                            onChange={handleInputChange}
                        />
                        <TextField
                           
                            label="Edit your email address"
                            id="user_email"
                            type="user_email"
                            sx={{ m: 1 }}
                            value={formValues.user_email}
                            onChange={handleInputChange}
                        />
                        <TextField
                           
                            label="Edit your password"
                            id="user_password"
                            type="password"
                            sx={{ m: 1 }}
                            value={formValues.user_password}
                            onChange={handleInputChange}
                        />
                
                        <Box sx={{ margin:'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>                
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '35ch' }} type="submit"> Update Profile </Button>
                    </Box>
                   
                </form>
            </TheList>
        </JobsContainer>
    )
}
export default UpdateProfile;