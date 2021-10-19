import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ReactPlayer from "react-player";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    backgroundColor: "black",
    height: "80%",
  },
  player: {
    left: 0,
    width: 500,
  },
  dialogStyle: {
    backgroundColor: "black !important",
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  close: {
    textAlign: "right",
    backgroundColor: "black",
  },
  icon: {
    color: "white",
  },
}));

export const PreviewVideo = ({
  openPreviewVideo,
  setOpenPreviewVideo,
  src,
}) => {
  const classes = useStyles();

  const handleClosePreviewVideo = () => {
    setOpenPreviewVideo(false);
  };

  return (
    <>
      <Dialog
        open={openPreviewVideo}
        onClose={handleClosePreviewVideo}
        fullScreen={true}
        PaperProps={{
          style: {
            backgroundColor: "black",
          },
        }}
      >
        <div className={classes.close}>
          <HighlightOffIcon
            className={classes.icon}
            fontSize="large"
            onClick={handleClosePreviewVideo}
          />
        </div>
        {
          <div className={classes.wrapper}>
            <ReactPlayer
              className={classes.player}
              controls={true}
              url={src}
              width="100%"
              height="100%"
            />
          </div>
        }
      </Dialog>
    </>
  );
};
