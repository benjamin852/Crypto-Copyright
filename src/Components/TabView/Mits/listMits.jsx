import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getMits } from "../../../BlockchainLogic/MitLogic";
import { getAvatar } from "../../../BlockchainLogic/Faucet";
import { getMitsAction } from "../../../Actions/MitGeneration";
import { updateItem, getItem } from "../../../utils/idb";

import "./listMits.css";

class ListMits extends Component {
  async componentDidMount() {
    let { avatar } = await getItem("accountInfo");
    console.log(await avatar);
    let avatarInfo = await getAvatar(await avatar);
    if (await avatarInfo) {
      let address = await avatarInfo.address;
      let mits = await getMits([await address]);
      await updateItem("mits", mits);
      this.props.getMitsAction(mits);
    }
  }

  render() {
    return (
      <div>
        {this.props.mits.length ? (
          <React.Fragment>
            <Grid className="mitContainer" container spacing={2}>
              {this.props.mits.map(mit => (
                <Grid className="cardHolder" sx={12} md={6}>
                  <Card className="card" key={mit.symbol}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="default metaverse mit icon"
                          src={require("../../../Assets/Logo/WechatIMG187.jpeg")}
                          aria-label="recipe"
                          className="avatar"
                        />
                      }
                      title={mit.content}
                      subheader={`Owned By: ${mit.owner}`}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <strong>Your File Hash : </strong>{mit.symbol}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <img
              src={require("../../../Assets/Logo/refresh-button.png")}
              alt="Refresh Button"
              className="refreshImg"
            />
          </React.Fragment>
        ) : (
          <h4>Please Create some MITS</h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mits: state.ProveitReducer.mits,
  avatar: state.ProveitReducer.account.avatar
});

export default connect(mapStateToProps, { getMitsAction })(ListMits);
