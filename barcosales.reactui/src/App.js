import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/Sidebar/SideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UserLogin from "./pages/UserLogin";
import Login from "./pages/Login";
import Transaction from "./pages/SalesTransaction";
import CalculateCommission from "./pages/CalculateCommission";
import AddSales from "./pages/AddSales";
import Salesman from "./pages/Salesman";
import SalesmanUpdate from "./pages/SalesmanUpdate";
import SalesmanCreate from "./pages/SalesmanCreate";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import CustomerCreate from "./pages/CustomerCreate";
import CustomerUpdate from "./pages/CustomerUpdate";

import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Settings from "./pages/Users";
import Factories from "./pages/Factories";
import CommissonRules from "./pages/CommissonRules";
import CommissionReports from "./pages/CommissionReports";
import ShowDeletedSalesRecords from "./pages/ShowDeletedSalesRecords";
import ProtectedRoute from "./pages/ProtectedRoute";
// import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <Router>
    

    {/* <Login>
       <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
            <Routes>
            <Route exact path="/" element={<Login />} />
            </Routes>

          </div>
        </div>
      </div>
    </Login> */}

      <SideBar>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
              <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Dashboard />} />
                 
                <Route exact path="/transaction" element={<Transaction />} />
                <Route
                  exact
                  path="/transaction/calculate"
                  element={<CalculateCommission />}
                />
                <Route
                  exact
                  path="/transaction/addsales"
                  element={<AddSales />}
                />
                <Route exact path="/customers" element={<Customers />} />
                <Route
                  exact
                  path="/customer/create"
                  element={<CustomerCreate />}
                />

                <Route
                  exact
                  path="/customers/update/:id"
                  element={<CustomerUpdate />}
                />
                <Route exact path="/salesman" element={<Salesman />} />
                <Route
                  exact
                  path="/salesman/add"
                  element={<SalesmanCreate />}
                />
                <Route
                  exact
                  path="/salesman/update/:id"
                  element={<SalesmanUpdate />}
                />
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/messages" element={<Messages />} />
                <Route exact path="/analytics" element={<Analytics />} /> 
                <Route exact path="/showdeletedsalesrecords" element={<ShowDeletedSalesRecords />} /> 
                 <Route exact path="/reports" element={<CommissionReports />} />
                <Route exact path="/file-manager" element={<FileManager />} />
                <Route exact path="/order" element={<Order />} />
                <Route exact path="/saved" element={<Saved />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/factories" element={<Factories />} />
                <Route
                  exact
                  path="/commissonRules"
                  element={<CommissonRules />}
                />

                <Route path="*" element={<> not found</>} />
              </Routes>
            </div>
          </div>
        </div>
      </SideBar>
      
    </Router>
    
  );
}

export default App;
