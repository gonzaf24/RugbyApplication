import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { Context } from "../../Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
    paddingTop: 15,
    color: "#bdbdbd",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 2,
  },

  bold: {
    fontWeight: "bold",
    color: "#2c3235",
  },

  tableBody: {
    backgroundColor: "#bdc2c4",
    "& .MuiTableCell-body": {
      color: "rgb(67 91 104)",
    },
  },

  tableHistory: {
    border: "1px solid grey",
    borderRadius: 4,
    "& .MuiTableCell-root": {
      fontSize: "0.7rem",
    },
  },
  dialogContent: {
    padding: 10,
    backgroundColor: "#435b68",
    "& .MuiDialogContentText-root": {
      margin: 0,
    },
    "&  .MuiTableCell-root": {
      borderBottom: "0px",
    },
  },
}));

export const PreviewHiringContact = ({
  club,
  openHiringClubModal,
  handleCloseHiringClubModal,
  disabledBookmarks,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user } = useContext(Context);

  return (
    <>
      {club && (
        <Dialog
          open={openHiringClubModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseHiringClubModal}
          maxWidth="xs"
        >
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              <Typography
                component="h2"
                className={classes.center}
                style={{ marginBottom: 20 }}
              >
                {t("txt.hiringContact").toUpperCase()}
              </Typography>

              <TableContainer className={classes.tableHistory}>
                <Table className={classes.table} size="small">
                  <TableBody className={classes.tableBody}>
                    <TableRow key={t("txt.name")}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.bold}
                      >
                        {t("txt.name").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {club.responsableContrataciones}
                      </TableCell>
                    </TableRow>

                    <TableRow key={t("txt.email")}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.bold}
                      >
                        {t("txt.email").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {club.emailResponsable}
                      </TableCell>
                    </TableRow>

                    <TableRow key={t("txt.phone")}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.bold}
                      >
                        {t("txt.phone").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {club.telefonoResponsable}
                      </TableCell>
                    </TableRow>
                    <TableRow key={t("txt.languages")}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.bold}
                      >
                        {t("txt.languages").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {club.idiomas &&
                          club.idiomas
                            .toString()
                            .split(",")
                            .join("\n" + "-" + "\n")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
