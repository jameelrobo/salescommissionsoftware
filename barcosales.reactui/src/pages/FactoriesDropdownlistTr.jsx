import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
export default function FactoriesDropdownlistTr({
  factoryddlOnchang
 // , selectcategory
 
  
}) {
 // const [factory, setFactory] = React.useState([]);
  const [filterfactory, setFilterfactory] = React.useState([]);
  const [selectfactory, setSelectfactory] = React.useState("");

  useEffect(() => {
    debugger
    GetFactory();
    console.log("Factory load");
    //createSelectItems();
  }, []);

  // useEffect(() => {
  //   const filter = factory.filter(
  //     (d, i) => selectcategory === d.FactoryCategoryId
  //   );
  //   debugger;
  //   setFilterfactory(filter);
  // }, [selectcategory]);

  // useEffect(() => {
  //   debugger;
  //   setSelectfactory(selectedFactoryId);
  // }, [selectedFactoryId]);

  const GetFactory = () => {
    axios
      .get("Factory/GetFactory")

      .then((res) => {
        debugger;
        console.log(res);
       // setFactory(res.data);
        setFilterfactory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    debugger;
    setSelectfactory(event.target.value);
    factoryddlOnchang(event.target.value);
    console.log("factddl :"+event.target.value);
  };
  debugger;
  // console.log(factory);
  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">
          Select Factory / Princ Code
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         // value={selectfactory }
         value={selectfactory}
          label="Select Factory / Princ Code"
          onChange={handleChange}
        >
          {filterfactory.map((d, i) => (
            <MenuItem value={d["FactoryId"]}>{d["PrincCode"]} - {d["FactoryName"]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
