import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    height: "150px",
    paddingTop: "50px",
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
  },
  register: {
    margin: theme.spacing(1),
    width: 200,
    marginBottom: 25,
  },
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  contenedor: {
    display: "flex",
  },
  buttonCard: {
    justifyContent: "center",
  },
  textPlanName: {
    minHeight: 95,
  },
  textPlanName1: {
    minHeight: 110,
  },
  btnBack: {
    marginTop: 100,
  },
}));

export const Player = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <div className={classes.body}>
        <h2 className={classes.wellcomeText}>{t("register.player")}</h2>
        <div className={classes.contenedor}>
          <Card className={classes.root}>
            <CardContent>
              <div className={classes.textPlanName}>
                <Typography variant="h5" component="h2">
                  {t("register.plan.txt.type1")}
                </Typography>
              </div>
              <div className={classes.textPlanName1}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {t("register.plan.txt.time1")}
                </Typography>
                <Typography variant="h5" component="h2">
                  10{bull}€
                </Typography>
                <Typography variant="body2" component="p">
                  -20%
                  <br />
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button variant="outlined" color="primary" size="small">
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <div className={classes.textPlanName}>
                <Typography variant="h5" component="h2">
                  {t("register.plan.txt.type2")}
                </Typography>
              </div>
              <div className={classes.textPlanName1}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {t("register.plan.txt.time2")}
                </Typography>
                <Typography variant="h5" component="h2">
                  5{bull}€
                </Typography>
                <Typography variant="body2" component="p">
                  -20%
                  <br />
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button variant="outlined" color="primary" size="small">
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <div className={classes.textPlanName}>
                <Typography variant="h5" component="h2">
                  {t("register.plan.txt.type3")}
                </Typography>
              </div>
              <div className={classes.textPlanName1}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {t("register.plan.txt.time3")}
                </Typography>
                <Typography variant="h5" component="h2">
                  2{bull}€
                </Typography>
                <Typography variant="body2" component="p">
                  -20%
                  <br />
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button variant="outlined" color="primary" size="small">
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
        </div>
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
