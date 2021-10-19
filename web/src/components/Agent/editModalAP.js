import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { EDIT_AGENT_PLAYER } from "../../mutations/AgentPlayerMutation";
import { EditData } from "../../components/Player/editData";
import { useMutation } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GET_USER } from "../../mutations/UserMutation";

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

export const EditDataModalAP = ({
  openEditAgentPlayer,
  setOpenEditAgentPlayer,
  loading,
  player,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, userAuth } = useContext(Context);
  const [editAgentPlayer] = useMutation(EDIT_AGENT_PLAYER);
  const [userMutation] = useMutation(GET_USER);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

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
    idiomas,
    fotoPerfil,
    documentos,
    videosHighlights,
    videosMatchs,
    uid,
    nivel,
  }) => {
    console.log("inpt sssssses : ");
    setLoadingConfirm(true);
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
      idiomas,
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
    console.log("inpt es : " + JSON.stringify(input));
    try {
      let { data } = await editAgentPlayer({
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
        setLoadingConfirm(false);
        setOpenEditAgentPlayer(false);
      }
    } catch (error) {
      console.log(
        "hay error vuelta editPlayer! " + JSON.stringify(error.message)
      );
      setLoadingConfirm(false);
    }
  };

  const handleCloseEditAgentPlayer = () => {
    setOpenEditAgentPlayer(false);
  };

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        open={openEditAgentPlayer}
        onClose={handleCloseEditAgentPlayer}
        aria-labelledby="form-dialog-title"
      >
        {!loading && (
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={handleCloseEditAgentPlayer}
          />
        )}
        <DialogTitle className={classes.title}>
          {t("txt.editData").toUpperCase()}
        </DialogTitle>

        {loading ? (
          <div style={{ textAlign: "center", margin: 80 }}>
            {t("txt.loading").toLowerCase()}
            <LinearProgress />
          </div>
        ) : (
          <EditData
            player={player}
            level={null}
            onSubmitPlayer={onSubmitPlayer}
            loadingConfirm={loadingConfirm}
          ></EditData>
        )}
      </Dialog>
    </>
  );
};
