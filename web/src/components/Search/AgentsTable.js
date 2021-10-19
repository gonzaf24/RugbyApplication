import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { navigate } from "@reach/router";

import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "50vh",
    borderTop: "1px solid white",
  },
  prueba: {
    width: 50,
    fontSize: "0.70rem !important",
    padding: 0,
    paddingLeft: 10,
    textAlign: "left",
  },
  tableFontSize: {
    fontSize: "0.55rem",
    padding: 3,
  },
  tableFontSizePadding: {
    fontSize: "0.55rem",
    padding: 3,
    paddingLeft: 10,
  },
  tableFontSizeBold: {
    fontSize: "0.70rem",
    padding: 3,
    fontWeight: "bold",
    backgroundColor: "secondary",
    color: "white",
  },
  tableFontSizeBoldPadding: {
    fontSize: "0.70rem",
    padding: 3,
    fontWeight: "bold",
    paddingLeft: 10,
    backgroundColor: "secondary",
    color: "white",
  },
  colorGrenn: {
    color: "#28a499",
  },
}));

export const AgentsTable = ({ listAgents }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="Clubs">
            <TableHead stickyHeader style={{ backgroundColor: "cadetblue" }}>
              <TableRow>
                <TableCell className={classes.tableFontSizeBoldPadding}>
                  {t("txt.name")}
                </TableCell>
                <TableCell className={classes.tableFontSizeBold}>
                  {t("txt.agencyName")}
                </TableCell>
                <TableCell className={classes.tableFontSizeBold}>
                  {t("txt.languages")}
                </TableCell>
                <TableCell className={classes.tableFontSizeBold}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listAgents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.uid}>
                      <TableCell className={classes.tableFontSizePadding}>
                        {row.nombre}
                      </TableCell>
                      <TableCell className={classes.tableFontSize}>
                        {row.agencia}
                      </TableCell>
                      <TableCell className={classes.tableFontSize}>
                        {row.idiomas &&
                          row.idiomas
                            .toString()
                            .split(",")
                            .join("\n" + "-" + "\n")}
                      </TableCell>

                      <TableCell className={classes.tableFontSize}>
                        <LaunchIcon
                          className={classes.colorGrenn}
                          fontSize="small"
                          onClick={() => navigate(`/agentSheet/${row.uid}`)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={listAgents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={""}
        />
      </Paper>
    </>
  );
};
