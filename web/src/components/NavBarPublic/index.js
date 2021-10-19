import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { navigate } from "@reach/router";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PelotaImg from "../../assets/pelotaRugby.png";
import i18n from "../../languages/i18n";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  link: {
    alignItems: "center",
    color: "#888",
    display: "inline-flex",
    height: "100%",
    textDecoration: "none",
  },
  link2: {
    justifyContent: "flex-end",
    marginRight: "15px",
    color: "#888",
    display: "inline-flex",
    height: "100%",
    textDecoration: "none",
    width: "100%",
  },
  image: {
    marginLeft: "10px",
    width: 40,
    height: 40,
  },
  button: {
    marginTop: "10px",
    height: "30px",
    letterSpacing: "1.5px",
    textTransform: "lowercase !important",
    color: "#28a499",
  },
  nav: {
    background: "#fcfcfc",
    borderBottom: "0px",
    top: 0,
    display: "flex",
    height: "50px",
    left: 0,
    margin: "0px auto",
    maxWidth: "500px",
    position: "fixed",
    right: 0,
    width: "100%",
    zIndex: 1000,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const NavBarPublic = () => {
  const classes = useStyles();

  const [lang, setLang] = useState("");
  const { t, i18n } = useTranslation();
  const handleChangeLang = (event) => {
    setLang(event.target.value);
    window.localStorage.setItem("lang", event.target.value);
    i18n.changeLanguage(event.target.value, (err, t) => {
      if (err) return console.log("something went wrong loading language", err);
    });
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.link}>
        <img
          className={classes.image}
          src={PelotaImg}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo1">{t("txt.language")}</InputLabel>
          <Select
            color="secondary"
            className={classes.select}
            labelId="demo1"
            id="demo-simple-select"
            value={lang}
            onChange={handleChangeLang}
          >
            <MenuItem className={classes.editButton} value={"es"}>
              Español
            </MenuItem>
            <MenuItem className={classes.editButton} value={"en"}>
              English
            </MenuItem>
            <MenuItem className={classes.editButton} value={"fr"}>
              French
            </MenuItem>
            <MenuItem className={classes.editButton} value={"it"}>
              Italiano
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.link2}>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          onClick={() => {
            navigate("/login");
          }}
        >
          {i18n.t("button.signIn")}
        </Button>
      </div>
    </nav>
  );
};
