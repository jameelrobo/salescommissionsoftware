import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
 
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import  './login.css';
import SideBar from "../barco";
import CommissionReports from "../pages/CommissionReports";
 
 

function LoginPage() {

   

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "24px 0" };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   
   

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here (e.g. check against hardcoded credentials)
   
    localStorage.setItem("userid", "0");
    if (username === "barcosales" && password === "barcosales@123@") {
      setIsLoggedIn(true);
      localStorage.setItem("userid", "1");
    }
      else{
     
     alert("Invalid User Id and Password");
    
   setError("Invalid User Id and Password");

  }
  };

  if (isLoggedIn) {
    return <Navigate to="/commissionReports"   />;
    
  }

   
   

  return (
    <div className="logincss">
  
    <form onSubmit={handleSubmit} 
          
     className="formcss">  
     <ToastContainer />
    {/* <ToastContainer
          position="top-center"
          autoClose={5000}
          style={{width: "40%"}} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
      <Grid>
        <Paper elevation={10} style={paperStyle}>
       
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
        
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    // label="Remember me"
                 /> */}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          {/* <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography> */}
          {/* <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography> */}
        </Paper>
      </Grid>
      </form>
    </div>

    // <div className='logincss'>
    //   <form onSubmit={handleSubmit} className="formcss">
    //     <label>
    //       Username:
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={event => setUsername(event.target.value)}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Password:
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={event => setPassword(event.target.value)}
    //       />
    //     </label>
    //     <br />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
}

export default LoginPage;
