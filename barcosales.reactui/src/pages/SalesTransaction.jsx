import React, { useState, Component, useEffect, forwardRef , useRef, } from "react";
import MaterialTable, { Column } from "material-table";
import { Link } from "react-router-dom";
import { findIndex } from "lodash";
import * as XLSX from "xlsx";
import Button from "@material-ui/core/Button";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FactoriesDropdownlist from "./FactoriesDropdownlist";
import FactoryCategoryddl from "./FactoryCategoryddl";
import PriorYearDropdownlist from "./PriorYearDropdownlist";
import SalesMonthsDropdownlist from "./SalesMonthsDropdownlist";
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
import { wait } from "@testing-library/user-event/dist/utils";

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

export default function Transaction() {
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
  const classes = useStyles();

  const [colDefs, setColDefs] = useState([
    { title: "SoldToName", field: "Sold-To Name" },
    { title: "SoldToAddress", field: "Sold-To Address" },
    { title: "SoldToState", field: "Sold-To State" },
    { title: "ShipToName", field: "Ship-To Name" },
    { title: "ShipToAddress", field: "Ship-To Address" },
    { title: "ShipToCity", field: "Ship-To City" },
    { title: "ShipToState", field: "Ship-To State" },
    { title: "TotalSalesAmt", field: "TotalSalesAmt" },
  ]);
  const [data, setData] = useState();
  const [selectedPriorYearItem, setSelectedPriorYearItem] = useState("22");
  const [selectedFactoryId, setSelectedFactoryId] = useState(0);

  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState("");
  const [selectedSalesMonthsValue, setSelectedSalesMonthsValue] = useState("8");
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [selectedFactoryValue, setSelectedFactoryValue] = useState("22");
  const [selectedFactCategoryValue, setSelectedFactCategoryValue] =
    useState("");

  const FactoryCategoryOnchange = (value) => {
    setSelectedFactCategoryValue(value);
    setSelectedFactoryId("");
    setSelectedFactoryValue("");
    debugger;
    console.log(selectedFactCategoryValue);
  };

  const FactoryOnchange = (value) => {
    setSelectedFactoryValue(value);

    debugger;
    console.log(selectedFactoryValue);
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
    setSelectedSalesmanValue(value);
    debugger;
    console.log(selectedSalesmanValue);
  };

  const columns1 = [
    { title: "Action", field: "Action" },
    { title: "Customer", field: "customer" },
      { title: "Factory", field: "factory" },
    { title: "Check", field: "check" },
    { title: "Month", field: "month" },
    { title: "Salesman", field: "salesman" },
    { title: "InvoiceNo", field: "invoiceNo" },
    { title: "TotalSalesAmt", field: "TotalSalesAmt" },
    { title: "GrossCommRate", field: "commRate" },
    { title: "GrossComm", field: "grossComm" },
    { title: "SalesmanComm", field: "salesmanComm" },
  ];

  const getExention = (file) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      debugger;
      let rowData = {};
      row.forEach((element, index) => {
        // console.log(element);

        rowData[headers[index]] = element;
      });
      if (rowData["Sold-To Name"]) {
        debugger;
        rows.push(rowData);
      }
    });
    return rows;
  };

  const downloadExcel = () => {
    const newData = data.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "SalesCommissionDetails");
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "SalesCommissionDetails.xlsx");
  };
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("SalesCommissionDetails", 20, 10);
    doc.autoTable({
      theme: "grid",
      columns: colDefs.map((col) => ({ ...col, dataKey: col.field })),
      body: data,
    });
    doc.save("SalesCommissionDetails.pdf");
  };

  const importExcel = (e) => {
    const file = e.target.files[0];

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
      setColDefs(heads);

      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
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
      setData([]);
      setColDefs([]);
    }
  };

  const numberToCurrency = (num) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(num);
  };

  const [getCommRules, setGetCommRules] = useState([]);
  const [getCustomers, setGetCustomers] = useState([]);
  const [allTransaction, setAllTransaction] = useState([]);
  const [allSalesman, setAllSalesman] = useState([]);
  const [getCommrulesId, setGetCommrulesId] = useState();
   const [allFactories, setAllFactories] = useState([]);

  useEffect(() => {
    
    // getAllCustomers();
   getAllSalesman();
     getAllFactories();
  getCommissionRules();
   
//  getAllTransaction();


  }, []);

  const getAllCustomers =  async () => {
    debugger;
const res =await  axios
      .get("Customer/GetCustomer")
      .then((res) => {
        debugger;
        console.log(res.data);
        debugger;
    // setGetCustomers(res.data);
     localStorage.setItem("AllCustomers", JSON.stringify(res.data));
     debugger;
        return res.data;
        //setData(res.data);
       
      })
      .catch((err) => {
       console.log(err);
       //return res.data;
      });
      debugger;
      //setGetCustomers(res.data); 
      return res;
  };

  const getAllFactories = async  () => {
  
    const res =await  axios
      .get("Factory/GetFactory")
      .then((res) => {
        debugger;
        console.log(res.data);
        //setData(res.data);
       // setAllFactories(res.data);
       localStorage.setItem("AllFactories", JSON.stringify(res.data));
        return res
      })
      .catch((err) => {
        console.log(err);
        return res
      });
  };

  const getAllTransaction = async  () => {
    debugger;
    const res =await   axios
      .get("SalesTrasaction/GetTrasaction")
      .then((res) => {
        debugger;
        console.log(res.data);
       // setAllTransaction(res.data);
       localStorage.setItem("AllTransaction", JSON.stringify(res.data));
        return res
      })
      .catch((err) => {
        console.log(err);
        return res
      });
  };

  const getAllSalesman =  async  () => {
    debugger;
    const res =await   axios
      .get("SalesPerson/GetSalesPerson")
      .then((res) => {
        debugger;
        console.log(res.data);
      //  setAllSalesman(res.data);
        localStorage.setItem("AllSalesman", JSON.stringify(res.data));
        return res
      })
      .catch((err) => {
        console.log(err);
        return res
      });
  };


 
  const getCommissionRules =  async () => {
    debugger;
    const res =await   axios
      .get("CommissionRules/GetCommissionRules")
      .then((res) => {
        debugger;
        console.log(res);
      //  setGetCommRules(res.data);
      localStorage.setItem("AllCommissionRules",JSON.stringify(res.data));
        return res
      })
      .catch((err) => {
        console.log(err);
      });
      return res
  };

  const getcommRate = (row) => {
    debugger;

    let CommRuleInfo = {};
    if (row) {
      // myObj = myArrayOfObjects.find(obj => obj.prop === 'something');
      var custInfo = getCustomers.find(
        (item) => item.CustomerName.trim() === row["Sold-To Name"].trim()
      );
      debugger;
//=================Case 1===========================================
      var CommRules = getCommRules.find(
        (item) =>
          item.FactoryId === selectedFactoryValue && item.FactoryCategoryId === selectedFactCategoryValue &&
          item.IsActiveForAll === true && item.IsActive === true
      );
      debugger;
      if (CommRules) {
        CommRuleInfo = CommRules;
        return CommRuleInfo;
      }
//=================Case 2===========================================

      var commRate = getCommRules.find(
        (item) =>
          item.CustId === custInfo.CustId &&
          item.FactoryId === selectedFactoryValue && item.FactoryCategoryId === selectedFactCategoryValue &&
           item.IsActiveForAll === false && item.IsActive === true 
      );
      debugger;
      if (commRate) {
        CommRuleInfo = commRate;
        debugger;
        return CommRuleInfo;
 //=================Case 3===========================================
      }
      
       
        var commRate1 = getCommRules.find(
          (item) =>
          item.FactoryId === selectedFactoryValue && item.FactoryCategoryId === selectedFactCategoryValue &&
          item.CustId === 0 && item.IsActiveForAll === false && item.IsActive === true
        );
        if (commRate1) {
        debugger;
        return CommRuleInfo = commRate1;
      
    }
    else{
      errorMessageBox(
        "Does not exist commission rules in the database, Please create at leat one rule"
      );
      return ;
    }
  }
    
  };
 
  const handleClick =  () => {
debugger;
    var getCustomers= JSON.parse(localStorage.getItem("AllCustomers"));
    var getCommissionRules= JSON.parse(localStorage.getItem("AllCommissionRules"));
    var getAllSalesman= JSON.parse(localStorage.getItem("AllSalesman"));
    var getAllFactories= JSON.parse(localStorage.getItem("AllFactories"));

    if (
      getAllFactories === undefined ||
      getAllFactories === null ||
      getAllFactories === "" ||
      getAllFactories === 0 ||
      getAllFactories.length === 0
    ) {
      errorMessageBox(
        "Please check Factories API, Does not exist the Factories " );
      return;
    }

    if (
      getCustomers === undefined ||
      getCustomers === null ||
      getCustomers === "" ||
      getCustomers === 0 ||
      getCustomers.length === 0
    ) {
      errorMessageBox(
        "Please check custmer API, Does not exist the customers " );
      return;
    }
   
    if (
      getCommissionRules === undefined ||
      getCommissionRules === null ||
      getCommissionRules === "" ||
      getCommissionRules === 0 ||
      getCommissionRules.length === 0
    ) {
      errorMessageBox(
        "Please check Commission Rules API, Does not exist the Commission Rules " );
      return;
    }

    if (
      getAllSalesman === undefined ||
      getAllSalesman === null ||
      getAllSalesman === "" ||
      getAllSalesman === 0 ||
      getAllSalesman.length === 0
    ) {
      errorMessageBox(
        "Please check Salesman API, Does not exist the Commission Rules " );
      return;
    }
   
   
    //  getAllTransaction();
    //  getAllSalesman();
    //  getAllFactories();

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
      selectedSalesMonthsValue === undefined ||
      selectedSalesMonthsValue === null ||
      selectedSalesMonthsValue === "" ||
      selectedSalesMonthsValue === 0
    ) {
      errorMessageBox(
        "Month  should not be blank, Please select at least one Month"
      );
      return;
    }

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
    if (
      data === undefined ||
      data === null ||
      data === "" ||
      data === 0 ||
      data.length === 0
    ) {
      errorMessageBox(
        "Data  should not be blank, Please upload  at least one Factory Sales file"
      );
      return;
    }

    const transformedArray = [];
    const SavetransformedArray = [];

     //==============Start to calculation================================

    data.forEach((d, i) => {

      debugger
      var custInfo = getCustomers.find(
        (item) =>
          item.CustomerName.trim() === d["Sold-To Name"].trim() ||
          item.CustAliasName.trim() === d["Sold-To Name"].trim()
      );

      if (
        custInfo === undefined ||
        custInfo === null ||
        custInfo === "" ||
        custInfo === 0 ||
        custInfo.length === 0
      ) {
        errorMessageBox(
          "Please insert customer info in the table, Does not exist the customer : "+d["Sold-To Name"].trim()
        );
        return;
      }
      var salesmanInfo = allSalesman.find(
        (item) =>
          item.SalesmId  === custInfo.SalesmanId 
      );

      if (
        salesmanInfo === undefined ||
        salesmanInfo === null ||
        salesmanInfo === "" ||
        salesmanInfo === 0 ||
        salesmanInfo.length === 0
      ) {
        errorMessageBox(
          "Please add salesman in custmer table, Does not exist Salesman of the customer info : "+d["Sold-To Name"].trim()
        );
        return;
      }

      let CommRuleInfo = getcommRate(d);
      if (
        CommRuleInfo === undefined ||
        CommRuleInfo === null ||
        CommRuleInfo === "" ||
        CommRuleInfo === 0
      ) {
        errorMessageBox(
         // "Month  should not be blank, Please select at least one Month"
          "Does not exist the Commission Rules : "+d["Sold-To Name"].trim()
        );
        return;
      }
      if (CommRuleInfo.CommisionRate > 0) {
        debugger;
        const InvoiceNo = i; // Will come from API
        const TotalSalesAmt = d["TotalSalesAmt"];
        const SAmt = Number(TotalSalesAmt.replace(/[^0-9.-]+/g, "")).toFixed(2);
        const commRate = CommRuleInfo.CommisionRate; //i % 2 ? 5 : 7; // Will come from API
        const grossComm = (
          (Number(TotalSalesAmt.replace(/[^0-9.-]+/g, "")) * commRate) /
          100
        ).toFixed(2);
        var salesmanCommRate =0
        if (
          custInfo.CustomSalesCommRate === undefined ||
          custInfo.CustomSalesCommRate === null ||
          custInfo.CustomSalesCommRate === "" ||
          custInfo.CustomSalesCommRate === 0
        ) {
          salesmanCommRate=  salesmanInfo.CommissionRate
         
        }
        else{

          salesmanCommRate=custInfo.CustomSalesCommRate;


        }
        if (
          salesmanCommRate === undefined ||
          salesmanCommRate === null ||
          salesmanCommRate === "" ||
          salesmanCommRate === 0
        ) {
          errorMessageBox(
           
            "Does not exist the Salesman commission in salesman info and customer info : "+ salesmanInfo
          );
          return;
        }
        var factoryInfo = allFactories.find(
          (item) =>
            item.FactoryId  === selectedFactoryValue 
        );
        debugger;
        const salesmanCommAmt = 
        (
          (grossComm * salesmanCommRate) /
          100
        ).toFixed(2);
        const obj = {
          TrasactionId: 0,
          SalesmId: CommRuleInfo.SalesmanId,
          SalesmanName: salesmanInfo.SalesmanCode,
          CustId: custInfo.CId,
          CommissionRulesId: CommRuleInfo.CommissionRulesId,
          SoldToName: d["Sold-To Name"],
          SoldToAddress: d["Sold-To Address"],
          SoldToState: d["Sold-To State"],
          ShipToAddress: d["Ship-To Address"],
          ShipToCity: d["Ship-To City"],
          ShipToState: d["Ship-To State"],
          FactoryId: selectedFactoryValue,
          FactoryName: factoryInfo.FactoryName,
          Check: checkValue,
          Month: selectedSalesMonthsValue,
          salesman: selectedSalesmanValue,
          InvoiceNo,
          TotalSalesAmt,
          // GrossCommRate: commRate,
          // GrossCommAmt: grossComm,
          // SalesmanCommAmt: salesmanComm,
          GrossCommRate: `${commRate}%`,
          GrossCommAmt: numberToCurrency(grossComm),
          SalesmanCommAmt: numberToCurrency(salesmanCommAmt),
        };
        const objsave = {
          TrasactionId: 0,
          SalesmId: CommRuleInfo.SalesmanId,
          SalesmanName: "",
          CustId: custInfo.CId,
          CommissionRulesId: CommRuleInfo.CommissionRulesId,
          SoldToName: d["Sold-To Name"],
          SoldToAddress: d["Sold-To Address"],
          SoldToState: d["Sold-To State"],
          ShipToAddress: d["Ship-To Address"],
          ShipToCity: d["Ship-To City"],
          ShipToState: d["Ship-To State"],
          FactoryId: selectedFactoryValue,
          Check: checkValue,
          Month: selectedSalesMonthsValue,
          salesman: selectedSalesmanValue,
          InvoiceNo,
          TotalSalesAmt: SAmt,
          GrossCommRate: commRate,
          GrossCommAmt: grossComm,
          SalesmanCommAmt: salesmanCommAmt,
          // GrossCommRate: `${commRate}%`,
          // GrossCommAmt: numberToCurrency(grossComm),
          // SalesmanCommAmt: numberToCurrency(salesmanComm),
        };
        debugger;

        transformedArray.push(obj);
        SavetransformedArray.push(objsave);
      }
    });
    debugger;

    if (
      transformedArray === undefined ||
      transformedArray === null ||
      transformedArray === "" ||
      transformedArray === 0
    ) {
      errorMessageBox(
        "Factory  should not be blank, Please select at least one Factory"
      );
      return;
    }
    else if(transformedArray.length===data.length)
    {
      localStorage.setItem(
        "salesComissionData",
        JSON.stringify(transformedArray)
      );
      localStorage.setItem(
        "salesComissiongridData",
        JSON.stringify(SavetransformedArray)
      );
      window.location = "/transaction/calculate";

    }
   
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
        
        <form className={classes.form}>
      

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Link to="/transaction/addsales">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add New Sales Commission
                </Button>
              </Link>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <PriorYearDropdownlist ddlOnchang={PriorYearOnchange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SalesMonthsDropdownlist
                ddlOnchang={SalesMonthsOnchange}
              />
            </Grid> */}
            <Grid item xs={12} sm={3}>
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
            {/* <Grid item xs={12} sm={3}>
              <PriorYearDropdownlist
                ddlOnchang={PriorYearOnchange}
                selectedPriorYearValue={selectedPriorYearItem}
              />
            </Grid> */}
             {/*<Grid item xs={12} sm={3}>
              <SalesMonthsDropdownlist ddlOnchang={SalesMonthsOnchange} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FactoryCategoryddl
                ddlOnchang={FactoryCategoryOnchange}
                selectcategory={selectedFactCategoryValue}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FactoriesDropdownlist
                ddlOnchang={FactoryOnchange}
                selectcategory={selectedFactCategoryValue}
                selectedFactoryId={selectedFactoryId}
              />
            </Grid> */}
            <Grid item xs={12} sm={12}></Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                color="primary"
                title="Upload Sales Files"
                fullWidth
                onChange={importExcel}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleClick()}
              >
                Calculate Sales Commission
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MaterialTable
              title="Customer Sales Details"
              columns={colDefs}
              data={data}
              icons={tableIcons}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setData([...data, newData]);

                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData([...dataUpdate]);

                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setData([...dataDelete]);

                      resolve();
                    }, 1000);
                  }),
              }}
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
                // actionsColumnIndex: -1,
                // selection: true,
                // showSelectAllCheckbox: false,
                showTextRowsSelected: false,
                grouping: true,
                columnsButton: true,
                rowStyle: (data, index) =>
                  index % 2 === 0 ? { background: "#f5f5f5" } : null,
                headerStyle: { background: "#f44336", color: "#fff" },
              }}
            />
          </Grid>
        </Grid>

        <form className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleClick()}
              >
                Calculate Sales Commission
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
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
