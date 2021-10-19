import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { NavBarInfo } from "../../components/NavBarInfo";
import { Context } from "../../Context";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    paddingTop: "100px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    letterSpacing: "3px",
  },
  Aux: {
    paddingLeft: "10px",
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
    textAlign: "left",
    marginLeft: 5,
    fontSize: "0.7rem",
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
    minHeight: 200,
  },
  btnBack: {
    marginTop: 100,
  },
  cardContent: {
    padding: 0,
  },
  txtColorGrey: {
    marginTop: 10,
    color: "#666666",
    marginLeft: 20,
    marginRight: 20,
  },
  txtColorGreen: {
    fontSize: "1rem",
    fontWeight: 300,
    marginTop: 20,
    marginBottom: 20,
    color: "#2e7f13",
    marginLeft: 20,
    marginRight: 20,
  },
  flex: {
    display: "flex",
  },
}));

export const PlayerLevel = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, agent, userAuth } = useContext(Context);

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <div className={classes.body}>
        <NavBarInfo />

        <div className={classes.Aux}>
          <div className={classes.wellcomeText}>
            {t("txt.wellcome").toUpperCase()}
          </div>
          <div className={classes.txtColorGrey}>{user.email}</div>
          <div className={classes.txtColorGreen}>
            {t("txt.level.title").toUpperCase()}
          </div>
        </div>
        <div className={classes.contenedor}>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <div className={classes.textPlanName}>
                {t("player.level.amateur").toUpperCase()}
              </div>
              <div className={classes.textPlanNameBody}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <div className={classes.flex}>
                    <div>{bull}</div>
                    <div>
                      Acceso directo a clubes amateurs de Francia, Italia,
                      España y Reino Unido.
                    </div>
                  </div>
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <div className={classes.flex}>
                    <div>{bull}</div>
                    <div>Acceso a todos los agentes registrados.</div>
                  </div>
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <div className={classes.flex}>
                    <div>{bull}</div>
                    <div>Visualización de anuncios de clubes.</div>
                  </div>
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button
                className={classes.buttonCard}
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate(`/player/info/${"AMATEUR"}`);
                }}
              >
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <div className={classes.textPlanName}>
                {t("player.level.semiPro").toUpperCase()}
              </div>
              <div className={classes.textPlanNameBody}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <div className={classes.flex}>
                    <div>{bull}</div>
                    <div>
                      Acceso a mas de 50 agentes de varios países y categorías
                      para ayudarte a encontrar to próximo club.
                    </div>
                  </div>
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCard}
                onClick={() => {
                  navigate(`/player/info/${"SEMI-PRO"}`);
                }}
              >
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <div className={classes.textPlanName}>
                {t("player.level.pro").toUpperCase()}
              </div>
              <div className={classes.textPlanNameBody}>
                <Typography className={classes.title} color="textSecondary">
                  <div className={classes.flex}>
                    <div>{bull}</div>
                    <div>
                      ¿Buscas un nuevo agente? Encuentra el que mas se ajuste a
                      tus requisitos entre los más de 50 inscriptos y da el
                      próximo salto en tu carrera deportiva.
                    </div>
                  </div>
                </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.buttonCard}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCard}
                onClick={() => {
                  navigate(`/player/info/${"PROFESSIONAL"}`);
                }}
              >
                {t("register.plan.txt.select")}
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};
