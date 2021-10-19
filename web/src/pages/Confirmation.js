import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { NavBarPublic } from "../components/NavBarPublic";
import Button from "@material-ui/core/Button";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
  icon: {
    width: 400,
    height: 350,
  },
  contenedor: {
    margin: 10,
  },
  contenedor1: {
    marginTop: 50,
  },
  margin: {
    marginTop: 80,
  },
}));

export const Confirmation = ({ id }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={classes.body}>
        <NavBarPublic />
        {id === "register" && (
          <div className={classes.contenedor1}>
            <DoneAllIcon className={classes.icon} color="primary" />
            <div className={classes.contenedor}>
              {t("confirmation.register")}{" "}
            </div>
          </div>
        )}
        {id === "recover" && (
          <div className={classes.contenedor1}>
            <DoneAllIcon className={classes.icon} color="primary" />
            <div className={classes.contenedor}>
              {t("confirmation.recover")}{" "}
            </div>
          </div>
        )}
        <div className={classes.margin}>
          <Button
            size="small"
            onClick={() => {
              navigate("/login");
            }}
          >
            {t("button.signIn")}
          </Button>
        </div>
      </div>
    </>
  );
};
