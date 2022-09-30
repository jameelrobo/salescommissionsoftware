import React, { useState, useEffect, forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";

// import MaterialTable, { Column } from "material-table";

import "jspdf-autotable";

import SalesmanmMultiselectddl from "./SalesmanmMultiselectddl";
import MultiselectFcotoryddl from "./MultiselectFcotoryddl";

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

//import "devextreme/dist/css/dx.light.css";
// import { exportDataGrid } from 'devextreme/excel_exporter';
// import { Workbook } from 'exceljs';
// import saveAs from 'file-saver';
import DataGrid, {
  Column,
  Selection,
  Summary,
  GroupItem,
  GroupPanel,
  Grouping,
  SortByGroupSummaryInfo,
  TotalItem,
  Export,
} from "devextreme-react/data-grid";
// import { jsPDF } from "jspdf";

// const exportFormats = ["pdf"];

import 'devextreme/dist/css/dx.light.css';
//import DataGrid, { Export } from 'devextreme-react/data-grid';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';


const label = { inputProps: { "aria-label": "Checkbox demo" } }; 
const exportFormats = ['xlsx', 'pdf'];

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

  // ************************This is for  Excel Export ***************************
  const onExporting = React.useCallback((e) => {
    if (e.format === 'xlsx') {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Companies');
      exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'SalesCommission.xlsx');
            });
        });
        e.cancel = true;
    } 
    else if (e.format === 'pdf') {
        const doc = new jsPDF();
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component
        }).then(() => {
            doc.save('SalesCommission.pdf');
        })
    };
});
  

// ************************This is for  Excel Export end ***************************

  // ************************This is for  Pdf Export ***************************

  
  // const onExporting = React.useCallback((e) => {
  //   const doc = new jsPDF();

  //   exportDataGrid({
  //     jsPDFDocument: doc,
  //     component: e.component,
  //     //  columnWidths: [20, 20, 20, 20, 10,15, 10, 15, 15],
  //     customizeCell({ gridCell, pdfCell }) {
  //       if (
  //         gridCell.rowType === "data" &&
  //         gridCell.column.dataField === "Phone"
  //       ) {
  //         pdfCell.text = pdfCell.text.replace(
  //           /(\d{3})(\d{3})(\d{4})/,
  //           "($1) $2-$3"
  //         );
  //       } else if (gridCell.rowType === "group") {
  //         pdfCell.backgroundColor = "#BEDFE6";
  //       } else if (gridCell.rowType === "totalFooter") {
  //         pdfCell.font.style = "italic";
  //       }
  //     },
  //     customDrawCell(options) {
  //       const { gridCell, pdfCell } = options;

  //       if (
  //         gridCell.rowType === "data" &&
  //         gridCell.column.dataField === "Website"
  //       ) {
  //         options.cancel = true;
  //         doc.setFontSize(11);
  //         doc.setTextColor("#0000FF");

  //         const textHeight = doc.getTextDimensions(pdfCell.text).h;
  //         doc.textWithLink(
  //           "website",
  //           options.rect.x + pdfCell.padding.left,
  //           options.rect.y + options.rect.h / 2 + textHeight / 2,
  //           { url: pdfCell.text }
  //         );
  //       }
  //     },
  //   }).then(() => {
  //     doc.save("SalescommissionReports.pdf");
  //   });
  // });
  // const phoneNumberFormat = React.useCallback((value) => {
  //   const USNumber = value.match(/(\d{3})(\d{3})(\d{4})/);
  //   return `(${USNumber[1]}) ${USNumber[2]}-${USNumber[3]}`;
  // }, []);

   // ************************This is for  Pdf Export ***************************

 

 

  const classes = useStyles();

  const [selectedFactoryValue, setSelectedFactoryValue] = useState([]);
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState([]);
  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState([]);
  const [selectedSalesMonthsValue, setSelectedSalesMonthsValue] = useState([]);
  const [isDateWisecheckChanged,setIsDateWisecheckChanged] = useState(false);
  
  const DateWisecheckChanged = (state) => {
    debugger;
    setIsDateWisecheckChanged(!isDateWisecheckChanged);
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
  const [startDatevalue, setStartDatevalue] = useState(Date);
  const [endDatevalue, setEndDatevalue] = useState(Date);

  const [data, setData] = useState();
  
  // const numberToCurrency = (num) => {
  //   const formatter = new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   });
  //   return formatter.format(num);
  // };

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
  const [orders, setOrders] = useState([]);
  const GetSalesTransaction = (filters) => {
    axios

      .post("SalesTrasaction/SearchTransaction", filters)

      .then((res) => {
        debugger;
        console.log(res);
        if (res.data.length > 0) {
          debugger;
          setOrders(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const search = () => {
    debugger;
    var sd = new Date(startDatevalue);
    var ed = new Date(endDatevalue);
    var sd = sd.toLocaleDateString();
    var ed = ed.toLocaleDateString();
    debugger;

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

  

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          style={{ width: "40%" }}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <h3> Sales Commission Reports</h3>
        {/* **********************form Start ***************************************** */}

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}></Grid>

            <Grid item xs={12} sm={2}>
              <label>IsDateWise</label>

              <Checkbox
                {...label}
                checked={isDateWisecheckChanged}
                onChange={DateWisecheckChanged}
                color="primary"
                size="medium"
              />
            </Grid>

            <Grid item xs={12} sm={5}>
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

            <Grid item xs={12} sm={5}>
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

           

            <Grid item xs={12} sm={3}>
              <MultiselectYearddl
                selectedYears={PriorYearOnchange}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
              <MultiselectMonthddl SelectedMonths={SalesMonthsOnchange} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <SalesmanmMultiselectddl
                ddlSalesmanSelectedItems={SalesmanOnchange}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
              <MultiselectFcotoryddl Selectedfactorylist={FactoryOnchange} />
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

        {/* **********************form End  ***************************************** */}
        <div class="dx-viewport">
          <div class="demo-container">
            {/* { title: "Created Date", field: "CreatedDate" }, 
    
    
            {/* width={100} */}
            <React.Fragment>
            
            
              <DataGrid
                id="gridContainer"
                dataSource={orders}
                keyExpr="TrasactionId"
                showBorders={true}
                onExporting={onExporting}
              >
              
            {/* <rowType dataField="SoldToName" alignment="center" caption="Customer2"/> */}
           
                {/* <Export enabled={true} formats={exportFormats} /> */}
                
                <GroupPanel visible={true} />
                <Grouping autoExpandAll={true} />

                <Selection mode="single" />
                {/* <Column dataField="CreatedDate" alignment="center"   caption="Date" /> */}
                <Column
                  dataField="SoldToName"
                  alignment="center"
                  caption="Customer"
                />
                {/* <Column
                  dataField="FactoryName"
                  alignment="center"
                  caption="Factory"
                /> */}
                <Column
                  dataField="MonthName"
                  alignment="center"
                  caption="Month"
                />
                <Column
                  dataField="SalesmanCode"
                  alignment="center"
                  caption="Salesman"
                />
                <Column
                  dataField="TotalSalesAmt"
                  alignment="right"
                format="currency"
                  displayFormat="{0}"
                  caption="TotalAmt"
                />
                <Column
                  dataField="GrossCommRate"
                  // format="percent"
                  alignment="center"
                  caption="GCommRate"
                />
                <Column
                  dataField="GrossCommAmt"
                  displayFormat="{0}"
                  alignment="right"
                 format="currency"
                  caption="GCommAmt"
                />
                {/* <Column dataField="SalesmanCommRate" alignment="center" caption="SCommRate"/> */}
                <Column
                  dataField="SalesmanCommAmt"
                  displayFormat="{0}"
                  alignment="right"
                format="currency"
                  caption="SCommAmt"
                />
                <Column dataField="FactoryName" groupIndex={0} />

                <Summary>
                  <GroupItem
                    column="FactoryName"
                    summaryType="count"
                    displayFormat="{0} FactoryName"
                  />
                  <TotalItem
                    column="FactoryName"
                    summaryType="count"
                    displayFormat="Total Records : {0} "
                    showInGroupFooter={true}
                  />
                   <TotalItem
                    column="SalesmanCode"
                    
                    showInGroupFooter={true}
                 
                    alignByColumn={true}
                    displayFormat="Total for Salesman : "
                  />
                  <GroupItem
                    column="TotalSalesAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
                 valueFormat="currency"
                    alignByColumn={true}
                    displayFormat="{0}"
                  />
                  <TotalItem
                    column="TotalSalesAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
                 valueFormat="currency"
                    alignByColumn={true}
                    displayFormat="{0}"
                  />
                  <GroupItem
                    column="GrossCommAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
           valueFormat="currency"
                    alignByColumn={true}
                    displayFormat="{0}"
                  />
                   <TotalItem
                    column="GrossCommAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
           valueFormat="currency"
                    alignByColumn={true}
                    displayFormat=" {0}"
                  />
                  <GroupItem
                    column="SalesmanCommAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
           valueFormat="currency"
                    
                    alignByColumn={true}
                    displayFormat="{0}"
                  />
                   <TotalItem
                    column="SalesmanCommAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
           valueFormat="currency"
                    
                    alignByColumn={true}
                    displayFormat="{0}"
                  />
                {/* <TotalItem
              column="SaleAmount"
              
              summaryType="count"
              displayFormat="Total count: {0} companies"
            /> */}
            
 
          </Summary>
          {/* <Summary>
            <TotalItem
              column="SaleAmount"
              summaryType="count"
              displayFormat="Total count: {0} companies"
            />
            
 <TotalItem
              column="SaleAmount"
              summaryType="sum"
              valueFormat="currency" />  
          </Summary> */}
                
                <SortByGroupSummaryInfo summaryItem="count" />
                <Export enabled={true} formats={exportFormats}></Export>
              </DataGrid>
            </React.Fragment>
          </div>
        </div>
      </div>
    </>
  );
}
