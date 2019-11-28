import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { getItem } from "../../utils/idb";
import { createWallet } from "../../Actions/walletGeneration";
import "./Login.css";

const style = {
  margin: 15
};

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    error: null
  };

  handleClick = async event => {
    let { password, username, email } = this.state;
    if (password && username && email) {
      if (username.length > 3) {
        let exsitedAccount = await getItem("accountInfo");
        let existedLoggedIn = await getItem("loggedIn");

        if (existedLoggedIn === undefined && exsitedAccount === undefined) {
          this.props.createWallet(password, username);
        } else {
          this.setState({ error: "Account already existed." });
        }
      } else {
        this.setState({ error: "Username must be at least 3 charaters." });
      }
    } else {
      this.setState({ error: "All fields are mandatory." });
    }
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
                            onFocus={e => this.setState({ error: null })}
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
                            onFocus={e => this.setState({ error: null })}
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                          />
                          <TextField
                            id="password"
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onFocus={e => this.setState({ error: null })}
                            onChange={e => {
                              this.setState({ password: e.target.value });
                            }}
                          />
                          <br />
                          {this.state.error ? (
                            <span className="error">{this.state.error}</span>
                          ) : (
                            ""
                          )}
                          <br />
                          <RaisedButton
                            disabled={
                              this.state.password &&
                              this.state.email &&
                              this.state.username
                                ? false
                                : true
                            }
                            label="Register"
                            variant="contained"
                            primary={true}
                            style={style}
                            onClick={this.handleClick}
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

const mapStateToProps = state => {};

export default connect(mapStateToProps, { createWallet })(Register);
