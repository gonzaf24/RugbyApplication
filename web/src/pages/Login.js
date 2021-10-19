import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import { Context } from "../Context";
import { Login as LoginComponent } from "../components/Login";
import { LoginMutation } from "../mutations/LoginMutation";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import detectBrowserLanguage from "detect-browser-language";

export const Login = ({ id }) => {
  const { activateAuth, removeAuth, user, changeLang } = useContext(Context);
  const { t, i18n } = useTranslation();
  const [msgError, setMsgError] = useState();

  return (
    <>
      <LoginMutation>
        {(login, { data, loading, error }) => {
          const onSubmit = ({ email, password }) => {
            removeAuth();
            const input = { email, password };
            const variables = { input };
            console.log("voyyy ---- > " + JSON.stringify(variables));
            login({ variables }).then(({ data }) => {
              const { login } = data;
              console.log("LOGIN ---- > " + JSON.stringify(data));
              if (!login.emailVerified) {
                setMsgError(t("login.error.verified"));
              } else {
                activateAuth(login);
                if (!window.localStorage.getItem("lang")) {
                  let valueLang = detectBrowserLanguage();
                  if (
                    valueLang !== "es" &&
                    valueLang !== "en" &&
                    valueLang !== "it" &&
                    valueLang !== "fr"
                  ) {
                    valueLang = "en";
                  }
                  window.localStorage.setItem("lang", valueLang);
                  i18n.changeLanguage(valueLang, (err, t) => {
                    changeLang(valueLang);
                    if (err)
                      return console.log(
                        "something went wrong loading language",
                        err
                      );
                  });
                }
                if (login.notificarSuscripcion) {
                  navigate("/plans");
                } else if (login.notificarCompletarInformacion) {
                  if (login.type === "PLAYER") {
                    navigate("/player/level");
                  } else if (login.type === "CLUB") {
                    navigate("/club/info");
                  } else {
                    setMsgError(
                      "Hubo algun error, contacte con info@rugbyagents.com asunto: Issue Login A1"
                    );
                  }
                } else {
                  console.log(" login es : " + JSON.stringify(login));
                  if (login.type === "PLAYER") {
                    navigate(`/player/home/${login.uid}`);
                  } else if (login.type === "CLUB") {
                    navigate(`/club/home/${login.uid}`);
                  } else {
                    setMsgError(
                      "Hubo algun error, contacte con info@rugbyagents.com asunto: Issue Login A2"
                    );
                  }
                }
              }
            });
          };
          if (error) {
            if (error && error.graphQLErrors[0]) {
              let code = error.graphQLErrors[0].extensions.code.replaceAll(
                '"',
                ""
              );
              if (code === "INTERNAL_SERVER_ERROR") {
                let exception = error.graphQLErrors[0].extensions.exception;
                console.log("exception  : " + JSON.stringify(exception));
                if (
                  exception.code === "auth/user-not-found" ||
                  "auth/wrong-password"
                ) {
                  setMsgError(t("login.error.user"));
                }
                if (exception.code === "auth/too-many-requests") {
                  setMsgError(
                    t("login.error.verified") +
                      ". || " +
                      t("login.error.manyRequest")
                  );
                }
                if (exception.code === "auth/user-disabled") {
                  setMsgError(t("login.error.userBlocked"));
                }
              }
            }
          }
          return (
            <Container>
              <Helmet>
                <title>Sign in | RugbyAgents </title>
                <meta
                  name="description"
                  content={"iniciar sesion en alchimia"}
                />
              </Helmet>
              <LoginComponent
                disabled={loading}
                setMsgError={setMsgError}
                error={msgError}
                onSubmit={onSubmit}
              ></LoginComponent>
            </Container>
          );
        }}
      </LoginMutation>
    </>
  );
};
