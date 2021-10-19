import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { Registro } from "../components/Register/index";
import { NavBarPublic } from "../components/NavBarPublic";
import { REGISTER_USER } from "../mutations/UserMutation";
import { useMutation } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Context } from "../Context";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
  linear: {
    paddingTop: 200,
    width: "50%",
  },
}));

export const Register = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [msgError, setMsgError] = useState();
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const { removeAuth } = useContext(Context);

  const [loadingP, setLoadingP] = useState(false);

  const onSubmit = async ({ email, password, password1 }) => {
    removeAuth();
    if (password != password1) {
      setMsgError(t("register.error.psw"));
    } else {
      setLoadingP(true);
      const input = { email, password };
      const response = await registerUser({
        variables: { input },
      });
      if (response) {
        const { signup } = response.data;
        let codigo = signup.slice(0, 3);
        setLoadingP(false);
        if (codigo === "200") {
          setMsgError();
          navigate(`/confirmation/${"register"}`);
        } else if (codigo === "401") {
          setMsgError(t("register.error.email"));
        } else if (codigo === "402") {
          setMsgError(t("register.error.psw6"));
        } else if (codigo === "400") {
          setMsgError(signup);
        }
      } else {
        setLoadingP(false);
        navigate("/register");
      }
    }
  };

  return (
    <>
      <Helmet>
        {<title>{t("register.register").toLowerCase()} - RUGBY AGENTS </title>}
      </Helmet>

      <div className={classes.body}>
        <NavBarPublic />
        {loadingP ? (
          <div className={classes.linear}>
            {t("txt.registering").toLowerCase()}
            <LinearProgress />
          </div>
        ) : (
          <Registro
            disabled={loading}
            error={msgError}
            okMessage={""}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </>
  );
};
