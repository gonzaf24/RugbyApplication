import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/Layout";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../Context";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    height: "150px",
    paddingTop: "100px",
    paddingBottom: "20px",
    letterSpacing: "3px",
  },
  spinner: {
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "300px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#2c3235",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
}));

export const Message = ({ id }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user } = useContext(Context);

  // const [wallMutation, {}] = useMutation(WALL);
  const [loading, setLoading] = useState(true);
  const [wall, setWall] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(false);
      /* const result = await wallMutation({
        variables: { userId: id },
      });
      if (result) {
        const { wall } = result.data;
        setWall(wall);
        setLoading(false);
      } */
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Layout id={id} title={t("txt.messages")}>
        {loading ? (
          <div className={classes.spinner}>
            <CircularProgress size={150} />
          </div>
        ) : (
          <div className={classes.body}>
            <h2 className={classes.wellcomeText}>MESSAGE PLAYER</h2>
          </div>
        )}
      </Layout>
    </>
  );
};
