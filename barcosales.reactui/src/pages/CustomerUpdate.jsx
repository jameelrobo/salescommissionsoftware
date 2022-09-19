import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FactoriesDropdownlist from "./FactoriesDropdownlist";
import SalesmanDropdownlist from "./SalesmanDropdownlist";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

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

export default function CustomerUpdate() {
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
  const [checked, setChecked] = useState(false);
  const [updateAction, setUpdateAction] = useState(0);
  const checkChanged = (state) => {
    setChecked(!checked);
  };

  const [selectedFactoryValue, setSelectedFactoryValue] = useState("");
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState("");

  const FactoryOnchange = (value) => {
    setSelectedFactoryValue(value);
    debugger;
    console.log(selectedFactoryValue);
  };

  const SalesmanOnchange = (value) => {
    setSelectedSalesmanValue(value);
    debugger;
    console.log(selectedSalesmanValue);
  };

  const { id } = useParams();
  useEffect(() => {
    debugger;
    if (updateAction === 0) {
      axios
        .get("Customer/GetCustomerId?id=" + id)

        .then((res) => {
          debugger;
          //console.log(res.data);
          //setData(res.data);
          setCid(res.data.Cid);
          setCustId(res.data.CustId);
          setCustomer(res.data.CustomerName);
          setCustAliasName(res.data.CustAliasName);
          setBranch(res.data.BranchName);
          setAddress(res.data.Address);
          setCity(res.data.City);
          setState(res.data.State);
          setZip(res.data.Zip);
          setContact(res.data.Contact);
          setPhone(res.data.Phone);
          setEmailId(res.data.EmailId);
          setMobile(res.data.Mobile);
          setTerritory(res.data.Territory);
          setSalesId(res.data.SalesmanId);
          setPrincCode(res.data.princCode);
          setChecked(res.data.IsActive);
          setCreatedDate(res.data.CreatedDate);
          setSelectedSalesmanValue(res.data.SalesmanId);
          setCustomSalescommissionRate(res.data.CustomSalesCommRate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // setUpdateAction(0);
  }, [id]);

  const [cid, setCid] = useState("");
  const [custId, setCustId] = useState("");
  const [customer, setCustomer] = useState("");
  const [custAliasName, setCustAliasName] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobile] = useState("");
  const [territory, setTerritory] = useState("");
  const [salesId, setSalesId] = useState("");
  const [customSalescommissionRate, setCustomSalescommissionRate] =
    useState("");
  const [princCode, setPrincCode] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [newDateValue, setNewDateValue] = useState("");
  const [isActive, setIsActive] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    let UpdateDate = Date.now();

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
      CustId: custId,
      CustomerName: customer,
      CustAliasName: custAliasName,
      BranchName: branch,
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
      CustomSalesCommRate:customSalescommissionRate,
      CreatedDate: createdDate,
      UpdateDate,
      IsActive: checked,
    };
    debugger;
    console.log(custInfo);

    debugger;
    console.log(custInfo);

    axios
      .put("Customer/EditCustomer", custInfo)
      .then((res) => {
        console.log(res);
        debugger;
        setUpdateAction(1);
        successMessageBox("Record has been updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        errorMessageBox("Invalid  Information!");
      });
  };

  return (
    <Container>
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
      <div>
      <h3> Update Customer</h3>
        <form className={classes.form} onSubmit={handleClick}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
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
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={12}></Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled="true"
                value={custId}
                autoComplete="custId"
                name="custId"
                variant="outlined"
                required
                fullWidth
                id="custId"
                label="Cust ID"
                onChange={(e) => setCustId(e.target.value)}
                autoFocus
              />
            </Grid>
            {/* 
            <Grid item xs={12} sm={6}>
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
                // autoFocus
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
                
                autoComplete="address"
                name="address"
                variant="outlined"
                fullWidth
                id="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // autoFocus
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
                // autoFocus
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
                type="number"
                variant="outlined"
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
                type="text"
                variant="outlined"
                fullWidth
                id="emailId"
                label="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                //  autoFocus
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
                //  autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SalesmanDropdownlist
                ddlOnchang={SalesmanOnchange}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={customSalescommissionRate}
                autoComplete="customSalescommissionRate"
                name="customSalescommissionRate"
                variant="outlined"
                type="number"
                fullWidth
                id="customSalescommissionRate"
                label="Custom Sales commissionRate"
                onChange={(e) => setCustomSalescommissionRate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <label>IsActive</label>
              <Checkbox
                checked={checked}
                onChange={checkChanged}
                color="primary"
                size="medium"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
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
