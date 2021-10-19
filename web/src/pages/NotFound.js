import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import { Context } from "../Context";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  textNotFound: {
    color: "white",
    margin: "50px",
    textAlign: "center",
  },
  buttonsClass: {
    width: "100%",
    textAlign: "center",
    marginTop: "80px",
  },
  atras: {
    width: "100%",
    textAlign: "center",
    marginTop: "80px",
  },
  color: {
    color: "white",
  },
  btnRight: {
    float: "right",
    marginRight: "35px",
  },
  image: {
    width: "200px",
    height: "200px",
    textAlign: "center",
    marginTop: "100px",
  },
}));

export const NotFound = ({ type }) => {
  const classes = useStyles();
  const { user, removeAuth } = useContext(Context);
  const { t, i18n } = useTranslation();
  removeAuth();
  return (
    <>
      <Helmet>{<title>not found - RUGBY AGENTS </title>}</Helmet>
      <Box display="flex" justifyContent="center"></Box>
      {!type && (
        <h1 className={classes.textNotFound}>This page does not exist! :(</h1>
      )}
      {type && <h1 className={classes.textNotFound}>{type} not exist! :(</h1>}

      <div className={classes.buttonsClass}>
        <Button
          className={classes.color}
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          {t("button.signIn").toUpperCase()}
        </Button>
      </div>
    </>
  );
};
