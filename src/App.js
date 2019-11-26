import React, { Component } from "react";

import "./App.css";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Header from "./Components/Header/header";
// import Test from "./Components/TabView/test";
import Banner from "./Components/Banner/banner";
import Intro from "./Components/Intro/intro";
import { Provider } from "react-redux";
import store from "./Store/store";
import { getItem } from "./utils/idb";

class App extends Component {
  state = {
    account: null,
    loggedIn: false
  };

  async componentWillMount() {
    let loggedIn = await getItem("loggedIn");
    if (loggedIn) {
      this.setState({ loggedIn });
    } else {
      let account = await getItem("secret");
      if (account) {
        this.setState({ account });
      }
    }
  }
  render() {
    return (
      <Provider store={store}>
        <div className="home-bg" style={{ overflowX: "hidden" }}>
          {/*
           if (accountExists == true) {
              <Login/>
            } else {
            }
          */}
          {
            this.state.loggedIn ? <Header /> : (this.state.account ? <Login /> : <Register /> ) 
          }
          {/* <Register /> */}
          {/* <Login /> */}
          {/* <Header /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
