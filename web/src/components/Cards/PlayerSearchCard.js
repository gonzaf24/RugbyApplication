import React, { useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Context";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Fade from "@material-ui/core/Fade";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { BookIcon } from "../Booked/BookIcon";
import { navigate } from "@reach/router";
import { getFlagCountry, getEdad } from "../Utils/utils";

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
  spinnerSize: {
    cursor: "pointer",
    position: "absolute",
    width: "20px !important",
    height: "20px !important",
    marginBottom: 7,
    marginRight: 10,
    bottom: -40,
    right: "5%",
    zIndex: "2",
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
  semiPro: {
    background: "#a2a01c9c",
    color: "white",
    textAlign: "center",
    borderRadius: 3,
    fontSize: "0.5rem !important",
    padding: 7,
  },
  pro: {
    background: "#cc1212ad",
    color: "white",
    textAlign: "center",
    borderRadius: 3,
    fontSize: "0.5rem !important",
    padding: 7,
  },
  amateur: {
    background: "#0e8e0e9c",
    color: "white",
    textAlign: "center",
    borderRadius: 3,
    fontSize: "0.5rem !important",
    padding: 7,
  },
  noMargin: {
    margin: 0,
    padding: 0,
    textAlign: "right",
  },
  maxWidth: {
    width: "60%",
  },
}));

export const PlayerSearchCard = ({
  player,
  setPlayerInfo,
  setOpenInfoPlayerModal,
  disabledBookmarks,
  deleteBookmark,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [show, element] = useNearScreen();
  const { user } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <article className={classes.min} ref={element} key={player.uid}>
      {show && (
        <Fragment>
          <Card className={classes.root}>
            <CardActionArea>
              <div>
                <ListItem
                  className={classes.owner}
                  key={player.uid}
                  role={undefined}
                  dense
                  button
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={player.nombre + " " + player.apellido}
                      src={player.fotoPerfil}
                      onClick={() => {
                        setPlayerInfo(player);
                        setOpenInfoPlayerModal(true);
                      }}
                    />
                  </ListItemAvatar>
                  <div className={classes.block}>
                    <div className={classes.flex}>
                      <ListItemText
                        onClick={() => {
                          setPlayerInfo(player);
                          setOpenInfoPlayerModal(true);
                        }}
                        className={classes.maxWidth}
                        id={player.uid}
                        primary={
                          player.nombre.toUpperCase() +
                          " " +
                          player.apellido.toUpperCase()
                        }
                      />

                      <ListItemText
                        onClick={() => {
                          setPlayerInfo(player);
                          setOpenInfoPlayerModal(true);
                        }}
                        className={classes.noMargin}
                        id={player.uid}
                        primary={
                          getEdad(player.fechaNacimiento) +
                          " " +
                          t("txt.years").toLowerCase()
                        }
                      />
                      {!disabledBookmarks ? (
                        <>
                          {player.uid != user.uid ? (
                            <BookIcon player={player} />
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <div>
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreHorizIcon style={{ color: "white" }} />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
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
                                handleClose();
                                navigate(`/player/profile/${player.uid}`);
                              }}
                              style={{ color: "#bbbbbb" }}
                            >
                              <AccountBoxIcon />
                              {t("txt.profile")}
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                deleteBookmark(
                                  "PLAYER",
                                  player.uid,
                                  player.email
                                );
                                handleClose();
                              }}
                              style={{ color: "#bbbbbb" }}
                            >
                              <DeleteForeverIcon /> {t("txt.deleteBookmark")}
                            </MenuItem>
                          </Menu>
                        </div>
                      )}
                    </div>
                    <div
                      className={classes.flex}
                      onClick={() => {
                        setPlayerInfo(player);
                        setOpenInfoPlayerModal(true);
                      }}
                    >
                      <div className={classes.block}>
                        <ListItemText
                          id={player.uid}
                          primary={
                            <>
                              <ReactCountryFlag
                                countryCode={getFlagCountry(
                                  player.paisNacimiento
                                )}
                                svg
                                style={{
                                  width: "1em",
                                  height: "1em",
                                }}
                                title={player.paisNacimiento}
                              />
                              {"  "}
                              {player.paisNacimiento}
                            </>
                          }
                          d
                        />
                      </div>
                      <div className={classes.center}>
                        <ListItemText id={player.uid} primary={player.puesto} />
                      </div>
                      <div className={classes.block}>
                        <ListItemText
                          className={classes.rigth}
                          id={player.uid}
                          primary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={
                                  player.nivel === "AMATEUR"
                                    ? classes.amateur
                                    : player.nivel === "PROFESSIONAL"
                                    ? classes.pro
                                    : player.nivel === "SEMI-PRO"
                                    ? classes.semiPro
                                    : ""
                                }
                              >
                                {player.nivel}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </ListItem>
              </div>
            </CardActionArea>
          </Card>
        </Fragment>
      )}
    </article>
  );
};
