import React, { useState, useContext, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Context";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import PublicIcon from "@material-ui/icons/Public";
import Box from "@material-ui/core/Box";
import { useMutation } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import { aboutTime } from "../Utils/utils";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GET_COMMENTS_POST } from "../../mutations/PostsMutation";
import {
  COMMENT_MATCH_RESULT,
  LIKE_MATCH_RESULT,
  GET_COMMENTS_MATCH_RESULT,
} from "../../mutations/ResultsMatchsMutation";
import { PullToRefresh } from "react-js-pull-to-refresh";
import { PullDownContent, ReleaseContent } from "react-js-pull-to-refresh";
import ReactCountryFlag from "react-country-flag";
import { getFlagCountry } from "../Utils/utils";
import { format } from "date-fns";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoIcon from "@material-ui/icons/Photo";

const TransitionDown = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  color: {
    color: "#fafffc",
    marginRight: 10,
    zIndex: 200,
  },
  backPrincipal: {
    "& .MuiDialog-paper": {
      backgroundColor: "#ffffff",
      borderRadius: 15,
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
      minHeight: 266,
      maxHeight: "85vh",
    },
  },
  buttonPublicPrivate: {
    color: "#435b68",
    border: "1px solid #435b68",
    borderRadius: 25,
    fontSize: "0.5rem",
    height: 17,
    "& .MuiButton-startIcon": {
      display: "inherit",
      marginLeft: "-12px",
      marginRight: "2px",
    },
  },
  buttonLinks: {
    color: "#435b68",
    border: "1px solid #435b68",
    borderRadius: 25,
    fontSize: "0.6rem",
    height: 15,
    "& .MuiButton-startIcon": {
      display: "inherit",
      marginLeft: "-12px",
      marginRight: "2px",
    },
  },
  buttonPublish: {
    color: "#009688",
    border: "0px",
    borderRadius: 25,
    fontSize: "0.6rem",
    height: 22,
  },
  buttonComments: {
    border: "0px",
    borderRadius: 25,
    fontSize: "0.6rem",
    height: 22,
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarComment: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  counter: {
    textAlign: "right",
    fontSize: "0.6rem",
    marginRight: 83,
    marginBottom: 1,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  redColor: {
    color: "red",
    textAlign: "right",
    fontSize: "0.7rem",
    marginRight: 83,
    marginBottom: 1,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  imagen: {
    maxHeight: 230,
  },
  root: {
    minHeight: 266,
    width: "100%",
    overflow: "scroll",
  },
  aboutTime: {
    fontSize: "0.7rem",
    lineHeight: 1.7,
    paddingLeft: 5,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  expandComment: {
    overflow: "scroll !important",
    height: "230px !important",
  },
  commentTextField: {
    width: "100%",
    marginRight: 5,
    "& .MuiOutlinedInput-root": {
      borderRadius: 25,
      height: 30,
      fontSize: "0.7rem",
    },
    "& .MuiInputLabel-outlined": {
      zIndex: 1,
      transform: "translate(15px, 10px) scale(1)",
      pointerEvents: "none",
      fontSize: "0.8rem",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
  },
  buttonPublishComment: {
    color: "#009688",
    border: "1px solid #009688",
    height: 28,
    fontSize: "0.6rem",
    borderRadius: 25,
  },
  commentsStyle: {
    width: "100%",
    flexGrow: 1,
    paddingBottom: "50px",
    borderRadius: 0,
  },
  estiloComents: {
    "& .MuiTypography-body1": {
      fontSize: "0.5rem",
    },
    "& .MuiTypography-body2": {
      fontSize: "0.6rem",
    },
  },
  linear: {
    textAlign: "center",
    justifyContent: "center",
    width: "50%",
    fontSize: "0.5rem",
  },
  iLike: {
    marginRight: 5,
    color: "#009688",
  },
  noLike: {
    marginRight: 5,
    color: "#272727a6",
  },
  mainContent: {
    display: "block",

    borderRadius: 15,
    height: "fit-content",
    alignItems: "center",
  },
  styleVS: {
    textAlign: "center",
    width: "fit-content",
    marginLeft: 10,
    marginRight: 10,
  },
  scoreStyles: {
    display: "contents",
    fontSize: "2rem",
  },
  styleTypografy: {
    fontSize: "0.7rem",
    color: "#212121",
    margin: 5,
  },
  flagsStyle: {
    marginLeft: 15,
    marginRight: 15,
    width: "2em",
    height: "2em",
  },
  mainCardStyle: {
    width: "100%",
    maxWidth: "35%",
    textAlign: "center",
    display: "block",
  },
  mainStyleOthers: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

export const OpenMatchResultModal = ({
  openMatchResult,
  setOpenMatchResult,
  fotoUser,
  nombreUser,
  matchResult,
  localeLang,
  matchsResultsList,
}) => {
  const [commentMatchResult] = useMutation(COMMENT_MATCH_RESULT);
  const [likeMatchResult] = useMutation(LIKE_MATCH_RESULT);
  const [obtenerCommentsPost] = useMutation(GET_COMMENTS_POST);
  const [obtenerCommentsMatchResult] = useMutation(GET_COMMENTS_MATCH_RESULT);

  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [about, setAbout] = useState("");
  const [commentsPost, setCommentsPost] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [counter, setCounter] = useState(100);

  const [textComment, setTextComment] = useState();
  const [iLike, setILike] = useState(
    matchResult.likes ? matchResult.likes.includes(user.uid) : false
  );
  const [countLike, setCountLike] = useState(
    matchResult.likes ? matchResult.likes.length : ""
  );
  const [countComment, setCountComment] = useState(matchResult.comments.length);

  const [matchType, setMatchType] = useState(matchResult.matchType);
  const [stadium, setStadium] = useState(matchResult.stadium);
  const [category, setCategory] = useState(matchResult.category);
  const [matchDate, setMatchDate] = useState(matchResult.matchDate);
  const [matchVideoLink, setMatchVideoLink] = useState(
    matchResult.matchVideoLink
  );
  const [team1, setTeam1] = useState(matchResult.team1);
  const [team2, setTeam2] = useState(matchResult.team2);
  const [scoreTeam1, setScoreTeam1] = useState(matchResult.scoreTeam1);
  const [scoreTeam2, setScoreTeam2] = useState(matchResult.scoreTeam2);
  const [paisMatch, setPaisMatch] = useState(matchResult.paisMatch);
  const [estadoCiudadMatch, setEstadoCiudadMatch] = useState(
    matchResult.estadoCiudadMatch
  );
  const [descripcion, setDescripcion] = useState(matchResult.descripcion);
  const [paisSelectionTeam1, setPaisSelectionTeam1] = useState(
    matchResult.paisSelectionTeam1
  );
  const [paisSelectionTeam2, setPaisSelectionTeam2] = useState(
    matchResult.paisSelectionTeam2
  );
  const [urlFotoMatchResult, setUrlFotoMatchResult] = useState(
    matchResult.urlFotoMatchResult
  );
  const [visibilidad, setVisibilidad] = useState(matchResult.visibilidad);

  const handleCloseOpenMatchResult = () => {
    setOpenMatchResult(false);
  };

  const handleChangeTextComment = (event) => {
    setTextComment(event.target.value);
    if (event.target.value.length === 0) {
      setCounter(100);
    } else {
      let aux = 100 - event.target.value.length;
      setCounter(aux);
    }
  };

  useEffect(() => {
    async function fetchData() {
      let prue = await aboutTime(matchResult.fechaCreacion, t);
      setAbout(prue);
    }
    fetchData();
  }, [matchResult]);

  const handleExpandClick = async () => {
    setExpanded(!expanded);
    if (!expanded) {
      try {
        let listaConFecha = [];
        await matchResult.comments.reduce(async (promise, elemento) => {
          await promise;
          let fechaEscrita = await aboutTime(elemento.fechaCreacion, t);
          listaConFecha.push({
            ...elemento,
            fechaEscrita,
          });
          return Promise.resolve();
        }, Promise.resolve());
        matchResult.comments = listaConFecha;
        setCommentsPost(listaConFecha);
        setCountComment(listaConFecha.length);
      } catch (error) {
        console.log(
          "hay error en handleExpandClick! " + JSON.stringify(error.message)
        );
      }
    }
  };

  const refreshComments = async () => {
    try {
      const input = {
        id: matchResult.uid,
      };
      let { data } = await obtenerCommentsMatchResult({
        variables: { input },
      });
      if (data) {
        let array = await data.obtenerCommentsMatchResult;
        let listaConFecha = [];
        await array.reduce(async (promise, elemento) => {
          await promise;
          let fechaEscrita = await aboutTime(elemento.fechaCreacion, t);
          listaConFecha.push({
            ...elemento,
            fechaEscrita,
          });
          return Promise.resolve();
        }, Promise.resolve());
        setCommentsPost(listaConFecha);
        setCountComment(listaConFecha.length);
      }
    } catch (error) {
      console.log(
        "hay error en refreshComments! " + JSON.stringify(error.message)
      );
    }
  };

  const submitComment = async () => {
    try {
      setLoadingPublish(true);
      const input = {
        uid: matchResult.uid,
        text: textComment,
      };
      let { data } = await commentMatchResult({
        variables: { input },
      });
      if (data) {
        setTextComment("");
        setCounter(100);
        //unshift agrega elemento al principio del array
        matchResult.comments.unshift({
          ...data.commentMatchResult,
          fechaEscrita: await aboutTime(
            data.commentMatchResult.fechaCreacion,
            t
          ),
        });
        setCountComment(countComment + 1);
        setLoadingPublish(false);
      }
    } catch (error) {
      setLoadingPublish(false);
      console.log(
        "hay error en submitComment! " + JSON.stringify(error.message)
      );
    }
  };

  const onRefresh = () => {
    return new Promise(async (resolve) => {
      await refreshComments();
      resolve();
    });
  };

  const onClickLike = async () => {
    try {
      iLike ? setILike(false) : setILike(true);

      const input = {
        uid: matchResult.uid,
        emailUser: matchResult.userEmail,
      };
      let { data } = await likeMatchResult({
        variables: { input },
      });
      if (data) {
        console.log(
          " vuelta de likes : " + JSON.stringify(data.likeMatchResult.likes)
        );
      }

      if (iLike) {
        setILike(false);
        setCountLike(countLike - 1);
      } else {
        setILike(true);
        setCountLike(countLike + 1);
      }
    } catch (error) {}
  };

  const getFormatDate = (fechaAFormatear) => {
    const dateObject = new Date(fechaAFormatear);
    let fecha = format(dateObject, "dd/MMMM/yyyy", localeLang);
    let salida = fecha.replace(new RegExp("/", "g"), "  ");
    return salida;
  };

  const cardMainContentMatchType = (match) => {
    if (match.matchType === "NATIONAL") {
      return (
        <div style={{ width: "100%" }}>
          <div style={{ justifyContent: "center", width: "100%" }}>
            {match.matchType} CLUBS
          </div>
          <ReactCountryFlag
            countryCode={getFlagCountry(match.paisMatch)}
            svg
            style={{
              marginLeft: 15,
              marginRight: 15,
              width: "2em",
              height: "2em",
            }}
          />
          <div
            style={{
              justifyContent: "center",
              width: "100%",
              fontSize: "0.5rem",
            }}
          >
            {match.paisMatch}
          </div>
        </div>
      );
    }
    if (match.matchType === "INTERNATIONAL") {
      return (
        <div
          style={{ justifyContent: "center", width: "100%", marginBottom: 20 }}
        >
          {match.matchType} CLUBS
        </div>
      );
    }
    if (match.matchType === "SELECTIONS") {
      return (
        <div
          style={{ justifyContent: "center", width: "100%", marginBottom: 20 }}
        >
          {match.matchType}
        </div>
      );
    }
  };

  const cardMainContentMatch = (match) => {
    if (match.matchType === "NATIONAL") {
      return (
        <>
          <div
            style={{
              width: "100%",
              fontSize: "0.8rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                textAlign: "right",
                marginRight: 15,
                width: "45%",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ marginRight: 15, color: "#212121" }}>
                <Typography noWrap className={classes.styleTypografy}>
                  {" "}
                  {match.team1}
                </Typography>
              </div>
              <Typography style={{ fontSize: "2rem" }}>
                {match.scoreTeam1}
              </Typography>
            </div>
            <div
              style={{
                textAlign: "center",
                width: "fit-content",
              }}
            >
              VS
            </div>
            <div
              style={{
                display: "flex",
                textAlign: "left",
                marginLeft: 15,
                width: "45%",
                justifyContent: "flex-start",
              }}
            >
              <Typography style={{ fontSize: "2rem" }}>
                {match.scoreTeam2}
              </Typography>
              <div style={{ marginLeft: 15, color: "#212121" }}>
                <Typography noWrap className={classes.styleTypografy}>
                  {" "}
                  {match.team2}
                </Typography>
              </div>
            </div>
          </div>
        </>
      );
    }
    if (match.matchType === "INTERNATIONAL") {
      return (
        <>
          <div className={classes.mainStyleOthers}>
            <div className={classes.mainCardStyle}>
              <ReactCountryFlag
                countryCode={getFlagCountry(match.paisSelectionTeam1)}
                svg
                className={classes.flagsStyle}
              />
              <Typography noWrap className={classes.styleTypografy}>
                {match.team1}
              </Typography>
            </div>

            <Typography className={classes.scoreStyles}>
              {match.scoreTeam1}
            </Typography>
            <div className={classes.styleVS}>VS</div>
            <Typography className={classes.scoreStyles}>
              {match.scoreTeam2}
            </Typography>

            <div className={classes.mainCardStyle}>
              <ReactCountryFlag
                countryCode={getFlagCountry(match.paisSelectionTeam2)}
                svg
                className={classes.flagsStyle}
              />
              <Typography noWrap className={classes.styleTypografy}>
                {match.team2}
              </Typography>
            </div>
          </div>
        </>
      );
    }
    if (match.matchType === "SELECTIONS") {
      return (
        <>
          <div className={classes.mainStyleOthers}>
            <div className={classes.mainCardStyle}>
              <ReactCountryFlag
                countryCode={getFlagCountry(match.paisSelectionTeam1)}
                svg
                className={classes.flagsStyle}
              />
              <Typography noWrap className={classes.styleTypografy}>
                {match.paisSelectionTeam1}
              </Typography>
            </div>

            <Typography className={classes.scoreStyles}>
              {match.scoreTeam1}
            </Typography>
            <div className={classes.styleVS}>VS</div>
            <Typography className={classes.scoreStyles}>
              {match.scoreTeam2}
            </Typography>

            <div className={classes.mainCardStyle}>
              <ReactCountryFlag
                countryCode={getFlagCountry(match.paisSelectionTeam2)}
                svg
                className={classes.flagsStyle}
              />
              <Typography noWrap className={classes.styleTypografy}>
                {match.paisSelectionTeam2}
              </Typography>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Dialog
        className={classes.backPrincipal}
        open={openMatchResult}
        onClose={handleCloseOpenMatchResult}
        TransitionComponent={TransitionUp}
      >
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={fotoUser}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <CloseIcon onClick={() => handleCloseOpenMatchResult()} />
              </IconButton>
            }
            title={nombreUser}
            subheader={
              <div style={{ display: "inline-flex" }}>
                <Button
                  variant="outlined"
                  className={classes.buttonPublicPrivate}
                  startIcon={<PublicIcon style={{ fontSize: "13px" }} />}
                >
                  {visibilidad}
                </Button>
                <Typography className={classes.aboutTime}>{about}</Typography>
              </div>
            }
          />
          <CardMedia />
          <CardContent style={{ padding: 5 }}>
            <div className={classes.mainContent}>
              <div
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginBottom: 15,
                  backgroundColor: "#c3e2de",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              >
                <Typography style={{ fontSize: "0.7rem" }}>
                  {getFormatDate(matchDate)}
                </Typography>

                <Typography style={{ fontSize: "0.7rem" }}>
                  {paisMatch} - {stadium}
                </Typography>
              </div>

              <ListItemText
                id={matchResult.uid}
                primary={
                  <div style={{ textAlign: "center", marginBottom: 5 }}>
                    {cardMainContentMatchType(matchResult)}
                  </div>
                }
                secondary={
                  <Typography
                    noWrap
                    style={{ color: "#bdbdbd", marginBottom: 10 }}
                  >
                    {cardMainContentMatch(matchResult)}
                  </Typography>
                }
              />

              <div
                style={{
                  textAlign: "center",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                {matchResult.urlFotoMatchResult && (
                  <Button
                    variant="outlined"
                    className={classes.buttonLinks}
                    startIcon={
                      <PhotoIcon
                        style={{ fontSize: "13px", color: "#269688" }}
                      />
                    }
                  >
                    {"Foto"}
                  </Button>
                )}
                {matchResult.matchVideoLink && (
                  <Button
                    variant="outlined"
                    className={classes.buttonLinks}
                    startIcon={
                      <VideocamIcon
                        style={{ fontSize: "13px", color: "#269688" }}
                      />
                    }
                  >
                    {"Video"}
                  </Button>
                )}
              </div>

              <div
                style={{
                  textAlign: "center",
                  padding: 10,
                  fontSize: "0.7rem",
                  backgroundColor: "#26968847",
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  minHeight: 25,
                }}
              >
                {matchResult.descripcion}
              </div>
            </div>

            {urlFotoMatchResult && (
              <Box
                display="flex"
                justifyContent="center"
                position="relative"
                style={{ width: "100%", height: 230 }}
              >
                <img className={classes.imagen} src={urlFotoMatchResult} />
              </Box>
            )}
          </CardContent>

          <CardActions style={{ marginBottom: 15, marginLeft: 10 }}>
            <ThumbUpIcon
              className={iLike ? classes.iLike : classes.noLike}
              onClick={() => onClickLike()}
            />

            <Box style={{ height: "22px" }}>
              <Typography style={{ fontSize: "0.5rem", lineHeight: 6 }}>
                {countLike + " likes"}
              </Typography>
            </Box>
            <Button
              style={{ textTransform: "lowercase" }}
              variant="outlined"
              className={classes.buttonPublish}
              onClick={handleExpandClick}
            >
              <ChatBubbleOutlineIcon style={{ marginRight: 5 }} />
              {t("txt.comment")}
            </Button>

            <div
              style={{ textTransform: "lowercase" }}
              variant="outlined"
              className={classes.buttonComments}
              onClick={handleExpandClick}
            >
              <Typography style={{ fontSize: "0.5rem", lineHeight: 6 }}>
                {countComment + " " + t("txt.comments")}
              </Typography>
            </div>
          </CardActions>

          <Collapse
            className={classes.expandComment}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <CardContent style={{ paddingBottom: "0px" }}>
              <div
                className={counter === 0 ? classes.redColor : classes.counter}
              >
                {counter}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  aria-label="comment autor"
                  className={classes.avatarComment}
                  src={user.fotoPerfil}
                ></Avatar>

                <TextField
                  className={classes.commentTextField}
                  id="textFieldComment"
                  label="Comment"
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  value={textComment}
                  onChange={handleChangeTextComment}
                />

                {loadingPublish ? (
                  <div>
                    <CircularProgress style={{ width: 20, height: 20 }} />
                  </div>
                ) : (
                  <>
                    <Button
                      style={{ textTransform: "lowercase" }}
                      variant="outlined"
                      className={classes.buttonPublishComment}
                      disabled={textComment ? false : true}
                      onClick={() => submitComment()}
                    >
                      {t("txt.publish")}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>

            <CardContent>
              <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={
                  <ReleaseContent
                    label={t("txt.releaseToRefresh")}
                    height="90px"
                  />
                }
                refreshContent={
                  <div
                    style={{
                      paddingTop: 5,
                      justifyContent: "center",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div className={classes.linear}>
                      {t("txt.refreshing").toLowerCase()}
                      <LinearProgress />
                    </div>
                  </div>
                }
                pullDownThreshold={30}
                onRefresh={() => onRefresh()}
                triggerHeight={60}
                backgroundColor="white"
                startInvisible={false}
              >
                <div style={{ height: "150vh", textAlign: "center" }}>
                  {matchResult.comments && (
                    <Fragment>
                      <ul className={classes.commentsStyle}>
                        {matchResult.comments.map((item) => {
                          return (
                            <div key={item.uid}>
                              <React.Fragment key={252}>
                                <ListItem
                                  style={{
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                  }}
                                  button
                                >
                                  <ListItemAvatar style={{ minWidth: 30 }}>
                                    <Avatar
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                      }}
                                      src={item.fotoPerfil}
                                      alt="Profile Picture"
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    className={classes.estiloComents}
                                    primary={
                                      item.nombreUsuario +
                                      "                    " +
                                      item.fechaEscrita
                                    }
                                    secondary={item.text}
                                  />
                                </ListItem>
                              </React.Fragment>
                            </div>
                          );
                        })}
                      </ul>
                    </Fragment>
                  )}
                </div>
              </PullToRefresh>
            </CardContent>
          </Collapse>
        </Card>
      </Dialog>
    </>
  );
};
