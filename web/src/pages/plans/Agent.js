import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBarInfo } from "../../components/NavBarInfo";
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
    paddingTop: "100px",
    marginBottom: "30px",
    letterSpacing: "3px",
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
  root: {
    width: "inherit",
    margin: 5,
  },
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
    width: "99%",
  },
  buttonCard: {
    justifyContent: "center",
    fontSize: "0.45rem",
    color: "#2e7f13",
    fontWeight: "bold",
  },
  textPlanName: {
    minHeight: 95,
  },
  textPlanName: {
    fontSize: "1rem",
    letterSpacing: 0,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    backgroundColor: "#a9a9a938",
  },
  textPlanNameBody: {
    fontSize: "1rem",
    letterSpacing: 0,
    minHeight: 150,
    paddingTop: 30,
  },
  btnBack: {
    marginTop: 100,
  },
  cardContent: {
    padding: 0,
  },
}));

export const Agent = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <div className={classes.body}>
        <NavBarInfo />
        <h2 className={classes.wellcomeText}>{t("txt.agent")}</h2>
        <div className={classes.contenedor}>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <div className={classes.textPlanName}>
                {t("register.plan.txt.type1")}
              </div>
              <div className={classes.textPlanNameBody}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {t("register.plan.txt.time1")}
                </Typography>
                <Typography variant="h5" component="h2">
                  100{bull}€
                </Typography>
                <Typography variant="body2" component="p">
                  -20%
                  <br />
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button
                className={classes.buttonCard}
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate(`/payment/${4}`);
                }}
              >
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <div className={classes.textPlanName}>
                {t("register.plan.txt.type2")}
              </div>
              <div className={classes.textPlanNameBody}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {t("register.plan.txt.time2")}
                </Typography>
                <Typography variant="h5" component="h2">
                  50{bull}€
                </Typography>
                <Typography variant="body2" component="p">
                  -20%
                  <br />
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCard}
                onClick={() => {
                  navigate(`/payment/${5}`);
                }}
              >
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <div className={classes.textPlanName}>
                {t("register.plan.txt.type3")}
              </div>
              <div className={classes.textPlanNameBody}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {t("register.plan.txt.time3")}
                </Typography>
                <Typography variant="h5" component="h2">
                  15{bull}€
                </Typography>
                <Typography variant="body2" component="p">
                  -20%
                  <br />
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCard}
                onClick={() => {
                  navigate(`/payment/${6}`);
                }}
              >
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className={classes.btnBack}>
          <Button
            size="small"
            onClick={() => {
              navigate("/plans");
            }}
          >
            {t("button.back")}
          </Button>
        </div>
      </div>
    </>
  );
};
