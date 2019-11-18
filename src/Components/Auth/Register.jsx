import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "./Login.css";

const style = {
  margin: 15
};

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          <div class="row">
            <div class="col-2 col-sm-3 col-md-4 col-lg-4 col-xl-4"> </div>
            <div
              class="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 logo-text-container"
              //   data-aos="zoom-in"
              //   data-aos-offset="200"
              //   // data-aos-delay="50"
              //   data-aos-duration="1000"
            >
              <div class="row">
                <div class="col">
                  <div class="text-center company-logo-section">
                    <img
                      class="company-logo"
                      src={require("./company-logo.png")}
                      alt="company-logo"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="text-center mt-2 text-animation">
                    <div>
                      <MuiThemeProvider>
                        <div>
                          {/* <AppBar title="Login" /> */}
                          <TextField
                            // type="email"
                            hintText="Enter your digital identity"
                            floatingLabelText="Digital Identity"
                            onChange={(event, newValue) =>
                              this.setState({ username: newValue })
                            }
                          />
                          <br />
                          <TextField
                            type="email"
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) =>
                              this.setState({ password: newValue })
                            }
                          />
                          <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) =>
                              this.setState({ password: newValue })
                            }
                          />
                          <br />
                          <RaisedButton
                            label="Register"
                            primary={true}
                            style={style}
                            onClick={event => this.handleClick(event)}
                          />
                        </div>
                      </MuiThemeProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2 col-sm-3 col-md-4 col-lg-4 col-xl-4"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
