import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { EDIT_AGENT } from "../../mutations/AgentMutation";
import { EditData } from "../../components/Agent/editData";
import { useMutation } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

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

export const EditDataModal = ({
  openEditAgent,
  setOpenEditAgent,
  setFotoPerfil,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, agent, userAuth } = useContext(Context);
  const [editAgent] = useMutation(EDIT_AGENT);
  const [loading, setLoading] = useState(false);

  const onSubmitAgent = async ({
    nombre,
    inicioActividad,
    idiomas,
    agencia,
    paisAgencia,
    paisesOpera,
    telefono,
    email,
    fotoPerfil,
    documentos,
  }) => {
    setLoading(true);
    const input = {
      nombre,
      inicioActividad,
      idiomas,
      agencia,
      paisAgencia,
      paisesOpera,
      telefono,
      email,
      fotoPerfil,
      documentos,
    };
    try {
      let { data } = await editAgent({
        variables: { input },
      });
      if (data) {
        const usuarioContext = await {
          ...user,
          agent: { ...data.editAgent, agentPlayers: user.agent.agentPlayers },
        };
        userAuth(usuarioContext);
        setLoading(false);
        setOpenEditAgent(false);
        setFotoPerfil(data.editAgent.fotoPerfil);
        //aqui cerrar el modal
      }
    } catch (error) {
      console.log(
        "hay error vuelta editAgent! " + JSON.stringify(error.message)
      );
      setLoading(false);
      //aqui mostrar el error en el modal
    }
  };

  const handleCloseEditAgent = () => {
    setOpenEditAgent(false);
  };

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        open={openEditAgent}
        onClose={handleCloseEditAgent}
        aria-labelledby="form-dialog-title"
        id="prueba"
      >
        {!loading && (
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={handleCloseEditAgent}
          />
        )}
        <DialogTitle className={classes.title}>
          {t("txt.editData").toUpperCase()}
        </DialogTitle>

        <EditData
          agent={user && user.agent ? user.agent : null}
          onSubmitAgent={onSubmitAgent}
          loadingConfirm={loading}
        ></EditData>
      </Dialog>
    </>
  );
};
