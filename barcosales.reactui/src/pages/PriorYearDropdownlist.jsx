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
          <MenuItem value={20}>2020</MenuItem>
          <MenuItem value={21}>2021</MenuItem>
          <MenuItem value={22}>2022</MenuItem>
          <MenuItem value={23}>2023</MenuItem>
          <MenuItem value={24}>2024</MenuItem>
          <MenuItem value={25}>2025</MenuItem>
          <MenuItem value={26}>2026</MenuItem>
          <MenuItem value={27}>2027</MenuItem>
          <MenuItem value={28}>2028</MenuItem>
          <MenuItem value={29}>2029</MenuItem>
          <MenuItem value={30}>2030</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
