import React, { useState, useContext, useEffect } from "react";
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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import { uploadFile, deleteFile } from "react-s3";
import { POSTS_NOTES } from "../../config";
import { useMutation } from "@apollo/react-hooks";
import { NEW_POST } from "../../mutations/PostsMutation";
import LinearProgress from "@material-ui/core/LinearProgress";

let uniqid = require("uniqid");

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
    },
  },
  backPrivadoPublico: {
    "& .MuiDialog-paper": {
      backgroundColor: "white",
      borderRadius: 5,
    },
  },
  button: {
    color: "#ffffff",
    border: "1px solid #ffffff66",
    width: "100%",
    letterSpacing: 3,
  },
  buttonPublicPrivate: {
    color: "#435b68",
    border: "1px solid #435b68",
    borderRadius: 25,
    fontSize: "0.5rem",
    height: 22,
  },
  buttonPublish: {
    color: "#28a499",
    border: "1px solid #28a499",
    borderRadius: 25,
    fontSize: "0.6rem",
    height: 22,
    float: "right",
  },
  avatar: {
    backgroundColor: red[500],
  },
  textArea: {
    borderRadius: 5,
    border: "1px solid #435b68",
    width: "100%",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  counter: {
    textAlign: "right",
    fontSize: "0.7rem",
    marginRight: 5,
    marginBottom: 1,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  redColor: {
    color: "red",
    textAlign: "right",
    fontSize: "0.9rem",
    marginRight: 5,
    marginBottom: 1,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  imagen: {
    maxHeight: 250,
  },
  root: {
    minHeight: 266,
    width: "100%",
  },
}));

export const NewPostModal = ({
  openNewPost,
  setOpenNewPost,
  fotoUser,
  nombreUser,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const {
    removeAuth,
    changeLang,
    user,
    type,
    postedEffect,
    setPostedEffect,
  } = useContext(Context);

  const [openPublicPrivate, setOpenPublicPrivate] = useState();
  const [visibilidad, setVisibilidad] = useState("PUBLIC");
  const [counter, setCounter] = useState(1000);
  const [contenidoPost, setContenidoPost] = useState("");
  const [urlFotoPost, setUrlFotoPost] = useState("");
  const [newPostNote] = useMutation(NEW_POST);
  const [upImg, setUpImg] = useState();
  const [fileNameUpload, setFileNameUpload] = useState();
  const [fileToUpload, setFileToUpload] = useState();
  const [loading, setLoading] = useState(false);

  const handleClosePublicPrivate = () => {
    setOpenPublicPrivate(false);
  };

  const handleCloseNewPost = () => {
    setOpenNewPost(false);
    setUrlFotoPost("");
    setContenidoPost("");
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

  const onSelectFilePortada = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setUrlFotoPost(URL.createObjectURL(e.target.files[0]));
      setFileToUpload(e.target.files[0]);
      let nameFilePortadaShow = e.target.files[0].name;
      const name = e.target.files[0].name;
      const lastDot = name.lastIndexOf(".");
      const ext = name.substring(lastDot + 1);
      const fileName = user.uid + "-" + uniqid() + "." + ext;
      if (nameFilePortadaShow.length > 9) {
        nameFilePortadaShow = nameFilePortadaShow
          .substring(0, 8)
          .concat(" ... " + ext);
      }
      setFileNameUpload(fileName);
    }
  };

  const publicar = async (input) => {
    try {
      let { data } = await newPostNote({
        variables: { input },
      });
      if (data) {
        setLoading(false);
        handleCloseNewPost();
      }
    } catch (error) {
      setLoading(false);
      //Aqui muestro el error de que no se pudo conectar con backend
      console.log("hay error en newPostNote! " + JSON.stringify(error.message));
    }
  };

  const onSubmitPubish = async () => {
    setLoading(true);
    try {
      if (fileToUpload) {
        let data = new FormData();
        data.append("file", fileToUpload, fileNameUpload);
        await uploadFile(data.get("file"), POSTS_NOTES)
          .then(async (result) => {
            setUrlFotoPost(result.location);
            const input = {
              urlFotoPost: result.location,
              visibilidad,
              contenidoPost,
            };
            await publicar(input);
          })
          .catch((error) => {
            // aqui mostrar el error de que no se pudo subir la imagen
            setUrlFotoPost("");
            console.log("Error : " + error);
          });
      } else {
        setUrlFotoPost("");
        const input = {
          urlFotoPost,
          visibilidad,
          contenidoPost,
        };
        await publicar(input);
      }

      postedEffect ? setPostedEffect(false) : setPostedEffect(true);
    } catch (error) {
      setLoading(false);
      console.log(" Error :" + error);
    }
  };

  return (
    <>
      <Dialog
        className={classes.backPrincipal}
        open={openNewPost}
        onClose={handleCloseNewPost}
        TransitionComponent={TransitionUp}
      >
        {loading ? (
          <Box style={{ width: 200, marginTop: 150, textAlign: "center" }}>
            {t("txt.posting").toLowerCase()}
            <LinearProgress style={{ backgroundColor: "#28a499" }} />
          </Box>
        ) : (
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
                  <CloseIcon onClick={() => handleCloseNewPost()} />
                </IconButton>
              }
              title={nombreUser}
              subheader={
                <Button
                  onClick={() => {
                    setOpenPublicPrivate(true);
                  }}
                  variant="outlined"
                  className={classes.buttonPublicPrivate}
                  startIcon={<PublicIcon />}
                  endIcon={<ArrowDropDownIcon />}
                >
                  {visibilidad}
                </Button>
              }
            />
            <CardMedia />
            <CardContent style={{ padding: 5 }}>
              <div
                className={counter === 0 ? classes.redColor : classes.counter}
              >
                {counter}
              </div>
              <TextareaAutosize
                className={classes.textArea}
                rowsMax={10}
                rowsMin={6}
                value={contenidoPost}
                aria-label={t("txt.description")}
                placeholder={" write something here ... "}
                onChange={onChangeEvent}
                maxLength={1000}
              />
              {urlFotoPost && (
                <Box
                  display="flex"
                  justifyContent="center"
                  position="relative"
                  style={{ width: "100%", height: 250 }}
                >
                  <IconButton
                    aria-label="share"
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CancelIcon
                      style={{ color: "#ff00008c" }}
                      onClick={() => setUrlFotoPost("")}
                    />
                  </IconButton>

                  <img
                    className={classes.imagen}
                    alt="vista imagen cortada"
                    src={urlFotoPost}
                  />
                </Box>
              )}
            </CardContent>
            <CardActions style={{ justifyContent: "space-between" }}>
              <IconButton aria-label="add photo">
                <label
                  htmlFor="contained-button-file"
                  style={{ fontSize: "1rem" }}
                >
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    type="file"
                    id="contained-button-file"
                    onChange={onSelectFilePortada}
                  ></input>

                  <AddAPhotoIcon />
                </label>
              </IconButton>

              <Button
                onClick={() => {
                  onSubmitPubish();
                }}
                variant="outlined"
                className={classes.buttonPublish}
                disabled={!urlFotoPost && !contenidoPost ? true : false}
              >
                {t("txt.publish")}
              </Button>
            </CardActions>
          </Card>
        )}
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
