import React, { useContext, useState, useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import "../../styles/videoPreview.css";
import ReactPlayer from "react-player";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { ChatDirect } from "../../components/Chat/ChatDirect";

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
    borderRadius: "50%",
    width: 150,
    height: 150,
    boxShadow: "0px 0px 20px 20px rgba(255, 253, 255, 0.14)",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  cardFondoAvatar: {
    height: "300px",
    backgroundColor: "#2c3235",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
  center: {
    textAlign: "center",
    paddingTop: 25,
    color: "#c3c8ca",
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
  tableHeader: {
    marginTop: 20,
    marginBottom: 10,
    color: "#c3c8ca",
    fontWeight: "bold",
    fontSize: "1rem",
    letterSpacing: 3,
    textAlign: "center",
    width: "100%",
  },
  tableFontSize: {
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
    marginTop: 30,
    maxWidth: "100%",
    flexGrow: 1,
    border: "1px solid grey",
    borderRadius: 4,
  },
  headerPlayerTitulo: {
    backgroundColor: "#f9f8f8d4",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
  },
  headerPlayerNombre: {
    backgroundColor: "#f1f1f1de",
    display: "flex",
    alignItems: "center",
    height: 40,
    paddingLeft: theme.spacing(4),
  },
  steper: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  pink: {
    color: "#28a499",
  },
  align: {
    textAlign: "cemter",
    width: "100%",
    paddingTop: 80,
  },
  club: {
    paddingTop: 55,
    fontSize: "1.5rem",
    padding: 8,
    color: "#ffffff40",
  },
  alignChat: {
    position: "absolute",
    top: 210,
    right: "6%",
  },
}));

export const ClubSheet = ({ club }) => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { t, i18n } = useTranslation();
  const scrollRef = useRef(null);
  const theme = useTheme();
  const [activeStepVideo, setActiveStepVideo] = useState(0);
  const maxStepsVideos = club.videos ? club.videos.length : null;
  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextVideo = () => {
    setActiveStepVideo((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackVideo = () => {
    setActiveStepVideo((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    scrollToTop();
  }, [user]);

  return (
    <>
      {club && (
        <>
          <div ref={scrollRef} />
          <Card className={classes.root}>
            <CardActionArea className={classes.bottom}>
              <div className={classes.cardFondoAvatar}>
                <div className={classes.align}>
                  <img
                    className={classes.large}
                    alt={club.nombre}
                    src={club.fotoPerfil}
                  />
                </div>
                {user.uid !== club.uid && (
                  <div className={classes.alignChat}>
                    <ChatDirect
                      uidSender={user.uid}
                      uidReceiver={club.uid}
                      emailSender={user.email}
                      emailReceiver={club.userEmail}
                      avatar={club.fotoPerfil}
                      nombre={club.nombre}
                    />
                  </div>
                )}

                <Typography component="h2" className={classes.center}>
                  {club.nombre.toUpperCase()}
                </Typography>
              </div>

              <CardContent>
                <div>
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody className={classes.tableBody}>
                        <TableRow key={t("txt.categories")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                            style={{ maxWidth: 200 }}
                          >
                            {t("txt.categories").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {club.categorias &&
                              club.categorias
                                .toString()
                                .split(",")
                                .map((ele) => (
                                  <TableRow key={ele}>
                                    <TableCell
                                      className={classes.tableFontSize}
                                    >
                                      {ele}
                                    </TableCell>
                                  </TableRow>
                                ))}
                          </TableCell>
                        </TableRow>

                        <TableRow key={t("txt.country")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.country").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">{club.pais}</TableCell>
                        </TableRow>

                        <TableRow key={t("txt.cityState")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.cityState").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {club.estadoCiudad}
                          </TableCell>
                        </TableRow>

                        <TableRow key={t("txt.adress")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.adress").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">{club.direccion}</TableCell>
                        </TableRow>

                        <TableRow key={t("txt.president")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.president").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">{club.presidente}</TableCell>
                        </TableRow>

                        <TableRow key={t("txt.web")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.web").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">{club.web}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TableContainer className={classes.tableHistory}>
                    <div className={classes.tableHeader}>
                      {t("txt.hiringContact").toUpperCase()}
                    </div>

                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody className={classes.tableBody}>
                        <TableRow key={t("txt.name")}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.bold}
                          >
                            {t("txt.name").toUpperCase()}
                          </TableCell>
                          <TableCell align="left">
                            {club.responsableContrataciones}
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
                          <TableCell align="left">
                            {club.emailResponsable}
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
                            {club.telefonoResponsable}
                          </TableCell>
                        </TableRow>
                      </TableBody>

                      <TableRow key={t("txt.languages")}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.bold}
                        >
                          {t("txt.languages").toUpperCase()}
                        </TableCell>
                        <TableCell align="left">
                          {club.idiomas &&
                            club.idiomas
                              .toString()
                              .split(",")
                              .join("\n" + "-" + "\n")}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>

                  {club.videos && club.videos.length > 0 && (
                    <div className={classes.rootPlayer}>
                      <Paper
                        square
                        elevation={0}
                        className={classes.headerPlayerTitulo}
                      >
                        <div className={classes.tableHeader}>
                          {t("txt.theClub").toUpperCase()}
                        </div>
                      </Paper>

                      <Paper
                        square
                        elevation={0}
                        className={classes.headerPlayerNombre}
                      >
                        <Typography>
                          {club.videos[activeStepVideo].nombre}
                        </Typography>
                      </Paper>
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        controls={true}
                        url={club.videos[activeStepVideo].link}
                        muted
                        config={{
                          youtube: {
                            playerVars: { showinfo: 1 },
                          },
                        }}
                      />
                      <MobileStepper
                        className={classes.steper}
                        steps={maxStepsVideos}
                        position="static"
                        variant="text"
                        activeStep={activeStepVideo}
                        nextButton={
                          <Button
                            size="small"
                            className={classes.pink}
                            onClick={handleNextVideo}
                            disabled={activeStepVideo === maxStepsVideos - 1}
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
                            onClick={handleBackVideo}
                            disabled={activeStepVideo === 0}
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
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )}
    </>
  );
};
