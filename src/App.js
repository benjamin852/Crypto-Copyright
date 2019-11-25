import React from "react";

import "./App.css";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Header from "./Components/Header/header";
// import Test from "./Components/TabView/test";
import Banner from "./Components/Banner/banner";
import Intro from "./Components/Intro/intro";
import { Provider } from "react-redux";
import store from "./Store/store";

function App() {
  return (
    <Provider store={store}>
      <div class="home-bg" style={{ overflowX: "hidden" }}>
        {/*
         if (accountExists == true) {
            <Login/>
          } else {
          }
        */}

        <Register />
        {/* <Header /> */}
      </div>
    </Provider>
  );
}

export default App;
