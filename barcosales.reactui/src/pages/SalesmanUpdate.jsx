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
import { useParams } from "react-router-dom";
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

export default function SalesmanUpdate() {
  const [updateAction, setUpdateAction] = useState(0);
  const [value, setValue] = useState("");
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const checkChanged = (state) => {
    setChecked(!checked);
  };

  const { id } = useParams();
  useEffect(() => {
    debugger;
   
    if (updateAction === 0) {
      axios
        .get("SalesPerson/GetSalesPersonId?id=" + id)
        .then((res) => {
          debugger;
          setSalesmId(res.data.SalesmId);
          setSalesmanCode(res.data.SalesmanCode);
          setSalesmanName(res.data.SalesmanName);
          setDesignation(res.data.Designation);
          setCommissionRate(res.data.CommissionRate);
          setEmailId(res.data.EmailId);
          setAddress(res.data.Address);
          setCity(res.data.City);
          setState(res.data.State);
          setZip(res.data.Zip);
          setMobile(res.data.Mobile);
          setChecked(res.data.IsActive);
          setJoiningDate(res.data.JoiningDate);
          setCreatedDate(res.data.CreatedDate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // setUpdateAction(0);
  }, [id]);

  

  const [commissionRate, setCommissionRate] = useState("");
  const [salesmId, setSalesmId] = useState("");
  const [salesmanCode, setSalesmanCode] = useState("");
  const [salesmanName, setSalesmanName] = useState("");
  const [designation, setDesignation] = useState("");
  const [emailId, setEmailId] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [mobile, setMobile] = useState("");
  const [princCode, setPrincCode] = useState("");
  const [isActive, setIsActive] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    debugger;
    const rows = [];

    var salesmaninfo = {
      SalesmId: salesmId,
      SalesmanCode: salesmanCode,
      SalesmanName: salesmanName,
      Designation: designation,
      CommissionRate: commissionRate,
      EmailId: emailId,
      Address: address,
      City: city,
      State: state,
      Zip: zip,
      Mobile: mobile,
      IsActive: checked,
      JoiningDate: joiningDate,
      CreatedDate: createdDate,
    };

    debugger;
    console.log(salesmaninfo);

    axios
      .put("/SalesPerson/EditSalesPerson", salesmaninfo)
      // .put("Customer/EditCustomer", custInfo)
      .then((res) => {
        console.log(res);
        toast.success("Record has been updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Salesman Information!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h3>Update Salesman</h3>

        <form className={classes.form} onSubmit={handleClick}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12}>
              <Link to="/salesman">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleClick()}
                >
                  Create Salesman
                </Button>
              </Link>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //className={classes.submit}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/salesman">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => handleClick()}
                >
                  Cancel / Back
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={12}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled="true"
                value={salesmId}
                required
                autoComplete="salesmId"
                name="salesmId"
                variant="outlined"
                fullWidth
                id="salesmId"
                label="SalesmanId"
                onChange={(e) => setSalesmId(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={salesmanName}
                required
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
                required
                value={salesmanCode}
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
                value={commissionRate}
                autoComplete="commissionRate"
                name="commissionRate"
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
                type="email"
                autoComplete="emailId"
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

            {/* <Grid item xs={12} sm={12}>
              <Link to="/salesman">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleClick()}
                >
                  Create Salesman
                </Button>
              </Link>
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //className={classes.submit}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/salesman">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => handleClick()}
                >
                  Cancel / Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
