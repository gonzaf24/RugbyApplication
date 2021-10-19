import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { EDIT_CLUB } from "../../mutations/ClubMutation";
import { EditData } from "../../components/Club/editData";
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
  openEditClub,
  setOpenEditClub,
  setFotoPerfil,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, club, userAuth } = useContext(Context);
  const [editClub] = useMutation(EDIT_CLUB);
  const [loading, setLoading] = useState(false);

  const onSubmitClub = async ({
    nombre,
    direccion,
    pais,
    estadoCiudad,
    cp,
    categorias,
    presidente,
    responsableContrataciones,
    telefonoResponsable,
    emailResponsable,
    fotoPerfil,
    documentos,
    videos,
    clubType,
    idiomas,
    web,
  }) => {
    setLoading(true);
    const input = {
      nombre,
      direccion,
      pais,
      estadoCiudad,
      cp,
      categorias,
      presidente,
      responsableContrataciones,
      telefonoResponsable,
      emailResponsable,
      fotoPerfil,
      documentos,
      videos,
      clubType,
      idiomas,
      web,
    };

    try {
      let { data } = await editClub({
        variables: { input },
      });
      if (data) {
        const usuarioContext = await {
          ...user,
          club: { ...data.editClub },
        };
        userAuth(usuarioContext);
        setLoading(false);
        setFotoPerfil(data.editClub.fotoPerfil);
        setOpenEditClub(false);
      }
    } catch (error) {
      console.log(
        "hay error vuelta editClub! " + JSON.stringify(error.message)
      );
      setLoading(false);
      //aqui mostrar el error en el modal
    }
  };

  const handleCloseEditClub = () => {
    setOpenEditClub(false);
  };

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        TransitionComponent={Transition}
        open={openEditClub}
        onClose={handleCloseEditClub}
      >
        {!loading && (
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={handleCloseEditClub}
          />
        )}
        <DialogTitle className={classes.title}>
          {t("txt.editData").toUpperCase()}
        </DialogTitle>

        <EditData
          club={user && user.club ? user.club : null}
          onSubmitClub={onSubmitClub}
          loadingConfirm={loading}
        ></EditData>
      </Dialog>
    </>
  );
};
