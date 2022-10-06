import React, {
  useState,
  Component,
  useEffect,
  forwardRef,
  useRef,
} from "react";

import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

import axios from "axios";
import "jspdf-autotable";

import MaterialTable, { Column } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
// import FirstPage from "@material-ui/icons/FirstPage";
// import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wait } from "@testing-library/user-event/dist/utils";

import CommRulesFactoriesDropdownlistTr from "./CommRulesFactoriesDropdownlistTr";
import FactoryCategoryddlTr from "./FactoryCategoryddlTr";
import PriorYearDropdownlist from "./PriorYearDropdownlist";
import SalesMonthsDropdownlist from "./SalesMonthsDropdownlist";
import { lowerCase } from "lodash";

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

const EXTENSIONS = ["xlsx", "xls"];

export default function Transaction() {
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

  const coldef = [
    { title: "Sold-To Name", field: "Sold-To Name" },
    { title: "Sold-To City", field: "Sold-To City" },
    { title: "Sold-To State", field: "Sold-To State" },
    { title: "TotalSalesAmt", field: "TotalSalesAmt" },
    { title: "IsVerified", field: "IsVerified" },
  ];

  // const [colDefs, setColDefs] = useState([]);
  const [data, setData] = useState([]);

  const [isEnableCalculatebttn, setIsEnableCalculatebttn] = useState(true);
  const [isEnableDisable, setIsEnableDisable] = useState(true);

  const [checkValue, setCheckValue] = useState("");
  const [selectedFactoryValue, setSelectedFactoryValue] = useState("");
  const [selectedFactCategoryValue, setSelectedFactCategoryValue] =
    useState("");
  // const [newdata, setNewData] = useState([]);
  // const [selectedPriorYearItem, setSelectedPriorYearItem] = useState("22");
  const [selectedFactoryId, setSelectedFactoryId] = useState(0);
  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState("");
  const [selectedSalesMonthsValue, setSelectedSalesMonthsValue] = useState("");
  // const [selectedSalesmanValue, setSelectedSalesmanValue] = useState("");

  const FactoryCategoryOnchange = (value) => {
    setSelectedFactCategoryValue(value);
    setSelectedFactoryId("");
    setSelectedFactoryValue("");
    debugger;
    console.log(selectedFactCategoryValue);
  };

  const FactoryOnchange = (value) => {
    debugger;

    console.log("Transaction :" + value);
    setSelectedFactoryValue(value);
    debugger;
  };
  const PriorYearOnchange = (value) => {
    setSelectedPriorYearValue(value);
    debugger;
    console.log(selectedPriorYearValue);
  };
  const SalesMonthsOnchange = (value) => {
    debugger;
    console.log(value);
    setSelectedSalesMonthsValue(value);
    debugger;
  };
  // const SalesmanOnchange = (value) => {
  //   setSelectedSalesmanValue(value);
  //   debugger;
  //   console.log(selectedSalesmanValue);
  // };

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

  const importExcel = (e) => {
    debugger;

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
      debugger;
      console.log(heads);
      if (heads.length !== 4) {
        errorMessageBox("Invalid file input, Please Select correct Excel file");
        e.target.value = null;
        return;
      }
      if (heads[0]["field"] !== coldef[0]["field"]) {
        errorMessageBox(
          "Invalid file Column name, Please update file header, Name should be in colum A : " +
            coldef[0]["field"]
        );
        e.target.value = null;
        return;
      }
      if (heads[1]["field"] !== coldef[1]["field"]) {
        errorMessageBox(
          "Invalid file Column name, Please update file header, Name should be in colum B : " +
            coldef[1]["field"]
        );
        e.target.value = null;
        return;
      }
      if (heads[2]["field"] !== coldef[2]["field"]) {
        errorMessageBox(
          "Invalid file Column name, Please update file header , Name should be in colum C :   " +
            coldef[2]["field"]
        );
        e.target.value = null;
        return;
      }
      if (heads[3]["field"] !== coldef[3]["field"]) {
        errorMessageBox(
          "Invalid file Column name, Please update file header , Name should be in colum D : " +
            coldef[3]["field"]
        );
        e.target.value = null;
        return;
      }
      // if (heads[4]["field"] !== coldef[4]["field"]) {
      //   errorMessageBox(
      //     "Invalid file Column name, Please update file header , Name should be in colum E : " +
      //       coldef[4]["field"]
      //   );
      //   e.target.value = null;
      //   return;
      // }
      // debugger;
      // if (heads[5]["field"] !== coldef[5]["field"]) {
      //   errorMessageBox(
      //     "Invalid file Column name, Please update file header name , Name should be in colum F : " +
      //       coldef[5]["field"]
      //   );
      //   e.target.value = null;
      //   return;
      // }
      // if (heads[6]["field"] !== coldef[6]["field"]) {
      //   errorMessageBox(
      //     "Invalid file Column name, Please update file header name , Name should be in colum G : " +
      //       coldef[6]["field"]
      //   );
      //   e.target.value = null;
      //   return;
      // }
      // if (heads[7]["field"] !== coldef[7]["field"]) {
      //   errorMessageBox(
      //     "Invalid file Column name, Please update file header name , Name should be in colum H : " +
      //       coldef[7]["field"]
      //   );
      //   e.target.value = null;
      //   return;
      // }
      // if (heads[8]["field"] !== coldef[8]["field"]) {
      //   errorMessageBox(
      //     "Invalid file Column name, Please update file header name , Name should be in colum I : " +
      //       coldef[8]["field"]
      //   );
      //   e.target.value = null;
      //   return;
      // }

      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
      successMessageBox("The excell file has been uploaded Successfully!");
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
        // alert("Invalid file input, Select Excel, CSV file");
        errorMessageBox("Invalid file input, Please Select correct Excel file");
      }
    } else {
      setData([]);
      //setColDefs(coldef);
    }
  };

  // ***********************  Currency Converter******************************
  const numberToCurrency = (num) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(num);
  };

  // ***********************  Currency Converter end******************************
  const [monthname, setMonthname] = useState("Sep");
  // const [getCommRules, setGetCommRules] = useState([]);
  // const [getCustomers, setGetCustomers] = useState([]);
  // const [allTransaction, setAllTransaction] = useState([]);
  // const [allSalesman, setAllSalesman] = useState([]);
  // const [getCommrulesId, setGetCommrulesId] = useState();
  // const [allFactories, setAllFactories] = useState([]);

  useEffect(() => {
    localStorage.removeItem("AllCustomers");
    localStorage.removeItem("AllFactories");
    localStorage.removeItem("AllSalesman");
    localStorage.removeItem("AllCommissionRules");

    getAllCustomers();
    getAllSalesman();
    getAllFactories();
    getCommissionRules();
    //getAllTransaction();

    console.log("Formload");
  }, []);

  const getAllCustomers = async () => {
    debugger;
    const res = await axios
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

  const getAllFactories = async () => {
    const res = await axios
      .get("Factory/GetFactory")
      .then((res) => {
        debugger;
        console.log(res.data);
        //setData(res.data);
        // setAllFactories(res.data);
        localStorage.setItem("AllFactories", JSON.stringify(res.data));
        return res;
      })
      .catch((err) => {
        console.log(err);
        return res;
      });
  };

  const getAllTransaction = async () => {
    debugger;
    const res = await axios
      .get("SalesTrasaction/GetTrasaction")
      .then((res) => {
        debugger;
        console.log(res.data);
        // setAllTransaction(res.data);
        localStorage.setItem("AllTransaction", JSON.stringify(res.data));
        return res;
      })
      .catch((err) => {
        console.log(err);
        return res;
      });
  };

  const getAllSalesman = async () => {
    debugger;
    const res = await axios
      .get("SalesPerson/GetSalesPerson")
      .then((res) => {
        debugger;
        console.log(res.data);
        //  setAllSalesman(res.data);
        localStorage.setItem("AllSalesman", JSON.stringify(res.data));
        return res;
      })
      .catch((err) => {
        console.log(err);
        return res;
      });
  };

  const getCommissionRules = async () => {
    debugger;
    const res = await axios
      .get("CommissionRules/GetCommissionRules")
      .then((res) => {
        debugger;
        console.log(res);
        //  setGetCommRules(res.data);
        localStorage.setItem("AllCommissionRules", JSON.stringify(res.data));
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  };
  //======================Find commission rules=======================
  const getcommRate = (custId) => {
    debugger;

    let CommRuleInfo = {};
    if (custId) {
      //=================Case 1===========================================
      var getCommRules = JSON.parse(localStorage.getItem("AllCommissionRules"));
      var CommRules = getCommRules.find(
        (item) =>
          item.FactoryId === selectedFactoryValue &&
          item.IsActiveForAll === true &&
          item.IsActive === true
      );
      debugger;
      if (CommRules) {
        CommRuleInfo = CommRules;
        return CommRuleInfo;
      }
      //=================Case 2===========================================

      var commRate = getCommRules.find(
        (item) =>
          item.CustId === custId &&
          item.FactoryId === selectedFactoryValue &&
          item.IsActiveForAll === false &&
          item.IsActive === true
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
          item.FactoryId === selectedFactoryValue &&
          item.CustId === 0 &&
          item.IsActiveForAll === false &&
          item.IsActive === true
      );
      if (commRate1) {
        debugger;
        return (CommRuleInfo = commRate1);
      } else {
        // errorMessageBox(
        //   "Does not exist commission rules in the database, Please create at leat one rule"
        // );
        return null;
      }
    }
  };
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    // alert('Complete Cache Cleared')
  };

  const Refresh = () => {
    setIsEnableCalculatebttn(true);
    setData([]);
    // setColDefs(coldef);
    localStorage.clear();
    clearCacheData();

    window.location = "/transaction";
  };
  const handleClick = () => {
    window.location = "/transaction/calculate";
  };
  // Find alias name
  const findCustAlias=(custAlaisInfo,getCustomers)=>{
    {
      debugger;
      var allgetCustomers = JSON.parse(localStorage.getItem("AllCustomers"));
      
      let custListWithState = allgetCustomers.filter(
        (item) =>
          item.City === custAlaisInfo["Sold-To City"] &&
          item.State === custAlaisInfo["Sold-To State"]
      );
      debugger;
      console.log(custListWithState);
   
      if (
        custListWithState === undefined ||
        custListWithState === null ||
        custListWithState === "" ||
        custListWithState === 0 ||
        custListWithState.length === 0
      ) {
        return null;
       
      }
      
      for (let j = 0; j < custListWithState.length; j++) {

        var custAliasNames = custListWithState[j]["CustAliasName"];


        if (
          custAliasNames != undefined ||
          custAliasNames != "" ||
          custAliasNames != null ||
          custAliasNames.length != 0
        ) 
        {

          const custAliasNamesArray = custAliasNames.split(",");
          if (
            custAliasNamesArray != undefined ||
            custAliasNamesArray != "" ||
            custAliasNamesArray != null ||
            custAliasNamesArray.length  != 0
          ) {
            for (let k = 0; k < custAliasNamesArray.length; k++) {
debugger;
                if( custAliasNamesArray[k].toLowerCase().trim() === custAlaisInfo["Sold-To Name"].toLowerCase().trim())
                {
                return   custListWithState[j];
               // break;
                }
              }
             // return null;

          }
        }
      }
return null;
    }
  }

  //===========================Verify=======================================

  const verifyUploadedFile = () => {
    var IsOk = 1;
    debugger;
    var getCustomers = JSON.parse(localStorage.getItem("AllCustomers"));
    var getCommRules = JSON.parse(localStorage.getItem("AllCommissionRules"));
    var getAllSalesman = JSON.parse(localStorage.getItem("AllSalesman"));
    var getAllFactories = JSON.parse(localStorage.getItem("AllFactories"));

    if (
      getAllFactories === undefined ||
      getAllFactories === null ||
      getAllFactories === "" ||
      getAllFactories === 0 ||
      getAllFactories.length === 0
    ) {
      errorMessageBox("Please check Factories API, Factories does not exist ");
      return;
    }

    if (
      getCustomers === undefined ||
      getCustomers === null ||
      getCustomers === "" ||
      getCustomers === 0 ||
      getCustomers.length === 0
    ) {
      errorMessageBox("Please check custmer API, customers does not exist   ");
      return;
    }

    if (
      getCommRules === undefined ||
      getCommRules === null ||
      getCommRules === "" ||
      getCommRules === 0 ||
      getCommRules.length === 0
    ) {
      debugger;
      errorMessageBox(
        "Please check Commission Rules API, Commission Rules does not exist  "
      );
      return;
    }

    if (
      getAllSalesman === undefined ||
      getAllSalesman === null ||
      getAllSalesman === "" ||
      getAllSalesman === 0 ||
      getAllSalesman.length === 0
    ) {
      errorMessageBox("Please check Salesman API, Salesman does not exist  ");
      return;
    }
    var monthinfo = getCommRules.find(
      (item) =>
        item.FactoryId === selectedFactoryValue &&
        item.IsActiveForAll === true &&
        item.IsActive === true
    );

    if (
      selectedPriorYearValue === undefined ||
      selectedPriorYearValue === null ||
      selectedPriorYearValue === "" ||
      selectedPriorYearValue === 0
    ) {
      errorMessageBox(
        "Fin Year should not be blank, Please select at least one Fin Year"
      );
      return;
    }
    debugger;
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
    //   var monthinfo = monthslist.find(
    //     (item) =>
    //       item.number === parseInt(selectedSalesMonthsValue)
    //   );

    // if (
    //   selectedFactCategoryValue === undefined ||
    //   selectedFactCategoryValue === null ||
    //   selectedFactCategoryValue === "" ||
    //   selectedFactCategoryValue === 0
    // ) {
    //   errorMessageBox(
    //     "Factory Category should not be blank, Please select at least one category"
    //   );
    //   return;
    // }

    if (
      selectedFactoryValue === undefined ||
      selectedFactoryValue === null ||
      selectedFactoryValue === "" ||
      selectedFactoryValue === 0
    ) {
      errorMessageBox(
        "Factory  should not be blank, Please select at least one Factory"
      );
      IsOk = 0;
      return;
    }

    var CommRules = getCommRules.find(
      (item) =>
        item.FactoryId === selectedFactoryValue && item.IsActive === true
    );

    if (
      CommRules === undefined ||
      CommRules === null ||
      CommRules === "" ||
      CommRules === 0 ||
      CommRules.length === 0
    ) {
      debugger;
      errorMessageBox(
        "Commission Rule is not found for selected factory , Please create a rule for the selected factory "
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
      IsOk = 0;
      return;
    }

    const transformedArray = [];
    const SavetransformedArray = [];

    //Foreach Conditio==============Start to calculation==================================================
    let TotalAmt = 0;
    let TotalCommAmt = 0;
    let TotalSalesCommAmt = 0;
    for (let i = 0; i < data.length; i++) {
      let Isvalid = "OK";
      let Cid = 0;
      let Sid = 0;

      debugger;
      // Find Customer in DB=====================================
      var custInfo = getCustomers.find(
        (item) =>
         
          item.CustomerName === data[i]["Sold-To Name"] &&
          item.City === data[i]["Sold-To City"] &&
          item.State === data[i]["Sold-To State"]
      );

      if (
        custInfo === undefined ||
        custInfo === null ||
        custInfo === "" ||
        custInfo === 0 ||
        custInfo.length === 0
      ) {

     custInfo   = findCustAlias( data[i],getCustomers);
    if (
      custInfo === undefined ||
      custInfo === null ||
      custInfo === "" ||
      custInfo === 0 ||
      custInfo.length === 0
    ) {
      data[i]["IsVerified"] = "Customer doesn't exist in db";
      debugger;
      IsOk = 0;
      continue;

    }
    else {
      Cid = custInfo.CustId;
    }
     
      } else {
        Cid = custInfo.CustId;
      }

      //==========================Find saleman===================================
      var salesmanInfo = getAllSalesman.find(
        (item) => item.SalesmId === custInfo.SalesmanId
      );

      if (
        salesmanInfo === undefined ||
        salesmanInfo === null ||
        salesmanInfo === "" ||
        salesmanInfo === 0 ||
        salesmanInfo.length === 0
      ) {
        //Isvalid=Isvalid+","+"The Salesman Doesn't exist in the DB  "+data[i]["Sold-To Name"].trim()

        data[i]["IsVerified"] = "Invalid";
        IsOk = 0;
        continue;
      } else {
        Sid = salesmanInfo.SalesmId;
      }

      let CommRuleInfo = getcommRate(custInfo.CustId);
      if (
        CommRuleInfo === undefined ||
        CommRuleInfo === null ||
        CommRuleInfo === "" ||
        CommRuleInfo === 0
      ) {
        data[i]["IsVerified"] = "Invalid";
        IsOk = 0;
        continue;
      }
      if (CommRuleInfo.CommisionRate > 0) {
        debugger;
        const InvoiceNo = i + 1; // Will come from API
        let TotalSalesAmt = 0;
        TotalSalesAmt = data[i]["TotalSalesAmt"];
        // const SAmt = Number(TotalSalesAmt.replace(/[^0-9.-]+/g, "")).toFixed(2);
        const commRate = CommRuleInfo.CommisionRate; //i % 2 ? 5 : 7; // Will come from API
        // const grossComm = (
        //   (Number(TotalSalesAmt.replace(/[^0-9.-]+/g, "")) * commRate) /
        //   100
        // ).toFixed(2);
        const grossComm = ((Number(TotalSalesAmt) * commRate) / 100).toFixed(2);
        var salesmanCommRate = 0;
        if (
          custInfo.CustomSalesCommRate === undefined ||
          custInfo.CustomSalesCommRate === null ||
          custInfo.CustomSalesCommRate === "" ||
          custInfo.CustomSalesCommRate === 0
        ) {
          salesmanCommRate = salesmanInfo.CommissionRate;
        } else {
          salesmanCommRate = custInfo.CustomSalesCommRate;
        }
        if (
          salesmanCommRate === undefined ||
          salesmanCommRate === null ||
          salesmanCommRate === "" ||
          salesmanCommRate === 0
        ) {
          data[i]["IsVerified"] = "Invalid";
          IsOk = 0;
          continue;
        }
        var factoryInfo = getAllFactories.find(
          (item) => item.FactoryId === selectedFactoryValue
        );
        debugger;
        const salesmanCommAmt = ((grossComm * salesmanCommRate) / 100).toFixed(
          2
        );

        const objdatagrid = {
          TrasactionId: 0,
          SalesmId: Sid,
          SalesmanCode: salesmanInfo.SalesmanCode,
          CustId: Cid,
          CommissionRulesId: CommRuleInfo.CommissionRulesId,
          SoldToName: data[i]["Sold-To Name"].trim(),
          SoldToCity: data[i]["Sold-To City"].trim(),
          SoldToState: data[i]["Sold-To State"].trim(),
          FactoryId: selectedFactoryValue,
          FactoryName: factoryInfo.FactoryName,
          CheckNo: checkValue,
          MonthName: selectedSalesMonthsValue,
          InvoiceNo,
          TotalSalesAmt,
          GrossCommRate: `${commRate}%`,
          GrossCommAmt: numberToCurrency(grossComm),
          SalesmanCommRate: `${salesmanCommRate}%`,
          SalesmanCommAmt: numberToCurrency(salesmanCommAmt),
          CreatedBy: 1,
          IsActive: 1,
          FinYear: selectedPriorYearValue,
        };
        const objsave = {
          TrasactionId: 0,
          SalesmId: Sid,
          SalesmanCode: salesmanInfo.SalesmanCode,
          CustId: Cid,
          CommissionRulesId: CommRuleInfo.CommissionRulesId,
          SoldToName: data[i]["Sold-To Name"].trim(),
          SoldToCity: data[i]["Sold-To City"].trim(),
          SoldToState: data[i]["Sold-To State"].trim(),

          FactoryId: selectedFactoryValue,
          FactoryName: factoryInfo.FactoryName,
          CheckNo: checkValue,
          MonthName: selectedSalesMonthsValue,
          InvoiceNo,
          TotalSalesAmt,
          GrossCommRate: commRate,
          GrossCommAmt: grossComm,
          SalesmanCommRate: salesmanCommRate,
          SalesmanCommAmt: salesmanCommAmt,
          CreatedBy: 1,
          IsActive: 1,
          FinYear: selectedPriorYearValue,
        };
        data[i]["IsVerified"] = "OK";
        debugger;
        TotalAmt = parseFloat(TotalAmt) + parseInt(TotalSalesAmt);
        TotalCommAmt = parseFloat(TotalCommAmt) + parseFloat(grossComm);
        TotalSalesCommAmt =
          parseFloat(TotalSalesCommAmt) + parseFloat(salesmanCommAmt);

        transformedArray.push(objdatagrid);
        SavetransformedArray.push(objsave);
      }
    }
    console.log(TotalAmt, TotalCommAmt, TotalSalesCommAmt);
    const objdatagrid = {
      TrasactionId: "",
      SalesmId: "",
      SalesmanCode: "Total Amount",
      CustId: "",
      CommissionRulesId: "",
      SoldToName: "",
      SoldToState: "",
      SoldToCity: "",
      FactoryId: "",
      FactoryName: "",
      CheckNo: "",
      CreatedDate: "",
      MonthName: "",
      InvoiceNo: "",
      TotalSalesAmt: numberToCurrency(TotalAmt),
      GrossCommRate: "",
      GrossCommAmt: numberToCurrency(TotalCommAmt),
      SalesmanCommRate: "",
      SalesmanCommAmt: numberToCurrency(TotalSalesCommAmt),
      CreatedBy: 1,
      IsActive: 1,
      FinYear: selectedPriorYearValue,
    };
    debugger;
    transformedArray.push(objdatagrid);
    //setData(transformedArray);
    if (IsOk === 0) {
      debugger;
      errorMessageBox(
        "The uploaded records have errors and look at the grid against each line item to fix it."
      );
      return;
    }

    debugger;

    if (
      (transformedArray === undefined ||
        transformedArray === null ||
        transformedArray === "" ||
        transformedArray === 0) &&
      (SavetransformedArray === undefined ||
        SavetransformedArray === null ||
        SavetransformedArray === "" ||
        SavetransformedArray === 0)
    ) {
      errorMessageBox(
        "The uploaded records have errors and look at the grid against each line item to fix it."
      );
      return;
    } else if (
      transformedArray.length - 1 === data.length &&
      SavetransformedArray.length === data.length
    ) {
      setIsEnableCalculatebttn(false);
      localStorage.setItem(
        "salesComissionData",
        JSON.stringify(transformedArray)
      );
      localStorage.setItem(
        "salesComissiongridData",
        JSON.stringify(SavetransformedArray)
      );
      successMessageBox("The uploaded file has been Verified Successfully!");
    }
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
        <h3> Upload / Add New Sales Files</h3>
        <form className={classes.form}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12}>
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
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <PriorYearDropdownlist ddlOnchang={PriorYearOnchange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SalesMonthsDropdownlist
                salesMonthsddlOnchang={SalesMonthsOnchange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={3}>
            <FactoryCategoryddlTr
                ddlOnchang={FactoryCategoryOnchange}
                selectfCategory={selectedFactCategoryValue}
              />
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <CommRulesFactoriesDropdownlistTr
                factoryddlOnchang={FactoryOnchange}
              />
            </Grid>

            <Grid item xs={12} sm={12}></Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <input
                type="file"
                color="primary"
                title="Upload Sales Files"
                fullWidth
                onChange={importExcel}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => verifyUploadedFile()}
              >
                Verify Records
              </Button>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button
                //disabled="true"
                disabled={isEnableCalculatebttn}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleClick()}
              >
                Calculate Sales Commission
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                //disabled="true"
                //  disabled={isEnableCalculatebttn}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => Refresh()}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* ============================Used Material Table============================= */}
            <MaterialTable
              title="Customer Sales Details"
              columns={coldef}
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
                pageSize: 50,
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
                disabled={isEnableCalculatebttn}
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
      </div>
    </>
  );
}
