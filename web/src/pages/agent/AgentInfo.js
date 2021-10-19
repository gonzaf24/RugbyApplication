import React, { useState, useContext } from "react";
import { NavBarInfo } from "../../components/NavBarInfo";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { EditData } from "../../components/Agent/editData";
import { useMutation } from "@apollo/react-hooks";
import { NEW_AGENT } from "../../mutations/AgentMutation";
import { Context } from "../../Context";
import { GET_USER } from "../../mutations/UserMutation";

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
    backgroundColor: "#2c3235",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
  register: {
    margin: theme.spacing(1),
    width: 200,
    marginBottom: 25,
  },
  txtColor: { color: "#666666" },
}));

export const AgentInfo = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, agent, userAuth } = useContext(Context);
  const [newAgent] = useMutation(NEW_AGENT);
  const [loading, setLoading] = useState(false);
  const [userMutation] = useMutation(GET_USER);

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
      let { data } = await newAgent({
        variables: { input },
      });
      if (data) {
        const input = { id: user.uid };
        const userResponse = await userMutation({
          variables: { input },
        });
        const usuarioContext = await {
          ...userResponse.data.user,
          agent: { ...data.newAgent },
        };
        userAuth(usuarioContext);
        setLoading(false);
        navigate(`/agent/home/${user.uid}`);
      }
    } catch (error) {
      console.log(
        "hay error vuelta newAgent! " + JSON.stringify(error.message)
      );
      setLoading(false);
      navigate("/agent/info");
    }
  };

  return (
    <>
      <NavBarInfo />
      <div className={classes.body}>
        <div className={classes.wellcomeText}>
          <h2>{t("txt.wellcome")} </h2>{" "}
          <h2 className={classes.txtColor}>{user.email} </h2>
          <h2>{t("txt.wellcomeThen")}</h2>
        </div>
        <EditData
          agent={agent ? agent : null}
          onSubmitAgent={onSubmitAgent}
          loadingConfirm={loading}
        ></EditData>
      </div>

      {props.children}
    </>
  );
};
