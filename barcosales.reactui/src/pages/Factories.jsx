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
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import jsPDF from "jspdf";
import "jspdf-autotable";
import FactoryCategoryddl from "./FactoryCategoryddl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirm } from "react-confirm-box";

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
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";

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
const EXTENSIONS = ["xlsx", "xls", "csv"];
export default function Factories(props) {
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
      // style:"40%",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const classes = useStyles();

  // const [columns, setColDefs] = useState()

  const [selectedFactCategoryValue, setSelectedFactCategoryValue] =
    useState("");
  const [factoryName, setFactoryName] = useState("");
  const [princcode, setPrinccode] = useState("");
  const [checked, setChecked] = useState(true);
  const [factoryId, setFactoryId] = useState(0);

  const FactoryCategoryOnchange = (value) => {
    setSelectedFactCategoryValue(value);
    debugger;
    console.log(selectedFactCategoryValue);
  };

  const checkChanged = (state) => {
    setChecked(!checked);
  };
  const handleSubmit = (event) => {
    debugger;
    event.preventDefault();
    if (
      selectedFactCategoryValue === undefined ||
      selectedFactCategoryValue === null ||
      selectedFactCategoryValue === "" ||
      selectedFactCategoryValue === 0
    ) {
      errorMessageBox(
        "Factory  should not be blank, Please select at least one Factory"
      );
      return;
    }
     
   
    var factories = {
      FactoryId: factoryId,
      FactoryName: factoryName,
      PrincCode: princcode,
      // commRate: commissionRate,
      FactoryCategoryId: selectedFactCategoryValue,
      IsActive: checked,
    };
    if (factoryId > 0) {

      
      var factoryInfo = data.find(
        (item) => item.FactoryName === factoryName &&  item.PrincCode === princcode 
        &&  item.FactoryCategoryId === selectedFactCategoryValue
        &&  item.IsActive === checked
        );
        if (
          factoryInfo === undefined ||
          factoryInfo === null ||
          factoryInfo === ""  
        
        ) 
        {

          //Go ahead
        }
        else
        {
          errorMessageBox(
            "The Factory  Already exist in db, You can't enter same factory"
          );
          return;
        }
      axios
        .put("Factory/EditFactory", factories)
        .then((res) => {
          debugger;
          GetFactory();
          successMessageBox("Record has been updated successfully!");

          setFactoryId(0);
          refresh();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          errorMessageBox("Invalid  Information!");
        });
    } else {

      
      var factoryInfo = data.find(
        (item) => item.FactoryName === factoryName &&  item.PrincCode === princcode &&  item.FactoryCategoryId === selectedFactCategoryValue);
        if (
          factoryInfo === undefined ||
          factoryInfo === null ||
          factoryInfo === ""  
        
        ) 
        {

          //Go ahead
        }
        else
        {
          errorMessageBox(
            "The Factory  Already exist in db, You can't enter same factory"
          );
          return;
        }
      axios
        .post("Factory/AddFactory", factories)
        .then((res) => {
          if (res.status === 200) {
            GetFactory();
            successMessageBox("Record has been added successfully!");
          }
          else{
            errorMessageBox("Invalid  Information!");
          }

          console.log(res);
          debugger;
        })
        .catch((err) => {
          console.log(err);
          errorMessageBox("Invalid  Information!");
        });
    }

    debugger;
    console.log(factories);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    GetFactory();
  }, []);

  const GetFactory = () => {
    axios
      .get("Factory/GetFactory")

      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const refresh = () => {
    setFactoryId(0);
    setSelectedFactCategoryValue("");
    setFactoryName("");
    setPrinccode("");
    setChecked(true);
    GetFactory();
  };
  const clear = () => {
    refresh();
  };
  const columns = [
    { title: "FactoryId", field: "FactoryId" },
    { title: "FactoryCategoryName", field: "FactoryCategoryName" },
    { title: "PrincCode", field: "PrincCode" },
    { title: "FactoryName", field: "FactoryName" },
    { title: "IsActive", field: "IsActive" },
  ];

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
  const UpdateFactory = (id) => {
    // window.location = "customers/update/" + id;
    axios
      .get("Factory/GetFactoryId?id=" + id)

      .then((res) => {
        debugger;
        setFactoryId(res.data.FactoryId);
        setSelectedFactCategoryValue(res.data.FactoryCategoryId);
        setFactoryName(res.data.FactoryName);
        setPrinccode(res.data.PrincCode);
        setChecked(res.data.IsActive);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickDelete = async (rowData) => {
    const result = await confirm(
      "Do you really want to delete this Id = " + rowData.FactoryId + "?"
    );
    if (result) {
      debugger;

      axios
        .get(
          "Customer/IsExistFactoryIdInCommissionrules?id=" + rowData.FactoryId
        )
        .then((res) => {
          debugger;
          if (res.data.length > 0) {
            errorMessageBox(
              "You can't delete this Factory, It is already used in CommRules.  : " +
                rowData.FactoryId
            );
            return;
          } else {
            axios
              .delete("Factory/DeleteFactory?id=" + rowData.FactoryId)
              .then((res) => {
                GetFactory();
                debugger;
                console.log(res);
                // refresh();
                successMessageBox("The record has been deleted successfully!");
              })

              .catch((err) => {
                console.log(err);
                errorMessageBox("Invalid Factory Information!");
              });
          }
        })
        .catch((err) => {
          errorMessageBox("Invalid Factory Id: " + rowData.CustId);
          console.log(err);
          return;
        });
      return;
      // axios
      //   .delete("Factory/DeleteFactory?id=" + rowData.FactoryId)
      //   .then((res) => {
      //     debugger;
      //     console.log(res);
      //     successMessageBox("Record has been deleted successfully!");

      //     refresh();
      //   })
      //   .catch((err) => {
      //     errorMessageBox("Invalid  Information!");
      //     console.log(err);
      //   });
      // debugger;
      // // alert("Delete = " + rowData.CustId);
      // return;
    }
  };
  const actions = [
    {
      icon: () => <EditIcon />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        debugger;

        UpdateFactory(rowData.FactoryId);
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
        <h3> Add / Update Factory</h3>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <FactoryCategoryddl
                ddlOnchang={FactoryCategoryOnchange}
                selectcategory={selectedFactCategoryValue}
              />
               
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <FactoryCategoryddl
                ddlOnchang={FactoryCategoryOnchange}
                selectfCategory={selectedFactCategoryValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={factoryName}
                required
                autoComplete="factoryName"
                name="factoryName"
                variant="outlined"
                fullWidth
                id="factoryName"
                label="Factory Name"
                onChange={(e) => setFactoryName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={princcode}
                required
                autoComplete="princcode"
                name="princcode"
                variant="outlined"
                fullWidth
                id="princcode"
                label="Princ Code"
                onChange={(e) => setPrinccode(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>IsActive</label>
              <Checkbox
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
            exportFileName: "Factories",
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
