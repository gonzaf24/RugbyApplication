import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { EDIT_PLAYER } from "../../mutations/PlayerMutation";
import { EditData } from "../../components/Player/editData";
import { useMutation } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

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

export const EditDataModal = ({
  openEditPlayer,
  setOpenEditPlayer,
  setFotoPerfil,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, player, userAuth } = useContext(Context);
  const [editPlayer] = useMutation(EDIT_PLAYER);
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
      uid,
      nivel,
      idiomas,
      dispLaboral,
      dispEntrMenores,
      jugadorInternacional,
      historialInternacional,
    };

    try {
      let { data } = await editPlayer({
        variables: { input },
      });
      if (data) {
        const usuarioContext = await {
          ...user,
          player: { ...data.editPlayer },
        };
        userAuth(usuarioContext);
        setLoading(false);
        setFotoPerfil(data.editPlayer.fotoPerfil);
        setOpenEditPlayer(false);
        //aqui cerrar el modal
      }
    } catch (error) {
      console.log(
        "hay error vuelta editPlayer! " + JSON.stringify(error.message)
      );
      setLoading(false);
      //aqui mostrar el error en el modal
    }
  };

  const handleCloseEditPlayer = () => {
    setOpenEditPlayer(false);
  };

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        TransitionComponent={Transition}
        open={openEditPlayer}
        onClose={handleCloseEditPlayer}
        aria-labelledby="form-dialog-title"
      >
        {!loading && (
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={handleCloseEditPlayer}
          />
        )}
        <DialogTitle className={classes.title}>
          {t("txt.editData").toUpperCase()}
        </DialogTitle>

        <EditData
          player={user && user.player ? user.player : null}
          level={user && user.player ? user.player.nivel : null}
          onSubmitPlayer={onSubmitPlayer}
          loadingConfirm={loading}
        ></EditData>
      </Dialog>
    </>
  );
};
