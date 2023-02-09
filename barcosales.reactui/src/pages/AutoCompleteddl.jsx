import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { json } from "react-router-dom";
import Box from "@mui/material/Box";

export default function ComboBox({ selectedCustomer, booldisabled }) {
  const [top100Films1, setTop100Films1] = useState([]);
  const [selectedvalue, setSelectedvalue] = useState("");

 

  useEffect(() => {
    debugger;

    getAllCustomers();

    if (booldisabled) {
      debugger;
      setSelectedvalue([]);
    }
  }, [booldisabled]);

  useEffect(() => {
    

    if (booldisabled) {
      debugger;
      setSelectedvalue([]);
    }
  }, [booldisabled]);

  const getAllCustomers = async () => {
    debugger;
    const res = await axios
      .get("SalesTrasaction/GetTransactionCustomers")
      .then((res) => {
        console.log(res.data);

        setTop100Films1(res.data);
        //  localStorage.setItem("AllCustomers", JSON.stringify(res.data));

        return res.data;
        //setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        //return res.data;
      });
    debugger;
    //setGetCustomers(res.data);
    return res;
  };

  // useEffect(() => {
  //   debugger;
  //   if(booldisabled)
  //   {
  //     debugger;
  //     setSelectedvalue([]);
  //   }

  // }, [booldisabled]);

  return (
    <>
     
      <Autocomplete
        loadingText='Loading...'
        multiple
        limitTags={2}
        size="small"
        // disabled={booldisabled}
        id="combo-box-demo"
        getOptionLabel={(top100Films1) => `${top100Films1.CustomerName}`}
        options={top100Films1}
        sx={{ margin: 1 }}
        isOptionEqualToValue={(option, value) =>
          option.CustomerName === value.CustomerName
        }
        onChange={(event, newValue) => {
          setSelectedvalue(newValue);
          selectedCustomer(newValue);
          console.log(newValue);
        }}
        renderOption={(props, top100Films1) => (
          <Box component="li" {...props} key={top100Films1.id}>
            {top100Films1.CustomerName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Customer" variant="standard" />
        )}
      />
    </>
  );
}

 