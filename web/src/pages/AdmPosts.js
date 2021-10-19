import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Layout } from "../components/Layout";
import { Context } from "../Context";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GET_POSTS_ADM } from "../mutations/PostsMutation";
import { GET_MATCHS_RESULTS_ADM } from "../mutations/ResultsMatchsMutation";
import { useMutation } from "@apollo/react-hooks";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { PostAdmCard } from "../components/Cards/PostAdmCard";
import { MatchResultAdmCard } from "../components/Cards/MatchResultAdmCard";
import GridList from "@material-ui/core/GridList";
import { PullToRefresh } from "react-js-pull-to-refresh";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  PullDownContent,
  ReleaseContent,
  RefreshContent,
} from "react-js-pull-to-refresh";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
let uniqid = require("uniqid");

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  marginList: {
    width: "100%",
    paddingTop: 60,
    backgroundColor: "#2c3235",
    "& .MuiAccordionSummary-expandIcon": {
      color: "#28a499",
      animation: `$myEffectClose 1.5s infinite `,
    },
    "& .MuiAccordion-rounded": {
      marginBottom: 10,
    },
  },
  filter: {
    color: "#28a499",
    animation: `$myEffectClose 1.5s infinite `,
  },
  filterWA: {
    color: "#28a499",
  },
  filterOpen: {
    paddingBottom: 0,
    color: "#fdfcfa",
  },

  "@keyframes myEffectClose": {
    "0%": {
      opacity: 1.5,
    },
    "100%": {
      opacity: 0.5,
    },
  },

  "@keyframes myEffectOpen": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 0.5,
      transform: "translateY(-30%)",
    },
  },
  card: {
    width: "100%",
    backgroundColor: "#2c323",
    flexGrow: 1,
    borderRadius: 0,
  },
  linear: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: "0.5rem",
    width: "100vw",
    color: "#009688",
    height: 30,
  },
  fullWidth: {
    width: "100%",
    backgroundColor: "#2c3235",
  },
}));

export const AdmPosts = ({ id }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { user, postedEffect } = useContext(Context);
  const messagesEndRef = useRef(null);
  const [postsMutation] = useMutation(GET_POSTS_ADM);
  const [resultMatchMutation] = useMutation(GET_MATCHS_RESULTS_ADM);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [matchsResultsList, setMatchsResults] = useState([]);
  const [tipo, setTipo] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => async (event, isExpanded) => {
    setLoading(true);
    setExpanded(isExpanded ? panel : false);
    if (panel === "posts") {
      await buscoPosts();
      setLoading(false);
    } else if (panel == "matchsResults") {
      await buscoResultsMatchs();
      setLoading(false);
    }
  };

  const buscoPosts = async () => {
    try {
      const input = { id: "" };
      const response = await postsMutation({
        variables: { input },
      });
      if (response && response.data) {
        setPosts(response.data.obtenerAdmPosts.posts);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error : " + JSON.stringify(error));
    }
  };

  const buscoResultsMatchs = async () => {
    try {
      const input = { id: "" };
      const response = await resultMatchMutation({
        variables: { input },
      });
      if (response && response.data) {
        setMatchsResults(response.data.obtenerAdmMatchsResults.matchsResults);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error : " + JSON.stringify(error));
    }
  };

  const onRefresh = (tipo) => {
    return new Promise(async (resolve) => {
      if (tipo == "POSTS") {
        await buscoPosts();
      }
      if (tipo == "MATCH_RESULT") {
        await buscoResultsMatchs();
      }
      resolve();
    });
  };

  return (
    <>
      <Layout id={id} title={t("txt.admin")}>
        <>
          <div ref={scrollRef} />

          <div className={classes.marginList}>
            <Accordion
              style={{ backgroundColor: "#2c3235" }}
              expanded={expanded === "posts"}
              onChange={handleChange("posts")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="posts-content"
                id="posts-header"
                onClick={() => {
                  setTipo("posts");
                }}
                style={{ backgroundColor: "#1d2529" }}
              >
                <Typography
                  className={
                    expanded && tipo === "posts"
                      ? classes.filterOpen
                      : classes.filterWA
                  }
                >
                  <LibraryBooksIcon
                    className={
                      expanded && tipo === "posts"
                        ? classes.filterOpen
                        : classes.filter
                    }
                    style={{
                      fontSize: "0.9rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  {t("txt.posts").toUpperCase()}{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  padding: 0,
                  height: "50vh",
                  backgroundColor: "#1e2529",
                  width: "100%",
                }}
              >
                <div className={classes.fullWidth}>
                  <PullToRefresh
                    pullDownContent={<PullDownContent />}
                    releaseContent={
                      <ReleaseContent
                        label={t("txt.releaseToRefresh")}
                        height="100px"
                      />
                    }
                    refreshContent={
                      <div
                        style={{
                          paddingTop: 5,
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <div className={classes.linear}>
                          {t("txt.refreshing").toLowerCase()}
                          <LinearProgress />
                        </div>
                      </div>
                    }
                    pullDownThreshold={30}
                    onRefresh={() => onRefresh("POSTS")}
                    triggerHeight={60}
                    backgroundColor="#2c3235"
                    startInvisible={true}
                  >
                    <div style={{ textAlign: "center", width: "100%" }}>
                      {posts && (
                        <Fragment>
                          <GridList className={classes.card} cols={1}>
                            {loading ? (
                              <div
                                style={{
                                  paddingTop: 5,
                                  justifyContent: "center",
                                  display: "flex",
                                }}
                              >
                                <div className={classes.linear}>
                                  {t("txt.refreshing").toLowerCase()}
                                  <LinearProgress />
                                </div>
                              </div>
                            ) : posts.length === 0 ? (
                              <h4
                                style={{
                                  textAlign: "center",
                                  color: "#717d85",
                                }}
                              >
                                {t("txt.post.empty")}
                              </h4>
                            ) : (
                              posts.map((item) => {
                                return (
                                  <div
                                    style={{
                                      height: "min-content",
                                      backgroundColor: "#2c3235",
                                    }}
                                    key={item.uid}
                                  >
                                    <PostAdmCard
                                      post={item}
                                      postsList={posts}
                                      setPostsList={setPosts}
                                    />
                                  </div>
                                );
                              })
                            )}
                          </GridList>
                        </Fragment>
                      )}
                    </div>
                  </PullToRefresh>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion
              style={{ backgroundColor: "#2c3235" }}
              expanded={expanded === "matchsResults"}
              onChange={handleChange("matchsResults")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="posts-content"
                id="posts-header"
                onClick={() => {
                  setTipo("matchsResults");
                }}
                style={{ backgroundColor: "#1d2529" }}
              >
                <Typography
                  className={
                    expanded && tipo === "matchsResults"
                      ? classes.filterOpen
                      : classes.filterWA
                  }
                >
                  <LibraryBooksIcon
                    className={
                      expanded && tipo === "matchsResults"
                        ? classes.filterOpen
                        : classes.filter
                    }
                    style={{
                      fontSize: "0.9rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  {t("txt.matchsResults").toUpperCase()}{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  padding: 0,
                  height: "50vh",
                  backgroundColor: "#1e2529",
                  width: "100%",
                }}
              >
                <div className={classes.fullWidth}>
                  <PullToRefresh
                    pullDownContent={<PullDownContent />}
                    releaseContent={
                      <ReleaseContent
                        label={t("txt.releaseToRefresh")}
                        height="100px"
                      />
                    }
                    refreshContent={
                      <div
                        style={{
                          paddingTop: 5,
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <div className={classes.linear}>
                          {t("txt.refreshing").toLowerCase()}
                          <LinearProgress />
                        </div>
                      </div>
                    }
                    pullDownThreshold={30}
                    onRefresh={() => onRefresh("MATCH_RESULT")}
                    triggerHeight={60}
                    backgroundColor="#2c3235"
                    startInvisible={false}
                  >
                    <div style={{ textAlign: "center" }}>
                      <>
                        {matchsResultsList && (
                          <Fragment>
                            <GridList className={classes.card} cols={1}>
                              {loading ? (
                                <div
                                  style={{
                                    paddingTop: 5,
                                    justifyContent: "center",
                                    display: "flex",
                                  }}
                                >
                                  <div className={classes.linear}>
                                    {t("txt.refreshing").toLowerCase()}
                                    <LinearProgress />
                                  </div>
                                </div>
                              ) : matchsResultsList.length === 0 ? (
                                <h4
                                  style={{
                                    textAlign: "center",
                                    color: "#717d85",
                                  }}
                                >
                                  {t("txt.post.empty")}
                                </h4>
                              ) : (
                                matchsResultsList.map((item) => {
                                  return (
                                    <div
                                      style={{
                                        height: "min-content",
                                        backgroundColor: "#2c3235",
                                      }}
                                      key={uniqid()}
                                    >
                                      <MatchResultAdmCard
                                        matchResult={item}
                                        matchsResultsList={matchsResultsList}
                                        setMatchResultList={setMatchsResults}
                                      />
                                    </div>
                                  );
                                })
                              )}
                            </GridList>
                          </Fragment>
                        )}
                      </>
                    </div>
                  </PullToRefresh>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      </Layout>
    </>
  );
};
