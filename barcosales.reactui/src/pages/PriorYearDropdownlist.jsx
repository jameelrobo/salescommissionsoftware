import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
export default function PriorYearDropdownlist({
  ddlOnchang,
  selectedPriorYearValue,
}) {
  const [selectedPriorYear, setSelectedPriorYear] = React.useState();

  const handleChange = (event) => {
    setSelectedPriorYear(event.target.value);
    ddlOnchang(event.target.value);
  };
  React.useEffect(() => {
    debugger;
    setSelectedPriorYear(selectedPriorYearValue);
  }, [selectedPriorYearValue]);

  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Prior Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPriorYear}
          label="Select Prior Year"
          onChange={handleChange}
        >
          {/* <MenuItem value={"2020"}>2020</MenuItem>
          <MenuItem value={"2021"}>2021</MenuItem>
          <MenuItem value={"2022"}>2022</MenuItem> */}
          <MenuItem value={"2023"}>2023</MenuItem>
          <MenuItem value={"2024"}>2024</MenuItem>
          <MenuItem value={"2025"}>2025</MenuItem>
          <MenuItem value={"2026"}>2026</MenuItem>
          <MenuItem value={"2027"}>2027</MenuItem>
          <MenuItem value={"2028"}>2028</MenuItem>
          <MenuItem value={"2029"}>2029</MenuItem>
          <MenuItem value={"2030"}>2030</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
