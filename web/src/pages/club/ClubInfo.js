import React, { useState, useContext } from "react";
import { NavBarInfo } from "../../components/NavBarInfo";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { EditData } from "../../components/Club/editData";
import { useMutation } from "@apollo/react-hooks";
import { NEW_CLUB } from "../../mutations/ClubMutation";
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
  txtColor: { color: "#666666" },
}));

export const ClubInfo = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, club, userAuth } = useContext(Context);
  const [newClub] = useMutation(NEW_CLUB);
  const [userMutation] = useMutation(GET_USER);
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
      clubType: user.clubType,
      idiomas,
      web,
    };
    try {
      let { data } = await newClub({
        variables: { input },
      });
      if (data) {
        const input = { id: user.uid };
        const userResponse = await userMutation({
          variables: { input },
        });
        const usuarioContext = await {
          ...userResponse.data.user,
          club: { ...data.newClub },
        };
        userAuth(usuarioContext);
        setLoading(false);
        navigate(`/club/home/${user.uid}`);
      }
    } catch (error) {
      console.log("hay error vuelta newClub! " + JSON.stringify(error.message));
      setLoading(false);
      navigate("/club/info");
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
          club={club ? club : null}
          onSubmitClub={onSubmitClub}
          loadingConfirm={loading}
        ></EditData>
      </div>

      {props.children}
    </>
  );
};
