import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

export default function Customerddl({ ddlOnchang }) {
  const [customers, setCustomers] = React.useState("");
  const [selectedcustomer, setSelectedcustomer] = React.useState("");
  useEffect(() => {
    Getcustomers();
  }, []);
  const handleChange = (event) => {
    setSelectedcustomer(event.target.value);
    ddlOnchang(event.target.value);
  };

  const Getcustomers = () => {
    axios
      .get("Customer/GetCustomer")
      .then((res) => {
        debugger;
        console.log(res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Customer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedcustomer}
          label="Select Customer"
          onChange={handleChange}
        >
          {/* {customers.map((d, i) => (
            <MenuItem value={d["CId"]}> {d["CustomerName"]}</MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </Box>
  );
}
