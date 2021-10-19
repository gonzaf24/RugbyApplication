import React, { useState, useContext } from "react";

import { NavBarInfo } from "../../components/NavBarInfo";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { EditData } from "../../components/Player/editData";
import { useMutation } from "@apollo/react-hooks";
import { NEW_PLAYER } from "../../mutations/PlayerMutation";
import { GET_USER } from "../../mutations/UserMutation";
import { Context } from "../../Context";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    paddingTop: "70px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    letterSpacing: "3px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
  register: {
    margin: theme.spacing(1),
    width: 200,
    marginBottom: 25,
  },
  txtColor: {
    marginBottom: 10,
    color: "#666666",
  },
}));

export const PlayerInfo = ({ level }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, player, userAuth } = useContext(Context);
  const [newPlayer] = useMutation(NEW_PLAYER);
  const [userMutation] = useMutation(GET_USER);
  const [loading, setLoading] = useState(false);

  const onSubmitPlayer = async ({
    nombre,
    apellido,
    fechaNacimiento,
    paisNacimiento,
    nacionalidades,
    puesto,
    puestoAlt,
    pateador,
    altura,
    peso,
    equipoActual,
    paisEquipoActual,
    categoriaEquipoActual,
    descripcion,
    historialClubs,
    fotoPerfil,
    documentos,
    videosHighlights,
    videosMatchs,
    nivel,
    idiomas,
    dispLaboral,
    dispEntrMenores,
    jugadorInternacional,
    historialInternacional,
  }) => {
    setLoading(true);
    const input = {
      nombre,
      apellido,
      fechaNacimiento,
      paisNacimiento,
      nacionalidades,
      puesto,
      puestoAlt,
      pateador,
      altura,
      peso,
      equipoActual,
      paisEquipoActual,
      categoriaEquipoActual,
      descripcion,
      historialClubs,
      fotoPerfil,
      documentos,
      videosHighlights,
      videosMatchs,
      nivel,
      idiomas,
      dispLaboral,
      dispEntrMenores,
      jugadorInternacional,
      historialInternacional,
    };

    try {
      let { data } = await newPlayer({
        variables: { input },
      });
      if (data && data.newPlayer) {
        const input = { id: user.uid };
        const userResponse = await userMutation({
          variables: { input },
        });
        const usuarioContext = await {
          ...userResponse.data.user,
          player: { ...data.newPlayer, nivel: level },
        };
        userAuth(usuarioContext);
        setLoading(false);
        navigate(`/player/home/${user.uid}`);
      }
    } catch (error) {
      console.log("hay error vuelta newPlayer! " + JSON.stringify(error));
      setLoading(false);
      navigate(`/player/home/${level}`);
    }
  };

  return (
    <>
      <NavBarInfo />
      <div className={classes.body}>
        <div className={classes.wellcomeText}>
          <h2 className={classes.txtColor}>{level} </h2>
          <h2>{t("txt.wellcomeThen")}</h2>
        </div>

        <EditData
          player={player ? player : null}
          level={level}
          onSubmitPlayer={onSubmitPlayer}
          loadingConfirm={loading}
        ></EditData>
      </div>
    </>
  );
};
