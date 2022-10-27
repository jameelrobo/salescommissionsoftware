import React, { useState, Component, useEffect, forwardRef } from "react";

import { Link } from "react-router-dom";

import MaterialTable, { Column } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FactoriesDropdownlist from "./FactoriesDropdownlist";
import PriorYearDropdownlist from "./PriorYearDropdownlist";
import Customerddl from "./Customerddl";
import SalesmanDropdownlist from "./SalesmanDropdownlist";
import FactoryCategoryddl from "./FactoryCategoryddl";

import Checkbox from "@mui/material/Checkbox";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirm } from "react-confirm-box";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function CommissonRules(props) {
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
  const [priorYear, setPriorYear] = React.useState("");

  const handleChange = (event) => {
    setPriorYear(event.target.value);
    debugger;
    console.log(priorYear);
  };
  const [isDisable, setIsDisable] = useState(false);
  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState("");
  const [selectedCustomerValue, setSelectedCustomerValue] = useState("");
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState("");
  const [selectedFactoryValue, setSelectedFactoryValue] = useState("");
  const [selectedFactCategoryValue, setSelectedFactCategoryValue] =
    useState("");

  const FactoryCategoryOnchange = (value) => {
    setSelectedFactCategoryValue(value);
    debugger;
    console.log(selectedFactCategoryValue);
  };

  const FactoryOnchange = (value) => {
    setSelectedFactoryValue(value);
    debugger;
    console.log(selectedFactoryValue);
  };

  const SalesmanOnchange = (value) => {
    setSelectedSalesmanValue(value);
    debugger;
    console.log(selectedSalesmanValue);
  };

  const PriorYearOnchange = (value) => {
    setSelectedPriorYearValue(value);
    debugger;
    console.log(selectedPriorYearValue);
  };
  const CustomerOnchange = (value) => {
    setSelectedCustomerValue(value);
    debugger;
    console.log(selectedCustomerValue);
  };

  const [checked, setChecked] = useState(true);
  const checkChanged = (state) => {
    setChecked(!checked);
  };
  const [allCustchecked, setAllCustchecked] = useState(false);
  debugger;
  const AllCustomercheckChanged = (state) => {
    setAllCustchecked(!allCustchecked);
    setIsDisable(!allCustchecked);
  };

  const classes = useStyles();

  const [data, setData] = useState([]);
  const columns = [
    { title: "CommissionRulesId", field: "CommissionRulesId" },
    { title: "CustomerName", field: "CustomerName" },
    { title: "PrincCode", field: "PrincCode" },
    { title: "FactoryName", field: "FactoryName" },
    { title: "CommisionRate", field: "CommisionRate" },
    // { title: "FinYearId", field: "FinYearId" },
    { title: "IsActiveForAll", field: "IsActiveForAll" },
    { title: "IsActive", field: "IsActive" },
  ];

  const [selectedPriorYearItem, setSelectedPriorYearItem] = useState(22);
  const [selectedFactoryId, setSelectedFactoryId] = useState(0);
  const [finYear, setFinYear] = useState("");
  const [commissionRulesId, setCommissionRulesId] = useState(0);
  const [factoryId, setSetFactoryId] = useState(0);
  const [factoryName, setFactoryName] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [isActive, setIsActive] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [custId, setCustId] = useState("");
  const [getCustomers, setGetCustomers] = useState([]);
  const [customerName, setCustomerName] = useState(null);

  const getAllCustomers = () => {
    axios
      .get("Customer/GetCustomer")

      .then((res) => {
        debugger;
        console.log(res.data);
        //setData(res.data);
        setGetCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCustInfo = (custName) => {
    debugger;
    var custInfo = getCustomers.find((item) => item.CustomerName.trim() === custName.trim());
    //const custInfo = getCustomers.filter(item=> item.CustomerName.includes(custName));
    //const custInfo = getCustomers.filter(app=> custName.includes(app.toLowerCase()))
    // if (custInfo === undefined) {
    //   errorMessageBox(
    //     "Couldn't found  Customer name, Please ender correct customer name"
    //   );
    //   return;
    //}
    return custInfo;
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

  const handleSubmit = (event) => {
    debugger;
    event.preventDefault();
    var custId = 0;

    debugger;
    // if (
    //   selectedPriorYearValue === undefined ||
    //   selectedPriorYearValue === null ||
    //   selectedPriorYearValue === "" ||
    //   selectedPriorYearValue === 0
    // ) {
    //   errorMessageBox(
    //     "Fin Year should not be blank, Please select at least one Fin Year"
    //   );
    //   return;
    // }

    if (
      selectedFactCategoryValue === undefined ||
      selectedFactCategoryValue === null ||
      selectedFactCategoryValue === "" ||
      selectedFactCategoryValue === 0
    ) {
      errorMessageBox(
        "Factory Category should not be blank, Please select at least one category"
      );
      return;
    }
    if (
      selectedFactoryValue === undefined ||
      selectedFactoryValue === null ||
      selectedFactoryValue === "" ||
      selectedFactoryValue === 0
    ) {
      errorMessageBox(
        "Factory  should not be blank, Please select at least one Factory"
      );
      return;
    }
    debugger;
    if (
      customerName === undefined ||
      customerName === null ||
      customerName === "" ||
      customerName === ""
    ) {
      custId = 0;
    } else {
      debugger;
      var custinfo = getCustInfo(customerName);

      if (custinfo === undefined) {
        custId = 0;
        errorMessageBox(
          "Couldn't found  Customer name, Please enter currect customer name"
        );
        return;
      } else {
        custId = custinfo.CustId;
      }
    }
debugger;
    
    var CommRule = {
      CommissionRulesId: commissionRulesId,
      FinYearId: selectedPriorYearValue,
      FactoryCategoryId: selectedFactCategoryValue,
      FactoryId: selectedFactoryValue,
      CustId: custId,
      SalesmanId: 0,
      CreatedDate: createdDate,
      CommisionRate: commissionRate,
      IsActiveForAll: allCustchecked,
      IsActive: checked,
    };

    if (commissionRulesId > 0) {
      var CommRulesinfo = data.find(
        (item) =>
        parseInt(item.FactoryCategoryId)=== parseInt(selectedFactCategoryValue) &&
        parseInt(item.FactoryId) === parseInt(selectedFactoryValue) &&
        parseInt( item.CustId) === parseInt(custId) &&
        parseFloat(item.CommisionRate) === parseFloat(commissionRate) 
          // item.IsActive === checked &&
          // item.IsActiveForAll === allCustchecked 
  
      );
      if (
        CommRulesinfo === undefined ||
        CommRulesinfo === null ||
        CommRulesinfo === ""  
      
      ) 
      {
  
        //Go ahead
      }
      else
      {
        errorMessageBox(
          "The Comm. Rule  Already exist in db, You can't create same rule"
        );
        return;
      }
      axios
        .put("CommissionRules/EditCommissionRules", CommRule)
        .then((res) => {
          if (res.status === 200) {
            debugger;
            successMessageBox("Record has been updated successfully!");
            setCommissionRulesId(0);
           // refresh();
            GetCummRules();
            console.log(res);
          } else {
            errorMessageBox("Invalid  Information!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

      var CommRulesinfo = data.find(
        (item) =>
        parseInt(item.FactoryCategoryId)=== parseInt(selectedFactCategoryValue) &&
        parseInt(item.FactoryId) === parseInt(selectedFactoryValue) &&
        parseInt( item.CustId) === parseInt(custId) 
       // parseFloat(item.CommisionRate) === parseFloat(commissionRate) 
          // item.IsActive === checked &&
          // item.IsActiveForAll === allCustchecked 
  
      );
      if (
        CommRulesinfo === undefined ||
        CommRulesinfo === null ||
        CommRulesinfo === ""  
      
      ) 
      {
  
        //Go ahead
      }
      else
      {
        errorMessageBox(
          "The Comm. Rule  Already exist in db, You can't create same rule"
        );
        return;
      }
      axios
        .post("CommissionRules/AddCommissionRules", CommRule)
        .then((res) => {
          if (res.status === 200) {
            successMessageBox("Record has been added successfully!");
          //  refresh();
            GetCummRules();
          }

          console.log(res);
          debugger;
        })
        .catch((err) => {
          console.log(err);
          errorMessageBox("Invalid  Information!");
        });
    }
  };

  useEffect(() => {
    getAllCustomers();
    GetCummRules();
  }, []);

  const GetCummRules = () => {
    axios
      .get("CommissionRules/GetCommissionRules?id=0")

      .then((res) => {
        debugger;
        console.log(res.data);
        //setData(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateFactory = (id) => {
    // window.location = "customers/update/" + id;
    debugger;
    axios
      .get("CommissionRules/GetCommissionRules?id=" + id)

      .then((res) => {
        debugger;
        
        setCommissionRulesId(res.data[0].CommissionRulesId);
        setSelectedFactCategoryValue(res.data[0].FactoryCategoryId);
        setSelectedFactoryValue(res.data[0].FactoryId);
       // setSelectedPriorYearItem(res.data[0].FinYearId);
        setFactoryName(res.data[0].FactoryName);
        setCustomerName(res.data[0].CustomerName);
        setSelectedPriorYearValue(res.data[0].FinYearId);
        setChecked(res.data[0].IsActive);
        setCommissionRate(res.data[0].CommisionRate);
        setSelectedFactoryId(res.data[0].FactoryId);
        setAllCustchecked(res.data[0].IsActiveForAll);
        setCreatedDate(res.data[0].CreatedDate);
        setCustId(res.data[0].CustId);

        setIsDisable(res.data[0].IsActiveForAll);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickDelete = async (rowData) => {
    const result = await confirm(
      "Do you really want to delete this Id = " +
        rowData.CommissionRulesId +
        "?"
    );
    if (result) {
      debugger;

      axios
        .delete(
          "CommissionRules/DeleteCommissionRules?id=" +
            rowData.CommissionRulesId
        )
        .then((res) => {
          debugger;
          console.log(res);
          GetCummRules();
          successMessageBox("Record has been deleted successfully!");
        })
        .catch((err) => {
          errorMessageBox("Invalid  Information!");
          console.log(err);
        });
      debugger;
      // alert("Delete = " + rowData.CustId);
      return;
    }
    console.log("You click No!");
  };
  const actions = [
    {
      icon: () => <EditIcon />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        debugger;
       // refresh();
        UpdateFactory(rowData.CommissionRulesId);
      },
    },
    {
      icon: () => <DeleIcon />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        onClickDelete(rowData);
      },
    },
  ];
  const refresh = () => {
    setCommissionRulesId(0);

    setSelectedFactCategoryValue("");
    setSelectedFactoryValue("");
   // setSelectedPriorYearItem(22);
    setFactoryName("");
    setCustomerName("");
    setSelectedPriorYearValue("22");
    setChecked(true);
    setCommissionRate("");
    setSelectedFactoryId("");
    setAllCustchecked(false);

    setCustId(0);
  };

  const clear = () => {
    debugger;
    refresh();
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Sales Commission Details", 20, 10);
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: data,
    });
    doc.save("SalesCommission.pdf");
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
        <h3>Add / Update Commission Rules</h3>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={3}>
              <PriorYearDropdownlist
                ddlOnchang={PriorYearOnchange}
                selectedPriorYearValue={selectedPriorYearItem}
              />
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <FactoryCategoryddl
                ddlOnchang={FactoryCategoryOnchange}
                selectfCategory={selectedFactCategoryValue}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FactoriesDropdownlist
                ddlOnchang={FactoryOnchange}
                selectcategory={selectedFactCategoryValue}
                selectedFactoryId={selectedFactoryId}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Is Active For All</label>

              <Checkbox
                {...label}
                checked={allCustchecked}
                onChange={AllCustomercheckChanged}
                color="primary"
                size="medium"
              />
            </Grid>
            {/* 
            <Grid item xs={12} sm={3}>
              <Customerddl ddlOnchang={CustomerOnchange} />
            </Grid> */}
            {/* <Grid item xs={12} sm={3}>
              <SalesmanDropdownlist ddlOnchang={SalesmanOnchange} />
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <TextField
                disabled={isDisable}
                value={customerName}
                autoComplete="customerName"
                name="customerName"
                variant="outlined"
                fullWidth
                id="customerName"
                label="Customer Name"
                onChange={(e) => setCustomerName(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                value={commissionRate}
                required
                type="number"
                autoComplete="commissionRate"
                name="commissionRate"
                variant="outlined"
                fullWidth
                id="commissionRate"
                label="Commission Rate"
                onChange={(e) => setCommissionRate(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>IsActive</label>

              <Checkbox
                {...label}
                checked={checked}
                onChange={checkChanged}
                color="primary"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
              >
                Add / Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => clear()}
              >
                Cancel / Refresh
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}></Grid>
          </Grid>

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button> */}
        </form>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
          icons={tableIcons}
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
            exportFileName: "CommissionRulesReport",
            addRowPosition: "first",
            // actionsColumnIndex: -1,
            // selection: true,
            // showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            // selectionProps: (rowData) => ({
            //   disabled: rowData.age == null,
            //   // color:"primary"
            // }),
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
