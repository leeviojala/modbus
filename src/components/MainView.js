import {
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  Card,
  Fab,
  makeStyles,
  Zoom,
  CssBaseline,
  AppBar,
  Typography,
  useScrollTrigger,
  Slide,
  Toolbar,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(1),
    position: "fixed",
    bottom: theme.spacing(6),
    right: theme.spacing(1),
    zIndex: 1000,
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

export default function MainView(props) {
  const classes = useStyles();
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const [valueList, setValueList] = useState(null);
  const [header, setHeader] = useState("");

  const scrollTop = () => {
    console.log("kutsuttiin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getReadings();
  }, []);

  function getReadings() {
    axios
      .get(proxyurl + "http://tuftuf.gambitlabs.fi/feed.txt", {
        headers: {
          ContentType: "text/plain",
        },
      })
      .then((response) => {
        console.log(response);
        let splitted = response.data;
        splitted = splitted.split(/\r\n|\r|\n/);
        let sorted = splitted;
        console.log(splitted);
        const rDate = new Date(sorted[0]);
        const fDate = rDate.toLocaleString();
        setHeader(fDate);
        sorted.shift();
        setValueList(sorted);
      });
  }

  return (
    <React.Fragment>
      <Container style={{ maxHeight: "95vh" }}>
        <Fab variant="extended" className={classes.fab} onClick={scrollTop}>
          <NavigationIcon />
          Takaisin ylös
        </Fab>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="h6">{header}</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <List variant="dense">
          {valueList ? (
            valueList.map((e) => {
              return (
                <ListItem divider={true}>
                  <ListItemText primary={e}></ListItemText>
                </ListItem>
              );
            })
          ) : (
            <React.Fragment>
              <CircularProgress></CircularProgress>
              <Skeleton
                animation="wave"
                variant="rect"
                className={classes.media}
              />
            </React.Fragment>
          )}
          {console.log(valueList)}
        </List>
      </Container>
    </React.Fragment>
  );
}
