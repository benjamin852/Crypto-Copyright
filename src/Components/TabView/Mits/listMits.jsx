import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getMits } from "../../../BlockchainLogic/MitLogic";
import { getAvatar } from "../../../BlockchainLogic/Faucet";
import { getMitsAction } from "../../../Actions/MitGeneration";
import { updateItem, getItem } from "../../../utils/idb";

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
            <img
              src={require("../../../Assets/Logo/refresh-button.png")}
              alt="Refresh Button"
            />
            {this.props.mits.map(mit => (
              <Card key={mit.symbol}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="default metaverse mit icon"
                      src={require("../../../Assets/Logo/WechatIMG187.jpeg")}
                      aria-label="recipe"
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
                    {mit.symbol}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {/* <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                ></IconButton> */}
                </CardActions>
              </Card>
            ))}
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
