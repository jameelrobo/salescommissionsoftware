// import * as React from "react";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function FactoryCategoryddlTr({
  categoryddlOnchang
  
}) {
  // const [selectedfactoryCategory, setSelectedFactoryCategory] =
    React.useState("");
  const [factoryCategory, setFactoryCategory] = React.useState([]);
  const [selectCategory, setSelectCategory] = React.useState("");

  useEffect(() => {
    GetcategoryFactory();
    console.log("Repeted load category");
  }, []);
  // useEffect(() => {
  //   debugger;
  //   setSelectedFactoryCategory(selectfCategory);
  // }, [selectfCategory]);

  const GetcategoryFactory = () => {
  
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
    // setSelectedFactoryCategory(event.target.value);
    categoryddlOnchang(event.target.value);
    setSelectCategory=event.target.value;
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
          value={selectCategory }
          label="Select Prior Year"
          onChange={handleChange}
        >
          {factoryCategory.map((d, i) => (
            <MenuItem value={d["FactoryCategoryId"]}>
           
              {d["FactoryCategoryName"]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
