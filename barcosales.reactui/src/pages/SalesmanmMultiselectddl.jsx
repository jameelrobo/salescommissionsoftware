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

//  const options = [
//     "Oliver Hansen",
//     "Van Henry",
//     "April Tucker",
//     "Ralph Hubbard",
//     "Omar Alexander",
//     "Carlos Abbott",
//     "Miriam Wagner",
//     "Bradley Wilkerson",
//     "Virginia Andrews",
//     "Kelly Snyder"
//   ];
export default function SalesmanmMultiselectddl({ ddlOnchang}){
    useEffect(() => {
        debugger
        GetSalesmans();
        console.log("salesman load");
        //createSelectItems();
      }, []);
    
    const GetSalesmans = () => {
        axios
          .get("SalesPerson/GetSalesPerson")
          .then((res) => {
            debugger;
            console.log(res.data);
            setOptions(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
     
    const classes = useStyles();
    const [selected, setSelected] = useState([]); 
   const [options, setOptions] = useState([]);
    const isAllSelected =  options.length > 0 && selected.length === options.length;


    
    
 
  
    const handleChange = (event) => {
      const value = event.target.value;
      if (value[value.length - 1] === "all") {
        setSelected(selected.length === options.length ? [] : options);
        return;
      }
      setSelected(value);
    };
    return (
        <FormControl className={classes.formControl}>
          <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
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
            {/* {options.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  <Checkbox checked={selected.indexOf(option) > -1} />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            ))} */}

            
        {options.map((d, i) => (
            <MenuItem  key={d["SalesmId"]} value={d["SalesmanCode"]}  > 
            <ListItemIcon>
            <Checkbox checked={selected.indexOf(d["SalesmanCode"]) > -1} />
            </ListItemIcon>
            <ListItemText primary={d["SalesmanCode"]} />
            </MenuItem>
          ))}   
          </Select>
        </FormControl>
      );
}