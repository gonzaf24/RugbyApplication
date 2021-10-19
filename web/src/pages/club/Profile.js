import React, { useState, useContext, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/Layout";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Context } from "../../Context";
import { ClubProfile } from "../../components/Club/profile";
import { GET_CLUB } from "../../mutations/ClubMutation";
import { useMutation } from "@apollo/react-hooks";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
let uniqid = require("uniqid");

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
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#2c3235",
    flexGrow: 1,
    paddingBottom: "200px",
    borderRadius: 0,
  },

  bottom: {
    paddingTop: "80px",
  },
}));

export const Profile = ({ id }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { user } = useContext(Context);

  // const [wallMutation, {}] = useMutation(WALL);
  const [loading, setLoading] = useState(false);
  const [wall, setWall] = useState();

  const [club, setClub] = useState();
  const [clubMutation] = useMutation(GET_CLUB);

  useEffect(() => {
    async function fetchData() {
      if (id != user.uid) {
        setLoading(true);
        const input = { id };
        console.log("useEffect Profile  ");
        const response = await clubMutation({
          variables: { input },
        });
        if (response.data.club) {
          console.log(
            "response.data.club " + JSON.stringify(response.data.club)
          );
          setClub(response.data.club);
          setLoading(false);
        }
      } else {
        setClub(user.club);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Layout id={uniqid()} title={t("txt.profile")}>
        {loading ? (
          <>
            <Card className={classes.root}>
              <CardActionArea className={classes.bottom}>
                <CardContent>
                  <div style={{ paddingLeft: "25%" }}>
                    <Skeleton variant="circle" height="200px" width="200px">
                      <Avatar />
                    </Skeleton>
                  </div>

                  <Fragment>
                    <Skeleton width="100%" height="80px"></Skeleton>
                    <Skeleton width="100%" height="50px"></Skeleton>
                    <Skeleton width="100%" height="40px"></Skeleton>
                    <Skeleton width="100%" height="40px"></Skeleton>
                    <Skeleton width="100%" height="40px"></Skeleton>
                  </Fragment>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ) : (
          <div className={classes.body}>
            <ClubProfile club={club} key={uniqid()} />
          </div>
        )}
      </Layout>
    </>
  );
};
