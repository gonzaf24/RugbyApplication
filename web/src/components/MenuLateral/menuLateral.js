import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { EditDataModal as EditDataPlayerModal } from "../../components/Player/editModal";
import { EditDataModal as EditDataAgentModal } from "../../components/Agent/editModal";
import { EditDataModal as EditDataClubModal } from "../../components/Club/editModal";
import { InfoModal as SuscriptionModal } from "../../components/Suscription/infoModal";
import { InfoModal as LanguageModal } from "../../components/Language/infoModal";
import { NewAgentPlayerModal } from "../../components/Agent/newAgentPlayerModal";
import { EditAgentPlayerModal } from "../../components/Agent/editAgentPlayersModal";
import { SUSCRIPTION_CLIENT } from "../../mutations/PaymentsMutation";
import { useMutation } from "@apollo/react-hooks";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import LanguageIcon from "@material-ui/icons/Language";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },
  imagen: {
    borderRadius: "100%",
    width: "auto",
    height: "100%",
  },
  paper: {
    borderRadius: "100%",
    width: "auto",
    height: "100%",
    margin: 5,
    maxHeight: 40,
  },
  paper: {
    borderRadius: "100%",
    width: "auto",
    height: "100%",
    margin: 5,
    maxHeight: 40,
  },
  color: {
    color: "#fafffc",
    marginRight: 10,
    zIndex: 200,
  },
});

export default function MenuLateral() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [state, setState] = useState(false);
  const { removeAuth, user, type } = useContext(Context);
  const [openEditPlayer, setOpenEditPlayer] = useState(false);
  const [openEditClub, setOpenEditClub] = useState(false);
  const [openSuscription, setOpenSuscription] = useState(false);
  const [openSuscriptionA, setOpenSuscriptionA] = useState(false);
  const [suscripcionMutation] = useMutation(SUSCRIPTION_CLIENT);
  const [suscripcion, setSuscripcion] = useState();
  const [vw, setVW] = useState(
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  );
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  let resize = () => {
    setVW(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    );
  };

  window.addEventListener("resize", resize);

  const [fotoPerfil, setFotoPerfil] = useState(() => {
    switch (type) {
      case "PLAYER":
        return user.player.fotoPerfil;
      case "AGENT":
        return user.agent.fotoPerfil;
      case "CLUB":
        return user.club.fotoPerfil;
      default:
        return null;
    }
  });

  const handleClick = async (event) => {
    if (event === t("txt.edit")) {
      switch (type) {
        case "PLAYER":
          setOpenEditPlayer(true);
          break;
        case "AGENT":
          setOpenEditAgent(true);
          break;
        case "CLUB":
          setOpenEditClub(true);
          break;
      }
    }
    if (event === t("txt.suscription")) {
      try {
        const input = { id: user.email };
        setOpenSuscription(true);
        let { data } = await suscripcionMutation({
          variables: { input },
        });
        if (data) {
          setSuscripcion(data.suscription);
        }
      } catch (error) {
        console.log(
          "hay error vuelta editAgent! " + JSON.stringify(error.message)
        );
      }
    }
    if (event === t("txt.signOff")) {
      removeAuth();
    }

    if (event === t("txt.language")) {
      try {
        const input = { id: user.email };
        setOpenSuscriptionA(true);
        let { data } = await suscripcionMutation({
          variables: { input },
        });
        if (data) {
          setSuscripcion(data.suscription);
        }
      } catch (error) {
        console.log(
          "hay error vuelta editAgent! " + JSON.stringify(error.message)
        );
      }
    }
  };

  return (
    <>
      {/* <PostAddIcon className={classes.color} fontSize="large" /> */}
      <SettingsIcon
        className={classes.color}
        fontSize="large"
        onClick={toggleDrawer(true)}
      />
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={
          !isMobile ? { style: { marginRight: vw / 2 - 250 } } : { style: {} }
        }
      >
        <div
          className={clsx(classes.list)}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem
              button
              key={t("txt.edit")}
              onClick={() => {
                handleClick(t("txt.edit"));
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={t("txt.edit")} />
            </ListItem>
            {type === "AGENT" && (
              <>
                <ListItem
                  button
                  key={t("txt.addPlayer")}
                  onClick={() => {
                    setOpenModalAgentPlayer(true);
                  }}
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("txt.addPlayer")} />
                </ListItem>
                <ListItem
                  button
                  key={t("txt.editPlayers")}
                  onClick={() => {
                    setOpenModalEditAgentPlayer(true);
                  }}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("txt.editPlayers")} />
                </ListItem>
              </>
            )}
            <Divider />
            <ListItem
              button
              key={t("txt.suscription")}
              onClick={() => {
                handleClick(t("txt.suscription"));
              }}
            >
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary={t("txt.suscription")} />
            </ListItem>
            <ListItem
              button
              key={t("txt.language")}
              onClick={() => {
                handleClick(t("txt.language"));
              }}
            >
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary={t("txt.language")} />
            </ListItem>
          </List>

          <List>
            <ListItem
              button
              key={t("txt.signOff")}
              onClick={() => {
                handleClick(t("txt.signOff"));
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={t("txt.signOff")} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>

      <EditDataPlayerModal
        openEditPlayer={openEditPlayer}
        setOpenEditPlayer={setOpenEditPlayer}
        setFotoPerfil={setFotoPerfil}
      />

      <EditDataClubModal
        openEditClub={openEditClub}
        setOpenEditClub={setOpenEditClub}
        setFotoPerfil={setFotoPerfil}
      />

      <SuscriptionModal
        openSuscription={openSuscription}
        setOpenSuscription={setOpenSuscription}
        suscripcion={suscripcion}
      />

      <LanguageModal
        openSuscriptionA={openSuscriptionA}
        setOpenSuscriptionA={setOpenSuscriptionA}
        suscripcion={suscripcion}
      />
    </>
  );
}
