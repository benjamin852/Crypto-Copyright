import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { getMits } from "../../../BlockchainLogic/MitLogic";
import { getAvatar } from "../../../BlockchainLogic/Faucet";
import { getMitsAction } from "../../../Actions/MitGeneration";
import { updateItem, getItem } from "../../../utils/idb";

<<<<<<< HEAD
const useStyles = makeStyles(theme => ({
  // card: {
  //   maxWidth: 345
  // },

  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
=======
class ListMits extends Component {
  async componentDidMount() {
    let { avatar } = await getItem("accountInfo");
    let avatarInfo = await getAvatar(avatar);
    console.log(await avatarInfo);
    let address = await avatarInfo.address;
    let mits = await getMits([await address]);
    await updateItem("mits", mits);
    this.props.getMitsAction(mits);
>>>>>>> 704f78290724dec5cbc3027089c599953343bd45
  }

<<<<<<< HEAD
const ListMits = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  React.useEffect(() => {
    console.log(props.mitSymbol);
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {props.mits ? (
        props.mits.map(mit => (
          <Card key={mit.symbol} className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt="default metaverse mit icon"
                  src="https://explorer-testnet.mvs.org/img/assets/default_mit.png"
                  aria-label="recipe"
                  className={classes.avatar}
                />
              }
              title={mit.content}
              subheader={`Owned By: ${mit.owner}`}
            />
            {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {mit.symbol}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              ></IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <h4>Please Create some MITS</h4>
      )}
    </div>
  );
};
=======
  render() {
    return (
      <div>
        {this.props.mits.length ? (
          this.props.mits.map(mit => (
            <Card key={mit.symbol}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="default metaverse mit icon"
                    src=""
                    aria-label="recipe"
                  />
                }
                title={mit.content}
                subheader={`Owned By: ${mit.owner}`}
              />
              {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
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
          ))
        ) : (
          <h4>Please Create some MITS</h4>
        )}
      </div>
    );
  }
}
>>>>>>> 704f78290724dec5cbc3027089c599953343bd45

const mapStateToProps = state => ({
  mits: state.ProveitReducer.mits,
  avatar: state.ProveitReducer.account.avatar
});

export default connect(mapStateToProps, { getMitsAction })(ListMits);
