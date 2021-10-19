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
import ReactCountryFlag from "react-country-flag";
import { BookIcon } from "../Booked/BookIcon";
import { ChatDirect } from "../../components/Chat/ChatDirect";
import { Context } from "../../Context";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { getFlagCountry } from "../Utils/utils";

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

  tableHistory: {
    border: "1px solid grey",
    borderRadius: 4,
    "& .MuiTableCell-root": {
      fontSize: "0.7rem",
    },
  },
  tableBody: {
    backgroundColor: "#bdc2c4",
    "& .MuiTableCell-body": {
      color: "rgb(67 91 104)",
    },
  },

  headTitleText: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 3,
    textAlign: "center",
    width: "100%",
    color: "#28a499",
    padding: 10,
  },

  tableFontSize: {
    fontSize: "0.7rem",
    padding: 3,
    color: "#435b68",
  },

  tableFontSizePadding: {
    fontSize: "0.7rem",
    padding: 3,
    paddingLeft: 10,
  },
  tableFontSizeBold: {
    fontSize: "0.7rem",
    padding: 3,
    fontWeight: "bold",
  },
  tableFontSizeBoldPadding: {
    fontSize: "0.7rem",
    padding: 3,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  noPadding: {
    padding: 0,
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

export const PreviewInfoClub = ({
  club,
  openInfoClubModal,
  handleCloseInfoClubModal,
  disabledBookmarks,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user } = useContext(Context);

  return (
    <>
      {club && (
        <Dialog
          open={openInfoClubModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseInfoClubModal}
          maxWidth="xs"
        >
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              {!disabledBookmarks && (
                <Typography
                  component="h2"
                  className={classes.center}
                  style={{ marginBottom: 20 }}
                >
                  {club.nombre.toUpperCase()}
                </Typography>
              )}

              {!disabledBookmarks && club.uid != user.uid && (
                <div style={{ display: "block" }}>
                  <div
                    style={{
                      float: "right",
                    }}
                  >
                    <BookIcon club={club} />
                  </div>
                  <div
                    style={{
                      float: "right",
                      paddingRight: 10,
                    }}
                  >
                    <ChatDirect
                      uidSender={user.uid}
                      uidReceiver={club.uid}
                      emailSender={user.email}
                      emailReceiver={club.userEmail}
                      avatar={club.fotoPerfil}
                      nombre={club.nombre}
                    />
                  </div>
                  <div
                    style={{
                      float: "right",
                      paddingRight: 10,
                    }}
                  >
                    <AccountBoxIcon
                      style={{ color: "rgb(189 189 189)" }}
                      onClick={() => navigate(`/club/profile/${club.uid}`)}
                    />
                  </div>
                </div>
              )}

              <TableContainer className={classes.tableHistory}>
                <Table size="small">
                  <TableBody className={classes.tableBody}>
                    <TableRow key={t("txt.country")}>
                      <TableCell className={classes.bold}>
                        {t("txt.country").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <ReactCountryFlag
                          countryCode={getFlagCountry(club.pais)}
                          svg
                          style={{
                            width: "1em",
                            height: "1em",
                          }}
                          title={club.pais}
                        />{" "}
                        {club.pais}
                      </TableCell>
                    </TableRow>

                    <TableRow key={t("txt.cityState")}>
                      <TableCell className={classes.bold}>
                        {t("txt.cityState").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{club.estadoCiudad}</TableCell>
                    </TableRow>

                    <TableRow key={t("txt.categories")}>
                      <TableCell
                        className={classes.bold}
                        style={{ maxWidth: 200 }}
                      >
                        {t("txt.categories").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {club.categorias &&
                          club.categorias
                            .toString()
                            .split(",")
                            .map((ele) => (
                              <TableRow key={ele}>
                                <TableCell className={classes.tableFontSize}>
                                  {ele}
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableCell>
                    </TableRow>

                    <TableRow key={t("txt.adress")}>
                      <TableCell className={classes.bold}>
                        {t("txt.adress").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{club.direccion}</TableCell>
                    </TableRow>

                    <TableRow key={t("txt.president")}>
                      <TableCell className={classes.bold}>
                        {t("txt.president").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{club.presidente}</TableCell>
                    </TableRow>

                    <TableRow key={t("txt.web")}>
                      <TableCell className={classes.bold}>
                        {t("txt.web").toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{club.web}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {!disabledBookmarks && club.uid != user.uid && (
                <div style={{ textAlign: "center", paddingTop: 30 }}>
                  <Button
                    onClick={() => navigate(`/club/profile/${club.uid}`)}
                    style={{ textTransform: "lowercase", color: "#bdbdbd" }}
                    endIcon={<AccountBoxIcon />}
                  >
                    {t("txt.goToProfile")}
                  </Button>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
