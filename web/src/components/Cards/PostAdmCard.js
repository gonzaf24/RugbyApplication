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
import { format } from "date-fns";
import { es, enUS, fr, it } from "date-fns/locale";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { EditPostModal } from "../Post/editPostModal";
import { OpenPostModal } from "../Post/openPostModal";
import ConfirmDialog from "../../components/ConfirmDialog/index";
import { deleteFile } from "react-s3";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_POST } from "../../mutations/PostsMutation";
import { POSTS_NOTES } from "../../config";

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
    color: "#28a499",
    "& .MuiTypography-displayBlock": {
      fontSize: "0.65rem !important",
    },
  },
}));

export const PostAdmCard = ({ post, postsList, setPostsList }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [show, element] = useNearScreen();
  const [anchorElEdit, setAnchorElEdit] = useState(null);
  const open = Boolean(anchorElEdit);
  const { user } = useContext(Context);
  const [fechaPost, setFechaPost] = useState();
  const [localeLang, setLocaleLang] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [fotoUser, setFotoUser] = useState();
  const [nombreUser, setNombreUser] = useState();
  const [deletePost] = useMutation(DELETE_POST);

  const handleClickMenu = (event) => {
    setAnchorElEdit(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElEdit(null);
  };

  const handleDeletePost = async () => {
    setConfirmOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      if (post.fechaCreacion) {
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
        const dateObject = new Date(post.fechaCreacion);
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
        setFechaPost(timeString);
      }
    }
    fetchData();
  }, [post]);

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
    let input = { uid: post.uid };
    const response = await deletePost({
      variables: { input },
    });
    if (response.data.deletePost === "200") {
      if (post.urlFotoPost !== "") {
        let filename = post.urlFotoPost.substring(
          post.urlFotoPost.lastIndexOf("/") + 1
        );
        await deleteFile(filename, POSTS_NOTES)
          .then((response) => {})
          .catch((err) => {});
      }
      let newArray = postsList.filter(function (element) {
        return element.uid !== post.uid;
      });
      setPostsList(newArray);
      setLoadingDelete(false);
    } else {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <article className={classes.min} ref={element}>
        {show && (
          <Fragment>
            <Card className={classes.root}>
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
                          id={post.uid}
                          primary={fechaPost}
                        />

                        {post.urlFotoPost && (
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
                                setOpenPost(true);
                                handleClose();
                              }}
                              style={{ color: "#bbbbbb" }}
                            >
                              <VisibilityIcon style={{ marginRight: 5 }} />{" "}
                              {t("txt.open")}
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setOpenEditPost(true);
                                handleClose();
                              }}
                              style={{ color: "#bbbbbb" }}
                            >
                              <EditIcon style={{ marginRight: 5 }} />{" "}
                              {t("txt.edit")}
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDeletePost();
                                handleClose();
                              }}
                              style={{ color: "#bbbbbb" }}
                            >
                              <DeleteForeverIcon style={{ marginRight: 5 }} />{" "}
                              {t("txt.delete")}
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                      <div className={classes.flex}>
                        <ListItemText
                          id={post.uid}
                          primary={
                            <Typography noWrap style={{ color: "#bdbdbd" }}>
                              {post.contenidoPost}
                            </Typography>
                          }
                        />
                      </div>
                    </div>
                  </ListItem>
                </div>
              </CardActionArea>
            </Card>
          </Fragment>
        )}
      </article>

      <EditPostModal
        openEditPost={openEditPost}
        setOpenEditPost={setOpenEditPost}
        fotoUser={fotoUser}
        nombreUser={nombreUser}
        post={post}
        postsList={postsList}
      />

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

      <OpenPostModal
        openPost={openPost}
        setOpenPost={setOpenPost}
        fotoUser={fotoUser}
        nombreUser={nombreUser}
        post={post}
        postsList={postsList}
      />
    </>
  );
};
