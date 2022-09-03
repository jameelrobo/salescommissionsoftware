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
import FactoriesDropdownlistTr from "./FactoriesDropdownlistTr";
import FactoryCategoryddlTr from "./FactoryCategoryddlTr";
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
    { title: "IsVerified", field: "IsVerified" },
  ]);

  const [isEnableCalculatebttn, setIsEnableCalculatebttn] = useState(true);
  const [data, setData] = useState();
  const [selectedPriorYearItem, setSelectedPriorYearItem] = useState("22");
  const [selectedFactoryId, setSelectedFactoryId] = useState(0);
  const [selectedPriorYearValue, setSelectedPriorYearValue] = useState("");
  const [selectedSalesMonthsValue, setSelectedSalesMonthsValue] = useState("9");
  const [selectedSalesmanValue, setSelectedSalesmanValue] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [selectedFactoryValue, setSelectedFactoryValue] = useState("");
  const [selectedFactCategoryValue, setSelectedFactCategoryValue] = useState("");

  const FactoryCategoryOnchange = (value) => {
    setSelectedFactCategoryValue(value);
    setSelectedFactoryId("");
    setSelectedFactoryValue("");
    debugger;
    console.log(selectedFactCategoryValue);
  };

  const FactoryOnchange = (value) => {
    debugger;
 
    console.log("Transaction :"+value);
    setSelectedFactoryValue(value);
    debugger;
   
  };
  const PriorYearOnchange = (value) => {
    setSelectedPriorYearValue(value);
    debugger;
    console.log(selectedPriorYearValue);
  };
  const SalesMonthsOnchange = (value) => {
    console.log(value);
    setSelectedSalesMonthsValue(value);
    debugger;
   
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

  const monthslist= [
    {
      "name": "January",
      "short": "Jan",
      "number": 1,
      "days": 31
    },
    {
      "name": "February",
      "short": "Feb",
      "number": 2,
      "days": 28
    },
     {
      "name": "March",
      "short": "Mar",
      "number": 3,
      "days": 31
    },
    {
      "name": "April",
      "short": "Apr",
      "number": 4,
      "days": 30
    },
    {
      "name": "May",
      "short": "May",
      "number": 5,
      "days": 31
    },
      {
      "name": "June",
      "short": "Jun",
      "number": 6,
      "days": 30
    },
    {
      "name": "July",
      "short": "Jul",
      "number": 7,
      "days": 31
    },
     {
      "name": "August",
      "short": "Aug",
      "number": 8,
      "days": 31
    },
   {
      "name": "September",
      "short": "Sep",
      "number": 9,
      "days": 30
    },
     {
      "name": "October",
      "short": "Oct",
      "number": 10,
      "days": 31
    },
    {
      "name": "November",
      "short": "Nov",
      "number": 11,
      "days": 30
    },
    {
      "name": "December",
      "short": "Dec",
      "number": 12,
      "days": 31
    }
  ]

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
      //setColDefs(heads);

      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
      successMessageBox(
        "The excell file has been uploaded Successfully!"
      );
      if(data.length>0)
      {
        successMessageBox(
          "The excell file has been uploaded Successfully!"
        );
      }
      else{
        errorMessageBox(
          "Invalid file input, Please Select currect Excel, CSV file"
        );

      }
       
    };

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file);
      } else {
         
        // alert("Invalid file input, Select Excel, CSV file");
        errorMessageBox(
          "Invalid file input, Please Select currect Excel, CSV file"
        );
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
const [monthname, setMonthname] = useState("September");
  const [getCommRules, setGetCommRules] = useState([]);
  const [getCustomers, setGetCustomers] = useState([]);
  const [allTransaction, setAllTransaction] = useState([]);
  const [allSalesman, setAllSalesman] = useState([]);
  const [getCommrulesId, setGetCommrulesId] = useState();
   const [allFactories, setAllFactories] = useState([]);

  useEffect(() => {
    localStorage.removeItem('AllCustomers');
    localStorage.removeItem('AllFactories');
    localStorage.removeItem('AllSalesman');
    localStorage.removeItem('AllCommissionRules');
    
     getAllCustomers();
     getAllSalesman();
     getAllFactories();
     getCommissionRules();
   
 //getAllTransaction();


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
//======================Find commission rules=======================
  const getcommRate = (custId) => {
    debugger;

    let CommRuleInfo = {};
    if (custId) {
    
//=================Case 1===========================================
var getCommRules= JSON.parse(localStorage.getItem("AllCommissionRules"));
      var CommRules = getCommRules.find(
        (item) =>
          item.FactoryId === selectedFactoryValue &&
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
          item.CustId === custId &&
          item.FactoryId === selectedFactoryValue &&
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
          item.FactoryId === selectedFactoryValue  &&
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


 const handleClick = ()=>{
  window.location = "/transaction/calculate";

 }

 //===========================Verify=======================================

  const verifyUploadedFile =  () => {
debugger;
    var getCustomers= JSON.parse(localStorage.getItem("AllCustomers"));
    var getCommRules= JSON.parse(localStorage.getItem("AllCommissionRules"));
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
      getCommRules === undefined ||
      getCommRules === null ||
      getCommRules === "" ||
      getCommRules === 0 ||
      getCommRules.length === 0
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
    var monthinfo = getCommRules.find(
      (item) =>
        item.FactoryId === selectedFactoryValue &&
        item.IsActiveForAll === true && item.IsActive === true
    );
   
  
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
  // debugger;
  //   if (
  //     selectedSalesMonthsValue === undefined ||
  //     selectedSalesMonthsValue === null ||
  //     selectedSalesMonthsValue === "" ||
  //     selectedSalesMonthsValue === 0
  //   ) {
  //     errorMessageBox(
  //       "Month  should not be blank, Please select at least one Month"
  //     );
  //     return;
  //   }
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

     //Foreach Conditio==============Start to calculation==================================================

   
      for (let i = 0; i < data.length; i++) {
      let Isvalid="";
      let Cid=0;
      let Sid=0;
       

      debugger
      var custInfo = getCustomers.find(
        (item) =>
          item.CustomerName.trim() === data[i]["Sold-To Name"].trim() 
          // ||
          // item.CustAliasName.trim() === d["Sold-To Name"].trim()
      );

      if (
        custInfo === undefined ||
        custInfo === null ||
        custInfo === "" ||
        custInfo === 0 ||
        custInfo.length === 0
      ) {
        // errorMessageBox(
        //   "Please insert customer info in the table, Does not exist the customer : "+d["Sold-To Name"].trim()
        // );
        debugger;
        Isvalid=Isvalid+","+" The Customer Doesn't exist in DB  "+data[i]["Sold-To Name"].trim() 
        data[i]["IsVerified"]=Isvalid;
        setData(data);
        continue;
        
      }
      else{
        Cid=custInfo.CustId;

      }
      var salesmanInfo = getAllSalesman.find(
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
        Isvalid=Isvalid+","+"The Salesman Doesn't exist in the DB  "+data[i]["Sold-To Name"].trim() 
        data[i]["IsVerified"]=Isvalid;
        setData(data);
        continue;
        // errorMessageBox(
        //   "Please add salesman in custmer table, Does not exist Salesman of the customer info : "+d["Sold-To Name"].trim()
        // );
        // return;
      }
      else{
        Sid=salesmanInfo.SalesmId;

      }

      let CommRuleInfo = getcommRate(custInfo.CustId);
      if (
        CommRuleInfo === undefined ||
        CommRuleInfo === null ||
        CommRuleInfo === "" ||
        CommRuleInfo === 0
      ) {
        Isvalid=Isvalid+","+"The Commision Rule  Doesn't exist in the DB  "+data[i]["Sold-To Name"].trim() 
        data[i]["IsVerified"]=Isvalid;
        setData(data);
        continue;
        // errorMessageBox(
        //  // "Month  should not be blank, Please select at least one Month"
        //   "Does not exist the Commission Rules : "+d["Sold-To Name"].trim()
        // );
        // return;
      }
      if (CommRuleInfo.CommisionRate > 0) {
        debugger;
        const InvoiceNo = i+1; // Will come from API
        const TotalSalesAmt = data[0]["TotalSalesAmt"];
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
          Isvalid=Isvalid+","+"The Commision Rate  Doesn't exist in the DB  ";
          data[i]["IsVerified"]=Isvalid;
        setData(data);
        continue;
          // errorMessageBox(
           
          //   "Does not exist the Salesman commission in salesman info and customer info : "+ salesmanInfo
          // );
          // return;
        }
        var factoryInfo = getAllFactories.find(
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
          SalesmId: Sid,
          SalesmanCode: salesmanInfo.SalesmanCode,
          CustId: Cid,
          CommissionRulesId: CommRuleInfo.CommissionRulesId,
          SoldToName: data[i]["Sold-To Name"].trim() ,
          SoldToAddress: data[i]["Sold-To Address"],
          SoldToState: data[i]["Sold-To State"],
          ShipToName: data[i]["Ship-To Name"],
          ShipToAddress: data[i]["Ship-To Address"],
          ShipToCity: data[i]["Ship-To City"],
          ShipToState: data[i]["Ship-To State"],
          FactoryId: selectedFactoryValue,
          FactoryName: factoryInfo.FactoryName,
          CheckNo: checkValue,
          MonthName: monthname,
          InvoiceNo,
          TotalSalesAmt,
          GrossCommRate: `${commRate}%`,
          GrossCommAmt: numberToCurrency(grossComm),
          SalesmanCommRate: `${salesmanCommRate}%`,
          SalesmanCommAmt: numberToCurrency(salesmanCommAmt),
          CreatedBy:1,
          IsActive:1
        };
        const objsave = {
          TrasactionId: 0,
          SalesmId: Sid,
          SalesmanCode: salesmanInfo.SalesmanCode,
          CustId: Cid,
          CommissionRulesId: CommRuleInfo.CommissionRulesId,
          SoldToName: data[i]["Sold-To Name"].trim(),
          SoldToAddress: data[i]["Sold-To Address"],
          SoldToState: data[i]["Sold-To State"],
          ShipToName: data[i]["Ship-To Name"],
          ShipToAddress: data[i]["Ship-To Address"],
          ShipToCity: data[i]["Ship-To City"],
          ShipToState: data[i]["Ship-To State"],
          FactoryId: selectedFactoryValue,
          CheckNo: checkValue,
          MonthName: monthname,
          InvoiceNo,
          TotalSalesAmt: SAmt,
          GrossCommRate: commRate,
          GrossCommAmt: grossComm,
          SalesmanCommRate: salesmanCommRate ,
          SalesmanCommAmt: salesmanCommAmt,
          CreatedBy:1,
          IsActive:1
 
        
        };
        debugger;

        transformedArray.push(obj);
        SavetransformedArray.push(objsave);
      }
    }

  
    debugger;

    if (
      (transformedArray === undefined ||    transformedArray === null ||    transformedArray === "" ||  transformedArray === 0)
      && (SavetransformedArray === undefined ||  SavetransformedArray === null ||    SavetransformedArray === "" ||  SavetransformedArray === 0)
    ) {
      errorMessageBox(
        "The uploaded file has invalid records, Please download the file and currect the records"
      );
      return;
    }
    else if(transformedArray.length===data.length && SavetransformedArray.length===data.length)
    {
       
      setIsEnableCalculatebttn(false);
      localStorage.setItem(
        "salesComissionData",
        JSON.stringify(transformedArray)
      );
      localStorage.setItem(
        "salesComissiongridData",
        JSON.stringify(SavetransformedArray)
      );
      successMessageBox(
        "The uploaded file has benn Varified Successfully!"
      );

    }
   
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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
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
            </Grid>*/}
            {/* <Grid item xs={12} sm={4}>
              <SalesMonthsDropdownlist
                ddlOnchang={SalesMonthsOnchange}
              />
            </Grid>  */}
            {/* <Grid item xs={12} sm={3}>
              <FactoryCategoryddlTr
                categoryddlOnchang={FactoryCategoryOnchange}
                // selectfCategory={selectedFactCategoryValue}
              />
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <FactoriesDropdownlistTr
                factoryddlOnchang={FactoryOnchange}
           
              />
            </Grid>
        
            <Grid item xs={12} sm={12}></Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <input
                type="file"
                color="primary"
                title="Upload Sales Files"
                fullWidth
                onChange={importExcel}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
           
           <Button
             variant="contained"
             color="primary"
             fullWidth
             onClick={() => verifyUploadedFile()}
           >
            Verify Uploaded File
           </Button>
         </Grid>

            <Grid item xs={12} sm={4}>
           
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
          
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}
