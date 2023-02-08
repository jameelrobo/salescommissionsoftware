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
          <MenuItem value="Mar">Mar</MenuItem>
          <MenuItem value="Apr">Apr</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="Jun">Jun</MenuItem>
          <MenuItem value="Jul">Jul</MenuItem>
          <MenuItem value="Aug">Aug</MenuItem>
          <MenuItem value="Sep">Sep</MenuItem>
          <MenuItem value="Oct">Oct</MenuItem>
          <MenuItem value="Nov">Nov</MenuItem>
          <MenuItem value="Dec">Dec</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
