import React, { useState, useEffect, forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

import MaterialTable, { Column } from "material-table";

import "jspdf-autotable";
import FactoriesDropdownlistTr from "./FactoriesDropdownlistTr";
import SalesmanmMultiselectddl from "./SalesmanmMultiselectddl";
import MultiselectFcotoryddl from "./MultiselectFcotoryddl";
import SalesmanDropdownlist from "./SalesmanDropdownlist";

import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import TextField from "@material-ui/core/TextField";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import { ToastContainer, toast } from "react-toastify";

const tableRef = React.createRef();
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const successMessageBox = (successMsg) => {
  toast.success(successMsg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const errorMessageBox = (errorMsg) => {
  toast.error(errorMsg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const EXTENSIONS = ["xlsx", "xls", "csv"];
export default function Analytics(props) {
  const classes = useStyles();

  const [selectedFactoryValue, setSelectedFactoryValue] = useState([]);
  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState("");
  const [selectedSalesMonthsValue, setSelectedSalesMonthsValue] = useState("");
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState([]);
  
  const [selectedSalesmanItem, setSelectedSalesmanItem] = useState("");

  const FactoryOnchange = (value) => {
    debugger;
    setSelectedFactoryValue(value);
    debugger;
    console.log(value);
  };
  const PriorYearOnchange = (value) => {
    setSelectedPriorYearValue(value);
    debugger;
    console.log(selectedPriorYearValue);
  };
  const SalesMonthsOnchange = (value) => {
    setSelectedSalesMonthsValue(value);
    debugger;
    console.log(selectedSalesMonthsValue);
  };

  const SalesmanOnchange = (value) => {
    debugger;
    setSelectedSalesmanValue(value);
    debugger;
    console.log(selectedSalesmanValue);
  };
  const [startDatevalue, setStartDatevalue] = useState(Date);
  const [endDatevalue, setEndDatevalue] = useState(Date);

  const [data, setData] = useState();
  const numberToCurrency = (num) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(num);
  };


  useEffect(() => {
debugger;
    var filters = {
      startDate: null,
      endDate: null,
      FactoryId: 0,
      SalesmId: 0
    }
    GetSalesTransaction(filters);

  }, []);

  const GetSalesTransaction = (filters) => {
    axios
     
      .post("SalesTrasaction/SearchTransaction",filters)

      .then((res) => {
        debugger;
        console.log(res);
        if(res.data.length>0)
        {
          const transformedArray = [];
           
          let TotalAmt=0;
          let TotalCommAmt=0;
          let TotalSalesCommAmt=0;
        for (let i = 0; i < res.data.length; i++) {
           TotalAmt= TotalAmt+ res.data[i]["TotalSalesAmt"];
           TotalCommAmt=TotalCommAmt+ res.data[i]["GrossCommAmt"];
           TotalSalesCommAmt=TotalSalesCommAmt+ res.data[i]["SalesmanCommAmt"];
           let date = new Date(res.data[i]["CreatedDate"]);
           /* Date format you have */
           let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
           /* Date converted to MM-DD-YYYY format */
          const objdatagrid = {
            TrasactionId:   res.data[i]["TrasactionId"],
            SalesmId:   res.data[i]["SalesmId"],
            SalesmanCode:   res.data[i]["SalesmanCode"],
            CustId:   res.data[i]["CustId"],
            CommissionRulesId:   res.data[i]["CommissionRulesId"],
            SoldToName:  res.data[i]["SoldToName"],
            
            SoldToState:  res.data[i]["SoldToState"],
            
            
            SoldToCity:  res.data[i]["SoldToCity"],
           
            FactoryId:   res.data[i]["FactoryId"],
            FactoryName:   res.data[i]["FactoryName"],
            CheckNo:   res.data[i]["CheckNo"],
            CreatedDate:dateMDY,
            MonthName:   res.data[i]["MonthName"],
            InvoiceNo:  res.data[i]["SInvoiceNo"],
            TotalSalesAmt: numberToCurrency(  res.data[i]["TotalSalesAmt"]),
           // GrossCommRate: `${res.data[i]["GrossCommRate"]}%`,
            GrossCommRate: res.data[i]["GrossCommRate"],
            GrossCommAmt: numberToCurrency(  res.data[i]["GrossCommAmt"]),
            SalesmanCommRate: `${  res.data[i]["SalesmanCommRate"]}%`,
            SalesmanCommAmt: numberToCurrency(  res.data[i]["SalesmanCommAmt"]),
            CreatedBy: 1,
            IsActive: 1,
          };
          
          transformedArray.push(objdatagrid);
        }
        const objdatagrid = {
          TrasactionId:   '',
          SalesmId:   '',
          SalesmanCode:  'Total Amount',
          CustId:   '',
          CommissionRulesId:  '',
          SoldToName: '',
          SoldToCity:  '',
          SoldToState:  '',
          FactoryId:  '',
          FactoryName:   '',
          CheckNo:   '',
          CreatedDate:'',
          MonthName:   '',
          InvoiceNo:  '',
          TotalSalesAmt: numberToCurrency(  TotalAmt),
          GrossCommRate: '',
          GrossCommAmt: numberToCurrency(  TotalCommAmt),
          SalesmanCommRate: '',
          SalesmanCommAmt: numberToCurrency(  TotalSalesCommAmt),
          CreatedBy: 1,
          IsActive: 1,
        };
        debugger;
        transformedArray.push(objdatagrid);
        setData(transformedArray);
      }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };


 
  const columns = [
    // { title: "Created Date", field: "CreatedDate" }, 
    
   // { title: "CustId", field: "CustId" },
    { title: "Customer Name", field: "SoldToName" },
    { title: " Factory Name ", field: "FactoryName" },
    // { title: "Check#", field: "CheckNo" },
    
    { title: "Month Name", field: "MonthName" },
    { title: "Salesman Code", field: "SalesmanCode" },
    //{ title: "InvoiceNo", field: "InvoiceNo" },
    { title: "TotalAmt", field: "TotalSalesAmt" },
    { title: "GCommRate", field: "GrossCommRate" },
    { title: "GCommAmt", field: "GrossCommAmt" },
    // { title: "CommRate", field: "SalesmanCommRate" },

    { title: "CommAmt", field: "SalesmanCommAmt" },
    // { title: "SoldToAddress", field: "ShipToAddress" },
    // { title: "SoldToState", field: "ShipToCity" },
    // { title: "ShipToName", field: "ShipToName" },
    // { title: "ShipToAddress", field: "ShipToAddress" },
    // { title: "ShipToCity", field: "ShipToCity" },
    // { title: "ShipToState", field: "ShipToState" },
  ];
 

  const search=()=>{
    debugger;
    var sd = new Date(startDatevalue); 
    var ed = new Date(endDatevalue); 
var sd= sd.toLocaleDateString();
var ed= ed.toLocaleDateString();
debugger;

if (
  selectedFactoryValue === undefined ||
  selectedFactoryValue === null ||
  selectedFactoryValue === "" ||
  selectedFactoryValue.length === 0
) {
  errorMessageBox(
    "Factory  should not be blank, Please select at least one Factory"
  );
  
  return;
}
if (
  selectedSalesmanValue === undefined ||
  selectedSalesmanValue === null ||
  selectedSalesmanValue === "" ||
  selectedSalesmanValue.length === 0
) {
  errorMessageBox(
    "Salesman should not be blank, Please select at least one Salesman "
  );
  
  return;
}
   var filters = {
    startDate: sd,
    endDate: ed,
    FactoryId: selectedFactoryValue,
    SalesmId:selectedSalesmanValue,
  };
  // setSelectedFactoryValue([]);
  // setSelectedSalesmanValue([]);
  setData([]);
   GetSalesTransaction(filters);
    
  }

  const tableRef = React.createRef();
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          style={{width: "40%"}} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      
        <h3> Sales Commission Reports</h3>

        <form className={classes.form}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}></Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDatevalue}
                  onChange={(newValue) => {
                    setStartDatevalue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="outlined" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={endDatevalue}
                  onChange={(newValue) => {
                    setEndDatevalue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="outlined" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
           
        
        
            <Grid item xs={12} sm={6}>
              <SalesmanmMultiselectddl
                ddlSalesmanSelectedItems={SalesmanOnchange}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>
        
            <Grid item xs={12} sm={6}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
               <MultiselectFcotoryddl   Selectedfactorylist={FactoryOnchange} />
            </Grid>
            {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Search
          </Button> */}

          <Grid item xs={12} sm={12}>
          <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => search()}
              >
               Search
              </Button>
          </Grid>
          
          </Grid>
        
        </form>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          icons={tableIcons}
          
          tableRef={tableRef}
          options={{
            sorting: true,
            search: true,
            searchFieldAlignment: "right",
            searchAutoFocus: true,
            searchFieldVariant: "standard",
            filtering: true,
            paging: true,
            pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
            pageSize: 10,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "both",
            exportButton: true,
            exportAllData: true,
            exportFileName: "SalesCommission",
            addRowPosition: "first",
            actionsColumnIndex: -1,
            // selection: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            selectionProps: (rowData) => ({
              disabled: rowData.age == null,
              // color:"primary"
            }),
            grouping: true,
            columnsButton: true,
            rowStyle: (data, index) =>
              index % 2 === 0 ? { background: "#f5f5f5" } : null,
            headerStyle: { background: "#f44336", color: "#fff" },
          }}
        />
      </div>
    </>
  );
}
