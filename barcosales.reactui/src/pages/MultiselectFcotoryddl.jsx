import React, { useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP 
//     },
//   },
// };

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

 

  export default function MultipleSelectFactoryddl({
    factoryddlOnchang
   // , selectcategory
   
    
  }) {
    const [factory, setFactory] = React.useState([]);
    const [filterfactory, setFilterfactory] = React.useState([]);
    const [selectfactory, setSelectfactory] = React.useState("");
  
    useEffect(() => {
      debugger
      GetFactory();
      console.log("Factory load");
      //createSelectItems();
    }, []);
  const [personName, setPersonName] = React.useState([]);
  const [selectedFacTId, setSelectedFacTId] = React.useState([]);

  const handleChange = (event) => {
    debugger;
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    factoryddlOnchang(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const GetFactory = () => {
    axios
      .get("Factory/GetFactory")
  
      .then((res) => {
        debugger;
        console.log(res);
        setFilterfactory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div>
     
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Select Factories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select Factories" />}
          renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
        >
          {/* {filterfactory.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))} */}

          {filterfactory.map((d, i) => (
            <MenuItem  key={d["FactoryId"]} value={d["FactoryName"]}  > 
            <Checkbox checked={personName.indexOf(d["FactoryName"]) > -1} />
            <ListItemText primary={d["FactoryName"]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
