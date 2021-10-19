import React from "react";
import { Button } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-label": {
      letterSpacing: 1.5,
    },
    color: "#28a499",
  },
}));

export const SubmitButton = ({ children, disabled, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      variant="outlined"
      type="submit"
      disabled={disabled}
      onClick={onClick}
      color="inherit"
    >
      {children}
    </Button>
  );
};
