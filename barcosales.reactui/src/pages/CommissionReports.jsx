import React, { useState, useEffect, forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

// import MaterialTable, { Column } from "material-table";

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
 
import 'devextreme/dist/css/dx.light.css';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import DataGrid, {
  Column,Selection, Summary,GroupItem, GroupPanel, Grouping, SortByGroupSummaryInfo, TotalItem, Export,
} from 'devextreme-react/data-grid';
import { jsPDF } from 'jspdf';

 
const exportFormats = ['pdf'];

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
export default function CommissionReports(props) {

  

  const onExporting = React.useCallback((e) => {
    const doc = new jsPDF();

    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      //  columnWidths: [20, 20, 20, 20, 10,15, 10, 15, 15],
      customizeCell({ gridCell, pdfCell }) {
        if (gridCell.rowType === 'data' && gridCell.column.dataField === 'Phone') {
          pdfCell.text = pdfCell.text.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (gridCell.rowType === 'group') {
          pdfCell.backgroundColor = '#BEDFE6';
        } else if (gridCell.rowType === 'totalFooter') {
          pdfCell.font.style = 'italic';
        }
      },
      customDrawCell(options) {
        const { gridCell, pdfCell } = options;

        if (gridCell.rowType === 'data' && gridCell.column.dataField === 'Website') {
          options.cancel = true;
          doc.setFontSize(11);
          doc.setTextColor('#0000FF');

          const textHeight = doc.getTextDimensions(pdfCell.text).h;
          doc.textWithLink('website',
            options.rect.x + pdfCell.padding.left,
            options.rect.y + options.rect.h / 2 + textHeight / 2, { url: pdfCell.text });
        }
      },
    }).then(() => {
      doc.save('SalescommissionReports.pdf');
    });
  });

  const renderGridCell = React.useCallback((data) => (
    <a href={ data.text } target='_blank' rel='noopener noreferrer'>Website</a>
  ), []);

  const phoneNumberFormat = React.useCallback((value) => {
    const USNumber = value.match(/(\d{3})(\d{3})(\d{4})/);
    return `(${USNumber[1]}) ${USNumber[2]}-${USNumber[3]}`;
  }, []);

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
const [orders,setOrders]=useState([]);
  const GetSalesTransaction = (filters) => {
    axios
     
      .post("SalesTrasaction/SearchTransaction",filters)

      .then((res) => {
        debugger;
        console.log(res);
        if(res.data.length>0)
        {
          debugger;
  orders=res.data;

        }
    
       
      })
      .catch((err) => {
        console.log(err);
      });
  };


 
   

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
  const orders2=[{
    CheckNo :    "",
    CommissionRulesId  :   1,
    CreatedBy   :    1,
    CreatedDate  :   "2022-09-20T00:00:00",
    CustId    :     1221 ,
    FactoryId  :    1 ,
    FactoryName  :    "Charman MFG",
    FinYear  :  null,
    GrossCommAmt  : 19.61,
    GrossCommRate: 5,
    InvoiceNo:6,
    IsActivetrue: 1,
    MonthName : "March" ,
    SalesmId:2,
    SalesmanCode :"Dan B.",
    SalesmanCommAmt:11.77,
    SalesmanCommRate:60,
    SoldToCity:"TOLLESON",
    SoldToName:"ANS DISTRIBUTING",
    SoldToState:"AZ",
    TotalSalesAmt:392.17,
    TrasactionId:1,
    UpdatedBy:null,
    UpdatedDate:"2022-09-20T22:33:15"
  }]
  const orders1 = [{
    ID: 1,
    OrderNumber: 35703,
    OrderDate: '2014-04-10',
    SaleAmount: 11800,
    Terms: '15 Days',
    TotalAmount: 12175,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Los Angeles',
    Employee: 'Harv Mudd',
  }, {
    ID: 4,
    OrderNumber: 35711,
    OrderDate: '2014-01-12',
    SaleAmount: 16050,
    Terms: '15 Days',
    TotalAmount: 16550,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'San Jose',
    Employee: 'Jim Packard',
  }, {
    ID: 5,
    OrderNumber: 35714,
    OrderDate: '2014-01-22',
    SaleAmount: 14750,
    Terms: '15 Days',
    TotalAmount: 15250,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 7,
    OrderNumber: 35983,
    OrderDate: '2014-02-07',
    SaleAmount: 3725,
    Terms: '15 Days',
    TotalAmount: 3850,
    CustomerStoreState: 'Colorado',
    CustomerStoreCity: 'Denver',
    Employee: 'Todd Hoffman',
  }, {
    ID: 9,
    OrderNumber: 36987,
    OrderDate: '2014-03-11',
    SaleAmount: 14200,
    Terms: '15 Days',
    TotalAmount: 14800,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 11,
    OrderNumber: 38466,
    OrderDate: '2014-03-01',
    SaleAmount: 7800,
    Terms: '15 Days',
    TotalAmount: 8200,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Los Angeles',
    Employee: 'Harv Mudd',
  }, {
    ID: 15,
    OrderNumber: 39874,
    OrderDate: '2014-02-04',
    SaleAmount: 9050,
    Terms: '30 Days',
    TotalAmount: 19100,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 18,
    OrderNumber: 42847,
    OrderDate: '2014-02-15',
    SaleAmount: 20400,
    Terms: '30 Days',
    TotalAmount: 20800,
    CustomerStoreState: 'Wyoming',
    CustomerStoreCity: 'Casper',
    Employee: 'Todd Hoffman',
  }, {
    ID: 19,
    OrderNumber: 43982,
    OrderDate: '2014-05-29',
    SaleAmount: 6050,
    Terms: '30 Days',
    TotalAmount: 6250,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 29,
    OrderNumber: 56272,
    OrderDate: '2014-02-06',
    SaleAmount: 15850,
    Terms: '30 Days',
    TotalAmount: 16350,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 30,
    OrderNumber: 57429,
    OrderDate: '2013-12-31',
    SaleAmount: 11050,
    Terms: '30 Days',
    TotalAmount: 11400,
    CustomerStoreState: 'Arizona',
    CustomerStoreCity: 'Phoenix',
    Employee: 'Clark Morgan',
  }, {
    ID: 32,
    OrderNumber: 58292,
    OrderDate: '2014-05-13',
    SaleAmount: 13500,
    Terms: '15 Days',
    TotalAmount: 13800,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Los Angeles',
    Employee: 'Harv Mudd',
  }, {
    ID: 36,
    OrderNumber: 62427,
    OrderDate: '2014-01-27',
    SaleAmount: 23500,
    Terms: '15 Days',
    TotalAmount: 24000,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 39,
    OrderNumber: 65977,
    OrderDate: '2014-02-05',
    SaleAmount: 2550,
    Terms: '15 Days',
    TotalAmount: 2625,
    CustomerStoreState: 'Wyoming',
    CustomerStoreCity: 'Casper',
    Employee: 'Todd Hoffman',
  }, {
    ID: 40,
    OrderNumber: 66947,
    OrderDate: '2014-03-23',
    SaleAmount: 3500,
    Terms: '15 Days',
    TotalAmount: 3600,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 42,
    OrderNumber: 68428,
    OrderDate: '2014-04-10',
    SaleAmount: 10500,
    Terms: '15 Days',
    TotalAmount: 10900,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Los Angeles',
    Employee: 'Harv Mudd',
  }, {
    ID: 43,
    OrderNumber: 69477,
    OrderDate: '2014-03-09',
    SaleAmount: 14200,
    Terms: '15 Days',
    TotalAmount: 14500,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Anaheim',
    Employee: 'Harv Mudd',
  }, {
    ID: 46,
    OrderNumber: 72947,
    OrderDate: '2014-01-14',
    SaleAmount: 13350,
    Terms: '30 Days',
    TotalAmount: 13650,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 47,
    OrderNumber: 73088,
    OrderDate: '2014-03-25',
    SaleAmount: 8600,
    Terms: '30 Days',
    TotalAmount: 8850,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Reno',
    Employee: 'Clark Morgan',
  }, {
    ID: 50,
    OrderNumber: 76927,
    OrderDate: '2014-04-27',
    SaleAmount: 9800,
    Terms: '30 Days',
    TotalAmount: 10050,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 51,
    OrderNumber: 77297,
    OrderDate: '2014-04-30',
    SaleAmount: 10850,
    Terms: '30 Days',
    TotalAmount: 11100,
    CustomerStoreState: 'Arizona',
    CustomerStoreCity: 'Phoenix',
    Employee: 'Clark Morgan',
  }, {
    ID: 56,
    OrderNumber: 84744,
    OrderDate: '2014-02-10',
    SaleAmount: 4650,
    Terms: '30 Days',
    TotalAmount: 4750,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 57,
    OrderNumber: 85028,
    OrderDate: '2014-05-17',
    SaleAmount: 2575,
    Terms: '30 Days',
    TotalAmount: 2625,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Reno',
    Employee: 'Clark Morgan',
  }, {
    ID: 59,
    OrderNumber: 87297,
    OrderDate: '2014-04-21',
    SaleAmount: 14200,
    Terms: '30 Days',
    TotalAmount: 0,
    CustomerStoreState: 'Wyoming',
    CustomerStoreCity: 'Casper',
    Employee: 'Todd Hoffman',
  }, {
    ID: 60,
    OrderNumber: 88027,
    OrderDate: '2014-02-14',
    SaleAmount: 13650,
    Terms: '30 Days',
    TotalAmount: 14050,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 65,
    OrderNumber: 94726,
    OrderDate: '2014-05-22',
    SaleAmount: 20500,
    Terms: '15 Days',
    TotalAmount: 20800,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'San Jose',
    Employee: 'Jim Packard',
  }, {
    ID: 66,
    OrderNumber: 95266,
    OrderDate: '2014-03-10',
    SaleAmount: 9050,
    Terms: '15 Days',
    TotalAmount: 9250,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 69,
    OrderNumber: 98477,
    OrderDate: '2014-01-01',
    SaleAmount: 23500,
    Terms: '15 Days',
    TotalAmount: 23800,
    CustomerStoreState: 'Wyoming',
    CustomerStoreCity: 'Casper',
    Employee: 'Todd Hoffman',
  }, {
    ID: 70,
    OrderNumber: 99247,
    OrderDate: '2014-02-08',
    SaleAmount: 2100,
    Terms: '15 Days',
    TotalAmount: 2150,
    CustomerStoreState: 'Utah',
    CustomerStoreCity: 'Salt Lake City',
    Employee: 'Clark Morgan',
  }, {
    ID: 78,
    OrderNumber: 174884,
    OrderDate: '2014-04-10',
    SaleAmount: 7200,
    Terms: '30 Days',
    TotalAmount: 7350,
    CustomerStoreState: 'Colorado',
    CustomerStoreCity: 'Denver',
    Employee: 'Todd Hoffman',
  }, {
    ID: 81,
    OrderNumber: 188877,
    OrderDate: '2014-02-11',
    SaleAmount: 8750,
    Terms: '30 Days',
    TotalAmount: 8900,
    CustomerStoreState: 'Arizona',
    CustomerStoreCity: 'Phoenix',
    Employee: 'Clark Morgan',
  }, {
    ID: 82,
    OrderNumber: 191883,
    OrderDate: '2014-02-05',
    SaleAmount: 9900,
    Terms: '30 Days',
    TotalAmount: 10150,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Los Angeles',
    Employee: 'Harv Mudd',
  }, {
    ID: 83,
    OrderNumber: 192474,
    OrderDate: '2014-01-21',
    SaleAmount: 12800,
    Terms: '30 Days',
    TotalAmount: 13100,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'Anaheim',
    Employee: 'Harv Mudd',
  }, {
    ID: 84,
    OrderNumber: 193847,
    OrderDate: '2014-03-21',
    SaleAmount: 14100,
    Terms: '30 Days',
    TotalAmount: 14350,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'San Diego',
    Employee: 'Harv Mudd',
  }, {
    ID: 85,
    OrderNumber: 194877,
    OrderDate: '2014-03-06',
    SaleAmount: 4750,
    Terms: '30 Days',
    TotalAmount: 4950,
    CustomerStoreState: 'California',
    CustomerStoreCity: 'San Jose',
    Employee: 'Jim Packard',
  }, {
    ID: 86,
    OrderNumber: 195746,
    OrderDate: '2014-05-26',
    SaleAmount: 9050,
    Terms: '30 Days',
    TotalAmount: 9250,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Las Vegas',
    Employee: 'Harv Mudd',
  }, {
    ID: 87,
    OrderNumber: 197474,
    OrderDate: '2014-03-02',
    SaleAmount: 6400,
    Terms: '30 Days',
    TotalAmount: 6600,
    CustomerStoreState: 'Nevada',
    CustomerStoreCity: 'Reno',
    Employee: 'Clark Morgan',
  }, {
    ID: 88,
    OrderNumber: 198746,
    OrderDate: '2014-05-09',
    SaleAmount: 15700,
    Terms: '30 Days',
    TotalAmount: 16050,
    CustomerStoreState: 'Colorado',
    CustomerStoreCity: 'Denver',
    Employee: 'Todd Hoffman',
  }, {
    ID: 91,
    OrderNumber: 214222,
    OrderDate: '2014-02-08T00:00:00',
    SaleAmount: 11050,
    Terms: '30 Days',
    TotalAmount: 11250,
    CustomerStoreState: 'Arizona',
    CustomerStoreCity: 'Phoenix',
    Employee: 'Clark Morgan',
  }];
  

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
       

        <div class="dx-viewport">
    <div class="demo-container">

    {/* { title: "Created Date", field: "CreatedDate" }, 
    
   
     { title: "Customer Name", field: "SoldToName" },
     { title: "Factory Name ", field: "FactoryName" },
     // { title: "Check#", field: "CheckNo" },
     
     { title: "Month Name", field: "MonthName" },
     { title: "Salesman Code", field: "SalesmanCode" },
     //{ title: "InvoiceNo", field: "InvoiceNo" },
     { title: "TotalAmt", field: "TotalSalesAmt" },
     { title: "GCommRate", field: "GrossCommRate" },
     { title: "GCommAmt", field: "GrossCommAmt" },
     { title: "CommRate", field: "SalesmanCommRate" },
 
     { title: "CommAmt", field: "SalesmanCommAmt" }, */}

     {/* GrossCommAmt  : 19.61,
    GrossCommRate: 5,
    InvoiceNo:6,
    IsActivetrue: 1,
    MonthName : "March" ,
    SalesmId:2,
    SalesmanCode :"Dan B.",
    SalesmanCommAmt:11.77,
    SalesmanCommRate:60,
    SoldToCity:"TOLLESON",
    SoldToName:"ANS DISTRIBUTING",
    SoldToState:"AZ",
    TotalSalesAmt:392.17, */}

{/* width={100} */}
    <React.Fragment>
        <DataGrid
          id="gridContainer"
          dataSource={orders2}
          keyExpr="TrasactionId"
          showBorders={true}
          onExporting={onExporting} 
          >
          
<Export enabled={true} formats={exportFormats} />
        <GroupPanel visible={true} />
        <Grouping autoExpandAll={true} />
       
          <Selection mode="single" />
          {/* <Column dataField="CreatedDate" alignment="center"   caption="Date" /> */}
          <Column dataField="SoldToName" alignment="center" caption="Customer" />
          <Column dataField="FactoryName" alignment="center"  caption="Factory"   />
          <Column dataField="MonthName" alignment="center"  caption="Month"   />
          <Column dataField="SalesmanCode" alignment="center" caption="Salesman" />
          <Column dataField="TotalSalesAmt" alignment="right" format="currency" caption="TotalAmt"/>
          <Column dataField="GrossCommRate" alignment="center" caption="GCommRate"/>
          <Column dataField="GrossCommAmt" alignment="right" format="currency" caption="GCommAmt"/>
          {/* <Column dataField="SalesmanCommRate" alignment="center" caption="SCommRate"/> */}
          <Column dataField="SalesmanCommAmt" alignment="right" format="currency" caption="SCommAmt"/>
          <Column dataField="FactoryName" groupIndex={0} /> 
        

          <Summary>
            <GroupItem   column="FactoryName"  summaryType="count"  displayFormat="{0} FactoryName" />
            <GroupItem   column="TotalSalesAmt"     summaryType="sum"    showInGroupFooter={true}  valueFormat="currency"   alignByColumn={true} displayFormat="{0}" />
            <GroupItem   column="GrossCommAmt"     summaryType="sum"    showInGroupFooter={true}  valueFormat="currency"   alignByColumn={true} displayFormat="{0}" />
            <GroupItem   column="SalesmanCommAmt"      summaryType="sum"    showInGroupFooter={true}  valueFormat="currency"   alignByColumn={true} displayFormat="{0}" />
            
          </Summary>
          <SortByGroupSummaryInfo summaryItem="count" />
        </DataGrid>
      </React.Fragment>
    </div>
  </div>

       
      </div>

    </>
  );
}
