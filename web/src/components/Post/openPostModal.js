import React, { useState, useContext, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Context";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
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
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Box from "@material-ui/core/Box";
import { useMutation } from "@apollo/react-hooks";
import { GET_COMMENTS_POST } from "../../mutations/PostsMutation";
import LinearProgress from "@material-ui/core/LinearProgress";
import { aboutTime } from "../Utils/utils";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import { COMMENT_POST, LIKE_POST } from "../../mutations/PostsMutation";
import { PullToRefresh } from "react-js-pull-to-refresh";
import { PullDownContent, ReleaseContent } from "react-js-pull-to-refresh";

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
  contenedorPrivadoPublico: {
    color: "#435b68",
    textAlign: "center",
    backgroundColor: "#dcdcdc26",
    paddingBottom: 20,
    paddingTop: 20,
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
  backPrivadoPublico: {
    "& .MuiDialog-paper": {
      backgroundColor: "white",
      borderRadius: 5,
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
  textArea: {
    borderRadius: 5,
    border: "0px",
    width: "100%",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    background: "white",
    maxHeight: "130px",
    maxWidth: "390px",
    color: "#212121 !important",
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
}));

export const OpenPostModal = ({
  openPost,
  setOpenPost,
  fotoUser,
  nombreUser,
  post,
  postsList,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { user } = useContext(Context);
  const [openPublicPrivate, setOpenPublicPrivate] = useState();
  const [visibilidad, setVisibilidad] = useState(post.visibilidad);
  const [contenidoPost, setContenidoPost] = useState(post.contenidoPost);
  const [urlFotoPost, setUrlFotoPost] = useState(post.urlFotoPost);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [about, setAbout] = useState("");
  const [commentsPost, setCommentsPost] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [counter, setCounter] = useState(100);
  const [commentPost] = useMutation(COMMENT_POST);
  const [likePost] = useMutation(LIKE_POST);
  const [obtenerCommentsPost] = useMutation(GET_COMMENTS_POST);
  const [textComment, setTextComment] = useState();
  const [iLike, setILike] = useState(
    post.likes ? post.likes.includes(user.uid) : false
  );
  const [countLike, setCountLike] = useState(
    post.likes ? post.likes.length : ""
  );
  const [countComment, setCountComment] = useState(post.comments.length);

  const handleCloseOpenPost = () => {
    setOpenPost(false);
  };

  const handleClosePublicPrivate = () => {
    setOpenPublicPrivate(false);
  };

  const handleChangeTextComment = (event) => {
    setTextComment(event.target.value);
    let aux = 100 - event.target.value.length;
    if (event.target.value.length === 0) {
      setCounter(100);
    } else {
      setCounter(aux);
    }
  };

  const onChangeEvent = (event) => {
    setContenidoPost(event.target.value);
    let aux = 1000 - event.target.value.length;
    if (event.target.value.length === 0) {
      setCounter(1000);
    } else {
      setCounter(aux);
    }
  };

  useEffect(() => {
    async function fetchData() {
      let prue = await aboutTime(post.fechaCreacion, t);
      setAbout(prue);
    }
    fetchData();
  }, [post]);

  const handleExpandClick = async () => {
    setExpanded(!expanded);
    if (!expanded) {
      try {
        let listaConFecha = [];
        await post.comments.reduce(async (promise, elemento) => {
          await promise;
          let fechaEscrita = await aboutTime(elemento.fechaCreacion, t);
          listaConFecha.push({
            ...elemento,
            fechaEscrita,
          });
          return Promise.resolve();
        }, Promise.resolve());
        post.comments = listaConFecha;
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
        id: post.uid,
      };
      let { data } = await obtenerCommentsPost({
        variables: { input },
      });
      if (data) {
        let array = await data.obtenerCommentsPost;
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
        uid: post.uid,
        text: textComment,
      };
      let { data } = await commentPost({
        variables: { input },
      });
      if (data) {
        setTextComment("");
        setCounter(100);
        post.comments.unshift({
          ...data.commentPost,
          fechaEscrita: await aboutTime(data.commentPost.fechaCreacion, t),
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
        uid: post.uid,
        emailUser: post.userEmail,
      };
      let { data } = await likePost({
        variables: { input },
      });
      if (data) {
        console.log(
          " vuelta de likes : " + JSON.stringify(data.likePost.likes)
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

  return (
    <>
      <Dialog
        className={classes.backPrincipal}
        open={openPost}
        onClose={handleCloseOpenPost}
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
                <CloseIcon onClick={() => handleCloseOpenPost()} />
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
            <TextareaAutosize
              className={classes.textArea}
              value={contenidoPost}
              aria-label={t("txt.description")}
              disabled={true}
            />

            {urlFotoPost && (
              <Box
                display="flex"
                justifyContent="center"
                position="relative"
                style={{ width: "100%", height: 230 }}
              >
                <img className={classes.imagen} src={urlFotoPost} />
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
                  {post.comments && (
                    <Fragment>
                      <ul className={classes.commentsStyle}>
                        {post.comments.map((item) => {
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

      <Dialog
        className={classes.backPrivadoPublico}
        open={openPublicPrivate}
        onClose={handleClosePublicPrivate}
        TransitionComponent={TransitionDown}
      >
        <div className={classes.contenedorPrivadoPublico}>
          {t("txt.whoCanSeeThePost")}
        </div>
        <List dense>
          <ListItem key={1} button>
            <ListItemAvatar>
              <PublicIcon />
            </ListItemAvatar>
            <ListItemText
              id={22}
              primary={"Public"}
              secondary={t("txt.anyUserInAndOutApp")}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => setVisibilidad("PUBLIC")}
                checked={visibilidad === "PUBLIC"}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key={2} button>
            <ListItemAvatar>
              <PublicIcon />
            </ListItemAvatar>
            <ListItemText
              id={33}
              primary={"Private"}
              secondary={t("txt.onlyRegisteredUsers")}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => setVisibilidad("PRIVATE")}
                checked={visibilidad === "PRIVATE"}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <div style={{ margin: 20, color: "#435b68" }}>
          <Button
            onClick={() => handleClosePublicPrivate()}
            variant="outlined"
            style={{
              borderRadius: 25,
              fontSize: "0.6rem",
              float: "right",
              color: "#28a499",
              border: " 1px solid #28a499",
            }}
          >
            {t("txt.save")}
          </Button>
          <Button
            style={{
              borderRadius: 25,
              fontSize: "0.6rem",
              float: "right",
              marginRight: 10,
              color: "#435b68",
              border: " 1px solid #435b68",
            }}
            onClick={() => handleClosePublicPrivate()}
            variant="outlined"
          >
            {t("txt.close")}
          </Button>
        </div>
      </Dialog>
    </>
  );
};
