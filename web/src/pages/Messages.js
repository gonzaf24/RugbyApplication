import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import GridList from "@material-ui/core/GridList";
import CloseIcon from "@material-ui/icons/Close";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Layout } from "../components/Layout";
import { Context } from "../Context";
import { useInputValue } from "../hooks/useInputValue";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import CommentIcon from "@material-ui/icons/Comment";
import Skeleton from "@material-ui/lab/Skeleton";
import { useMutation } from "@apollo/react-hooks";
import { GET_CHATS } from "../mutations/ChatsMutation";
import Slide from "@material-ui/core/Slide";

import { PullToRefresh } from "react-js-pull-to-refresh";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  PullDownContent,
  ReleaseContent,
  RefreshContent,
} from "react-js-pull-to-refresh";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const firebaseApp = require("firebase/app");
let chatModel = require("../service/chatModel");
let uniqid = require("uniqid");

const useStyles = makeStyles((theme) => ({
  clicked: {
    width: "100%",
    cursor: "pointer",
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
  areadySeen: {
    width: "100%",
    backgroundColor: "#2c3235",
    cursor: "pointer",
    /*     animation: `$myEffect 150ms ${theme.transitions.easing.easeIn}`,
     */
  },
  colorNotSeen: {
    width: "100%",
    backgroundColor: "#00000040",
    cursor: "pointer",
    /*     animation: `$myEffect 150ms ${theme.transitions.easing.easeIn}`,
     */
  },
  inline: {
    display: "inline",
  },
  sizeFont: {
    color: "#c3c8ca",
    fontSize: "0.5rem",
  },
  sizeFont2: {
    color: "#c3c8ca",
    fontSize: "0.9rem",
  },
  spinner: {
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "100px",
  },
  mensajeSeen: {
    color: "#c3c8ca",
    top: "25px",
    right: 25,
    position: "absolute",
    behavior: "smooth",
    /*     animation: `$myEffect 150ms ${theme.transitions.easing.easeIn}`,
     */
  },
  mensajeNotSeen: {
    color: "#fd382a",
    top: "25px",
    right: 25,
    position: "absolute",
    behavior: "smooth",
    /*     animation: `$myEffect 150ms ${theme.transitions.easing.easeIn}`,
     */
  },
  mensajesVacios: {
    textAlign: "center",
    paddingTop: "80px",
    fontSize: "20px",
    color: "#c3c8ca",
  },
  tamanos: {
    minHeight: "80%",
    margin: 10,
    display: "contents",
    behavior: "smooth",
    width: "400px !important",
  },
  form: {
    height: "65vh !important",
    width: "400px !important",
    maxHeight: "80% !important",
    behavior: "smooth",
  },
  izquierda: {
    marginRight: "30%",
    border: "0.7px solid #8080807d",
    borderRadius: 10,
    padding: 12,
    color: "white",
    behavior: "smooth",
  },
  derecha: {
    marginLeft: "30%",
    borderRadius: 10,
    padding: 12,
    color: "white",
    backgroundColor: "#65656575",
    behavior: "smooth",
  },
  ul: {
    padding: 12,
    backgroundColor: "#2c3235",
    behavior: "smooth",
    overflowY: "auto",
    minheight: "65vh",
  },
  li: {
    marginBottom: 8,
    fontSize: "0.8em",
    behavior: "smooth",
    height: "fit-content !important",
  },
  gridList: {
    transform: "translateZ(0)",
    behavior: "smooth",
    backgroundColor: "#2c3235",
  },
  follow: {
    display: "inline-flex",
    webkitBoxShadow: "inset -1px 14px 15px -9px rgba(0,0,0,0.52)",
    mozBoxShadow: "inset -1px 14px 15px -9px rgba(0,0,0,0.52)",
    boxShadow: "inset -1px 14px 15px -9px rgba(0,0,0,0.52)",
    margin: "0 !important",
    paddingLeft: 10,
    behavior: "smooth",
  },
  fechaDer: {
    position: "relative",
    top: "35px",
    color: "#e2c1c1",
    fontSize: "7px",
    behavior: "smooth",
  },
  header: {
    webkitBoxShadow: "inset -1px -15px 15px -9px rgba(0,0,0,0.52)",
    mozBoxShadow: "inset -1px -15px 15px -9px rgba(0,0,0,0.52)",
    boxShadow: "inset -1px -15px 15px -9px rgba(0,0,0,0.52)",
    behavior: "smooth",
    maxWidth: "400px !important",
    paddingTop: "5px",
  },
  large: {
    boxShadow: "0px 0px 5px 5px rgba(255, 253, 255, 0.14)",
  },
  nombre: {
    color: "#1d1d1d",
    fontSize: "1rem !important",
    letterSpacing: "0.1em",
    marginLeft: "10px",
  },
  dis: {
    display: "flex",
  },
  pro: {
    display: "flex",
    padding: "20px",
    alignItems: "center",
    width: "100%",
  },
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    backgroundColor: "white",
    borderRadius: "50%",
    color: "#28a499",
  },
  marginList: {
    backgroundColor: "#2c3235",
  },
  listItemAvatar: {
    marginTop: 8,
  },
  colorSkeleton: {
    backgroundColor: "#65656575 !important",
    height: 50,
  },
  divider: {
    backgroundColor: "#c3c8ca14",
  },
  linear: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: "0.5rem",
    width: "100vw",
    color: "#009688",
  },
}));

export const Messages = ({ id }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { user } = useContext(Context);
  const [listaChat, setListaChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  let mensaje = useInputValue("");
  const [listaChatModal, setListaChatModal] = useState([]);
  const [userChatData, setUserChatData] = useState({});
  const [chatsMutation] = useMutation(GET_CHATS);
  const messagesEndRef = useRef(null);

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  let chatID = [];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await buscoChats();
    }
    fetchData();
  }, [id]);

  const buscoChats = async () => {
    try {
      const emailEdited = user.email.split(".").join(",");
      firebaseApp
        .database()
        .ref("/chats/" + emailEdited)
        .on("value", async function (snapshot) {
          const input = { uid: id, email: user.email };
          const chatsResponse = await chatsMutation({
            variables: { input },
          });
          setListaChat(chatsResponse.data.obtenerChatsUser);
          scrollToTop();
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log("error : " + JSON.stringify(error));
    }
  };

  const onRefresh = () => {
    return new Promise(async (resolve) => {
      setTimeout(async function () {
        await buscoChats();
        resolve();
      }, 3000);
    });
  };

  const handleClickOpen = async (element) => {
    setLoadingChat(true);
    setOpen(true);
    setUserChatData(element);
    chatID = [user.uid, element.uid].sort().join("|");
    if (chatID) {
      try {
        firebaseApp
          .database()
          .ref("/conversations/" + chatID)
          .on("child_added", async function (snapshot, prevChildKey) {
            let listaAux = await chatModel.obtenerConversationsOnce(chatID);
            setListaChatModal(listaAux);
            if (listaAux.length > 6) {
              scrollToBottom();
            }
          });
        await chatModel.seen(user.email, element.uid, element.timestamp, true);
        setLoadingChat(false);
        scrollToBottom();
      } catch (error) {
        console.log("el error : " + error);
      }
    }
  };

  const cerrar = () => {
    mensaje.reset();
    setOpen(false);
    setListaChatModal([]);
    firebaseApp
      .database()
      .ref("/conversations/" + chatID)
      .off("child_added");
  };

  const reset = () => {
    mensaje.reset();
  };

  const enviarMensaje = async (messageSent) => {
    const chatID = [user.uid, userChatData.uid].sort().join("|");
    await chatModel.newChat(userChatData.email, user.uid, false);
    await chatModel.newChat(user.email, userChatData.uid, true);
    let conversation = {
      sender: user.uid,
      receiver: userChatData.uid,
      seen: false,
      uid: chatID,
      message: messageSent.value,
    };
    chatModel.newConversation(chatID, conversation);
  };

  const obtenerHoraChats = (timestamp) => {
    const dateObject = new Date(timestamp);
    const fecha = format(dateObject, "dd/MM/yyyy", { locale: es });
    const timeString = `${fecha}-${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    return timeString;
  };

  return (
    <>
      <Layout id={id} title={t("txt.messages")}>
        {loading && listaChat.length == 0 ? (
          <div className={classes.marginList}>
            <div style={{ height: 50 }} />
            <List>
              <Fragment>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className={classes.areadySeen}
                >
                  <ListItemAvatar className={classes.listItemAvatar}>
                    <Skeleton variant="circle">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                    secondary={
                      <Fragment>
                        <Skeleton width="100%">
                          <Typography>.</Typography>
                        </Skeleton>
                      </Fragment>
                    }
                  />
                </ListItem>
              </Fragment>
            </List>
          </div>
        ) : (
          <>
            <div style={{ paddingTop: 50 }}>
              <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={
                  <ReleaseContent
                    label={t("txt.releaseToRefresh")}
                    height="100px"
                  />
                }
                refreshContent={
                  <div
                    style={{
                      paddingTop: 5,
                      justifyContent: "center",
                      display: "flex",
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
                triggerHeight={100}
                backgroundColor="#2c3235"
                startInvisible={true}
              >
                <div style={{ textAlign: "center" }}>
                  <>
                    {listaChat && listaChat.length == 0 && (
                      <div className={classes.mensajesVacios}>
                        {" "}
                        no messages{" "}
                      </div>
                    )}
                    <div ref={scrollRef} />
                    <div className={classes.marginList}>
                      <List>
                        {listaChat &&
                          listaChat.map((element) => {
                            return (
                              <Fragment key={uniqid()}>
                                <ListItem
                                  alignItems="flex-start"
                                  className={
                                    element.seen
                                      ? classes.areadySeen
                                      : classes.colorNotSeen
                                  }
                                  onClick={() => {
                                    handleClickOpen(element);
                                  }}
                                >
                                  <ListItemAvatar
                                    className={classes.listItemAvatar}
                                  >
                                    <Avatar
                                      className={classes.large}
                                      alt="photo"
                                      src={element.avatar}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <Fragment>
                                        <Typography
                                          className={classes.sizeFont2}
                                        >
                                          {element.nombre +
                                            (element.apellido
                                              ? " " + element.apellido
                                              : "")}
                                        </Typography>
                                      </Fragment>
                                    }
                                    secondary={
                                      <Fragment>
                                        <Typography
                                          className={classes.sizeFont}
                                        >
                                          {element.horaPrev}
                                        </Typography>
                                        <Typography
                                          className={classes.sizeFont}
                                        >
                                          {element.message}
                                        </Typography>
                                      </Fragment>
                                    }
                                  />
                                  <Typography
                                    className={
                                      element.seen
                                        ? classes.mensajeSeen
                                        : classes.mensajeNotSeen
                                    }
                                    onClick={() => {
                                      handleClickOpen(element);
                                    }}
                                  >
                                    <CommentIcon fontSize="large" />
                                  </Typography>
                                </ListItem>

                                <Divider className={classes.divider} />
                              </Fragment>
                            );
                          })}
                      </List>
                    </div>
                  </>
                </div>
              </PullToRefresh>
            </div>
          </>
        )}

        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={cerrar}
          width={"400px"}
        >
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={cerrar}
          />

          <DialogTitle className={classes.header}>
            <div className={classes.dis}>
              <div className={classes.chat}>{/*  <Register /> */}</div>
              <div className={classes.pro}>
                <Avatar
                  className={classes.large}
                  alt={
                    userChatData.nombre +
                    (userChatData.apellido ? " " + userChatData.apellido : "")
                  }
                  src={userChatData.avatar}
                />
                <Typography
                  gutterBottom
                  variant="h5"
                  className={classes.nombre}
                >
                  {userChatData.nombre +
                    (userChatData.apellido ? " " + userChatData.apellido : "")}
                </Typography>
              </div>
            </div>
          </DialogTitle>
          <DialogActions className={classes.tamanos}>
            <GridList className={classes.gridList}>
              <div className={classes.form}>
                {loadingChat ? (
                  <>
                    <div className={classes.ul}>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                      <div className={classes.li}>
                        <Skeleton
                          className={classes.colorSkeleton}
                          width="100%"
                        >
                          <Typography component="h2"></Typography>
                        </Skeleton>
                      </div>
                    </div>
                  </>
                ) : (
                  <Fragment>
                    <div className={classes.ul}>
                      {listaChatModal &&
                        listaChatModal.map((element) => {
                          if (element.receiver === userChatData.uid) {
                            return (
                              <Fragment key={uniqid()}>
                                <div className={classes.li}>
                                  <div>
                                    <div className={classes.fechaDer}>
                                      {obtenerHoraChats(element.timestamp)}
                                    </div>
                                    <div>
                                      <div className={classes.derecha}>
                                        {element.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            );
                          } else {
                            return (
                              <Fragment key={uniqid()}>
                                <div className={classes.li}>
                                  <div className={classes.izquierda}>
                                    {element.message}
                                  </div>
                                </div>
                              </Fragment>
                            );
                          }
                        })}
                      <div ref={messagesEndRef} />
                    </div>
                  </Fragment>
                )}
              </div>
            </GridList>
            <form className={classes.follow}>
              <TextField
                margin="normal"
                type="text"
                fullWidth
                id="mensaje"
                label={t("txt.message").toLowerCase()}
                name="mensaje"
                value={mensaje}
                autoFocus
                multiline
                rows={1}
                rowsMax={4}
                {...mensaje}
              />
              {mensaje.value != "" && (
                <Button
                  color="secondary"
                  onClick={() => {
                    reset();
                    enviarMensaje(mensaje);
                  }}
                >
                  {t("txt.send").toUpperCase()}
                </Button>
              )}
            </form>
          </DialogActions>
        </Dialog>
      </Layout>
    </>
  );
};
