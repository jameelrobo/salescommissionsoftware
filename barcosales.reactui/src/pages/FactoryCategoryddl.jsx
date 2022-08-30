// import * as React from "react";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function FactoryCategoryddl({
  ddlOnchang,
  selectcategory,
}) {
  const [selectedfactoryCategory, setSelectedFactoryCategory] =
    React.useState("");
  const [factoryCategory, setFactoryCategory] = React.useState([]);
  useEffect(() => {
    GetcategoryFactory();
    //createSelectItems();
  }, []);
  useEffect(() => {
    debugger;
    setSelectedFactoryCategory(selectcategory);
  }, [selectcategory]);

  const GetcategoryFactory = () => {
    // fetch(
    //   "http://53.180.62.50.host.secureserver.net:5000/api/Factory/GetFactory"
    // )
    //   .then((res) => res.json())
    //   .then((result) => {
    //     debugger;
    //     setFactory(result);
    //   });
    axios
      .get("FactoryCategory/GetFactoryCategory")

      .then((res) => {
        debugger;
        console.log(res.data);
        setFactoryCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setSelectedFactoryCategory(event.target.value);
    ddlOnchang(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select Factory Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedfactoryCategory || ""}
          label="Select Prior Year"
          onChange={handleChange}
        >
          {factoryCategory.map((d, i) => (
            <MenuItem value={d["FactoryCategoryId"]}>
              {" "}
              {d["FactoryCategoryName"]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
