import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context";
import { EditDataModalAP } from "../../components/Agent/editModalAP";
import ConfirmDialog from "../../components/ConfirmDialog/index";
import { useMutation } from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import LaunchIcon from "@material-ui/icons/Launch";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { GET_USER } from "../../mutations/UserMutation";
import { DELETE_AGENT_PLAYER } from "../../mutations/AgentPlayerMutation";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  close: {
    position: "absolute",
    right: 10,
    top: 12,
    backgroundColor: "white",
    borderRadius: "50%",
    color: "#28a499",
  },
  title: {
    paddingRight: 58,
    textAlign: "center",
    backgroundColor: "#0c0c0c99",
    color: "#c3c8ca",
    textAlign: "center",
    backgroundColor: "#2c3235",
    borderTop: "1px solid white",
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableFontSize: {
    padding: 0,
    paddingLeft: 10,
    fontSize: "0.55rem",
  },
  tableButtons: {
    padding: 10,
  },
  tableFontSizeBold: {
    fontSize: "0.55rem",
    fontWeight: "bold",
    padding: 0,
    paddingLeft: 10,
  },
  colorGrenn: {
    marginLeft: 10,
    color: "#28a499",
  },
  colorYellow: {
    marginLeft: 10,
    color: "#e89d11",
  },
  colorRed: {
    marginLeft: 10,
    color: "#d80505",
  },
  marginBottomTable: {
    marginBottom: 50,
  },
  tableHistory: {
    border: "1px solid #949494",
    padding: 10,
  },
  inlineButtons: {
    display: "inline-flex",
    alignItems: "center",
  },
}));

export const EditAgentPlayerModal = ({
  openModalEditAgentPlayer,
  setOpenModalEditAgentPlayer,
}) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user, userAuth } = useContext(Context);
  const [userMutation] = useMutation(GET_USER);
  const [deleteAgentPlayerMutation] = useMutation(DELETE_AGENT_PLAYER);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [uidDelete, setUidDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [openEditAgentPlayer, setOpenEditAgentPlayer] = useState(false);
  const [player, setPlayer] = useState();

  const handleCloseEditPlayer = () => {
    setOpenModalEditAgentPlayer(false);
  };

  const handleDeleteAgentPlayer = async (uid) => {
    setUidDelete(uid);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setLoadingDelete(true);
    let input = { playerUID: uidDelete, agentUID: user.uid };
    const response = await deleteAgentPlayerMutation({
      variables: { input },
    });
    if (response.data.deleteAgentPlayer === "200") {
      let input = { id: user.uid };
      const userResponse = await userMutation({
        variables: { input },
      });
      if (userResponse) {
        setLoadingDelete(false);
        userAuth(userResponse.data.user);
      }
    } else {
      setLoadingDelete(false);
    }
  };

  const handleOpenEditAgentPlayer = async (uid) => {
    setOpenEditAgentPlayer(true);
    setLoadingEdit(true);
    const input = { id: user.uid };
    const userResponse = await userMutation({
      variables: { input },
    });
    if (userResponse) {
      if (
        userResponse.data.user.agent &&
        userResponse.data.user.agent.agentPlayers
      ) {
        await userResponse.data.user.agent.agentPlayers.map((player) => {
          if (player.uid === uid) {
            setPlayer(player);
            setLoadingEdit(false);
          }
        });
      }
    }
    userAuth(userResponse.data.user);
  };

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        open={openModalEditAgentPlayer}
        onClose={handleCloseEditPlayer}
        aria-labelledby="form-dialog-title"
      >
        {!loading && (
          <CloseIcon
            className={classes.close}
            fontSize="large"
            onClick={handleCloseEditPlayer}
          />
        )}
        <DialogTitle className={classes.title}>
          {t("txt.editPlayers").toUpperCase()}
        </DialogTitle>

        <div>
          <TableContainer className={classes.tableHistory}>
            <Table
              aria-label="playersRepresentedToEdit"
              className={classes.marginBottomTable}
            >
              <TableHead style={{ backgroundColor: "cadetblue" }}>
                <TableRow>
                  <TableCell className={classes.tableFontSizeBold}>
                    {t("txt.name")}
                  </TableCell>
                  <TableCell className={classes.tableFontSizeBold}>
                    {t("txt.position")}
                  </TableCell>

                  <TableCell className={classes.tableFontSizeBold}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user &&
                  user.agent &&
                  user.agent.agentPlayers &&
                  user.agent.agentPlayers.map((row) => (
                    <TableRow key={row.uid}>
                      <TableCell
                        className={classes.tableFontSize}
                        component="th"
                        scope="row"
                      >
                        {row.nombre + " " + row.apellido}
                      </TableCell>
                      <TableCell className={classes.tableFontSize}>
                        {row.puesto}
                      </TableCell>

                      <TableCell className={classes.tableButtons}>
                        <div className={classes.inlineButtons}>
                          <LaunchIcon
                            className={classes.colorGrenn}
                            fontSize="small"
                            onClick={() =>
                              navigate(`/playerSheet/${row.uid}/${user.uid}`)
                            }
                          />
                          <EditIcon
                            className={classes.colorYellow}
                            fontSize="small"
                            onClick={() => handleOpenEditAgentPlayer(row.uid)}
                          />
                          <DeleteForeverIcon
                            className={classes.colorRed}
                            fontSize="small"
                            onClick={() => handleDeleteAgentPlayer(row.uid)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>

      <EditDataModalAP
        openEditAgentPlayer={openEditAgentPlayer}
        setOpenEditAgentPlayer={setOpenEditAgentPlayer}
        player={player ? player : ""}
        loading={loadingEdit}
      />

      <ConfirmDialog
        title={t("txt.delete").toUpperCase()}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={confirmDelete}
        state={"delete"}
        loading={loadingDelete}
      >
        {t("txt.confirmaDelete").toLowerCase()}
      </ConfirmDialog>
    </>
  );
};
