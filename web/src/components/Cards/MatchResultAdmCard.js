import React, { useState, useEffect, Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fade from "@material-ui/core/Fade";
import ImageIcon from "@material-ui/icons/Image";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ReactCountryFlag from "react-country-flag";
import { OpenMatchResultModal } from "../MatchResult/openMatchResultModal";
import { EditMatchResultModal } from "../MatchResult/editMatchResultModal";
import { getFlagCountry } from "../Utils/utils";
import { uploadFile, deleteFile } from "react-s3";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_MATCH_RESULT } from "../../mutations/ResultsMatchsMutation";
import { MATCHS_RESULTS } from "../../config";
import { format } from "date-fns";
import { es, enUS, fr, it } from "date-fns/locale";
import ConfirmDialog from "../../components/ConfirmDialog/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "transparent !important",
    flexGrow: 1,
    borderRadius: "0px",
    color: "#bdbdbd",
    animation: `$myEffect 10ms ${theme.transitions.easing.easeInOut}`,
    boxShadow:
      "-4px 2px 1px -1px rgb(255 255 255 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(255 255 255 / 12%)",
  },
  "@keyframes myEffect": {
    "0%": {
      filter: "blur(5px)",
      opacity: 0,
    },
    "100%": {
      filter: "blur(0)",
      opacity: 1,
    },
  },
  media: {
    height: 250,
    opacity: 0.5,
    background: "rgba(black, 0.5)",
  },
  fecha: {
    cursor: "pointer",
    position: "absolute",
    bottom: 220,
    left: "5%",
    color: " white !important",
    zIndex: "2",
    fontSize: "1em",
  },
  owner: {
    height: 100,
  },
  like: {
    cursor: "pointer",
    position: "absolute",
    color: " white !important",
    bottom: -40,
    right: "5%",
    zIndex: "2",
  },
  titulo: {
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    position: "absolute",
    color: " white !important",
    zIndex: "2",
    top: "50%",
    left: "50%",
    width: "80%",
    fontSize: "1.8em",
    transform: "translate(-50%, -50%)",
    textShadow: "0 3px 0 rgba(0,0,0,0.6)!important",
    fontFamily: "sans-serif, Roboto, Arial, sans-serif !important",
    fontWeight: "900 !important",
    fontStyle: "normal !important",
    letterSpacing: "0.2em !important",
    textTransform: "uppercase !important",
    letterSpacing: "4px",
    "&:hover": {
      fontSize: "2.2em",
      textShadow: "0 3px 0 rgba(252, 185, 0, 0.6)!important",
    },
  },
  color: {
    color: "#e91e63",
  },
  copy: {
    cursor: "pointer",
    position: "absolute",
    color: " white !important",
    bottom: -40,
    right: "15%",
    zIndex: "2",
  },
  flex: {
    display: "flex",
  },
  flexCenter: {
    display: "flex",
    textAlign: "center",
  },
  rigth: {
    textAlign: "right",
  },
  center: {
    textAlign: "center",
    width: "100%",
  },
  block: {
    width: "100%",
  },
  noMargin: {
    margin: 0,
    padding: 0,
    textAlign: "right",
  },
  maxWidth: {
    color: "#28a499",
    fontSize: "0.65rem !important",
    "& .MuiTypography-displayBlock": {
      fontSize: "0.65rem !important",
    },
  },
  maxWidthNoColor: {
    marginLeft: 20,
    fontSize: "0.65rem !important",
    "& .MuiTypography-displayBlock": {
      fontSize: "0.65rem !important",
    },
  },
  VS_Style: {
    textAlign: "center",
    width: "fit-content",
    marginLeft: 10,
    marginRight: 10,
  },
  scoreNational: {
    fontSize: "1.5rem",
  },
  scoreOthers: {
    display: "contents",
    fontSize: "1.5rem",
  },
  fontSizeTypografia: {
    fontSize: "0.7rem",
  },
  mainStyleCard: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  flagsContentStyle: {
    width: "100%",
    maxWidth: "35%",
    textAlign: "center",
    display: "block",
  },
  flagStyle: {
    marginLeft: 15,
    marginRight: 15,
    width: "2em",
    height: "2em",
  },
  colorGrey: {
    color: "#bbbbbb",
  },
  nationalMain: {
    width: "100%",
    fontSize: "0.8rem",
    display: "flex",
    justifyContent: "center",
  },
  nationalSecond: {
    display: "flex",
    textAlign: "right",
    marginRight: 15,
    width: "100%",
    justifyContent: "flex-end",
  },
  nationalTercero: {
    display: "flex",
    textAlign: "left",
    marginLeft: 15,
    width: "100%",
    justifyContent: "flex-start",
  },
  centerFit: {
    textAlign: "center",
    width: "fit-content",
  },
}));

export const MatchResultAdmCard = ({
  matchResult,
  matchsResultsList,
  setMatchResultList,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [show, element] = useNearScreen();
  const [anchorElEdit, setAnchorElEdit] = useState(null);
  const open = Boolean(anchorElEdit);
  const { user, lenguaje } = useContext(Context);
  const [fechaCreacion, setFechaCreacion] = useState();
  const [localeLang, setLocaleLang] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteMatchResult] = useMutation(DELETE_MATCH_RESULT);
  const [openEditMatchResult, setOpenEditMatchResult] = useState(false);
  const [openMatchResult, setOpenMatchResult] = useState(false);
  const [fotoUser, setFotoUser] = useState();
  const [nombreUser, setNombreUser] = useState();

  const handleClickMenu = (event) => {
    setAnchorElEdit(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElEdit(null);
  };

  useEffect(() => {
    async function fetchData() {
      if (matchResult.fechaCreacion) {
        let aux = window.localStorage.getItem("lang");
        switch (aux) {
          case "es":
            setLocaleLang(es);
          case "en":
            setLocaleLang(enUS);
          case "fr":
            setLocaleLang(fr);
          case "it":
            setLocaleLang(it);
        }
        const dateObject = new Date(matchResult.fechaCreacion);
        let fecha = format(dateObject, "dd/MMMM/yyyy", {
          locale: localeLang,
        });
        let fechaFormateada = fecha.replace(new RegExp("/", "g"), "  ");
        const timeString = `${fechaFormateada}   ${String(
          dateObject.getHours()
        ).padStart(2, "0")}:${String(dateObject.getMinutes()).padStart(
          2,
          "0"
        )}`;
        setFechaCreacion(timeString);
      }
    }
    fetchData();
  }, [matchResult]);

  useEffect(() => {
    async function fetchData() {
      if (user.type === "PLAYER") {
        setFotoUser(user.player.fotoPerfil);
        setNombreUser(user.player.nombre + " " + user.player.apellido);
      } else if (user.type === "CLUB") {
        setFotoUser(user.club.fotoPerfil);
        setNombreUser(user.club.nombre);
      }
    }
    fetchData();
  }, []);

  const confirmDelete = async () => {
    setLoadingDelete(true);
    let input = { uid: matchResult.uid };
    const response = await deleteMatchResult({
      variables: { input },
    });
    if (response.data.deletePost === "200") {
      if (matchResult.urlFotoMatchResult !== "") {
        let filename = matchResult.urlFotoMatchResult.substring(
          matchResult.urlFotoMatchResult.lastIndexOf("/") + 1
        );
        await deleteFile(filename, MATCHS_RESULTS)
          .then((response) => {
            let newArray = matchsResultsList.filter(function (element) {
              return element.uid !== matchsResultsList.uid;
            });
            setMatchResultList(newArray);
          })
          .catch((err) => {
            /*aqui lanzar el error*/
          });
      }

      setLoadingDelete(false);
    } else {
      setLoadingDelete(false);
    }
  };

  const handleDeletePost = async () => {
    setConfirmOpen(true);
  };

  const cardMainContentMatch = (match) => {
    if (match.matchType === "NATIONAL") {
      return (
        <div className={classes.nationalMain}>
          <div className={classes.nationalSecond}>
            <div style={{ marginRight: 15 }}>
              <Typography noWrap> {match.team1}</Typography>
            </div>
            <Typography className={classes.scoreNational}>
              {match.scoreTeam1}
            </Typography>
          </div>
          <div className={classes.centerFit}>VS</div>
          <div className={classes.nationalTercero}>
            <Typography className={classes.scoreNational}>
              {match.scoreTeam2}
            </Typography>
            <div style={{ marginLeft: 15 }}>
              <Typography noWrap> {match.team2}</Typography>
            </div>
          </div>
        </div>
      );
    }
    if (match.matchType === "INTERNATIONAL") {
      return (
        <div className={classes.mainStyleCard}>
          <div className={classes.flagsContentStyle}>
            <ReactCountryFlag
              countryCode={getFlagCountry(match.paisSelectionTeam1)}
              svg
              className={classes.flagStyle}
            />
            <Typography noWrap className={classes.fontSizeTypografia}>
              {match.team1}
            </Typography>
          </div>

          <Typography className={classes.scoreOthers}>
            {match.scoreTeam1}
          </Typography>
          <div className={classes.VS_Style}>VS</div>
          <Typography className={classes.scoreOthers}>
            {match.scoreTeam2}
          </Typography>

          <div className={classes.flagsContentStyle}>
            <ReactCountryFlag
              countryCode={getFlagCountry(match.paisSelectionTeam2)}
              svg
              className={classes.flagStyle}
            />
            <Typography noWrap className={classes.fontSizeTypografia}>
              {match.team2}
            </Typography>
          </div>
        </div>
      );
    }
    if (match.matchType === "SELECTIONS") {
      return (
        <div className={classes.mainStyleCard}>
          <div className={classes.flagsContentStyle}>
            <ReactCountryFlag
              countryCode={getFlagCountry(match.paisSelectionTeam1)}
              svg
              className={classes.flagStyle}
            />
            <Typography noWrap className={classes.fontSizeTypografia}>
              {match.paisSelectionTeam1}
            </Typography>
          </div>

          <Typography className={classes.scoreOthers}>
            {match.scoreTeam1}
          </Typography>
          <div className={classes.VS_Style}>VS</div>
          <Typography className={classes.scoreOthers}>
            {match.scoreTeam2}
          </Typography>

          <div className={classes.flagsContentStyle}>
            <ReactCountryFlag
              countryCode={getFlagCountry(match.paisSelectionTeam2)}
              svg
              className={classes.flagStyle}
            />
            <Typography noWrap className={classes.fontSizeTypografia}>
              {match.paisSelectionTeam2}
            </Typography>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <article className={classes.min} ref={element}>
        {show && (
          <Fragment>
            <Card className={classes.root}>
              {
                <CardActionArea>
                  <div>
                    <ListItem
                      className={classes.owner}
                      role={undefined}
                      dense
                      button
                    >
                      <div className={classes.block}>
                        <div className={classes.flex}>
                          <ListItemText
                            className={classes.maxWidth}
                            id={matchResult.uid}
                            primary={
                              <div style={{ display: "flex" }}>
                                <div className={classes.maxWidth}>
                                  {fechaCreacion}
                                </div>

                                <div className={classes.maxWidthNoColor}>
                                  {t("txt.matchType")} {"  "}
                                  {matchResult.matchType}
                                </div>
                              </div>
                            }
                          />

                          {matchResult.urlFotoMatchResult && (
                            <div className={classes.noMargin}>
                              <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                              >
                                <ImageIcon style={{ color: "white" }} />
                              </IconButton>
                            </div>
                          )}

                          <div>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClickMenu}
                            >
                              <MoreHorizIcon style={{ color: "white" }} />
                            </IconButton>
                            <Menu
                              id="menuPost"
                              anchorEl={anchorElEdit}
                              keepMounted
                              open={open}
                              onClose={handleClose}
                              TransitionComponent={Fade}
                              PaperProps={{
                                style: {
                                  maxHeight: 48 * 4.5,
                                  width: "20ch",
                                  backgroundColor: "#435b68",
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  setOpenMatchResult(true);
                                  handleClose();
                                }}
                                className={classes.colorGrey}
                              >
                                <VisibilityIcon style={{ marginRight: 5 }} />
                                {t("txt.open")}
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setOpenEditMatchResult(true);
                                  handleClose();
                                }}
                                className={classes.colorGrey}
                              >
                                <EditIcon style={{ marginRight: 5 }} />
                                {t("txt.edit")}
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleDeletePost();
                                  handleClose();
                                }}
                                className={classes.colorGrey}
                              >
                                <DeleteForeverIcon style={{ marginRight: 5 }} />
                                {t("txt.delete")}
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                        <div className={classes.flex}>
                          <ListItemText
                            id={matchResult.uid}
                            primary={
                              <Typography noWrap style={{ color: "#bdbdbd" }}>
                                {cardMainContentMatch(matchResult)}
                              </Typography>
                            }
                          />
                        </div>
                      </div>
                    </ListItem>
                  </div>
                </CardActionArea>
              }
            </Card>
          </Fragment>
        )}
      </article>

      <ConfirmDialog
        title={t("txt.delete").toUpperCase()}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={confirmDelete}
        state={"delete"}
        loading={loadingDelete}
      >
        {t("txt.confirmaDelete").toLowerCase()}
      </ConfirmDialog>

      <EditMatchResultModal
        openEditMatchResult={openEditMatchResult}
        setOpenEditMatchResult={setOpenEditMatchResult}
        fotoUser={fotoUser}
        nombreUser={nombreUser}
        matchResult={matchResult}
        matchsResultsList={matchsResultsList}
      />

      <OpenMatchResultModal
        openMatchResult={openMatchResult}
        setOpenMatchResult={setOpenMatchResult}
        fotoUser={fotoUser}
        nombreUser={nombreUser}
        matchResult={matchResult}
        localeLang={localeLang}
        matchsResultsList={matchsResultsList}
      />
    </>
  );
};
