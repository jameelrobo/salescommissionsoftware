import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/home.component";
import Nav from "./components/nav.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Customer from "./components/Customer.component";
import Salesman from "./components/Salesman.component";
import Transaction from "./components/SalesTransaction.component";
import CommissionRules from "./components/CommissionRules.component";
import Factory from "./components/Factory.component";
 
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {

    return (
      
    <BrowserRouter>
      <div className="App">
        <Nav />
        
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/customer" component={Customer} />
              <Route exact path="/salesman" component={Salesman} />
              <Route exact path="/transaction" component={Transaction} />
              <Route exact path="/commissionRules" component={CommissionRules} />
              <Route exact path="/factory" component={Factory} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
