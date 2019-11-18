import React, { Component } from "react";

import "./header.css";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-md bg-color navbar-dark mb-1">
          <div class="nav-item ml-2 mt-2">
            <a class="nav-link text-white" href="#">
              <img
                class="logo display"
                src={require("../../Assets/Logo/home-button.png")}
                alt="home"
              />
              {/* <span class="display">HOME</span> */}
            </a>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      </React.Fragment>
    );
  }
}

export default Login;
