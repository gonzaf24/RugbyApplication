import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { format } from "date-fns";

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

export const InfoModal = ({
  openSuscription,
  setOpenSuscription,
  suscripcion,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, club, userAuth } = useContext(Context);

  const handleCloseSuscription = () => {
    setOpenSuscription(false);
  };

  return (
    <>
      <Dialog
        open={openSuscription}
        TransitionComponent={Transition}
        onClose={handleCloseSuscription}
      >
        {!suscripcion ? (
          <div className={classes.linear}>
            {t("txt.loading").toLowerCase()}
            <LinearProgress />
          </div>
        ) : (
          <>
            <CloseIcon
              className={classes.close}
              fontSize="large"
              onClick={handleCloseSuscription}
            />
            <DialogTitle className={classes.title}>
              {t("txt.suscription").toUpperCase()}
            </DialogTitle>
            <div className={classes.contenedor}>
              <div>
                {" "}
                {t("txt.planType")}: {suscripcion.planId} {suscripcion.clubType}
              </div>
              <div>
                {t("txt.planRenewal")}:{" "}
                {format(parseInt(suscripcion.fechaFin), "dd/MM/yyyy")}
              </div>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};
