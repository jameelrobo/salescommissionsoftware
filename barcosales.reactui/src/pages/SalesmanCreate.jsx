import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function SalesmanCreate() {

  const successMessageBox = (successMsg) => {
    toast.success(successMsg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const errorMessageBox = (errorMsg) => {
    toast.error(errorMsg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [value, setValue] = useState("");
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const checkChanged = (state) => {
    setChecked(!checked);
   
  };

  const columns = [
    { title: "SalesmanId", field: "SalesmId" },
    { title: "SalesmanCode", field: "salesmanCode" },
    { title: "Salesman", field: "salesmanName" },
    { title: "Designation", field: "designation" },
    { title: "EmailId", field: "emailId" },
    //  { title: "JoiningDate", field: "joiningDate" },
    { title: "Address", field: "address" },
    { title: "City", field: "city" },
    { title: "State", field: "state" },
    { title: "Zip", field: "zip" },
    { title: "Mobile", field: "mobile" },
    { title: "PrincCode", field: "princCode" },
    { title: "IsActive", field: "isActive" },
  ];

  const [salesmanCode, setSalesmanCode] = useState();
  const [salesmanName, setSalesmanName] = useState();
  const [designation, setDesignation] = useState();
  const [emailId, setEmailId] = useState();
  // const [joiningDate, setJoiningDate] = useState(null);
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [mobile, setMobile] = useState();
  const [princCode, setPrincCode] = useState();
  const [commissionRate, setCommissionRate] = useState();
  const [salesmans, setSalesmans] = useState([]);

  const resetbox = () => {
    debugger;
    // setSalesmId("");
    setSalesmanCode("");
    setSalesmanName("");
    setDesignation("");
    setEmailId("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setMobile("");
    setCommissionRate("");
    setChecked(false);
  };

  const handleClick = (event) => {
    event.preventDefault();
    debugger;
    var salesmanInfo = salesmans.find( (item) => 
    item.SalesmanCode === salesmanCode 
    && item.SalesmanName=== salesmanName
    
      // ||
      // item.CustAliasName.trim() === d["Sold-To Name"].trim()
    );

    
    if (
      salesmanInfo === undefined ||
      salesmanInfo === null ||
      salesmanInfo === ""  
    ) {
    
     
    }
    else{
      errorMessageBox(
        "The Salesman is already exist in db, You can't enter duplicate salesman"
      );
      return;
    }
    

    const rows = [];
    // let cDate = Date.now();
    var salesmaninfo = {
      SalesmId: 0,
      SalesmanCode: salesmanCode,
      SalesmanName: salesmanName,
      Designation: designation,
      CommissionRate: commissionRate,
      EmailId: emailId,
      //  JoiningDate: cDate,
      Address: address,
      City: city,
      State: state,
      Zip: zip,
      Mobile: mobile,
      IsActive: checked,
    };

    debugger;
    console.log(salesmaninfo);

    axios
      .post("/SalesPerson/AddSalesPerson", salesmaninfo)
      .then((res) => {
        if (res.status === 200) {
          successMessageBox("Record has been added successfully!");
  
          console.log(res);
          }
          else
          {
            errorMessageBox("Invalid  Information!");
          }
        console.log(res);
        // toast.success("Record has been added successfully!", {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      })
      .catch((err) => {
        console.log(err);
        errorMessageBox("Invalid Salesman Information!");
        // toast.error("Invalid Salesman Information!", {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };

 
  useEffect(() => {
    GetSalesman();
  }, []);

  const GetSalesman = () => {
    debugger;
    axios
      .get("SalesPerson/GetSalesPerson")

      .then((res) => {
        debugger;
        console.log(res);
        setSalesmans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <ToastContainer
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
        />
         <h3> Add Salesman</h3>

        <form className={classes.form} onSubmit={handleClick}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //className={classes.submit}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => resetbox()}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link to="/salesman">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => handleClick()}
                >
                  Back to List
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={12}></Grid>
            <Grid item xs={12} sm={12}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={salesmanName}
                autoComplete="salesmanName"
                name="salesmanName"
                variant="outlined"
                fullWidth
                id="salesmanName"
                label="Salesman Name"
                onChange={(e) => setSalesmanName(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={salesmanCode}
                required
                autoComplete="salesmanCode"
                name="salesmanCode"
                variant="outlined"
                fullWidth
                id="salesmanCode"
                label="Salesman Code"
                onChange={(e) => setSalesmanCode(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={designation}
                autoComplete="designation"
                name="designation"
                variant="outlined"
                fullWidth
                id="designation"
                label="Designation Name"
                onChange={(e) => setDesignation(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              required
                value={commissionRate}
                autoComplete="commissionRate"
                name="commissionRate"
                type="Number"
                min="0.00"
                step="0.001"
                max="1.00"
                variant="outlined"
                fullWidth
                id="commissionRate"
                label="Commission Rate"
                onChange={(e) => setCommissionRate(e.target.value)}
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Of Joining"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="outlined" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                value={emailId}
                autoComplete="emailId"
                type="email"
                name="emailId"
                variant="outlined"
                fullWidth
                id="emailId"
                label="Email Id"
                onChange={(e) => setEmailId(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={mobile}
                autoComplete="mobile"
                name="mobile"
                variant="outlined"
                fullWidth
                id="mobile"
                label="Mobile"
                onChange={(e) => setMobile(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={address}
                autoComplete="address"
                name="address"
                variant="outlined"
                fullWidth
                id="address"
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={city}
                autoComplete="city"
                name="city"
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                onChange={(e) => setCity(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={state}
                autoComplete="state"
                name="state"
                variant="outlined"
                fullWidth
                id="state"
                label="State"
                onChange={(e) => setState(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={zip}
                autoComplete="zip"
                name="zip"
                type="Number"
                variant="outlined"
                fullWidth
                id="zip"
                label="Zip"
                onChange={(e) => setZip(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label>IsActive</label>
              <Checkbox
                checked={checked}
                onChange={checkChanged}
                color="primary"
                size="medium"
              />
            </Grid>

            <Grid item xs={12} sm={12}></Grid>

            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //className={classes.submit}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => resetbox()}
              >
                Reset
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link to="/salesman">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => handleClick()}
                >
                  Back to List
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
