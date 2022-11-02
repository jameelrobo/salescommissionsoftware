import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React, {
  useState,
  Component,
  useEffect,
  forwardRef,
  useRef,
} from "react";
import Checkbox from "@mui/material/Checkbox";
import MaterialTable, { Column } from "material-table";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Grid from "@material-ui/core/Grid";

import jsPDF from "jspdf";
import "jspdf-autotable";
import FactoryCategoryddl from "./FactoryCategoryddl";
import axios from "axios";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";

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
import "react-toastify/dist/ReactToastify.css";
import { confirm } from "react-confirm-box";

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

export default function Salesman() {
  const classes = useStyles();

  const columns = [
    { title: "SalesmId", field: "SalesmId" },
    { title: "SalesmanCode", field: "SalesmanCode" },
    { title: "SalesmanName", field: "SalesmanName" },
    { title: "Designation", field: "Designation" },
    { title: "CommissionRate", field: "CommissionRate" },
    { title: "EmailId", field: "EmailId" },
    // { title: "JoiningDate", field: "JoiningDate" },
    { title: "Address", field: "Address" },
    { title: "City", field: "City" },
    { title: "State", field: "State" },
    { title: "Zip", field: "Zip" },
    { title: "Mobile", field: "Mobile" },
    // { title: "PrincCode", field: "PrincCode" },
    { title: "IsActive", field: "IsActive" },
  ];

  const [salesman, setSalesman] = useState();
  const [data, setData] = useState([]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    GetSalesman();
  }, []);

  const GetSalesman = () => {
    debugger;
    axios
      .get("SalesPerson/GetSalesPerson")

      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateUser = (id) => {
    window.location = "/salesman/update/" + id;
  };

  const onClick1 = async (rowData) => {
    const result = await confirm(
      "Do you really want to delete this Id = " + rowData.SalesmId + "?"
    );
    if (result) {
      debugger;

      axios
        .get("Customer/IsExistSalesmanInCustomer?id=" + rowData.SalesmId)

        .then((res) => {
          debugger;
          if (res.data.length === 0) {
            axios
              .delete("SalesPerson/DeleteSalesPerson?id=" + rowData.SalesmId)
              .then((res) => {
                debugger;
                console.log(res);
                GetSalesman();
                successMessageBox("The record has been deleted successfully!");
              })
              .catch((err) => {
                console.log(err);
                errorMessageBox("Invalid Salesman : " + rowData.SalesmanCode);
              });
          } else {
            errorMessageBox(
              "You can't delete this salesman, It is already used in customer info.  : " +
                rowData.SalesmanCode
            );
          }
        })
        .catch((err) => {
          errorMessageBox("Invalid Salesman : " + rowData.SalesmId);
          console.log(err);
        });

      debugger;

      return;
    }
    console.log("You click No!");
  };
  const actions = [
    {
      icon: () => <EditIcon />,
      tooltip: "Edit Salesman",
      onClick: (event, rowData) => {
        debugger;
        //localStorage.setItem("selectedItem", JSON.stringify(rowData.SalesmId));
        // setIsDialogOpen(true);
        UpdateUser(rowData.SalesmId);
      },
    },
    {
      icon: () => <DeleIcon />,
      tooltip: "Delete Salesman",
      onClick: (event, rowData) => {
        onClick1(rowData);
      },
    },
  ];

  const successMessageBox = (successMsg) => {
    toast.success(successMsg, {
      position: "top-center",
      autoClose: 5000,
      style: {
        width: '600px',
      },
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
      style: {
        width: '600px',
      },
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div>
        {/* <h3> Add Salesman</h3> */}

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

        <form className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Link to="/salesman/add">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add New Salesman
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          icons={tableIcons}
          tableRef={tableRef}
          actions={actions}
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
            exportFileName: "SalesmanDetails",
            addRowPosition: "first",
            // actionsColumnIndex: -1,
            // selection: true,
            // showSelectAllCheckbox: false,
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
