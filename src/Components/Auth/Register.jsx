import React, { Component } from "react";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import RaisedButton from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

import { createWallet } from "../../Actions/walletGeneration";
import "./Login.css";

const style = {
  margin: 15
};

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 col-sm-3 col-md-4 col-lg-4 col-xl-4"> </div>
            <div className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-4 logo-text-container">
              <div className="row">
                <div className="col">
                  <div className="text-center company-logo-section">
                    <img
                      className="company-logo"
                      src={require("../../Assets/Logo/company-logo.png")}
                      alt="company-logo"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="text-center mt-2 text-animation">
                    <div>
                      <MuiThemeProvider>
                        <div>
                          <TextField
                            id="username"
                            hintText="Enter your digital identity"
                            floatingLabelText="Digital Identity"
                            onChange={e =>
                              this.setState({ username: e.target.value })
                            }
                          />
                          <br />
                          <TextField
                            id="email"
                            type="email"
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                          />
                          <TextField
                            id="password"
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={e => {
                              this.setState({ password: e.target.value });
                            }}
                          />
                          <br />
                          <RaisedButton
                            label="Register"
                            variant="contained"
                            primary={true}
                            style={style}
                            onClick={() =>
                              this.props.createWallet(this.state.password,this.state.username)
                            }
                          />
                        </div>
                      </MuiThemeProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 col-sm-3 col-md-4 col-lg-4 col-xl-4"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = props => {};

export default connect(mapStateToProps, { createWallet })(Register);
