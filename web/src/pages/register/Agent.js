import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "40px",
    letterSpacing: "3px",
    textAlign: "center",
    height: "100vh",
  },
  btnBack: {
    marginTop: 50,
  },
}));

export const Agent = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <div className={classes.body}>
        <div className={classes.btnBack}>
          <Button
            size="small"
            onClick={() => {
              navigate("/register");
            }}
          >
            {t("button.back")}
          </Button>
        </div>
      </div>
    </>
  );
};
