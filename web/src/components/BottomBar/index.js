import React, { useState, useContext, useEffect } from "react";
import { Link, Nav } from "./styles";
import {
  MdHome,
  MdPersonOutline,
  MdMessage,
  MdSearch,
  MdBookmarkBorder,
  MdLibraryBooks,
} from "react-icons/md";
import Button from "@material-ui/core/Button";
import { Context } from "../../Context";
import { navigate } from "@reach/router";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import { useDidMountEffect } from "../../hooks/useDidMountEffect";
let chatModel = require("../../service/chatModel");

const firebaseApp = require("firebase/app");

const SIZE = "32px";

const useStyles = makeStyles((theme) => ({
  expand: {
    color: "#28a499",
    animation: `$myEffectClose 1s infinite `,
    height: "100px",
    width: "38px",
  },
  expandOpen: {
    paddingBottom: 0,
    animation: "none",
    color: "#717d85",
    height: "32px",
    width: "32px",
  },

  "@keyframes myEffectClose": {
    "0%": {
      opacity: 1.5,
    },
    "100%": {
      opacity: 0.5,
    },
  },
}));

export const BottomBar = () => {
  let currentState = window.location.pathname;
  const classes = useStyles();
  const { user, removeAuth, type, bookedEffect, postedEffect } =
    useContext(Context);
  const [msgNotSeen, setMsgNotSeen] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [efectoPosts, setEfectoPosts] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const emailEdited = user.email.split(".").join(",");
      firebaseApp
        .database()
        .ref("/chats/" + emailEdited)
        .on("value", async function (snapshot) {
          setMsgNotSeen(await chatModel.obtenerCountNotSeen(user.email));
        });
    }
    fetchData();
  }, []);

  useDidMountEffect(() => {
    setExpanded(false);
    setTimeout(function () {
      setExpanded(true);
    }, 1550);
  }, [bookedEffect]);

  useDidMountEffect(() => {
    setEfectoPosts(false);
    setTimeout(function () {
      setEfectoPosts(true);
    }, 1550);
  }, [postedEffect]);

  const menu = () => {
    switch (type) {
      case "PLAYER":
        return (
          <Nav>
            <Link to={`/player/home/${user.uid}`}>
              <MdHome size={SIZE} />
            </Link>
            <Link to={`/player/search/${user.uid}`}>
              <MdSearch size={SIZE} />
            </Link>
            <Link to={`/messages/${user.uid}`}>
              <Badge color="error" badgeContent={msgNotSeen}>
                <MdMessage size={SIZE} />
              </Badge>
            </Link>
            <Link to={`/booked/${user.uid}`}>
              <MdBookmarkBorder
                className={expanded ? classes.expanded : classes.expand}
                size={SIZE}
              />
            </Link>
            <Link to={`/adm/posts/${user.uid}`}>
              <MdLibraryBooks
                className={efectoPosts ? classes.expanded : classes.expand}
                size={SIZE}
              />
            </Link>
            <Link to={`/player/profile/${user.uid}`}>
              <MdPersonOutline size={SIZE} />
            </Link>
          </Nav>
        );
      case "CLUB":
        return (
          <Nav>
            <Link to={`/club/home/${user.uid}`}>
              <MdHome size={SIZE} />
            </Link>
            <Link to={`/club/search/${user.uid}`}>
              <MdSearch size={SIZE} />
            </Link>
            <Link to={`/messages/${user.uid}`}>
              <Badge color="error" badgeContent={msgNotSeen}>
                <MdMessage size={SIZE} />
              </Badge>
            </Link>
            <Link to={`/booked/${user.uid}`}>
              <MdBookmarkBorder
                className={expanded ? classes.expanded : classes.expand}
                size={SIZE}
              />
            </Link>

            <Link to={`/adm/posts/${user.uid}`}>
              <MdLibraryBooks size={SIZE} />
            </Link>

            <Link to={`/club/profile/${user.uid}`}>
              <MdPersonOutline size={SIZE} />
            </Link>
          </Nav>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {user && user.uid ? (
        menu()
      ) : (
        <Nav>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/registro");
            }}
          >
            Sign up
          </Button>
        </Nav>
      )}
    </>
  );
};
