import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { NEW_AGENT_PLAYER } from "../../mutations/AgentPlayerMutation";
import { EditData } from "../Player/editData";
import { useMutation } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { GET_USER } from "../../mutations/UserMutation";
import { Context } from "../../Context";

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    backgroundColor: "white",
    borderRadius: "50%",
    color: "#28a499",
  },
  title: {
    paddingRight: 58,
    textAlign: "center",
    backgroundColor: "#0c0c0c99",
    color: "#c3c8ca",
    textAlign: "center",
    backgroundColor: "#2c3235",
    borderTop: "1px solid white",
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
}));

export const NewAgentPlayerModal = ({
  openModalAgentPlayer,
  setOpenModalAgentPlayer,
}) => {
  const { user, userAuth } = useContext(Context);
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [newAgentPlayer] = useMutation(NEW_AGENT_PLAYER);
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
    uid,
    nivel,
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
      uid,
      nivel,
      agentUID: user.uid,
    };

    try {
      let { data } = await newAgentPlayer({
        variables: { input },
      });
      if (data) {
        const input = { id: user.uid };
        const userResponse = await userMutation({
          variables: { input },
        });
        if (userResponse) {
          userAuth(userResponse.data.user);
        }
        setLoading(false);
        setOpenModalAgentPlayer(false);
      }
    } catch (error) {
      console.log(
        "hay error vuelta editPlayer! " + JSON.stringify(error.message)
      );
      setLoading(false);
    }
  };

  const handleCloseNewPlayer = () => {
    setOpenModalAgentPlayer(false);
  };

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        open={openModalAgentPlayer}
        onClose={handleCloseNewPlayer}
        aria-labelledby="form-dialog-title"
      >
        {!loading && (
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={handleCloseNewPlayer}
          />
        )}
        <DialogTitle className={classes.title}>
          {t("txt.newPlayer").toUpperCase()}
        </DialogTitle>

        <EditData
          player={null}
          level={null}
          onSubmitPlayer={onSubmitPlayer}
          loadingConfirm={loading}
        ></EditData>
      </Dialog>
    </>
  );
};
