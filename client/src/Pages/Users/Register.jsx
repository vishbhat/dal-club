// @Author: Anamika Ahmed
import React, { useState } from "react";
import { styled } from '@mui/system';
import { Box, TextField, Typography,Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "../../Assets/config/axiosConfig";

import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom";

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

const Register = () => {

    const navigate = useNavigate();

    const [lists, setEvents] = useState([]);
    const getEvents =() => {
        // fetch("http://Web-dalclub.herokuapp.com/api/events/list_events")
        axios.get("/package/getPackage").then((data)=>{
            setEvents(data.data.package);
            console.log(data.data.package);
        })
          
      }
    React.useEffect(() => {
      
      getEvents();
    }, []);

    // Handles add job form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const handlePackageChange = (e) => {
      setFormValues(prevState => ({
        ...prevState,
        package_id: e.target.value
      }))
    }

    // Handles add job submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("The user password is ",formValues.user_password);
        console.log("The confirm password is ",formValues.confirm_password);
        if(formValues.user_password!=formValues.confirm_password){
          toast.error("Password and Confirm Password Do not Match!");
        }
        else{
       
        axios.post("/users/register", formValues).then((res) => {
            if(res.data.success===1) {
              toast.success("Registered Successfully!")
              navigate("/user/login")
            } else {
              toast.error("Enter the information correctly.")
            }
          })
          .catch((err) => {
            toast.error("Cannot Register.Enter the information correctly")
          });
        }
    };

    const defaultValues = {
        user_name: "",
        user_email: "",
        user_password: "",
        package_id: "",
        confirm_password:""
    }

    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>User Registration Form</h1>
                </ItemTitleContainer>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', m: 1, alignItems: 'left' }}>
                    <TextField
                            required
                            label="Enter your username"
                            id="user_name"
                            type="text"
                            sx={{ m: 1 }}
                            value={formValues.user_name}
                            onChange={handleInputChange}
                        />
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
                            inputProps={{ minLength: 8 }}
                            value={formValues.user_password}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            label="Confirm password"
                            id="confirm_password"
                            type="password"
                            sx={{ m: 1 }}
                            value={formValues.confirm_password}
                            onChange={handleInputChange}
                        />            
            <FormControl size="medium">
                <InputLabel id={`package`} >
                Choose your package
                </InputLabel>
                       <Select
                        labelId="package"
                            required
                            label="Choose your package"
                            placeholder="Choose your package"
                            id="package_id"
                            type="number"
                            margin="1"
                            value={formValues.package_id || null}
                            onChange={handlePackageChange}
                        >
                          {lists.map((list) => (
                            <MenuItem value={list.package_id} key={list.package_id}>
                              {list.name} - {list.price}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>
                        <Box variant="contained" sx={{ m: 1, width: '35ch' }}>
                            Have an Account? {" "}
                            <Typography sx={{ textDecoration: "underline", color: "blue" }} component="span">
                                <Link to="/user/login">Login Here.</Link>
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{ m: 1, width: '35ch' }} type="submit"> Register </Button>

                    </Box>
                   
                </form>
            </TheList>
        </JobsContainer>
    )
}
export default Register;
