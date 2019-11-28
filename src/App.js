import React, { Component } from "react";

import "./App.css";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Header from "./Components/Header/header";
// import Test from "./Components/TabView/test";
// import Banner from "./Components/Banner/banner";
// import Intro from "./Components/Intro/intro";
import { Provider } from "react-redux";
import store from "./Store/store";
import { getItem, updateItem } from "./utils/idb";
import { connect } from "react-redux";

class App extends Component {
  state = {
    account: null,
    loggedIn: false
  };

  async componentWillMount() {
    let account = await getItem("accountInfo");
    console.log(account);
    if (account) {
      let loggedIn = await getItem("loggedIn");

      this.setState({ loggedIn, account });
    }
  }

  async cleanApp() {
    await updateItem("loggedIn", false);
  }
  componentDidMount() {
    window.addEventListener("beforeunload", this.cleanApp());
  }
  async componentWillUnmount() {
    this.cleanApp();
    window.removeEventListener("beforeunload", this.cleanApp());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="home-bg" style={{ overflowX: "hidden" }}>
          {/* {this.state.account ? (
            this.state.loggedIn ? (
              <Header />
            ) : (
              <Login username={this.state.account.avatar} />
            )
          ) : (
            <Register />
          )} */}
          <Register />
          {/* <Login /> */}
          {/* <Header /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
