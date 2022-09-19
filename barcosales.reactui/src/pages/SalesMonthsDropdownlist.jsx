import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
export default function SalesMonthsDropdownlist({ salesMonthsddlOnchang }) {
  const [salesMonths, setSalesMonths] = React.useState("");

  const handleChange = (event) => {
    debugger;
    setSalesMonths(event.target.value);
    salesMonthsddlOnchang(event.target.value);
  };
  // useEffect(() => {
  //  // setSalesMonths(8);
  // }, []);

  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select Sales Months{" "}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={salesMonths || ""}
          label="Select Month"
          onChange={handleChange}
        >
          <MenuItem value="Jan">Jan</MenuItem>
          <MenuItem value="Feb">Feb</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="Apr">Apr</MenuItem>
          {/* <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>Jun</MenuItem>
          <MenuItem value={7}>Jul</MenuItem>
          <MenuItem value={8}>Aug</MenuItem>
          <MenuItem value={9}>Sep</MenuItem>
          <MenuItem value={10}>Oct</MenuItem>
          <MenuItem value={11}>Nov</MenuItem>
          <MenuItem value={12}>Dec</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
