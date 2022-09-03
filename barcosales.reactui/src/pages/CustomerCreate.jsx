import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Checkbox from "@mui/material/Checkbox";
import FactoriesDropdownlist from "./FactoriesDropdownlist";
import SalesmanDropdownlist from "./SalesmanDropdownlist";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CustomerCreate() {
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

  const classes = useStyles();
  const [data, setData] = useState();

  const [checked, setChecked] = useState(true);
  const checkChanged = (state) => {
    setChecked(!checked);
  };
 const [selectedSalesmanItem, setSelectedSalesmanItem] = useState("");
  const [value, setValue] = useState("");
  const [customerId, setCustomerId] = useState();
  const [custId, setCustId] = useState();
  const [customer, setCustomer] = useState();
  const [custAliasName, setCustAliasName] = useState();
  const [branch, setBranch] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [contact, setContact] = useState();
  const [phone, setPhone] = useState();
  const [emailId, setEmailId] = useState();
  const [mobile, setMobile] = useState();
  const [territory, setTerritory] = useState();
  const [salesId, setSalesId] = useState();
  const [princCode, setPrincCode] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [isActive, setIsActive] = useState();
  const [newDateValue, setNewDateValue] = useState("");
  const [selectedFactoryValue, setSelectedFactoryValue] = useState("");
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState("");
  const [customSalescommissionRate, setCustomSalescommissionRate] =
    useState("");

    const resetbox = () => {
      debugger;
      // setSalesmId("");
      setCustomerId("");
      setCustId("");
      setCustomer("");
      setCustAliasName("");
      setBranch("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setContact("");
      setPhone("");
      setEmailId("");
      setMobile("");
      setTerritory("");
      
      setSelectedSalesmanValue("");
      setCustomSalescommissionRate("");
      setSelectedSalesmanItem("");

      
      setChecked(true);
    };

  const FactoryOnchange = (value) => {
    setSelectedFactoryValue(value);
    debugger;
   // console.log(selectedFactoryValue);
  };

  const SalesmanOnchange = (value) => {
    debugger;
    console.log(value);
    setSelectedSalesmanValue(value);
    //  console.log(selectedSalesmanValue);
    debugger;
    
  };

  const handleClick = (event) => {
    event.preventDefault();
    debugger;
  //  console.log(selectedSalesmanValue);
    if (
      selectedSalesmanValue === undefined ||
      selectedSalesmanValue === null ||
      selectedSalesmanValue === "" ||
      selectedSalesmanValue === 0
    ) {
      errorMessageBox(
        "Salesman should not be blank, Please select at least one Salesman"
      );
      return;
    }

    var custInfo = {
      CId: 0,
      CustId: custId,
      CustomerName: customer,
      CustAliasName: custAliasName,
      Branch: branch,
      Address: address,
      City: city,
      State: state,
      Zip: zip,
      Contact: contact,
      Phone: phone,
      EmailId: emailId,
      Mobile: mobile,
      Territory: territory,
      SalesmanId: selectedSalesmanValue,
      CustomSalesCommRate: customSalescommissionRate,
      CreatedDate: createdDate,
      IsActive: checked,
    };
    debugger;
    console.log(custInfo);

    debugger;
    console.log(custInfo);

    axios
      .post("Customer/AddCustomer", custInfo)
      .then((res) => {
        successMessageBox("Record has been added successfully!");

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        errorMessageBox("Invalid Customer Information!");
      });
  };

  return (
    <Container>
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
      
      <div>
      <h3>Add New Customer</h3>
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
                Submit
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
              <Link to="/Customers">
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
            {/* <Grid item xs={12} sm={6}>
              <TextField
                disabled="true"
                autoComplete="custId"
                name="custId"
                variant="outlined"
                required
                fullWidth
                id="custId"
                value={custId}
                label="Cust ID"
                onChange={(e) => setCustId(e.target.value)}
                autoFocus
              />
            </Grid> */}

            {/* <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  // required
                  label="Creation Date"
                  value={createdDate}
                  onChange={(newValue) => {
                    setNewDateValue(newValue);
                    setCreatedDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="outlined" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid> */}
            <Grid item xs={12} sm={12}></Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="customer"
                name="customer"
                variant="outlined"
                required
                fullWidth
                id="customer"
                label="Customer Name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // required
                autoComplete="custAliasName"
                name="custAliasName"
                variant="outlined"
                fullWidth
                id="custAliasName"
                label="Customer Alias Name"
                value={custAliasName}
                onChange={(e) => setCustAliasName(e.target.value)}
                //autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // required
                variant="outlined"
                fullWidth
                id="branch"
                label="Branch Name"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete="address"
                name="address"
                variant="outlined"
                fullWidth
                id="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                //autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete="city"
                name="city"
                variant="outlined"
                fullWidth
                id="city"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                //autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoComplete="state"
                name="state"
                variant="outlined"
                fullWidth
                id="state"
                label="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                //autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="zip"
                name="zip"
                variant="outlined"
                type="number"
                
                fullWidth
                id="zip"
                label="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="contact"
                name="contact"
                variant="outlined"
                fullWidth
                id="contact"
                label="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="phone"
                name="phone"
                variant="outlined"
                fullWidth
                id="phone"
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="emailId"
                name="emailId"
                variant="outlined"
                fullWidth
                type="email"
                id="emailId"
                label="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="territory"
                name="territory"
                variant="outlined"
                fullWidth
                id="territory"
                label="Territory"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SalesmanDropdownlist
                ddlOnchang={SalesmanOnchange}
                 selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={customSalescommissionRate}
                autoComplete="customSalescommissionRate"
                name="customSalescommissionRate"
                variant="outlined"
                fullWidth
                type="number"
                id="customSalescommissionRate"
                label="Custom Sales commissionRate"
                onChange={(e) => setCustomSalescommissionRate(e.target.value)}
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

            <Grid item xs={12} sm={4}>
              {/* <Link to="/Customers">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleClick()}
                >
                  Update
                </Button>
              </Link> */}
              {/* <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleClick()}
              >
                Update
              </Button> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                //className={classes.submit}
              >
                Submit
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
              <Link to="/Customers">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  //  onClick={() => handleClick()}
                >
                  Cancel / Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
