import React, { useContext, Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Context } from "../../Context";
import { NavBar } from "../NavBar";
import { BottomBar } from "../BottomBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "100%",
    minHeight: "100vh",
    background: "#2c3235",
  },
}));

export function Layout({ children, title, id }) {
  const classes = useStyles();

  const { userAuth, user, type } = useContext(Context);

  useEffect(() => {
    async function fetchData() {}
    if (user && user.uid === id) {
      fetchData();
    }
  }, [id]);

  return (
    <Fragment>
      <Helmet>{<title> {title + " - "} RUGBY AGENTS </title>}</Helmet>
      <NavBar title={title} />
      {children}
      <BottomBar />
    </Fragment>
  );
}
