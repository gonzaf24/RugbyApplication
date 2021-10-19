import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Error, Div, Link } from "./styles";
import { useInputValue } from "../../hooks/useInputValue";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { SubmitButton } from "../SubmitButton";
import { useTranslation } from "react-i18next";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "rgba(0, 0, 0, 0.65) !important",
    fontSize: "11px",
    cursor: "pointer",
  },
  link1: {
    color: "#28a499 !important",
    fontSize: "15px",
    cursor: "pointer",
  },
  form: {
    padding: 16,
  },
  spinner: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

export const Login = ({ error, disabled, onSubmit }) => {
  const email = useInputValue("");
  const password = useInputValue("");
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    error;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <>
      <Container>
        <Div>
          <Box display="flex" justifyContent="center"></Box>
          <form
            className={classes.form}
            disabled={disabled}
            onSubmit={handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              type="email"
              fullWidth
              id="email"
              label={t("txt.email")}
              name="email"
              autoComplete="email"
              autoFocus
              disabled={disabled}
              {...email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={disabled}
              name="password"
              label={t("txt.psw")}
              type="password"
              id="password"
              autoComplete="current-password"
              {...password}
            />
            <br />
            {error && <Error>{error}</Error>}
            <br />
            <br />
            {disabled ? (
              <div>
                {t("txt.signingin").toLowerCase()}
                <LinearProgress style={{ backgroundColor: "#28a499" }} />
              </div>
            ) : (
              <SubmitButton disabled={disabled}>
                {t("button.signIn")}
              </SubmitButton>
            )}

            <br />
            <br />
            <Grid>
              <div
                className={classes.link}
                onClick={() => {
                  navigate("/registro");
                }}
              >
                {t("register.txt.account")}
              </div>
              <div
                className={classes.link1}
                onClick={() => {
                  navigate("/register");
                }}
              >
                {t("button.signUp")}
              </div>
            </Grid>
            <br />
            <Grid>
              <div
                className={classes.link}
                onClick={() => {
                  navigate("/recover");
                }}
              >
                {t("button.recover")}
              </div>
            </Grid>
          </form>

          <Box mt={2}>
            <Copyright />
          </Box>
        </Div>
      </Container>
    </>
  );
};

function Copyright() {
  return (
    <Typography
      style={{
        fontSize: "10px",
      }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        RugbyAgents
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
