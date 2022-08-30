import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import FactoriesDropdownlist from "./FactoriesDropdownlist";
import SalesmanDropdownlist from "./SalesmanDropdownlist";
import PriorYearDropdownlist from "./PriorYearDropdownlist";
import SalesMonthsDropdownlist from "./SalesMonthsDropdownlist";
import axios from "axios";
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

export default function AddSales() {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: avatar,
    };
    fetch("https://www.mecallapi.com/api/users/create", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "/";
        }
      });
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const columns = [
    { title: "Customer", field: "customer" },
    { title: "ShipToName", field: "shipToName" },
    { title: "ShipToAddress", field: "shipToAddress" },
    { title: "ShipToCity", field: "shipToCity" },
    { title: "ShipToState", field: "shipToState" },
    { title: "Factory", field: "factory" },
    { title: "Check", field: "check" },
    { title: "Month", field: "month" },
    { title: "Salesman", field: "salesman" },
    { title: "InvoiceNo", field: "invoiceNo" },
    { title: "SaleAmount", field: "saleAmount" },
    { title: "GrossCommRate", field: "commRate" },
    { title: "GrossComm", field: "grossComm" },
    { title: "SalesmanComm", field: "salesmanComm" },
    { title: "CreationDate", field: "creationDate" },
  ];
  return (
    <Container>
      <div className={classes.paper}>
        {/* <Typography component="h1" variant="h5">
          Add New Sales
        </Typography> */}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Link to="/transaction">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => handleClick()}
                >
                  Add New Sales
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <PriorYearDropdownlist />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SalesMonthsDropdownlist />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="creationDate"
                name="creationDate"
                variant="outlined"
                required
                fullWidth
                id="creationDate"
                label="Creation Date"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <SalesmanDropdownlist />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FactoriesDropdownlist />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="soldToName"
                name="soldToName"
                variant="outlined"
                required
                fullWidth
                id="soldToName"
                label="Sold-To Name"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="ShipToAddress"
                name="ShipToAddress"
                variant="outlined"
                required
                fullWidth
                id="ShipToAddress"
                label="Sold-To Address"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ShipToCity"
                label="Sold-To City"
                // onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="ShipToState"
                name="ShipToState"
                variant="outlined"
                required
                fullWidth
                id="ShipToState"
                label="Sold-To State"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="ShipToName "
                name="ShipToName"
                variant="outlined"
                required
                fullWidth
                id="Ship-To Name"
                label="Ship-To Name"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="ShipToAddress"
                name="ShipToAddress"
                variant="outlined"
                required
                fullWidth
                id="ShipToAddress"
                label="Ship-To Address"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ShipToCity"
                label="Ship-To City"
                // onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="ShipToState"
                name="ShipToState"
                variant="outlined"
                required
                fullWidth
                id="ShipToState"
                label="Ship-To State"
                // onChange={(e) => setFname(e.target.value)}
                // autoFocus
              />
            </Grid>
            {/* <Grid item xs={12} sm={3}>
              <TextField
                autoComplete="invoiceNo"
                name="invoiceNo"
                variant="outlined"
                required
                fullWidth
                id="invoiceNo"
                label="Invoice No"
              onChange={(e) => setFname(e.target.value)}
              autoFocus
              />
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="saleAmount"
                label="Sale Amount"
                // onChange={(e) => setLname(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Link to="/transaction">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // onClick={() => handleClick()}
                >
                  Add New Sales
                </Button>
              </Link>
            </Grid>
          </Grid>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button> */}
        </form>
      </div>
    </Container>
  );
}
