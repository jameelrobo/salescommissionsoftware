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
import MultiselectMonthddl from "./MultiselectMonthddl";
import MultiselectYearddl from "./MultiselectYearddl";

import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";

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
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
  Undo,
  Restore,
  Delete,
} from "@material-ui/icons";
import { confirm } from "react-confirm-box";
import { Radio } from "@material-ui/core";
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
const label = { inputProps: { "aria-label": "Checkbox demo" } }; 
const EXTENSIONS = ["xlsx", "xls", "csv"];
export default function Analytics(props) {
  const classes = useStyles();

   const [coldef, setColdef] = useState([]);
  const [selectedFactoryValue, setSelectedFactoryValue] = useState([]);
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState([]);
  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState([]);
  const [selectedSalesMonthsValue, setSelectedSalesMonthsValue] = useState([]);
  const [isDateWisecheckChanged,setIsDateWisecheckChanged] = useState(false); 
  const [isShowDeletecheckChangedYes,setIsShowDeletecheckChangedYes] = useState(false); 
  const [isShowDeletecheckChangedNo,setIsShowDeletecheckChangedNo] = useState(true); 
  const [isYearandMonthChanged,setIsYearandMonthChanged] = useState(true);
  const [isDateRangeEnableDisable, setIsDateRangeEnableDisable] = useState(true);
  const [isYearMonthsEnableDisable, setIsYearMonthsEnableDisable] = useState(true);
  const [hideDatewise, setHideDatewise] = useState("none");

  const [selectedSalesmanItem, setSelectedSalesmanItem] = useState("");
  const DateWisecheckChanged = (state) => {
   
    setIsDateWisecheckChanged(!isDateWisecheckChanged);
    debugger;
  //  setIsEnableDisable(isDateWisecheckChanged);
    if(isDateWisecheckChanged)
    {
     setStartDatevalue(null);
     setEndDatevalue(null);
     setIsYearandMonthChanged(true)
     setIsDateRangeEnableDisable(true)
     setIsYearMonthsEnableDisable(false)
 
    }
    else
    {
     setStartDatevalue(null);
     setEndDatevalue(null);
     setIsDateRangeEnableDisable(false)
     setIsYearMonthsEnableDisable(true)
     setIsYearandMonthChanged(false)
   
 
    }
  
    //setIsDisable(!allCustchecked);
  };

  const YearWisecheckChanged = (state) => {
   
    setIsYearandMonthChanged(!isYearandMonthChanged);
    debugger;
   // setIsEnableDisable(isYearandMonthChanged);
    if(isYearandMonthChanged)
    {
      setIsDateWisecheckChanged(true)
      setIsDateRangeEnableDisable(false)
     setIsYearMonthsEnableDisable(true)
     setStartDatevalue(null);
     setEndDatevalue(null);
 
    }
    else
    {
      setIsDateWisecheckChanged(false)
      setIsDateRangeEnableDisable(true)
      setIsYearMonthsEnableDisable(true)
     setStartDatevalue(null);
     setEndDatevalue(null);
    }
  
    //setIsDisable(!allCustchecked);
  };



  const IsShowDeletecheckYes = (state) => {
    debugger;
    setIsShowDeletecheckChangedYes(!isShowDeletecheckChangedYes);
    if(isShowDeletecheckChangedYes)
    {
      setIsShowDeletecheckChangedYes(false)
      setIsShowDeletecheckChangedNo(true)
     
 
    }
    else
    {
      setIsShowDeletecheckChangedYes(true)
      setIsShowDeletecheckChangedNo(false)
      
    }

    //setIsDisable(!allCustchecked);
  };

  
  const IsShowDeletecheckNo = (state) => {
    debugger;
    setIsShowDeletecheckChangedNo(!isShowDeletecheckChangedNo);
    if(isShowDeletecheckChangedNo)
    {
     
      setIsShowDeletecheckChangedNo(false)
      setIsShowDeletecheckChangedYes(true)
 
    }
    else
    {
      setIsShowDeletecheckChangedNo(true)
      setIsShowDeletecheckChangedYes(false)
      
    }

    //setIsDisable(!allCustchecked);
  };

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
  const [startDatevalue, setStartDatevalue] = useState(null);
  const [endDatevalue, setEndDatevalue] = useState(null);

 

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
      SelectedYears: 0,
      SelectedMonths: 0,
      FactoryId: 0,
      SalesmId: 0
     
    };
    GetSalesTransaction(filters);

  }, []);

  const GetSalesTransaction = (filters) => {
    axios
     
      .post("SalesTrasaction/SearchTransaction",filters)

      .then((res) => {
        debugger;
        console.log(res);
        let results ="";
        if(res.data.length>0)
        {
          if(isShowDeletecheckChangedYes)
          {
            results = res.data.filter(item => item.IsActive === false);

 
          }
          else{
            results = res.data.filter(item => item.IsActive === true);
          }
          


          const transformedArray = [];
           
          let TotalAmt=0;
          let TotalCommAmt=0;
          let TotalSalesCommAmt=0;
        for (let i = 0; i < results.length; i++) {
           TotalAmt= TotalAmt+ results[i]["TotalSalesAmt"];
           TotalCommAmt=TotalCommAmt+ results[i]["GrossCommAmt"];
           TotalSalesCommAmt=TotalSalesCommAmt+ results[i]["SalesmanCommAmt"];
           let cdate = new Date(results[i]["CreatedDate"]);
           let cdateMDY = `${cdate.getDate()}-${cdate.getMonth() + 1}-${cdate.getFullYear()}`;
           let udate = new Date(results[i]["UpdatedDate"]);
           let udateMDY = `${udate.getDate()}-${udate.getMonth() + 1}-${udate.getFullYear()}`;
           /* Date format you have */
          
           /* Date converted to MM-DD-YYYY format */
          const objdatagrid = {
            TrasactionId:   results[i]["TrasactionId"],
            SalesmId:   results[i]["SalesmId"],
            SalesmanCode:   results[i]["SalesmanCode"],
            CustId:   results[i]["CustId"],
            CommissionRulesId:   results[i]["CommissionRulesId"],
            SoldToName:  results[i]["SoldToName"],
            SoldToState:  results[i]["SoldToState"],
            SoldToCity:  results[i]["SoldToCity"],
            FactoryId:   results[i]["FactoryId"],
            FactoryName:   results[i]["FactoryName"],
            CheckNo:   results[i]["CheckNo"],
            CreatedDate:cdateMDY,
            UpdatedDate:udateMDY,
            MonthName:   results[i]["MonthName"],
            InvoiceNo:  results[i]["SInvoiceNo"],
            TotalSalesAmt:  results[i]["TotalSalesAmt"],
           // GrossCommRate: `${results[i]["GrossCommRate"]}%`,
            GrossCommRate: results[i]["GrossCommRate"],
            GrossCommAmt:  results[i]["GrossCommAmt"],
            SalesmanCommRate:   results[i]["SalesmanCommRate"] ,
            SalesmanCommAmt:  results[i]["SalesmanCommAmt"],
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
          TotalSalesAmt:  TotalAmt,
          GrossCommRate: '',
          GrossCommAmt: TotalCommAmt,
          SalesmanCommRate: '',
          SalesmanCommAmt: TotalSalesCommAmt,
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

  const onClick1 = async (rowData) => {
    // const result = await confirm(
    //   "Do you really want to Update this trasaction Id = " + rowData.TrasactionId + "?"
    // );
  
    
      debugger;
     // rowData.IsActive=false;
     if(isShowDeletecheckChangedYes)
     {
      const result = await confirm(
        "Do you really want to revoke this trasaction Id = " + rowData.TrasactionId + "?"
      );
    
      if (result) {
      axios
      .post("SalesTrasaction/ActiveTransaction?TId="+rowData.TrasactionId)
      .then((res) => {
        if (res.status === 200) {
          debugger;
          successMessageBox("Record has been revoke successfully!");
         // setCommissionRulesId(0);
         // refresh();
         TransctionSearch();
          console.log(res);
        } else {
          errorMessageBox("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
     }
     else{
      const result = await confirm(
        "Do you really want to delete this trasaction Id = " + rowData.TrasactionId + "?"
      );
    
      if (result) {
      axios
      .post("SalesTrasaction/DeActiveTransaction?TId="+rowData.TrasactionId)
      .then((res) => {
        if (res.status === 200) {
          debugger;
          successMessageBox("Record has been deleted successfully!");
         // setCommissionRulesId(0);
         // refresh();
         TransctionSearch();
          console.log(res);
        } else {
          errorMessageBox("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    }
  
  };
  const actions = [
    
    {
      icon: () => <DeleIcon />,
      tooltip: "Delete Transaction",
      onClick: (event, rowData) => {
        onClick1(rowData);
      },
    },
  ];
//             if(IsShowDeletecheckChanged)
// {
  const columns = [
    { title: "TrnsId", field: "TrasactionId" },
    
    { title: "Customer Name", field: "SoldToName" },
    { title: "Factory Name ", field: "FactoryName" },
    // { title: "Check#", field: "CheckNo" },
    
    { title: "Month Name", field: "MonthName" },
    { title: "Salesman Code", field: "SalesmanCode" },
    //{ title: "InvoiceNo", field: "InvoiceNo" },
    { title: "TotalAmt", field: "TotalSalesAmt" },
    { title: "GCommRate", field: "GrossCommRate" },
    { title: "GCommAmt", field: "GrossCommAmt" },
    // { title: "CommRate", field: "SalesmanCommRate" },

    { title: "CommAmt", field: "SalesmanCommAmt" },
    { title: "Created Date", field: "CreatedDate" }, 
    { title: "Updated Date", field: "UpdatedDate" }, 
    // { title: "SoldToAddress", field: "ShipToAddress" },
    // { title: "SoldToState", field: "ShipToCity" },
    // { title: "ShipToName", field: "ShipToName" },
    // { title: "ShipToAddress", field: "ShipToAddress" },
    // { title: "ShipToCity", field: "ShipToCity" },
    // { title: "ShipToState", field: "ShipToState" },
    
  ];
   
    
 

  const TransctionSearch = () => {
    debugger;
    var sd = new Date(startDatevalue);
    var ed = new Date(endDatevalue);
    var sd = sd.toLocaleDateString();
    var ed = ed.toLocaleDateString();
    debugger;

    if (isDateWisecheckChanged){
      debugger;
    if (
      startDatevalue === undefined ||
      startDatevalue === null ||
      startDatevalue === "" ||
      startDatevalue.length === 0
    ) {
      errorMessageBox(
        "Start Date should not be blank, Please select Start Date"
      );

      return;
    }

    if (
      endDatevalue === undefined ||
      endDatevalue === null ||
      endDatevalue === "" ||
      endDatevalue.length === 0
    ) {
      errorMessageBox(
        "End Date should not be blank, Please select End Date"
      );

      return;
    }

    if(startDatevalue.getTime() > endDatevalue.getTime()){
      errorMessageBox(
        "Start Date should be equal or less than from End Date"
      );
  }
  }


    if (!isDateWisecheckChanged){

    if (
      selectedPriorYearValue === undefined ||
      selectedPriorYearValue === null ||
      selectedPriorYearValue === "" ||
      selectedPriorYearValue.length === 0
    ) {
      errorMessageBox(
        "Years  should not be blank, Please select at least one year"
      );

      return;
    }
    if (
      selectedSalesMonthsValue === undefined ||
      selectedSalesMonthsValue === null ||
      selectedSalesMonthsValue === "" ||
      selectedSalesMonthsValue.length === 0
    ) {
      errorMessageBox(
        "Month should not be blank, Please select at least one Month"
      );

      return;
    }

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
  }
    var filters = {
      startDate: sd,
      endDate: ed,
      SelectedYears: selectedPriorYearValue,
      SelectedMonths: selectedSalesMonthsValue,
      FactoryId: selectedFactoryValue,
      SalesmId: selectedSalesmanValue,
      IsDatewise:isDateWisecheckChanged
  
    };
   debugger;
    setData([]);
    GetSalesTransaction(filters);
  };


  const tableRef = React.createRef();
  

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
      
        <h3> Manage Commission Reports</h3>
        
{/* **********************form Start ***************************************** */}
{/* **********************form Start ***************************************** */}

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}></Grid>

            {/* *****************************start Date Range Section ******************************** */}
            
            <Grid item xs={12} sm={2} sx={{ m: 10 }} >
              <label >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Date Range</label>

              <Radio
                {...label}
                checked={isDateWisecheckChanged}
                onChange={DateWisecheckChanged}
                color="primary"
                size="medium"
              />
            </Grid>

           
            <Grid item xs={12} sm={4}  >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                 disabled={isDateRangeEnableDisable}
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

            <Grid item xs={12} sm={4}  >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                 disabled={isDateRangeEnableDisable}
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

            <Grid item xs={12} sm={2}>
           
           </Grid>

           {/* *****************************End Date Range Section ******************************** */}
           

            {/* *****************************Start Years and month Section ******************************** */}
            
            <Grid item xs={12} sm={2}  >
            <label>Years & Months</label>

              <Radio
                {...label}
                checked={isYearandMonthChanged}
                onChange={YearWisecheckChanged}

                
                color="primary"
                size="medium"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MultiselectYearddl
                selectedYears={PriorYearOnchange}
                     disabled={isYearMonthsEnableDisable}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
              <MultiselectMonthddl SelectedMonths={SalesMonthsOnchange}
                 disabled={isYearMonthsEnableDisable}/>
            </Grid>

            <Grid item xs={12} sm={2}>
           
           </Grid>
            <Grid item xs={12} sm={2}>
          
            </Grid>



            <Grid item xs={12} sm={4}>
              <SalesmanmMultiselectddl
                ddlSalesmanSelectedItems={SalesmanOnchange}
                 disabled={isYearMonthsEnableDisable}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
              <MultiselectFcotoryddl Selectedfactorylist={FactoryOnchange}
                   disabled={isYearMonthsEnableDisable} />
            </Grid>
            
            <Grid item xs={12} sm={2}>
          
            </Grid>
            {/* *****************************End Years and month Section ******************************** */}


          <Grid item xs={12} sm={4}>
              <label>Show Delete Records ?</label>
    
              <Radio
                {...label}
                checked={isShowDeletecheckChangedYes}
                onChange={IsShowDeletecheckYes}
                color="primary"
                size="medium"
              />
              <label>Yes</label>
              <Radio
                {...label}
                checked={isShowDeletecheckChangedNo}
                onChange={IsShowDeletecheckNo}
                color="primary"
                size="medium"
              />
              <label>No</label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => TransctionSearch()}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
          
            </Grid>
            
             

        
          </Grid>
        </form>
        
          <MaterialTable
          title=""
          columns={columns}
          data={data}
          icons={tableIcons}
          actions={actions}
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
            exportFileName: "SalesCommAdminReport",
            addRowPosition: "first",
            // actionsColumnIndex: -1,
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
