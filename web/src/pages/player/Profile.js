import React, { useState, useContext, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/Layout";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../Context";
import { PlayerProfile } from "../../components/Player/profile";
import { GET_PLAYER } from "../../mutations/PlayerMutation";
import { useMutation } from "@apollo/react-hooks";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
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
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#2c3235",
    flexGrow: 1,
    paddingBottom: "200px",
    borderRadius: 0,
  },

  bottom: {
    paddingBottom: "20px",
  },
  colorSkeleton: {
    backgroundColor: "#65656575 !important",
    height: 50,
  },

  listItemAvatar: {
    marginTop: 100,
  },
  center: {
    textAlign: "center",
    paddingTop: 60,
    color: "#c3c8ca",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: 2,
  },
  centrar: {
    paddingLeft: 30,
    justifyContent: "start",
    paddingTop: 20,
    width: "100%",
    textAlign: "center",
    display: "flex",
  },
}));

export const Profile = ({ id }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState();
  const [playerMutation] = useMutation(GET_PLAYER);

  useEffect(() => {
    console.log("id user : " + user.uid + " id param: " + id);
    async function fetchData() {
      if (id != user.uid) {
        console.log("voy a buscar  ");
        setLoading(true);
        const input = { id };
        const response = await playerMutation({
          variables: { input },
        });
        if (response.data.player) {
          setPlayer(response.data.player);
          setLoading(false);
        }
      } else {
        console.log("voy a contrext  ");
        setPlayer(user.player);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Layout id={id} title={t("txt.profile")}>
        {loading ? (
          <>
            <Card className={classes.root}>
              <CardActionArea className={classes.bottom}>
                <CardContent>
                  <Typography component="h2" className={classes.center}>
                    <Fragment>
                      <Skeleton width="100%" height="80px"></Skeleton>
                    </Fragment>
                  </Typography>

                  <div className={classes.centrar}>
                    <Skeleton variant="circle" height="200px" width="200px">
                      <Avatar />
                    </Skeleton>
                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      <Fragment>
                        <Skeleton
                          width="70%"
                          height="40px"
                          style={{ marginLeft: 20 }}
                        ></Skeleton>
                        <Skeleton
                          width="70%"
                          height="40px"
                          style={{ marginLeft: 20 }}
                        ></Skeleton>
                        <Skeleton
                          width="70%"
                          height="40px"
                          style={{ marginLeft: 20 }}
                        ></Skeleton>
                        <Skeleton
                          width="70%"
                          height="40px"
                          style={{ marginLeft: 20 }}
                        ></Skeleton>
                        <Skeleton
                          width="70%"
                          height="40px"
                          style={{ marginLeft: 20 }}
                        ></Skeleton>
                      </Fragment>
                    </div>
                  </div>
                  <div>
                    <Fragment>
                      <Skeleton width="100%" height="300px"></Skeleton>
                    </Fragment>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ) : (
          <div className={classes.body}>
            <PlayerProfile player={player} />
          </div>
        )}
      </Layout>
    </>
  );
};
