// @Author: Anamika Ahmed
import { useContext, useState } from "react"
import { styled } from '@mui/system';
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";
import { toast } from "react-toastify"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../../State"
// import Axios from "axios"

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

const Login = () => {

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { modifySiteAuth } = useContext(StateContext);

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
    
        axios.post("/users/login", formValues).then((res) => {
            if(res.data.success === 1) {
                axios.get(`/users/details/${res.data.user.user_id}`).then(detailData => {
                    if(detailData.data?.success) {
                        modifySiteAuth("userDetails", detailData.data.userDetails)
                        modifySiteAuth("isLoggedIn", true)
                        modifySiteAuth("token", res.data.token)
                        axios.defaults.headers.common["Authorization"] = res.data.token
                        toast.success("Logged in Successfully!")
                        navigate(params.getAll("redirect")[0] || "/")
                    } else {
                        toast.error("Please try again later.")
                    }
                })
            } else {
              toast.error(res?.data?.message || "Please enter your credentials correctly")
            }
          })
          .catch((err) => {
            toast.error("Invalid Credentials. Please enter email and password correctly.")
          });
    };

    const defaultValues = {
        user_email: "",
        user_password: ""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>User Sign-in Form</h1>
                </ItemTitleContainer>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 4, alignItems: 'right' }}>
                        <TextField
                            required
                            label="Enter your email address"
                            id="user_email"
                            type="email"
                            sx={{ m: 1 }}
                            value={formValues.user_email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Enter your password"
                            id="user_password"
                            type="password"
                            sx={{ m: 1 }}
                            value={formValues.user_password}
                            onChange={handleInputChange}
                        />                    
                        <Box m={1}>
                            Not a member ? {" "}
                            <Typography sx={{ textDecoration: "underline", color: "blue" }} component="span">
                                <Link to="/user/register">Join us.</Link>
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '25ch' }} type="submit"> Login </Button>
                    </Box>
                </form>
            </TheList>
        </JobsContainer>
    )
}

export default Login;