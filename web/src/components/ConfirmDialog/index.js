import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import LinearProgress from "@material-ui/core/LinearProgress";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    backgroundColor: "white",
    borderRadius: "50%",
    color: "#28a499",
  },
  centerMarging: {
    textAlign: "center",
    marginRight: 40,
  },
  center: {
    textAlign: "center",
    justifyContent: "center",
  },
  linear: {
    textAlign: "center",
    margin: 40,
  },
  colorGreen: {
    color: "#28a499",
  },
}));

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm, state, loading } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const handleCloseEditPlayer = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog" className={classes.centerMarging}>
        {title}
      </DialogTitle>

      {!loading && (
        <CloseIcon
          className={classes.close}
          fontSize="large"
          onClick={() => handleCloseEditPlayer()}
        />
      )}

      {loading ? (
        <div className={classes.linear}>
          {t("txt.deleting").toLowerCase()}
          <LinearProgress />
        </div>
      ) : (
        <>
          <DialogContent>{children}</DialogContent>
          <DialogActions className={classes.center}>
            {state === "delete" && (
              <>
                <Button
                  variant="contained"
                  onClick={() => setOpen(false)}
                  className={classes.colorGreen}
                >
                  {t("button.no").toUpperCase()}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(false);
                    onConfirm();
                  }}
                  color="default"
                >
                  {t("button.yes").toUpperCase()}
                </Button>
              </>
            )}
            {state === "confirm" && (
              <>
                <Button
                  variant="contained"
                  onClick={() => setOpen(false)}
                  color="default"
                >
                  {t("button.no").toUpperCase()}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(false);
                    onConfirm();
                  }}
                  className={classes.colorGreen}
                >
                  {t("button.yes").toUpperCase()}
                </Button>
              </>
            )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ConfirmDialog;
