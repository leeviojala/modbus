import {
  Container,
  List,
  ListItem,
  ListItemText,
  Fab,
  makeStyles,
  CssBaseline,
  AppBar,
  Typography,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(1),
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(1),
    zIndex: 1000,
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

export default function MainView(props, showBelow) {
  const classes = useStyles();
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const [valueList, setValueList] = useState(null);
  const [header, setHeader] = useState("");
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener(`scroll`, handleScroll);
    return () => window.removeEventListener(`scroll`, handleScroll);
  });

  const scrollTop = () => {
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
        let splitted = response.data;
        splitted = splitted.split(/\r\n|\r|\n/);
        let sorted = splitted;
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
        {show && (
          <Fab variant="extended" className={classes.fab} onClick={scrollTop}>
            <NavigationIcon />
            Takaisin ylös
          </Fab>
        )}

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
            </React.Fragment>
          )}
        </List>
      </Container>
    </React.Fragment>
  );
}
