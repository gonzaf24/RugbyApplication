import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { format } from "date-fns";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    backgroundColor: "white",
    borderRadius: "50%",
  },
  title: {
    textAlign: "center",
  },
  linear: {
    margin: 40,
  },
  contenedor: {
    margin: 40,
  },
}));

export const InfoModal = ({ openSuscriptionA, setOpenSuscriptionA }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { removeAuth, changeLang, user, type } = useContext(Context);
  const handleCloseSuscription = () => {
    setOpenSuscriptionA(false);
  };
  const [value, setValue] = useState(window.localStorage.getItem("lang"));

  const handleCloseLanguage = () => {
    setOpenLanguage(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    window.localStorage.setItem("lang", event.target.value);
    i18n.changeLanguage(event.target.value, (err, t) => {
      changeLang(event.target.value);
      if (err) return console.log("something went wrong loading language", err);
    });
  };

  return (
    <>
      <Dialog
        open={openSuscriptionA}
        TransitionComponent={Transition}
        onClose={handleCloseSuscription}
      >
        <div className={classes.contenedor}>
          <DialogTitle className={classes.title}>
            {t("txt.language").toUpperCase()}
          </DialogTitle>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="en"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel
                value="es"
                control={<Radio />}
                label="Español"
              />
              <FormControlLabel
                value="fr"
                control={<Radio />}
                label="Français"
              />
              <FormControlLabel
                value="it"
                control={<Radio />}
                label="Italiano"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </Dialog>
    </>
  );
};
