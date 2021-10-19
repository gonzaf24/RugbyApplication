import React, { useState, Fragment, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useInputValue } from "../../hooks/useInputValue";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Skeleton from "@material-ui/lab/Skeleton";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let uniqid = require("uniqid");
let chatModel = require("../../service/chatModel");

const firebaseApp = require("firebase/app");

const useStyles = makeStyles((theme) => ({
  mensaje: {
    color: "white",
    behavior: "smooth",
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
  },
  li: {
    marginBottom: 8,
    fontSize: "0.8em",
    behavior: "smooth",
  },
  ejemplo: {
    backgroundColor: "#eee",
    border: "1px solid #333",
    borderRadius: "10px",
    color: "#333",
    padding: "12px",
    position: "relative",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    behavior: "smooth",
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
    boxShadow: "0px 0px 30px 10px rgba(255, 253, 255, 0.14)",
  },
  nombre: {
    color: "#28a499",
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
    right: 0,
    top: 0,
    backgroundColor: "white",
    borderRadius: "50%",
  },
  colorSkeleton: {
    backgroundColor: "#65656575 !important",
    height: 50,
  },
}));

export const ChatDirect = ({
  uidSender,
  uidReceiver,
  emailSender,
  emailReceiver,
  avatar,
  nombre,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let mensaje = useInputValue("");
  const [chatID, setChatID] = useState(
    [uidSender, uidReceiver].sort().join("|")
  );
  const { t, i18n } = useTranslation();
  const [loadingChat, setLoadingChat] = useState(false);
  const [listaChatA, setListaChatA] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickOpen = async () => {
    setLoadingChat(true);
    setOpen(true);
    firebaseApp
      .database()
      .ref("/conversations/" + chatID)
      .on("child_added", async function (snapshot, prevChildKey) {
        setListaChatA(await chatModel.obtenerConversationsOnce(chatID));
        scrollToBottom();
      });
    await chatModel.newChat(emailSender, uidReceiver, true);
    setLoadingChat(false);
    scrollToBottom();
  };

  const cerrar = () => {
    mensaje.reset();
    setOpen(false);
    setListaChatA([]);

    firebaseApp
      .database()
      .ref("/conversations/" + chatID)
      .off("child_added");
  };

  const reset = () => {
    mensaje.reset();
  };

  const enviarMensaje = async (messageSent) => {
    await chatModel.newChat(emailReceiver, uidSender, false);
    await chatModel.newChat(emailSender, uidReceiver, true);
    let conversation = {
      sender: uidSender,
      receiver: uidReceiver,
      seen: false,
      uid: chatID,
      message: messageSent.value,
    };
    await chatModel.newConversation(chatID, conversation);
  };

  const obtenerHoraChats = (timestamp) => {
    const dateObject = new Date(timestamp);
    const fecha = format(dateObject, "dd/MM/yyyy", { locale: es });
    const timeString = `${fecha}-${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    return timeString;
  };

  return (
    <div>
      <Typography className={classes.mensaje}>
        <MessageIcon
          fontSize="medium"
          onClick={handleClickOpen}
          style={{ color: "rgb(189 189 189)" }}
        />
      </Typography>

      <Dialog
        open={open}
        onClose={cerrar}
        TransitionComponent={Transition}
        width={"400px"}
      >
        <CloseIcon
          className={classes.close}
          fontSize="large"
          onClick={cerrar}
        />

        <DialogTitle className={classes.header}>
          <div className={classes.dis}>
            <div className={classes.chat}></div>
            <div className={classes.pro}>
              <Avatar className={classes.large} alt={nombre} src={avatar} />
              <Typography gutterBottom variant="h5" className={classes.nombre}>
                {nombre}
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
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                    <div className={classes.li}>
                      <Skeleton className={classes.colorSkeleton} width="100%">
                        <Typography component="h2"></Typography>
                      </Skeleton>
                    </div>
                  </div>
                </>
              ) : (
                <Fragment>
                  <div className={classes.ul}>
                    {listaChatA &&
                      listaChatA.map((element) => {
                        if (element.receiver == uidReceiver) {
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
    </div>
  );
};
