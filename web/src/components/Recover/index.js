import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { OKMessage, Error, Form, Div } from "./styles";
import { SubmitButton } from "../SubmitButton";
import { useInputValue } from "../../hooks/useInputValue";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  atocomplete: {
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
  },
  formCheck: {
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

export const Recover = ({ error, disabled, okMessage, onSubmit }) => {
  const email = useInputValue("");
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      email: email.value,
    });
  };

  return (
    <Div>
      <Box display="flex" justifyContent="center" />
      <h3>{t("recover.recover").toUpperCase()}</h3>
      <br />
      <div className={classes.txtMaSec}>{t("recover.txt.main")}</div>
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

        <br />
        <br />

        {okMessage && (
          <OKMessage>
            {okMessage}
            <br />
          </OKMessage>
        )}
        <SubmitButton disabled={disabled}>{t("button.recover")}</SubmitButton>
      </Form>
    </Div>
  );
};
