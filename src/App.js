import React, { Component } from "react";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Header from "./Components/Header/header";
import { getItem } from "./utils/idb";
import { connect } from "react-redux";
import { login_out } from "./Actions/Authentication";
import { updateAccount } from "./Actions/Account";

import "./App.css";

class App extends Component {
  async UNSAFE_componentWillMount() {
    let account = await getItem("accountInfo");

    if (account) {
      let loggedIn = await getItem("loggedIn");

      this.props.login_out(loggedIn);
      this.props.updateAccount(account);
    }
  }

  render() {
    return (
      <div className="home-bg" style={{ overflowX: "hidden" }}>
        {this.props.account ? (
          this.props.loggedIn ? (
            <Header />
          ) : (
            <Login username={this.props.account.avatar} />
          )
        ) : (
          <Register />
        )}
        {/* <Register /> */}
        {/* <Login /> */}
        {/* <Header /> */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.ProveitReducer.loggedIn,
  account: state.ProveitReducer.account
});

export default connect(mapStateToProps, { login_out, updateAccount })(App);
