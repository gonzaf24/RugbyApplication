import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import { Context } from "../../Context";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useMutation } from "@apollo/react-hooks";
import { BOOK } from "../../mutations/BookMutation";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  noMargin: {
    margin: 0,
    padding: 0,
    textAlign: "right",
  },
}));

export const BookIcon = ({ club, player, type }) => {
  const { bookedEffect, setBookedEffect, bookedList, setBookedList } =
    useContext(Context);
  const classes = useStyles();
  const [book] = useMutation(BOOK);
  const { t, i18n } = useTranslation();

  const [booked, setBooked] = useState(
    bookedList.find(
      (item) => item.idBook === (club ? club.uid : player.uid)
    ) !== undefined
      ? true
      : false
  );

  useEffect(() => {
    console.log("entrooop");
    setBooked(
      bookedList.find(
        (item) => item.idBook === (club ? club.uid : player.uid)
      ) !== undefined
        ? true
        : false
    );
  }, [club, player]);

  const onClickBook = async () => {
    console.log(" bookedList : " + JSON.stringify(bookedList));
    if (club) {
      console.log(" entro en onClickBook");

      console.log(" entro en club ");
      let input = {
        tipo: "CLUB",
        idBook: club.uid,
        userBook: club.userEmail,
      };
      if (bookedList.find((item) => item.idBook === club.uid) !== undefined) {
        let bookAux = bookedList.filter((item) => item.idBook !== club.uid);
        setBookedList(bookAux);
      } else {
        let bookAux = JSON.parse(JSON.stringify(bookedList));
        bookAux.push(input);
        setBookedList(bookAux);
      }
      try {
        await book({
          variables: { input },
        });
      } catch (error) {
        console.log(
          "hay error vuelta book club ! " + JSON.stringify(error.message)
        );
      }
    } else if (player) {
      let input = {
        tipo: "PLAYER",
        idBook: player.uid,
        userBook: player.userEmail,
      };

      if (bookedList.find((item) => item.idBook === player.uid) !== undefined) {
        let bookAux = bookedList.filter((item) => item.idBook !== player.uid);
        setBookedList(bookAux);
      } else {
        let bookAux = JSON.parse(JSON.stringify(bookedList));
        bookAux.push(input);
        setBookedList(bookAux);
      }
      try {
        await book({
          variables: { input },
        });
      } catch (error) {
        console.log(
          "hay error vuelta book player! " + JSON.stringify(error.message)
        );
      }
    }

    bookedEffect ? setBookedEffect(false) : setBookedEffect(true);
  };

  return (
    <>
      {type === "delete" ? (
        <ListItemText
          className={classes.noMargin}
          onClick={() => {
            onClickBook();
            setBooked(booked ? false : true);
          }}
          primary={<DeleteForeverIcon /> + t("txt.deleteBookmark")}
        />
      ) : (
        <ListItemText
          className={classes.noMargin}
          primary={
            booked ? (
              <BookmarkIcon
                style={{ color: "#28a499" }}
                onClick={() => {
                  onClickBook();
                  setBooked(booked ? false : true);
                }}
              />
            ) : (
              <BookmarkBorderIcon
                style={{ color: "rgb(189 189 189)" }}
                onClick={() => {
                  onClickBook();
                  setBooked(booked ? false : true);
                }}
              />
            )
          }
        />
      )}
    </>
  );
};
