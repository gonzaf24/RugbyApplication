import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import PelotaImg from "../../assets/pelotaRugby.png";
import { Context } from "../../Context";
import { useTranslation } from "react-i18next";
import MenuLateral from "../../components/MenuLateral/menuLateral";
import { CreateNewModal } from "../CreateNew/createNewModal";

const useStyles = makeStyles((theme) => ({
  link: {
    width: "100%",
    zIndex: 200,
  },
  link2: {
    display: "inline-flex",
    marginRight: "3%",
  },
  image: {
    marginLeft: "10px",
    width: 40,
    height: 40,
  },
  nav: {
    top: 0,
    display: "flex",
    height: "50px",
    left: 0,
    margin: "0px auto",
    maxWidth: "500px",
    position: "fixed",
    right: 0,
    zIndex: 100,
    backgroundColor: "#435b68",
    alignItems: "center",
  },
  color: {
    fontSize: "0.9rem",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    color: "#fafffc",
    letterSpacing: 3,
  },
}));

export const NavBar = ({ title }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { user, type } = useContext(Context);
  const [titulo, setTitulo] = useState(title);

  return (
    <div>
      <nav className={classes.nav}>
        <div className={classes.link}>
          <img
            className={classes.image}
            src={PelotaImg}
            onClick={() => {
              switch (type) {
                case "PLAYER":
                  navigate(`/player/home/${user.uid}`);
                  break;
                case "AGENT":
                  navigate(`/agent/home/${user.uid}`);
                  break;
                case "CLUB":
                  navigate(`/club/home/${user.uid}`);
                  break;
                default:
                  navigate("/");
                  break;
              }
            }}
          />
        </div>
        <div className={classes.color}>{titulo.toUpperCase()}</div>
        <div className={classes.link2}>
          <CreateNewModal />
          <MenuLateral />
        </div>
      </nav>
    </div>
  );
};
