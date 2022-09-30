import React, { useState,useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
 

 // import { MenuProps, useStyles, options } from "./utils";
 import { MenuProps, useStyles} from "./UtilMultiSelectOption";


export default function MultiselectYearddl({ selectedYears}){

  const options = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023"
  ];
    // useEffect(() => {
    //     debugger
    //     GetFactory();

    //     console.log("salesman load");
    //     //createSelectItems();
    //   }, []);
    
    //   const GetFactory = () => {
    //     axios
    //       .get("Factory/GetFactory")
    
    //       .then((res) => {
    //         debugger;
    //         console.log(res);
    //        // setFactory(res.data);
    //        setOptions(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };

    const classes = useStyles();
    const [selected, setSelected] = useState([]); 
    // const[filterfactory,setFilterfactory] = useState([]);
   
    const isAllSelected =  options.length > 0 && selected.length === options.length;


    
    
 
  
    const handleChange = (event) => {
      const value = event.target.value;
      if (value[value.length - 1] === "all") {
        setSelected(selected.length === options.length ? [] : options);
        selectedYears(selected.length === options.length ? [] : options);
        return;
      }
      setSelected(value);
      selectedYears(value);
    };
    return (
        <FormControl className={classes.formControl}>
          <InputLabel id="mutiple-select-label">Select Years</InputLabel>
          <Select
            labelId="mutiple-select-label"
            multiple
            value={selected}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            <MenuItem
              value="all"
              classes={{
                root: isAllSelected ? classes.selectedAll : ""
              }}
            >
              <ListItemIcon>
                <Checkbox
                  classes={{ indeterminate: classes.indeterminateColor }}
                  checked={isAllSelected}
                  indeterminate={
                    selected.length > 0 && selected.length < options.length
                  }
                />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.selectAllText }}
                primary="Select All"
              />
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  <Checkbox checked={selected.indexOf(option) > -1} />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            ))}

            
        {/* {options.map((d, i) => (
            <MenuItem  key={d["FactoryId"]} value={d["FactoryName"]}  > 
            <ListItemIcon>
            <Checkbox checked={selected.indexOf(d["FactoryName"]) > -1} />
            </ListItemIcon>
            <ListItemText primary={d["FactoryName"]} />
            </MenuItem>
          ))}    */}
          </Select>
        </FormControl>
      );
}