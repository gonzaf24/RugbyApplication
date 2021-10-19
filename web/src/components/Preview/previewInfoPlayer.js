import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ReactCountryFlag from "react-country-flag";
import { BookIcon } from "../Booked/BookIcon";
import { ChatDirect } from "../../components/Chat/ChatDirect";
import { Context } from "../../Context";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { getEdad, getFlagCountry } from "../Utils/utils";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
    paddingTop: 15,
    color: "#bdbdbd",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 2,
  },

  bold: {
    fontWeight: "bold",
    color: "#2c3235",
  },

  tableHistory: {
    border: "1px solid grey",
    borderRadius: 4,
    "& .MuiTableCell-root": {
      fontSize: "0.7rem",
    },
  },
  tableBody: {
    backgroundColor: "#bdc2c4",
    "& .MuiTableCell-body": {
      color: "rgb(67 91 104)",
    },
  },

  headTitleText: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 3,
    textAlign: "center",
    width: "100%",
    color: "#bdbdbd",
    padding: 10,
  },
  tableFontSize: {
    fontSize: "0.7rem",
    padding: 3,
    color: "#435b68",
  },
  tableFontSizePadding: {
    fontSize: "0.7rem",
    padding: 3,
    paddingLeft: 10,
    color: "#435b68",
  },
  tableFontSizeBold: {
    fontSize: "0.7rem",
    padding: 3,
    fontWeight: "bold",
    color: "#435b68",
  },
  tableFontSizeBoldPadding: {
    fontSize: "0.7rem",
    padding: 3,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "#435b68",
  },
  noPadding: {
    padding: 0,
  },
  dialogContent: {
    padding: 10,
    backgroundColor: "#435b68",
    "& .MuiDialogContentText-root": {
      margin: 0,
    },
    "&  .MuiTableCell-root": {
      borderBottom: "0px",
    },
  },
}));

export const PreviewInfoPlayer = ({
  player,
  openInfoPlayerModal,
  handleCloseInfoPlayerModal,
  disabledBookmarks,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user } = useContext(Context);

  return (
    <>
      {player && (
        <Dialog
          open={openInfoPlayerModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseInfoPlayerModal}
          maxWidth="xs"
        >
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              <Typography
                component="h2"
                className={classes.center}
                style={{ marginBottom: 20 }}
              >
                {player.nombre.toUpperCase()} {player.apellido.toUpperCase()}
              </Typography>
              {!disabledBookmarks && player.uid != user.uid && (
                <div style={{ display: "block" }}>
                  <div
                    style={{
                      float: "right",
                    }}
                  >
                    <BookIcon player={player} />
                  </div>
                  <div
                    style={{
                      float: "right",
                      paddingRight: 10,
                    }}
                  >
                    <ChatDirect
                      uidSender={user.uid}
                      uidReceiver={player.uid}
                      emailSender={user.email}
                      emailReceiver={player.userEmail}
                      avatar={player.fotoPerfil}
                      nombre={player.nombre}
                    />
                  </div>
                  <div
                    style={{
                      float: "right",
                      paddingRight: 10,
                    }}
                  >
                    <AccountBoxIcon
                      style={{ color: "rgb(189 189 189)" }}
                      onClick={() => navigate(`/player/profile/${player.uid}`)}
                    />
                  </div>
                </div>
              )}
              <TableContainer className={classes.tableHistory}>
                <Table size="small">
                  <TableBody className={classes.tableBody}>
                    <TableRow key={t("txt.position")}>
                      <TableCell className={classes.bold}>
                        {t("txt.position").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{player.puesto}</TableCell>
                    </TableRow>
                    <TableRow key={t("txt.positionAlt")}>
                      <TableCell className={classes.bold}>
                        {t("txt.positionAlt").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{player.puestoAlt}</TableCell>
                    </TableRow>
                    <TableRow key={t("txt.height")}>
                      <TableCell className={classes.bold}>
                        {t("txt.height").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{player.altura} cms</TableCell>
                    </TableRow>
                    <TableRow key={t("txt.weight")}>
                      <TableCell className={classes.bold}>
                        {t("txt.weight").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{player.peso} kgs</TableCell>
                    </TableRow>
                    <TableRow key={t("txt.age")}>
                      <TableCell className={classes.bold}>
                        {t("txt.age").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {getEdad(player.fechaNacimiento)}{" "}
                        {t("txt.years").toLowerCase()}
                      </TableCell>
                    </TableRow>
                    <TableRow key={t("txt.country")}>
                      <TableCell className={classes.bold}>
                        {t("txt.country").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        <ReactCountryFlag
                          countryCode={getFlagCountry(player.paisNacimiento)}
                          svg
                          style={{
                            width: "1em",
                            height: "1em",
                          }}
                          title={player.paisNacimiento}
                        />{" "}
                        {player.paisNacimiento}
                      </TableCell>
                    </TableRow>
                    <TableRow key={t("txt.nationalities")}>
                      <TableCell className={classes.bold}>
                        {t("txt.nationalities").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {player.nacionalidades &&
                          player.nacionalidades
                            .toString()
                            .split(",")
                            .join("\n" + "-" + "\n")}
                      </TableCell>
                    </TableRow>
                    <TableRow key={t("txt.kicker")}>
                      <TableCell className={classes.bold}>
                        {t("txt.kicker").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{player.pateador}</TableCell>
                    </TableRow>
                    <TableRow key={t("txt.currentTeam")}>
                      <TableCell className={classes.bold}>
                        {t("txt.currentTeam").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{player.equipoActual}</TableCell>
                    </TableRow>
                    <TableRow key={t("txt.countryCurrentTeam")}>
                      <TableCell className={classes.bold}>
                        {t("txt.countryCurrentTeam").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {player.paisEquipoActual}
                      </TableCell>
                    </TableRow>

                    <TableRow key={t("txt.languages")}>
                      <TableCell className={classes.bold}>
                        {t("txt.languages").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {player.idiomas &&
                          player.idiomas
                            .toString()
                            .split(",")
                            .join("\n" + "-" + "\n")}
                      </TableCell>
                    </TableRow>

                    <TableRow key={t("txt.jobAvailability")}>
                      <TableCell className={classes.bold}>
                        {t("txt.jobAvailability").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {player.dispLaboral ? t("button.yes") : t("button.no")}
                      </TableCell>
                    </TableRow>
                    <TableRow key={t("txt.jobAvailabilityToTrain")}>
                      <TableCell className={classes.bold}>
                        {t("txt.jobAvailabilityToTrain").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {player.dispEntrMenores
                          ? t("button.yes")
                          : t("button.no")}
                      </TableCell>
                    </TableRow>
                    <TableRow key={t("txt.internationalPlayer")}>
                      <TableCell className={classes.bold}>
                        {t("txt.internationalPlayer").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {player.jugadorInternacional
                          ? t("button.yes")
                          : t("button.no")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {player.historialInternacional &&
                player.historialInternacional.length > 0 && (
                  <TableContainer
                    className={classes.tableHistory}
                    style={{ marginTop: 30 }}
                  >
                    <div className={classes.headTitleText}>
                      {t("txt.historyInternational").toUpperCase()}
                    </div>

                    <Table aria-label="historiaInter">
                      <TableHead style={{ backgroundColor: "cadetblue" }}>
                        <TableRow>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.country")}
                          </TableCell>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.category")}
                          </TableCell>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.testMatch")}
                          </TableCell>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.date")}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ backgroundColor: "#bdbdbd" }}>
                        {player.historialInternacional &&
                          player.historialInternacional.map((row) => (
                            <TableRow key={row.uid}>
                              <TableCell className={classes.tableFontSize}>
                                {row.pais}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.categoria}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.torneo}
                              </TableCell>
                              <TableCell
                                className={classes.tableFontSizePadding}
                              >
                                {row.fecha
                                  ? format(new Date(row.fecha), "yyyy", {
                                      locale: es,
                                    })
                                  : ""}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              {player.historialClubs && player.historialClubs.length > 0 && (
                <TableContainer
                  className={classes.tableHistory}
                  style={{ marginTop: 30 }}
                >
                  <div className={classes.headTitleText}>
                    {t("txt.historyClub").toUpperCase()}
                  </div>

                  <Table aria-label="historiaClubs">
                    <TableHead style={{ backgroundColor: "cadetblue" }}>
                      <TableRow>
                        <TableCell className={classes.tableFontSizeBoldPadding}>
                          {t("txt.dateFromShort")}
                        </TableCell>
                        <TableCell className={classes.tableFontSizeBold}>
                          {t("txt.dateToShort")}
                        </TableCell>
                        <TableCell className={classes.tableFontSizeBold}>
                          {t("txt.club")}
                        </TableCell>
                        <TableCell className={classes.tableFontSizeBold}>
                          {t("txt.country")}
                        </TableCell>
                        <TableCell className={classes.tableFontSizeBold}>
                          {t("txt.league")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "#bdbdbd" }}>
                      {player.historialClubs &&
                        player.historialClubs.map((row) => (
                          <TableRow key={row.uid}>
                            <TableCell className={classes.tableFontSizePadding}>
                              {row.fdesde
                                ? format(new Date(row.fdesde), "yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.fhasta && row.fhasta != ""
                                ? format(new Date(row.fhasta), "yyyy", {
                                    locale: es,
                                  })
                                : t("txt.currentrlyPlaying").toLowerCase()}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.club}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.pais}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.liga}
                            </TableCell>

                            <TableCell
                              className={classes.tableFontSize}
                              className={classes.noPadding}
                              disabled
                            ></TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {!disabledBookmarks && player.uid != user.uid && (
                <div style={{ textAlign: "center", paddingTop: 30 }}>
                  <Button
                    onClick={() => navigate(`/player/profile/${player.uid}`)}
                    style={{ textTransform: "lowercase", color: "#bdbdbd" }}
                    endIcon={<AccountBoxIcon />}
                  >
                    {t("txt.goToProfile")}
                  </Button>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
