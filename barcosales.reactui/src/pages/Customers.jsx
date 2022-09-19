import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Delete from "@material-ui/icons/Delete";
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
import axios from "axios";
import Grid from "@material-ui/core/Grid";
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

// import { useConfirm } from "material-ui-confirm";
// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirm } from "react-confirm-box";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";

import jsPDF from "jspdf";
import "jspdf-autotable";

import FactoryCategoryddl from "./FactoryCategoryddl";
const EXTENSIONS = ["xlsx", "xls", "csv"];

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

export default function Customers() {
  
  const classes = useStyles();

  const columns = [
    // { title: "SN#", field: "CId" },
    { title: "SN#", field: "CustId" },
    { title: "CustomerName", field: "CustomerName" },
    { title: "CustAliasName", field: "CustAliasName" },
    { title: "SalesmanCode", field: "SalesmanCode" },
    { title: "SalesCommRate", field: "CustomSalesCommRate" },

    { title: "Address", field: "Address" },
    { title: "City", field: "City" },
    { title: "State", field: "State" },
    { title: "Zip", field: "Zip" },
    { title: "Contact", field: "Contact" },
    { title: "Phone", field: "Phone" },
    { title: "EmailId", field: "EmailId" },
    { title: "Mobile", field: "Mobile" },
    { title: "Territory", field: "Territory" },
    { title: "Branch", field: "branch" },

    // { title: "PrincCode", field: "PrincCode" },
    // { title: "FactoryName", field: "FactoryName" },
    //  { title: "CreationDate", field: "CreatedDate" },
    { title: "IsActive", field: "IsActive" },
  ];

  const [data, setData] = useState();
  const [salesman, setSalesman] = useState();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    GetCustomers();
  }, []);

  const GetCustomers = () => {
    axios
      .get("Customer/GetCustomer")

      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        // console.log(element);

        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const [custcolDefs, setCustcolDefs] = useState();
  const importExcel = (e) => {
    const file = e.target.files[0];
    debugger;
    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      // console.log(workSheetName)
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      // console.log(workSheet)
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // console.log(fileData)
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      // console.log(heads)
      setCustcolDefs(heads);

      fileData.splice(0, 1);
      debugger;
      setCustomersdata(convertToJson(headers, fileData));
      // console.log(setData)
      // localStorage.setItem('columns1', JSON.stringify(columns));
      // localStorage.setItem('data1', JSON.stringify(convertToJson(columns, cdata)));
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file input, Select Excel, CSV file");
      }
    } else {
      setCustomersdata([]);
      setCustcolDefs([]);
    }
  };
  const [customersdata, setCustomersdata] = useState();
  const handleClickold = () => {
    customersdata.forEach((custInfo, i) => {
      debugger;
      fetch(
        "http://53.180.62.50.host.secureserver.net:5000/api/SalesTrasaction/AddTrasaction",

        {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(custInfo),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          //  alert(result["message"]);
          if (result["status"] === "ok") {
            window.location.href = "/";
          }
        });
    });
  };
  const handleClick = () => {
    debugger;
    //  alert("save");
    const currDate = new Date().toLocaleString();
    debugger;
    customersdata.forEach((custInfo, i) => {
      debugger;
      let SalesmanId = 0;
      if (custInfo["Avatar"]) {
        if ("Barrett B." === custInfo["Avatar"]) {
          SalesmanId = 1;
        } else if ("Dan B." === custInfo["Avatar"]) {
          SalesmanId = 2;
        } else if (custInfo["Avatar"] === "Don R.") {
          SalesmanId = 3;
        } else if (custInfo["Avatar"] === "Steve B.") {
          SalesmanId = 4;
        } else if (custInfo["Avatar"] === "Tom B.") {
          SalesmanId = 5;
        } else {
          SalesmanId = 0;
        }
      } else {
        SalesmanId = 0;
      }
      debugger;
      var custdata = {
        CId: 0,
        CustId: custInfo["CustId"],
        CustomerName: custInfo["CustomerName"],
        CustAliasName: custInfo["CustomerName"],
        Branch: custInfo["Branch"],
        Address: custInfo["Address"],
        City: custInfo["City"],
        State: custInfo["State"],
        Zip: custInfo["Zip"],
        Contact: custInfo["Contact"],
        Phone: custInfo["Phone"],
        EmailId: custInfo["EmailId"],
        Mobile: custInfo["Mobile"],
        Territory: custInfo["Territory"],
        SalesmanId: SalesmanId,
        // FactoryId: 0,
        CreatedDate: currDate,
        IsActive: 1,
      };
      debugger;
      console.log(custdata);

      debugger;
      console.log(custdata);

      fetch(
        "http://53.180.62.50.host.secureserver.net:5000/api/Customer/AddCustomer",
        {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(custdata),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          alert(result["message"]);
          if (result["status"] === "ok") {
            window.location.href = "/";
          }
        });
    });
  };

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
  const UpdateUser = (id) => {
    window.location = "customers/update/" + id;
  };
  // const existcust = async (rowData) => {
  //   const result = await
  //   );}
  const onClick1 = async (rowData) => {
    const result = await confirm(
      "Do you really want to delete this Id = " + rowData.CustId + "?"
    );

    if (result) {
      debugger;

      axios
        .get("Customer/IsExistCustomerInCommRules?id=" + rowData.CustId)
        .then((res) => {
          debugger;
          if (res.data.length > 0) {
            errorMessageBox(
              "You can't delete this Customer, It is already used in CommissionRules.  : " +
                rowData.CustId
            );
            return;
          } else {
            axios
              .delete("Customer/DeleteCustomer?CId=" + rowData.CustId)
              .then((res) => {
                debugger;
                console.log(res);
                GetCustomers();
                successMessageBox("The record has been deleted successfully!");
              })

              .catch((err) => {
                console.log(err);
                errorMessageBox("Invalid Customer Information!");
              });
          }
        })
        .catch((err) => {
          errorMessageBox("Invalid Customer Id: " + rowData.CustId);
          console.log(err);
          return;
        });

      // axios
      //   .get("Customer/IsExistCustomerInSalesTrasaction?id=" + rowData.CustId)
      //   .then((res) => {
      //     debugger;
      //     if (res.data.length > 0) {
      //       errorMessageBox(
      //         "You can't delete this Customer, It is already used in CommRules.  : " +
      //           rowData.CustId
      //       );
      //       return;
      //     }
      //   })
      //   .catch((err) => {
      //     errorMessageBox("Invalid Customer Id: " + rowData.CustId);
      //     console.log(err);
      //     return;
      //   });

      debugger;

      debugger;
    }
  };
  const actions = [
    {
      icon: () => <EditIcon />,
      tooltip: "Edit Customer",
      onClick: (event, rowData) => {
        debugger;
        localStorage.setItem(
          "selectedItem",
          JSON.stringify(rowData.SalesmanId)
        );
        // setIsDialogOpen(true);
        UpdateUser(rowData.CustId);
      },
    },
    {
      icon: () => <DeleIcon />,
      tooltip: "Delete Customer",
      onClick: (event, rowData) => {
        onClick1(rowData);
      },
    },
  ];

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
  
  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* <h3> Add Customer</h3> */}

        <form className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Link to="/customer/create">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add New Customer
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          actions={actions}
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
            showFirstLastPageButtons: true,
            paginationPosition: "both",
            exportButton: true,
            exportAllData: true,
            exportFileName: "SalesCommission",
            addRowPosition: "first",
            actionsColumnIndex: 0,
            // selection: true,
            //showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            toolbarButtonAlignment: "right",
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
