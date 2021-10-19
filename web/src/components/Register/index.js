import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { OKMessage, Error, Form, Div } from "./styles";
import { SubmitButton } from "../SubmitButton";
import { useInputValue } from "../../hooks/useInputValue";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  atocomplete: {
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
  },
  formCheck: {
    display: "flex",
    width: "100%",
    textAlign: "left",
    fontSize: "0.7rem",
    letterSpacing: "1px",
  },
  txtMain: {
    fontSize: "1.2rem",
  },
  txtMaSec: {
    fontSize: "0.8rem",
    paddingBottom: 10,
  },
  root: {
    "& .MuiFormLabel-root": {
      letterSpacing: 1.5,
    },
  },
}));

export const Registro = ({ error, disabled, okMessage, onSubmit }) => {
  const email = useInputValue("");
  const password = useInputValue("");
  const password1 = useInputValue("");
  const classes = useStyles();
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      email: email.value,
      password: password.value,
      password1: password1.value,
    });
  };

  const handleChangeFirstCheck = (event) => {
    setFirstCheck(firstCheck === true ? false : true);
  };

  const handleChangeSecondCheck = (event) => {
    setSecondCheck(secondCheck === true ? false : true);
  };

  return (
    <Div>
      <Box display="flex" justifyContent="center" />
      <h3>{t("register.register").toUpperCase()}</h3>
      <br />
      <div className={classes.txtMaSec}>{t("register.txt.main")}</div>
      {error && (
        <Error>
          {error}
          <br />
        </Error>
      )}
      <Form disabled={disabled} onSubmit={handleSubmit}>
        <TextField
          className={classes.root}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label={t("txt.email")}
          name="email"
          autoComplete="email"
          autoFocus
          {...email}
        />
        <TextField
          className={classes.root}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={t("txt.psw")}
          type="password"
          id="password"
          autoComplete="current-password"
          {...password}
        />
        <TextField
          className={classes.root}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password1"
          label={t("txt.pswRepeat")}
          type="password"
          id="password1"
          autoComplete="current-password"
          {...password1}
        />
        <br />
        <br />

        <div className={classes.formCheck}>
          <Checkbox
            required
            variant="outlined"
            checked={firstCheck}
            onChange={handleChangeFirstCheck}
            name="checkedA"
            color="primary"
          />
          {t("register.txt.firstCheck")}
        </div>

        <div className={classes.formCheck}>
          <Checkbox
            required
            variant="outlined"
            checked={secondCheck}
            onChange={handleChangeSecondCheck}
            name="checkedB"
            color="primary"
          />
          {t("register.txt.secondCheck")}
        </div>
        <br />

        {okMessage && (
          <OKMessage>
            {okMessage}
            <br />
          </OKMessage>
        )}
        <SubmitButton disabled={disabled}>{t("button.signUp")}</SubmitButton>
      </Form>
    </Div>
  );
};
