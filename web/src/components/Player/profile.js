import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ReactPlayer from "react-player";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import VideocamIcon from "@material-ui/icons/Videocam";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import avatar from "../../assets/stampClubA.png";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import "../../styles/videoPreview.css";
import { PreviewInfoPlayer } from "../Preview/previewInfoPlayer";
import { BookIcon } from "../Booked/BookIcon";
import { ChatDirect } from "../../components/Chat/ChatDirect";
import { getEdad } from "../Utils/utils";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#2c3235",
    flexGrow: 1,
    paddingBottom: "200px",
    borderRadius: 0,
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    boxShadow: "0px 0px 12px 4px rgba(255, 253, 255, 0.14)",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  cardFondoAvatar: {
    height: "140px",
    backgroundColor: "secondary",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
  center: {
    textAlign: "center",
    paddingTop: 60,
    color: "#c3c8ca",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 2,
  },
  centrar: {
    paddingLeft: 30,
    justifyContent: "start",
    paddingTop: 20,
    width: "100%",
    textAlign: "center",
    display: "flex",
  },
  bottom: {
    paddingBottom: "20px",
  },
  color: {
    color: "#28a499",
  },
  tableBody: {
    backgroundColor: "#c3c8ca",

    "&  .MuiTableCell-root": {
      borderBottom: "0px",
      color: "#435b68",
    },
  },
  headTitleText: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 3,
    textAlign: "center",
    width: "100%",
    color: "#435b68",
    padding: 10,
    backgroundColor: "#c3c8ca",
  },
  tableFontSize: {
    fontSize: "0.7rem",
    padding: 3,
  },
  tableFontSizePadding: {
    fontSize: "0.7rem",
    padding: 3,
    paddingLeft: 10,
  },
  tableFontSizeBold: {
    fontSize: "0.7rem",
    padding: 3,
    fontWeight: "bold",
  },
  tableFontSizeBoldPadding: {
    fontSize: "0.7rem",
    padding: 3,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  noPadding: {
    padding: 0,
  },
  bold: {
    fontWeight: "bold",
    color: "#2c3235",
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
  rootPlayer: {
    padding: 5,
    marginTop: 10,
    maxWidth: "100%",
    flexGrow: 1,
    borderRadius: 4,
    backgroundColor: "#c3c8ca",
  },
  headerPlayerTitulo: {
    backgroundColor: "#c3c8ca",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
  },
  headerPlayerNombre: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    color: "#c3c8ca",
  },
  steper: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: "#c3c8ca",
    color: "#435b68",
  },
  pink: {
    color: "#28a499",
  },
  playerName: {
    paddingTop: 85,
    fontSize: "1.5rem",
    color: "#ffffff40",
    marginLeft: 90,
  },
  playerLevel: {
    fontSize: "0.9rem",
    color: "#ffffff40",
    marginLeft: 90,
  },
  rootA: {
    marginTop: 25,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#435b68",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: "1px solid #c3c8ca69",
    padding: 20,
  },
  rootAB: {
    justifyContent: "space-between",
    marginTop: 25,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#435b68",
    alignItems: "center",
    borderRadius: 8,
    border: "1px solid #c3c8ca69",
    padding: 20,
  },
  gridList: {
    alignItems: "center",
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    height: "100%",
  },
  altoA: {
    height: "100% !important",
    alignItems: "center",
    width: 90,
    justifyContent: "center",
    display: "flex",
  },
  alto: {
    margin: 10,
    height: "100%",
    width: 40,
  },
  wraper: {
    justifyContent: "center",
    width: "100%",
    display: "flex",
  },
  buttonGroup: {
    paddingTop: 20,
  },
  textoCard: {
    color: "rgb(195, 200, 202)",
    padding: 0,
    margin: 0,
    "& .MuiTypography-body1": {
      textAlign: "center",
      fontSize: "0.7rem !important",
      fontWeight: "bold",
    },
  },
}));

export const PlayerProfile = ({ player }) => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [activeStepHighlights, setActiveStepHighlights] = useState(0);
  const [openClubModal, setOpenClubModal] = useState(false);
  const [clubHModal, setClubHModal] = useState();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [openInfoPlayerModal, setOpenInfoPlayerModal] = useState(false);
  const maxStepsHighlights =
    player && player.videosHighlights ? player.videosHighlights.length : null;
  const [activeStepMatchs, setActiveStepMatchs] = useState(0);
  const maxStepsMatchs =
    player && player.videosMatchs ? player.videosMatchs.length : null;

  const handleNextHighlights = () => {
    setActiveStepHighlights((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackHighlights = () => {
    setActiveStepHighlights((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextMatchs = () => {
    setActiveStepMatchs((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackMatchs = () => {
    setActiveStepMatchs((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpenClubHModal = (row) => {
    setClubHModal(row);
    setOpenClubModal(true);
  };

  const handleCloseOpenClubHModal = () => {
    setOpenClubModal(false);
  };

  const handleClickOpenVideoModal = () => {
    setOpenVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
  };

  const handleClickOpenInfoPlayerModal = () => {
    setOpenInfoPlayerModal(true);
  };

  const handleCloseInfoPlayerModal = () => {
    setOpenInfoPlayerModal(false);
  };

  return (
    <>
      {player && (
        <>
          <Card className={classes.root}>
            <CardActionArea className={classes.bottom}>
              <CardContent>
                <Typography component="h2" className={classes.center}>
                  {player.nombre.toUpperCase()} {player.apellido.toUpperCase()}
                </Typography>

                {player.uid !== user.uid && (
                  <div className={classes.buttonGroup}>
                    <div>
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
                    </div>
                  </div>
                )}

                <div className={classes.centrar}>
                  <Avatar
                    className={classes.large}
                    alt={player.nombre}
                    src={player.fotoPerfil}
                  />

                  <div style={{ width: "100%" }}>
                    <List>
                      <ListItem>
                        <ListItemText
                          className={classes.textoCard}
                          primary={player.puesto.toUpperCase()}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          className={classes.textoCard}
                          primary={
                            /*  t("txt.age").toUpperCase() +
                            " " + */
                            getEdad(player.fechaNacimiento) +
                            " " +
                            t("txt.years").toUpperCase()
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          className={classes.textoCard}
                          primary={
                            t("txt.height").toUpperCase() +
                            " " +
                            player.altura +
                            " CM"
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          className={classes.textoCard}
                          primary={
                            t("txt.weight").toUpperCase() +
                            " " +
                            player.peso +
                            " KG"
                          }
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemText
                          className={classes.textoCard}
                          primary={
                            player.equipoActual.toUpperCase() +
                            player.categoriaEquipoActual
                              ? " (" + player.categoriaEquipoActual + ") "
                              : " " + player.paisEquipoActual
                          }
                        />
                      </ListItem>
                    </List>
                  </div>
                </div>

                <div className={classes.rootA}>
                  <h3 style={{ color: "#c3c8ca", marginBottom: 10 }}>
                    {t("txt.precedentsClubs")}
                  </h3>
                  <GridList className={classes.gridList} cols={2.5}>
                    {player.historialClubs &&
                      player.historialClubs.map((row) => (
                        <GridListTile className={classes.altoA} key={row.uid}>
                          <div
                            style={{
                              fontSize: "small",
                              marginTop: 8,
                              color: "rgb(195, 200, 202)",
                            }}
                          >
                            {row.club}
                          </div>
                          <div className={classes.wraper}>
                            <img
                              onClick={() => handleClickOpenClubHModal(row)}
                              className={classes.alto}
                              src={avatar}
                              alt={row.club}
                            />
                          </div>
                          <h3
                            style={{
                              marginBottom: 8,
                              color: "rgb(195, 200, 202)",
                            }}
                          >
                            {row.fdesde
                              ? format(new Date(row.fdesde), "yyyy", {
                                  locale: es,
                                })
                              : ""}
                            {" - "}
                            {row.fhasta && row.fhasta != ""
                              ? format(new Date(row.fhasta), "yyyy", {
                                  locale: es,
                                })
                              : t("txt.today").toLowerCase()}
                          </h3>
                        </GridListTile>
                      ))}
                  </GridList>
                </div>

                <div className={classes.rootAB}>
                  <div
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    onClick={() => handleClickOpenVideoModal()}
                  >
                    <h3 style={{ color: "#c3c8ca" }}>
                      {t("txt.videos").toUpperCase()}
                    </h3>
                    <VideocamIcon
                      style={{ fontSize: "4rem", color: "#28a499" }}
                    />
                  </div>
                  <div
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    onClick={() => handleClickOpenInfoPlayerModal()}
                  >
                    <h3 style={{ color: "#c3c8ca" }}>
                      {" "}
                      {t("txt.playerInfo").toUpperCase()}
                    </h3>
                    <ImageSearchIcon
                      style={{ fontSize: "4rem", color: "#28a499" }}
                    />
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>

          <Dialog
            open={openClubModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseOpenClubHModal}
            maxWidth="xs"
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            {/* .MuiTableCell-root border-bottom:*/}
            <DialogContent style={{ backgroundColor: "#435b68" }}>
              <DialogContentText>
                {clubHModal && (
                  <>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableBody className={classes.tableBody}>
                          <TableRow key={t("txt.name")}>
                            <TableCell className={classes.bold}>
                              {t("txt.name").toUpperCase()}
                            </TableCell>
                            <TableCell align="left">
                              {clubHModal.club}
                            </TableCell>
                          </TableRow>

                          <TableRow key={t("txt.country")}>
                            <TableCell className={classes.bold}>
                              {t("txt.country").toUpperCase()}
                            </TableCell>
                            <TableCell align="left">
                              {clubHModal.pais}
                            </TableCell>
                          </TableRow>

                          <TableRow key={t("txt.category")}>
                            <TableCell className={classes.bold}>
                              {t("txt.category").toUpperCase()}
                            </TableCell>
                            <TableCell align="left">
                              {clubHModal.liga}
                            </TableCell>
                          </TableRow>

                          <TableRow key={t("txt.dateFrom")}>
                            <TableCell className={classes.bold}>
                              {t("txt.dateFrom").toUpperCase()}
                            </TableCell>
                            <TableCell align="left">
                              {clubHModal.fdesde
                                ? format(new Date(clubHModal.fdesde), "yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                          </TableRow>

                          <TableRow key={t("txt.dateTo")}>
                            <TableCell className={classes.bold}>
                              {t("txt.dateTo").toUpperCase()}
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              {clubHModal.fhasta && clubHModal.fhasta != ""
                                ? format(new Date(clubHModal.fhasta), "yyyy", {
                                    locale: es,
                                  })
                                : t("txt.currentrlyPlaying").toLowerCase()}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <Dialog
            open={openVideoModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseVideoModal}
            maxWidth="xs"
          >
            <DialogContent style={{ backgroundColor: "#435b68", padding: 10 }}>
              <DialogContentText>
                {!player.videosHighlights ||
                  (player.videosHighlights.length === 0 &&
                    (!player.videosMatchs ||
                      player.videosMatchs.length === 0) && (
                      <h3
                        style={{
                          color: "rgb(195, 200, 202)",
                        }}
                      >
                        {t("txt.noVideos")}
                      </h3>
                    ))}

                {player.videosHighlights && player.videosHighlights.length > 0 && (
                  <div className={classes.rootPlayer}>
                    <div className={classes.headTitleText}>
                      {t("txt.highlights").toUpperCase()}
                    </div>

                    <Typography className={classes.headerPlayerNombre}>
                      {player.videosHighlights[activeStepHighlights].nombre}
                    </Typography>

                    <ReactPlayer
                      width="100%"
                      height="100%"
                      controls={true}
                      url={player.videosHighlights[activeStepHighlights].link}
                      muted
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 },
                        },
                      }}
                    />
                    <MobileStepper
                      className={classes.steper}
                      steps={maxStepsHighlights}
                      position="static"
                      variant="text"
                      activeStep={activeStepHighlights}
                      nextButton={
                        <Button
                          className={classes.pink}
                          size="small"
                          onClick={handleNextHighlights}
                          disabled={
                            activeStepHighlights === maxStepsHighlights - 1
                          }
                        >
                          {t("button.next")}
                          {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          className={classes.pink}
                          onClick={handleBackHighlights}
                          disabled={activeStepHighlights === 0}
                        >
                          {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                          {t("button.back")}
                        </Button>
                      }
                    />
                  </div>
                )}

                {player.videosMatchs && player.videosMatchs.length > 0 && (
                  <div className={classes.rootPlayer}>
                    <div className={classes.headTitleText}>
                      {t("txt.fullMatches").toUpperCase()}
                    </div>

                    <Typography className={classes.headerPlayerNombre}>
                      {player.videosMatchs[activeStepMatchs].nombre}
                    </Typography>

                    <ReactPlayer
                      width="100%"
                      height="100%"
                      controls={true}
                      url={player.videosMatchs[activeStepMatchs].link}
                      muted
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 },
                        },
                      }}
                    />
                    <MobileStepper
                      className={classes.steper}
                      steps={maxStepsMatchs}
                      position="static"
                      variant="text"
                      activeStep={activeStepMatchs}
                      nextButton={
                        <Button
                          size="small"
                          className={classes.pink}
                          onClick={handleNextMatchs}
                          disabled={activeStepMatchs === maxStepsMatchs - 1}
                        >
                          {t("button.next")}
                          {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          className={classes.pink}
                          onClick={handleBackMatchs}
                          disabled={activeStepMatchs === 0}
                        >
                          {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                          {t("button.back")}
                        </Button>
                      }
                    />
                  </div>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <PreviewInfoPlayer
            player={player}
            openInfoPlayerModal={openInfoPlayerModal}
            handleCloseInfoPlayerModal={handleCloseInfoPlayerModal}
            disabledBookmarks={true}
          />
        </>
      )}
    </>
  );
};
