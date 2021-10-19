import React, { useContext, useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import "../../styles/videoPreview.css";
import LaunchIcon from "@material-ui/icons/Launch";
import { navigate } from "@reach/router";
import { getEdad } from "../Utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "white",
    flexGrow: 1,
    paddingBottom: "200px",
    borderRadius: 0,
  },
  large: {
    marginTop: "-70px",
    width: theme.spacing(12),
    height: theme.spacing(12),
    boxShadow: "0px 0px 20px 20px rgba(255, 253, 255, 0.14)",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  cardFondoAvatar: {
    height: "140px",
    backgroundColor: "#234e67f2",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
  center: {
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 30,
    color: "secondary",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 2,
  },
  bottom: {
    paddingBottom: "20px",
  },
  color: {
    color: "#28a499",
  },
  tableBody: {
    backgroundColor: "white",
  },
  bold: {
    fontWeight: "bold",
  },
  textField: {
    width: "100%",
    marginTop: 35,
    backgroundColor: "white",
    borderRadius: 4,
    color: "none",
  },
  tableHistory: {
    border: "1px solid grey",
    borderRadius: 4,
    marginTop: 30,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  agentName: {
    paddingTop: 95,
    fontSize: "1.5rem",
    color: "#ffffff40",
    marginLeft: 90,
  },
  nacionalidades: {
    marginTop: 20,
    marginBottom: 10,
    color: "#737373",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 3,
    textAlign: "center",
    width: "100%",
  },
  tableFontSize: {
    fontSize: "0.55rem",
    padding: 3,
  },
  tableFontSizePadding: {
    fontSize: "0.55rem",
    padding: 3,
    paddingLeft: 10,
  },
  tableFontSizeBold: {
    fontSize: "0.55rem",
    padding: 3,
    fontWeight: "bold",
  },
  tableFontSizeBoldPadding: {
    fontSize: "0.55rem",
    padding: 3,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  colorGrenn: {
    color: "#28a499",
  },
}));

export const AgentProfile = () => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { t, i18n } = useTranslation();
  const scrollRef = useRef(null);
  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [user]);

  return (
    <>
      {user.agent && (
        <>
          <div ref={scrollRef} />
          <Card className={classes.root}>
            <CardActionArea className={classes.bottom}>
              <div className={classes.cardFondoAvatar}>
                <div className={classes.agentName}>
                  {t("txt.agent").toUpperCase()}
                </div>
              </div>

              <CardContent>
                <Avatar
                  className={classes.large}
                  alt={user.agent.nombre}
                  src={user.agent.fotoPerfil}
                />
                <Typography component="h2" className={classes.center}>
                  {user.agent.nombre.toUpperCase()}
                </Typography>
                <div>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody className={classes.tableBody}>
                        <TableRow key={t("txt.agencyName")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.agencyName").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {user.agent.agencia}
                          </TableCell>
                        </TableRow>

                        <TableRow key={t("txt.countryAgency")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.countryAgency").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {user.agent.paisesOpera &&
                              user.agent.paisesOpera
                                .toString()
                                .split(",")
                                .join("\n" + "-" + "\n")}
                          </TableCell>
                        </TableRow>

                        <TableRow key={t("txt.phone")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.phone").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {user.agent.telefono}
                          </TableCell>
                        </TableRow>

                        <TableRow key={t("txt.email")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.email").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">{user.agent.email}</TableCell>
                        </TableRow>

                        <TableRow key={t("txt.languages")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.languages").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {user.agent.idiomas &&
                              user.agent.idiomas
                                .toString()
                                .split(",")
                                .join("\n" + "-" + "\n")}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div>
                  <TableContainer className={classes.tableHistory}>
                    <div className={classes.nacionalidades}>
                      {t("txt.playersRepresent").toUpperCase()}
                    </div>

                    <Table aria-label="playersRepresented">
                      <TableHead style={{ backgroundColor: "cadetblue" }}>
                        <TableRow>
                          <TableCell
                            className={classes.tableFontSizeBoldPadding}
                          >
                            {t("txt.level")}
                          </TableCell>
                          <TableCell className={classes.tableFontSizeBold}>
                            {t("txt.position")}
                          </TableCell>
                          <TableCell className={classes.tableFontSizeBold}>
                            {t("txt.positionAlt")}
                          </TableCell>
                          <TableCell className={classes.tableFontSizeBold}>
                            {t("txt.kicker")}
                          </TableCell>
                          <TableCell className={classes.tableFontSizeBold}>
                            {t("txt.age")}
                          </TableCell>
                          <TableCell className={classes.tableFontSizeBold}>
                            {t("txt.name")}
                          </TableCell>
                          <TableCell
                            className={classes.tableFontSizeBold}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user.agent.agentPlayers &&
                          user.agent.agentPlayers.map((row) => (
                            <TableRow key={row.uid}>
                              <TableCell
                                className={classes.tableFontSizePadding}
                              >
                                {row.nivel}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.puesto}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.puestoAlt}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.pateador}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {getEdad(row.fechaNacimiento)}{" "}
                                {t("txt.years").toLowerCase()}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.nombre + " " + row.apellido}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                <LaunchIcon
                                  className={classes.colorGrenn}
                                  fontSize="small"
                                  onClick={() =>
                                    navigate(
                                      `/playerSheet/${row.uid}/${user.uid}`
                                    )
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )}
    </>
  );
};
