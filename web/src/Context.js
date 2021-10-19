import React, { createContext, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useLocalStorage("isAuth", false);
  const [notificarSuscripcion, setNotificarSuscripcion] = useState(false);
  const [notificarCompletarInformacion, setNotificarCompletarInformacion] =
    useState(false);
  const [player, setPlayer] = useLocalStorage("ply", {});
  const [club, setClub] = useLocalStorage("clb", {});
  const [agent, setAgent] = useState({});
  const [type, setType] = useLocalStorage("tpe" + "");
  const [user, setUser] = useLocalStorage("umain", false);
  const [lenguaje, setLenguaje] = useLocalStorage("languaje", "");
  const [listaChats, setListaChats] = useLocalStorage("lstCH", false);
  const [listPlayersSearch, setListPlayersSearch] = useLocalStorage(
    "lstPl",
    []
  );
  const [listClubsSearch, setListClubsSearch] = useLocalStorage("lstCl", []);
  const [bookedEffect, setBookedEffect] = useLocalStorage("bkdEfect", false);
  const [bookedList, setBookedList] = useLocalStorage("bkdLst", []);

  const value = {
    user,
    notificarSuscripcion,
    notificarCompletarInformacion,
    type,
    isAuth,
    lenguaje,
    player,
    club,
    agent,
    listaChats,
    listPlayersSearch,
    setListPlayersSearch,
    listClubsSearch,
    setListClubsSearch,
    bookedEffect,
    setBookedEffect,
    bookedList,
    setBookedList,
    storeChats: (chats) => {
      setListaChats(chats);
    },
    userAuth: (user) => {
      setUser(user);
      setType(user.type);
    },
    activateAuth: (user) => {
      console.log(
        " ----------------------LOG IN-----------------> al CONTEXT : "
      );
      setIsAuth(true);
      setNotificarSuscripcion(user.notificarSuscripcion);
      setNotificarCompletarInformacion(user.notificarCompletarInformacion);
      setType(user.type);
      setUser(user);
      setPlayer(user.player);
      setClub(user.club);
      setAgent(user.agent);
      setBookedList(user.club ? user.club.booked : user.player.booked);
      window.localStorage.setItem("tkn", user.token);
    },
    removeAuth: () => {
      console.log(
        " ----------m------------ LOG OUT -----------------> al CONTEXT : "
      );
      setIsAuth(false);
      setNotificarSuscripcion(null);
      setNotificarCompletarInformacion(null);
      setType(null);
      setUser(null);
      setPlayer(null);
      setClub(null);
      setAgent(null);
      setListPlayersSearch(null);
      setListClubsSearch(null);
      setBookedList(null);
      window.localStorage.removeItem("tkn");
      window.localStorage.removeItem("lang");
    },
    changeLang(lang) {
      setLenguaje(lang);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
