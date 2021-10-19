import React, { useState, useContext, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/Layout";
import { GET_AGENT } from "../../mutations/AgentMutation";
import { useMutation } from "@apollo/react-hooks";
import { AgentSheet as Sheet } from "../../components/Agent/sheet";

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    height: "150px",
    paddingTop: "100px",
    paddingBottom: "20px",
    letterSpacing: "3px",
  },
  spinner: {
    margin: 50,
    textAlign: "center",
    paddingTop: "100px",
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

export const AgentSheet = ({ id }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [agentMutation] = useMutation(GET_AGENT);

  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const input = { id };
      const response = await agentMutation({
        variables: { input },
      });
      if (response.data.agent) {
        //console.log(JSON.stringify(response.data.agent));
        setAgent(response.data.agent);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Layout id={id} title={t("txt.profile")}>
        {loading ? (
          <div className={classes.spinner}>
            {t("txt.loading").toLowerCase()}
            <LinearProgress />
          </div>
        ) : (
          <div className={classes.body}>
            <Sheet agent={agent} />
          </div>
        )}
      </Layout>
    </>
  );
};
