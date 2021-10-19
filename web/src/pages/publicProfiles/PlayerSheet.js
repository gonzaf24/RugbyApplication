import React, { useState, useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/Layout";
import { GET_AGENT_PLAYER } from "../../mutations/AgentPlayerMutation";
import { GET_PLAYER } from "../../mutations/PlayerMutation";
import { useMutation } from "@apollo/react-hooks";
import { PlayerSheet as Sheet } from "../../components/Player/sheet";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

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
  root: {
    width: "100%",
    minHeight: "100vh",
    flexGrow: 1,
    paddingBottom: "200px",
    borderRadius: 0,
  },
  centrar: {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    display: "grid",
    paddingTop: 60,
  },
  bottom: {
    paddingBottom: "20px",
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    boxShadow: "0px 0px 12px 4px rgba(255, 253, 255, 0.14)",
  },
  center: {
    textAlign: "center",
    paddingTop: 15,
    color: "#8cb1d6",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 2,
  },
  rootA: {
    marginTop: 0,
    flexWrap: "wrap",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 0,
  },
}));

export const PlayerSheet = ({ playerUID, agentUID }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [agentPlayerMutation] = useMutation(GET_AGENT_PLAYER);

  const [playerMutation] = useMutation(GET_PLAYER);

  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState();

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    async function fetchData() {
      scrollToTop();
      setLoading(true);
      let input = { playerUID, agentUID };
      //console.log(JSON.stringify(input));
      if (agentUID) {
        //console.log(" ENTRO EN AGENT PLAYERS");

        const response = await agentPlayerMutation({
          variables: { input },
        });
        if (response.data.agentPlayer) {
          // console.log(
          // " vuelta combianda " + JSON.stringify(response.data.agentPlayer)
          //);
          setPlayer(response.data.agentPlayer);
          setLoading(false);
        }
      } else {
        //console.log(" ENTRO EN PLAYERS");
        input = { id: playerUID };
        const response = await playerMutation({
          variables: { input },
        });
        if (response.data.player) {
          //console.log(" vuelta simple " + JSON.stringify(response.data.player));
          setPlayer(response.data.player);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [playerUID]);

  return (
    <>
      <Layout id={agentUID} title={t("txt.profile")}>
        {loading ? (
          <div className={classes.body}>
            <div ref={scrollRef} />
            <Card className={classes.root}>
              <CardActionArea className={classes.bottom}>
                <CardContent>
                  <div className={classes.centrar}>
                    <Skeleton variant="circle">
                      <Avatar className={classes.large} />
                    </Skeleton>
                  </div>

                  <div>
                    <Skeleton
                      width="100%"
                      style={{ marginTop: 10, height: 50 }}
                    >
                      <Typography
                        component="h2"
                        className={classes.center}
                      ></Typography>
                    </Skeleton>
                  </div>

                  <TableContainer>
                    <Table>
                      <TableRow>
                        <Skeleton width="100%" style={{ height: 25 }}>
                          <Typography
                            component="h2"
                            className={classes.center}
                          ></Typography>
                        </Skeleton>
                      </TableRow>

                      <TableRow>
                        <Skeleton width="100%" style={{ height: 25 }}>
                          <Typography
                            component="h2"
                            className={classes.center}
                          ></Typography>
                        </Skeleton>
                      </TableRow>
                    </Table>
                  </TableContainer>

                  <div className={classes.rootA}>
                    <Skeleton width="100%" style={{ height: 200 }}></Skeleton>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ) : (
          <div className={classes.body}>
            <Sheet player={player} />
          </div>
        )}
      </Layout>
    </>
  );
};
