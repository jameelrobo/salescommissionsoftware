import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
export default function SalesmanDropdownlist({ ddlOnchang,selectedSalesmanItem }) {
  const [salesmans, setSalesmans] = React.useState([]);
  const [selectedsalesman, setSelectedsalesman] = React.useState("");
 
  useEffect(() => {
    GetSalesmans();
    debugger;
  
    let selecteditem = localStorage.getItem("selectedItem");
    if (selecteditem != null) {
      setSelectedsalesman(selecteditem);

      localStorage.removeItem("selectedItem");
    } else {
      setSelectedsalesman("");
    }
  }, []);

  const GetSalesmans = () => {
    axios
      .get("SalesPerson/GetSalesPerson")
      .then((res) => {
        debugger;
        console.log(res.data);
        setSalesmans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setSelectedsalesman(event.target.value);
    ddlOnchang(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Salesman</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedsalesman}
          label="Select Salesman"
          onChange={handleChange}
        >
          {/* <MenuItem value={1}>Barrett B.</MenuItem>
          <MenuItem value={2}>Dan B.</MenuItem>
          <MenuItem value={3}>Don R.</MenuItem>
          <MenuItem value={4}>Steve B.</MenuItem>
          <MenuItem value={5}>Tom B.</MenuItem> */}
          {salesmans.map((d, i) => (
            <MenuItem value={d["SalesmId"]}> {d["SalesmanCode"]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
