import React, { useState, Component, useEffect, forwardRef } from "react";
import MaterialTable, { Column } from "material-table";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { StyledEngineProvider } from "@mui/material/styles";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import PrintIcon from "@material-ui/icons/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wait } from "@testing-library/user-event/dist/utils";


const EXTENSIONS = ["xlsx", "xls", "csv"];
export default function CalculateCommission(props) {
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
  const handleClick = () => {
    debugger;
    salesComissiongridData.forEach((salesRecord, i) => {
      axios
        .post("/SalesTrasaction/AddTrasaction", salesRecord)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      debugger;
   
    });
    successMessageBox(
      "All the records has been inserted Successfully!"
    );
  };
  const columns = [
    { title: "Customer", field: "SoldToName" },
    { title: "FactoryName", field: "FactoryName" },
  //  { title: "Check", field: "Check" },
    { title: "Month", field: "MonthName" },
    { title: "SalesmanCode", field: "SalesmanCode" },
    
  //  { title: "Invoice No", field: "InvoiceNo" },
    { title: "TotalSalesAmt", field: "TotalSalesAmt" },
    { title: "GrossCommRate", field: "GrossCommRate" },
    { title: "GrossComm", field: "GrossCommAmt" },
    { title: "SalesmanCommRate", field: "SalesmanCommRate" },
    { title: "SalesmanComm", field: "SalesmanCommAmt" },
  ];
  const [data, setData] = useState();
  const [salesComissiongridData, setSalesComissiongridData] = useState();
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("salesComissionData")));
    setSalesComissiongridData(
      JSON.parse(localStorage.getItem("salesComissiongridData"))
    );
    successMessageBox(
      "Sales commission calculated Successfully!"
    );
  }, []);

  const GetSalesTransaction = () => {
    axios
      .get("SalesTrasaction/GetTrasaction")

      .then((res) => {
        debugger;
        console.log(res.data);
        //setData(res.data);
        setData(JSON.parse(localStorage.getItem("salesComissionData")));
        setSalesComissiongridData(
          JSON.parse(localStorage.getItem("salesComissiongridData"))
        );
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch(
    //   "http://53.180.62.50.host.secureserver.net:5000/api/SalesTrasaction/GetTrasaction"
    // )
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setData(JSON.parse(localStorage.getItem("salesComissionData")));
    //     setSalesComissiongridData(
    //       JSON.parse(localStorage.getItem("salesComissiongridData"))
    //     );
    //   });
  };

  //  const data = JSON.parse(localStorage.getItem("salesComissionData"));

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    // FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    // LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
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
        {/* <h4>Calculated Sales Commission </h4> */}
        {/* <Button type="submit" fullWidth variant="contained" color="primary">
          Save Calculated Sales Commission
        </Button> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => handleClick()}
          color="primary"
        >
          Save Calculated Sales Commission
        </Button>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          icons={tableIcons}
          options={{
            sorting: true,
            search: true,
            searchFieldAlignment: "right",
            searchAutoFocus: true,
            searchFieldVariant: "standard",
            filtering: true,
            paging: true,
            pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
            pageSize: 5,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "both",
            exportButton: true,
            exportAllData: true,
            exportFileName: "SalesCommission",
            addRowPosition: "first",
            actionsColumnIndex: -1,
            selection: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            grouping: true,
            columnsButton: true,
            rowStyle: (data, index) =>
              index % 2 === 0 ? { background: "#f5f5f5" } : null,
            headerStyle: { background: "#f44336", color: "#fff" },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => handleClick()}
          color="primary"
        >
          Save Calculated Sales Commission
        </Button>
        {/* <Link to="/transaction/calculate">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleClick()}
                >
                  Calculate Sales Commission
                </Button>
              </Link> */}
      </div>
    </>
  );
}
