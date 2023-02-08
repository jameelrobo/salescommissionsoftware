import React, { useState, useEffect, forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ToastContainer, toast } from "react-toastify";
import Fade from "@material-ui/core/Fade";

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

import "devextreme/dist/css/dx.light.css";
//import DataGrid, { Export } from 'devextreme-react/data-grid';
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import ComboBox from "./AutoCompleteddl";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const exportFormats = ["xlsx", "pdf"];

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
    if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Companies");
      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "SalescommissionReport.xlsx"
          );
        });
      });
      e.cancel = true;
    } else if (e.format === "pdf") {
      debugger;
      const doc = new jsPDF("l");

      exportDataGridToPdf({
        jsPDFDocument: doc,

        columnWidths: [70, 15, 15, 40, 35, 30, 30, 30],

        component: e.component,
      }).then(() => {
        doc.save("SalesCommissionReport.pdf");
      });
    }
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
  const [isDateWisecheckChanged, setIsDateWisecheckChanged] = useState(false);
  const [isYearandMonthChanged, setIsYearandMonthChanged] = useState(true);
  const [isDateRangeEnableDisable, setIsDateRangeEnableDisable] =
    useState(true);
  const [isYearMonthsEnableDisable, setIsYearMonthsEnableDisable] =
    useState(false);

  const DateWisecheckChanged = (state) => {
    setIsDateWisecheckChanged(!isDateWisecheckChanged);
    debugger;
    //  setIsEnableDisable(isDateWisecheckChanged);
    if (isDateWisecheckChanged) {
      setStartDatevalue(null);
      setEndDatevalue(null);
      setIsYearandMonthChanged(true);
      setIsDateRangeEnableDisable(true);
      setIsYearMonthsEnableDisable(false);
      setSelectedFactoryValue(null);
      setSelectedSalesmanValue(null);
    } else {
      setStartDatevalue(null);
      setEndDatevalue(null);
      setIsDateRangeEnableDisable(false);
      setIsYearMonthsEnableDisable(true);
      setIsYearandMonthChanged(false);
    }

    //setIsDisable(!allCustchecked);
  };
  const YearWisecheckChanged = (state) => {
    setIsYearandMonthChanged(!isYearandMonthChanged);
    debugger;
    // setIsEnableDisable(isYearandMonthChanged);
    if (isYearandMonthChanged) {
      setIsDateWisecheckChanged(true);
      setIsDateRangeEnableDisable(false);
      setIsYearMonthsEnableDisable(true);
      setStartDatevalue(null);
      setEndDatevalue(null);
      setSelectedFactoryValue([]);
      setSelectedSalesmanValue([]);
    } else {
      setIsDateWisecheckChanged(false);
      setIsDateRangeEnableDisable(true);
      setIsYearMonthsEnableDisable(false);
      setStartDatevalue(null);
      setEndDatevalue(null);
    }

    //setIsDisable(!allCustchecked);
  };

  const FactoryOnchange = (value) => {
    debugger;
    setSelectedFactoryValue(value);
    debugger;
    console.log(value);
  };

  const [customeronchange, setCustomeronchange] = useState([]);

  const CustomerOnchange = (value) => {
    debugger;
    // if(value)
    // {
      
    //   setCustomeronchange(value);
    // }
    // else
    // {
    //   setCustomeronchange(null);
    // }
    setCustomeronchange(value);
    
    debugger;
    console.log("all"+customeronchange);
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
      SalesmId: 0,
      CustIds:0
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
        else{

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

    if (isDateWisecheckChanged) {
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
        errorMessageBox("End Date should not be blank, Please select End Date");

        return;
      }

      if (startDatevalue.getTime() > endDatevalue.getTime()) {
        errorMessageBox(
          "Start Date should be equal or less than from End Date"
        );
      }
    }

    if (!isDateWisecheckChanged) {
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
    var custis=[];
    if(customeronchange.length>0)
    {
      for (let i = 0; i < customeronchange.length; i++) {
       // text += cars[i] + "<br>";
        custis.push(customeronchange[i]["CustId"]);
      }
    }
    else{
      custis=[];
    }


    var filters = {
      startDate: sd,
      endDate: ed,
      SelectedYears: selectedPriorYearValue,
      SelectedMonths: selectedSalesMonthsValue,
      FactoryId: selectedFactoryValue,
      SalesmId: selectedSalesmanValue,
     // CustIds:customeronchange,
     CustIds:custis,
      IsDatewise: isDateWisecheckChanged,
      
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

            {/* *****************************start Date Range Section ******************************** */}

            <Grid item xs={12} sm={2}>
              <label  style={{paddingLeft:45}}> Date Range</label>

              <Radio
                {...label}
                checked={isDateWisecheckChanged}
                onChange={DateWisecheckChanged}
                color="primary"
                size="medium"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
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

            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={2}></Grid>

            {/* *****************************End Date Range Section ******************************** */}

            {/* *****************************Start Years and month Section ******************************** */}

            <Grid item xs={12} sm={2}></Grid>

            <Grid item xs={12} sm={4}>
              <SalesmanmMultiselectddl
                ddlSalesmanSelectedItems={SalesmanOnchange}
                //  booldisabled={isDateRangeEnableDisable}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
              <MultiselectFcotoryddl
                Selectedfactorylist={FactoryOnchange}
                //  booldisabled={isDateRangeEnableDisable}
              />
            </Grid>
             
           
            <Grid item xs={12} sm={2}>
                
            </Grid>

            <Grid item xs={12} sm={2}>
              <label style={{paddingTop:30, paddingLeft:20}}>Years & Months</label>

              <Radio
                label="years & Month"
                checked={isYearandMonthChanged}
                onChange={YearWisecheckChanged}
                color="primary"
                size="medium"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MultiselectYearddl
                booldisabled={isYearMonthsEnableDisable}
                selectedYears={PriorYearOnchange}
                // selectedSalesmanItem={selectedSalesmanItem}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              {/* <FactoriesDropdownlistTr
               factoryddlOnchang={FactoryOnchange} /> */}
              <MultiselectMonthddl
                SelectedMonths={SalesMonthsOnchange}
                booldisabled={isYearMonthsEnableDisable}
              />
            </Grid>
            <Grid item xs={12} sm={2}></Grid>


            {/* ************************start search via Customer */}
            
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
               <ComboBox 
               selectedCustomer={CustomerOnchange} />
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
             {/* ************************End search via Customer */}


            {/* *****************************End Years and month Section ******************************** */}

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
                  alignment="left"
                  caption="Customer Name"
                />
                <Column
                  dataField="FinYear"
                  alignment="center"
                  caption="Years"
                />

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
                  format="$ #,##0.##"
                  // displayFormat= "0.0"
                  // precision="2"
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
                  // displayFormat= "0.0"
                  // precision="2"
                  alignment="right"
                  format="$ #,##0.##"
                  caption="GCommAmt"
                />
                {/* <Column dataField="SalesmanCommRate" alignment="center" caption="SCommRate"/> */}
                <Column
                  dataField="SalesmanCommAmt"
                  // displayFormat="{0}"
                  alignment="right"
                  format="$ #,##0.##"
                  caption="SCommAmt"
                />
                <Column dataField="FactoryName" groupIndex={0} />

                <Summary>
                  <GroupItem
                    column="FactoryName"
                    summaryType="count"
                    displayFormat="{0}"
                  />
                  <TotalItem
                    column="FactoryName"
                    summaryType="count"
                    displayFormat="Total Records : {0} "
                    showInGroupFooter={true}
                  />
                  <GroupItem
                    column="SoldToName"
                    showInGroupFooter={true}
                    //alignByColumn={true}
                    alignment="right"
                    displayFormat="Total for principal : "
                  />
                  <TotalItem
                    column="SoldToName"
                    showInGroupFooter={true}
                    // alignByColumn={true}
                    alignment="right"
                    displayFormat="Total for Salesman : "
                  />
                  <GroupItem
                    column="TotalSalesAmt"
                    summaryType="sum"
                    valueFormat="##0.00"
                    displayFormat=" {0}"
                    showInGroupFooter={true}
                    //  valueFormat="currency"
                    alignByColumn={true}
                    // displayFormat="{0}"
                  />
                  <TotalItem
                    column="TotalSalesAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
                    //  valueFormat="currency"
                    valueFormat="##0.00"
                    displayFormat=" {0}"
                    alignByColumn={true}
                    // displayFormat="{0}"
                  />
                  <GroupItem
                    column="GrossCommAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
                    //  valueFormat="currency"
                    valueFormat="##0.00"
                    displayFormat=" {0}"
                    alignByColumn={true}
                    // displayFormat="{0}"
                  />
                  <TotalItem
                    column="GrossCommAmt"
                    summaryType="sum"
                    showInGroupFooter={true}
                    //  valueFormat="currency"
                    valueFormat="##0.00"
                    displayFormat=" {0}"
                    alignByColumn={true}
                    // displayFormat=" {0}"
                  />
                  <GroupItem
                    column="SalesmanCommAmt"
                    summaryType="sum"
                    displayFormat=" {0}"
                    showInGroupFooter={true}
                    valueFormat="##0.00"
                  />
                  <TotalItem
                    column="SalesmanCommAmt"
                    summaryType="sum"
                    displayFormat=" {0}"
                    showInGroupFooter={true}
                    alignByColumn={true}
                    valueFormat="##0.00"
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
