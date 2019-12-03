import React from "react";
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

import { default_mit_image } from "../../../Assets/Images/default_mit_image";

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
  }
}));

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
                  src="../../Assets/Images/default_mit_image.png"
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

const mapStateToProps = state => ({
  mits: state.ProveitReducer.mits
});

export default connect(mapStateToProps)(ListMits);
