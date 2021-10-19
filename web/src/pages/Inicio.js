import React, { useState } from "react";
import { NavBarPublic } from "../components/NavBarPublic";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    height: "150px",
    paddingTop: "100px",
    paddingBottom: "20px",
    letterSpacing: "3px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
  root: {
    marginTop: 70,
    "& .MuiButton-label": {
      letterSpacing: 1.5,
    },
    color: "#28a499",
  },
}));

export const Inicio = ({ id }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>{<title> RUGBY AGENTS </title>}</Helmet>
      <NavBarPublic />
      <div className={classes.body}>
        <h2 className={classes.wellcomeText}>
          {t("inicio.txt.wellcomeMessage")}
        </h2>

        <Button
          className={classes.root}
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => {
            navigate("/register");
          }}
        >
          {t("button.signUp")}
        </Button>
      </div>
    </>
  );
};
