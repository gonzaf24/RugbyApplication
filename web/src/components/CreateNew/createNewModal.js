import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Context";
import { useTranslation } from "react-i18next";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { red } from "@material-ui/core/colors";
import { NewPostModal } from "../Post/newPostModal";
import { NewMatchResultModal } from "../MatchResult/newMatchResultModal";

const TransitionDown = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  link2: {
    display: "inline-flex",
    marginRight: "3%",
  },
  color: {
    color: "#fafffc",
    marginRight: 10,
    zIndex: 200,
  },

  contenedor: {
    textAlign: "center",
    backgroundColor: "#c3c8ca",
    color: "#435b68",
    border: "4px solid #435b68",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  backPrincipal: {
    "& .MuiDialog-paper": {
      backgroundColor: "#435b68",
      borderRadius: 15,
      width: "100%",
      maxWidth: 400,
    },
  },

  button: {
    color: "#ffffff",
    border: "1px solid #ffffff66",
    width: "100%",
    letterSpacing: 3,
  },
}));

export const CreateNewModal = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [openCreateNew, setOpenCreateNew] = useState();
  const { user } = useContext(Context);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [openNewMatchResult, setOpenNewMatchResult] = useState(false);
  const [fotoUser, setFotoUser] = useState();
  const [nombreUser, setNombreUser] = useState();

  const handleCloseCreateNew = () => {
    setOpenCreateNew(false);
  };

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

  return (
    <>
      <div>
        <div className={classes.link2}>
          <PostAddIcon
            className={classes.color}
            fontSize="large"
            onClick={() => setOpenCreateNew(true)}
          />
        </div>
      </div>

      <Dialog
        className={classes.backPrincipal}
        open={openCreateNew}
        onClose={handleCloseCreateNew}
        TransitionComponent={TransitionDown}
      >
        <div className={classes.contenedor}>
          <h5>CREATE NEW</h5>
        </div>
        <List>
          <ListItem>
            <Button
              onClick={() => {
                setOpenNewPost(true);
                handleCloseCreateNew();
              }}
              variant="outlined"
              className={classes.button}
            >
              POST / NOTE
            </Button>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => {
                setOpenNewMatchResult(true);
                handleCloseCreateNew();
              }}
              variant="outlined"
              className={classes.button}
            >
              MATCH RESULT
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="outlined" className={classes.button}>
              PLAYERS RECRUITMENT
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="outlined" className={classes.button}>
              EVENT / TOURNAMENT
            </Button>
          </ListItem>
        </List>
      </Dialog>

      <NewPostModal
        openNewPost={openNewPost}
        setOpenNewPost={setOpenNewPost}
        fotoUser={fotoUser}
        nombreUser={nombreUser}
      />

      <NewMatchResultModal
        openNewMatchResult={openNewMatchResult}
        setOpenNewMatchResult={setOpenNewMatchResult}
        fotoUser={fotoUser}
        nombreUser={nombreUser}
      />
    </>
  );
};
