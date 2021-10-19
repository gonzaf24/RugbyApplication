import React, { useContext, useState } from "react";
import { Context } from "../../Context";
import { BookIcon } from "../Booked/BookIcon";
import { ChatDirect } from "../../components/Chat/ChatDirect";
import { PaisesFlag } from "../../assets/countries/paisesFlag";
import { useTranslation } from "react-i18next";
import { PreviewInfoClub } from "../../components/Preview/previewInfoClub";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PreviewHiringContact } from "../Preview/previewHiringContact";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import CardContent from "@material-ui/core/CardContent";
import MobileStepper from "@material-ui/core/MobileStepper";
import TableContainer from "@material-ui/core/TableContainer";
import CardActionArea from "@material-ui/core/CardActionArea";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ReactCountryFlag from "react-country-flag";
import { getFlagCountry } from "../Utils/utils";
import "../../styles/videoPreview.css";
let uniqid = require("uniqid");

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
  tableHeader: {
    marginTop: 20,
    marginBottom: 10,
    color: "#d8d8d9",
    fontWeight: "bold",
    fontSize: "1rem",
    letterSpacing: 3,
    textAlign: "center",
    width: "100%",
  },
  rootPlayer: {
    marginTop: 30,
    maxWidth: "100%",
    flexGrow: 1,
    border: "1px solid #807e7e3",
    borderRadius: 4,
  },
  headerPlayerTitulo: {
    backgroundColor: "#435b68",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  headerPlayerNombre: {
    backgroundColor: "#435b68",
    display: "flex",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    color: "#d8d8d9",
  },
  steper: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    color: "#d8d8d9",
    backgroundColor: "#435b68",
  },
  pink: {
    color: "#28a499",
  },
  align: {
    textAlign: "cemter",
    width: "100%",
    paddingTop: 80,
  },
  buttonLeft: {
    letterSpacing: "1px",
    float: "left",
    marginLeft: "10%",
    color: "#02d8c4",
    "&:hover": {
      border: "1px solid #00968845",
    },
  },
  buttonRight: {
    letterSpacing: "1px",
    float: "right",
    marginRight: "10%",
    color: "#02d8c4",
    "&:hover": {
      border: "1px solid #00968845",
    },
  },
  buttonGroup: {},
}));

export const ClubProfile = ({ club }) => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [activeStepVideo, setActiveStepVideo] = useState(0);
  const [openInfoClubModal, setOpenInfoClubModal] = useState(false);
  const [openHiringClubModal, setOpenHiringClubModal] = useState(false);
  const maxStepsVideos = club && club.videos ? club.videos.length : null;

  const handleCloseHiringClubModal = () => {
    setOpenHiringClubModal(false);
  };

  const handleCloseInfoClubModal = () => {
    setOpenInfoClubModal(false);
  };

  const handleNextVideo = () => {
    setActiveStepVideo((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackVideo = () => {
    setActiveStepVideo((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      {club && (
        <>
          <Card className={classes.root}>
            <CardActionArea className={classes.bottom}>
              <div className={classes.cardFondoAvatar} key={uniqid()}>
                {club.uid !== user.uid && (
                  <div className={classes.buttonGroup} key={uniqid()}>
                    <div style={{ position: "absolute", top: 80, right: 25 }}>
                      <div
                        style={{
                          float: "right",
                        }}
                      >
                        <BookIcon club={club} />
                      </div>
                      <div
                        style={{
                          float: "right",
                          paddingRight: 10,
                        }}
                      >
                        <ChatDirect
                          uidSender={user.uid}
                          uidReceiver={club.uid}
                          emailSender={user.email}
                          emailReceiver={club.userEmail}
                          avatar={club.fotoPerfil}
                          nombre={club.nombre}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className={classes.align}>
                  <img
                    className={classes.large}
                    alt={club.nombre}
                    src={club.fotoPerfil}
                  />
                </div>

                <Typography component="h2" className={classes.center}>
                  {club.nombre.toUpperCase()}
                </Typography>
              </div>
              <TableContainer>
                <Table>
                  <TableRow key={t("txt.position")}>
                    <TableCell
                      key={uniqid()}
                      style={{
                        borderBottom: 0,
                        color: "#c3c8ca",
                        paddingBottom: 0,
                        paddingTop: 5,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <h5>
                        <ReactCountryFlag
                          countryCode={getFlagCountry(club.pais)}
                          svg
                          style={{
                            marginLeft: 15,
                            marginRight: 15,
                            width: "2em",
                            height: "2em",
                          }}
                          title={club.pais}
                        />
                        {club.pais} {club.estadoCiudad}
                      </h5>
                    </TableCell>
                  </TableRow>

                  <h5
                    style={{
                      borderBottom: 0,
                      color: "#c3c8ca",
                      paddingBottom: 0,
                      paddingTop: 5,
                      textAlign: "center",
                      textDecoration: "underline",
                      margin: "5px",
                    }}
                  >
                    {t("txt.category.competition").toUpperCase()}
                  </h5>

                  <TableRow key={t("txt.categories")}>
                    <TableCell
                      key={uniqid()}
                      style={{
                        borderBottom: 0,
                        color: "#c3c8ca",
                        paddingBottom: 0,
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      <h5 style={{ margin: 0 }}>
                        {club.categorias &&
                          club.categorias
                            .toString()
                            .split(",")
                            .map((ele) => (
                              <>
                                {" "}
                                <>{ele}</>
                                <br></br>
                              </>
                            ))}
                      </h5>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <div style={{ marginTop: 50, paddingBottom: 50 }}>
                <Button
                  variant="outlined"
                  className={classes.buttonLeft}
                  onClick={() => {
                    setOpenInfoClubModal(true);
                  }}
                >
                  {t("txt.moreInfo")}
                </Button>
                <Button
                  className={classes.buttonRight}
                  onClick={() => {
                    setOpenHiringClubModal(true);
                  }}
                  variant="outlined"
                >
                  {t("txt.hiringContactBis")}
                </Button>
              </div>
              <CardContent>
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
              </CardContent>
            </CardActionArea>
          </Card>
          <PreviewInfoClub
            key={uniqid()}
            club={club}
            openInfoClubModal={openInfoClubModal}
            handleCloseInfoClubModal={handleCloseInfoClubModal}
            disabledBookmarks={true}
          />
          <PreviewHiringContact
            key={uniqid()}
            club={club}
            openHiringClubModal={openHiringClubModal}
            handleCloseHiringClubModal={handleCloseHiringClubModal}
          />
        </>
      )}
    </>
  );
};
