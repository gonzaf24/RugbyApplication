import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { Recover as Recuperar } from "../components/Recover/index";
import { NavBarPublic } from "../components/NavBarPublic";
import { RECOVER_PASSWORD } from "../mutations/UserMutation";
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

export const Recover = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [msgError, setMsgError] = useState();
  const [loading, setLoading] = useState(false);
  const [recoverPassword] = useMutation(RECOVER_PASSWORD);
  const { removeAuth } = useContext(Context);

  const onSubmit = async ({ email }) => {
    setLoading(true);
    removeAuth();
    const input = { email };
    const response = await recoverPassword({
      variables: { input },
    });
    if (response) {
      const { recoverPassword } = response.data;
      let codigo = recoverPassword.slice(0, 3);
      if (codigo === "200") {
        setMsgError();
        navigate(`/confirmation/${"recover"}`);
      } else if (codigo === "404") {
        setMsgError(t("recover.error.user"));
      }
    } else {
      navigate("/recover");
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>{<title>{t("recover.recover")} - RUGBY AGENTS </title>}</Helmet>

      <div className={classes.body}>
        <NavBarPublic />

        {loading ? (
          <div className={classes.linear}>
            {t("txt.recovering").toLowerCase()}
            <LinearProgress />
          </div>
        ) : (
          <Recuperar
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
