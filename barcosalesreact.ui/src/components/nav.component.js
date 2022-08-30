import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Home
          </Link>

          <Link className="navbar-brand" to={"/customer"}>
            Customer
          </Link>
          <Link className="navbar-brand" to={"/salesman"}>
            Salesman
          </Link>
          <Link className="navbar-brand" to={"/transaction"}>
            Sales Transaction
          </Link>
          <Link className="navbar-brand" to={"/commissionRules"}>
            Commission Rules
          </Link>
          <Link className="navbar-brand" to={"/factory"}>
            Factory
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
