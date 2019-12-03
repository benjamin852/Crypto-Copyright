import React, { Component } from "react";
import { SHA256 } from "crypto-js";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import Metaverse from "metaversejs";

import { postStoreAction } from "../../Actions/postStore";
import { getStoreAction } from "../../Actions/getStore";
import { getMitsAction } from "../../Actions/MitGeneration";

import "./Tabs.css";
import { issueMIT } from "../../BlockchainLogic/MitLogic";
import { getMits } from "../../BlockchainLogic/MitLogic";

class CreateTab extends Component {
  state = {
    hash: "",
    password: "",
    meta: "",
    fileName: "",
    file: [],
    checkboxStatus: false,
    loading: false,
    recordStatus: true,
    contentStatus: true,
    mitContent: ""
  };
  processFile = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const data = event.target.result;
      this.setState({ recordStatus: false });
      this.setState({ hash: SHA256(data) + "" });
    };
    reader.readAsBinaryString(file);
  };
  handleChange(e) {
    this.setState({ checkboxStatus: e.target.checked }, () => {
      console.log(this.state.checkboxStatus);
    });
  }
  handleClick = async () => {
    if (!this.state.loading) {
      // const mnemonic = "orphan nothing dolphin fantasy opinion shop letter ski coral sound fun sail moral abuse unveil glove radio blush young issue oak impact hen tower";
      const mnemonic = this.props.mnemonic;
      const wallet = await Metaverse.wallet.fromMnemonic(mnemonic, "testnet");
      await issueMIT(wallet, this.state.mitContent, this.state.hash);
      const addresses = await wallet.getAddresses();
      const mits = await getMits(addresses);
      console.log(mits, "mits in the component");
      this.props.getMitsAction(mits);
      this.setState(
        {
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {}, this.state.loading);
          this.state.password
            ? this.props.postStoreAction(
                this.state.file,
                this.state.hash,
                this.state.password,
                this.state.meta,
                this
              )
            : this.props.getStoreAction(this.state.hash, this);
        }
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h3
            style={{
              color: "#050607",
              fontWeight: "600"
            }}
          >
            Record your document hash on the blockchain
          </h3>
          <span
            style={{
              // fontFamily: "Proxima Nova",
              fontWeight: "500",
              color: "#000000"
            }}
          >
            The hash is a sha256 hash of the content of your document.
            <br />
            The filename is not part of the calculation.
            <br />
          </span>
          {this.props.successMsg === "SUCCESS" ? (
            <div>
              <h3
                style={{
                  color: "#050607",
                  // fontFamily: "Proxima Nova",
                  fontWeight: "500"
                }}
              >
                Your hash has been successfully added to the ledger.
              </h3>
              <span>{this.state.hash}</span>
            </div>
          ) : (
            <div>
              <div className="row">
                <div className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-xl-3 col-lg-3 col-md-2 col-sm-2" />
                <div
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-6"
                  style={{ marginTop: "20px" }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    onChange={e => {
                      this.processFile(e.target.files);
                      // this.handleFileName(e.target.files);
                      this.setState({ file: e.target.files });
                    }}
                    name="selectedFile"
                    style={{ display: "none" }}
                    className="inputfile inputfile-6"
                    data-multiple-caption="{count} files selected"
                    multiple
                  />
                  <label className="w-100 h-100 file" htmlFor="fileInput">
                    Choose a file
                  </label>
                </div>
                <div
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-6"
                  style={{ marginTop: "20px" }}
                >
                  <span
                    style={{
                      fontFamily: "Proxima Nova",
                      fontWeight: "400",
                      color: "#000000"
                    }}
                  >
                    {this.state.fileName ? this.state.fileName : "Report.pdf"}
                  </span>
                </div>
                <div className="d-none d-xl-block d-lg-block d-md-block d-sm-block col-xl-3 col-lg-3 col-md-2 col-sm-2" />
              </div>
              <div className="row justify-content-center">
                <div
                  className="col-xl-3 col-lg-3 col-md-8 col-sm-6 col-xs-12"
                  style={{ marginTop: "20px" }}
                >
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control-lg"
                      id="customCheck"
                      onChange={e => this.handleChange(e)}
                      name="example1"
                      style={{ padding: "100px" }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck"
                      style={{
                        fontFamily: "Proxima Nova",
                        fontWeight: "400",
                        color: "#000000",
                        marginLeft: "10px"
                      }}
                    >
                      Save the file online
                    </label>
                  </div>
                  <br />
                  <MuiThemeProvider>
                    <TextField
                      id="outlined-helperText"
                      placeholder="Your Token Symbol"
                      className="mitInput"
                      variant="outlined"
                      onChange={e =>
                        this.setState({ mitContent: e.target.value })
                      }
                    />
                  </MuiThemeProvider>
                </div>
              </div>
              {this.state.checkboxStatus === true ? (
                <div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                    <div
                      className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
                      style={{ padding: "0% 6% 0% 6%" }}
                    >
                      <input
                        type="password"
                        placeholder="Password (Optional)"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                        className="form-control mb-3 mt-2"
                        style={{
                          paddingLeft: "25px",
                          fontFamily: "Proxima Nova",
                          color: "#BDBEBE",
                          borderRadius: "10px"
                        }}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-3" />
                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-6">
                      <span
                        className="mt-1 mb-2"
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "#000000",
                          marginLeft: "10px"
                        }}
                      >
                        You can in addition add a password. <br />
                        In that case, you will need both the hash and the
                        password to download the file
                      </span>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-3" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          <div
            className="row"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <div className="col-12">
              {this.props.errorMsg === "DUPLICATE_ENTRY" ? (
                <kbd style={{ fontFamily: "Proxima Nova", fontSize: "16px" }}>
                  This document has already been registered.&nbsp;&nbsp;
                  <span
                    style={{
                      color: "#FF0000"
                    }}
                  >
                    Warning!!!
                  </span>
                </kbd>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
            <div
              className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8"
              style={{ padding: "0% 6% 0% 6%" }}
            >
              {this.props.successMsg === "SUCCESS" ? (
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="mt-4 mb-5 btn btn-create"
                >
                  Record Another
                </button>
              ) : this.state.recordStatus === true ? (
                <button disabled className="mt-4 mb-5 btn btn-create-disabled">
                  Record
                </button>
              ) : (
                <button
                  className="mt-4 mb-5 btn btn-create"
                  disabled={
                    this.state.loading && !this.state.symbol ? true : false
                  }
                  onClick={this.handleClick}
                >
                  {this.state.loading && (
                    <i className="spinner-border" role="status" />
                  )}
                  {!this.state.loading && <span>Record</span>}
                </button>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-2" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  successMsg: state.ProveitReducer.successMsg,
  // SuccessMsg: state.ProveitReducer.getStoreSuccessMsg,
  errorMsg: state.ProveitErrorReducer.StoreErrorMsg,
  // ErrorMsg: state.ProveitErrorReducer.getStoreErrorMsg
  avatar: state.ProveitReducer.avatar,
  mnemonic: state.ProveitReducer.mnemonic
});

//grab avatar and address here from reducer
//pass these to action and to MitLogic.js

export default connect(mapStateToProps, {
  postStoreAction,
  getStoreAction,
  getMitsAction
})(CreateTab);
