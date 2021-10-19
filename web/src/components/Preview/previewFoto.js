import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    backgroundColor: "black",
  },
  imagen: {
    maxWidth: "80vw",
    maxHeight: "85vh",
  },
  close: {
    textAlign: "right",
    backgroundColor: "black",
  },
  icon: {
    color: "white",
  },
  dialogStyle: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const PreviewFoto = ({ openPreviewFoto, setOpenPreviewFoto, src }) => {
  const classes = useStyles();

  const handleClosePreviewFoto = () => {
    setOpenPreviewFoto(false);
  };

  return (
    <>
      <Dialog open={openPreviewFoto} onClose={handleClosePreviewFoto}>
        <div className={classes.close}>
          <HighlightOffIcon
            className={classes.icon}
            fontSize="large"
            onClick={handleClosePreviewFoto}
          />
        </div>
        <div className={classes.wrapper}>
          <img className={classes.imagen} src={src} />
        </div>
      </Dialog>
    </>
  );
};
