import React, { useState } from "react";
import { NavBarInfo } from "../../components/NavBarInfo";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    height: "150px",
    paddingTop: "100px",
    marginBottom: "30px",
    letterSpacing: "3px",
    marginLeft: 30,
    marginRight: 30,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    height: "100vh",
  },
  register: {
    margin: theme.spacing(1),
    width: 200,
    marginBottom: 25,
  },
}));

export const Plans = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={classes.body}>
        <NavBarInfo />
        <h3 className={classes.wellcomeText}>
          {t("plans.txt.main").toUpperCase()}
        </h3>

        <Button
          variant="outlined"
          size="large"
          color="secondary"
          className={classes.register}
          size="large"
          onClick={() => {
            navigate("/plans/club");
          }}
        >
          {t("txt.club")}
        </Button>

        {/*    <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.register}
          size="large"
          onClick={() => {
            navigate("/plans/agent");
          }}
        >
          {t("txt.agent")}
        </Button> */}

        <Button
          variant="outlined"
          size="large"
          color="secondary"
          className={classes.register}
          size="large"
          onClick={() => {
            navigate("/plans/player");
          }}
        >
          {t("txt.player")}
        </Button>
      </div>

      {props.children}
    </>
  );
};
