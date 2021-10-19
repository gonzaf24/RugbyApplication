import React, { Fragment, useState, useContext, useRef } from "react";
import { Layout } from "../components/Layout";
import { Context } from "../Context";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { BOOKED } from "../mutations/BookMutation";
import { useMutation } from "@apollo/react-hooks";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { PlayerSearchCard } from "../components/Cards/PlayerSearchCard";
import { ClubSearchCard } from "../components/Cards/ClubSearchCard";
import GridList from "@material-ui/core/GridList";
import { PullToRefresh } from "react-js-pull-to-refresh";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PullDownContent, ReleaseContent } from "react-js-pull-to-refresh";
import { BOOK } from "../mutations/BookMutation";

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
  },
  fullWidth: {
    width: "100%",
    overflow: "scroll",
  },
}));

export const Booked = ({ id }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { bookedList, setBookedList } = useContext(Context);
  const messagesEndRef = useRef(null);
  const [expandedClub, setExpandedClub] = useState(false);
  const [expandedPlayer, setExpandedPlayer] = useState(false);
  const [bookedMutation] = useMutation(BOOKED);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [openInfoClubModal, setOpenInfoClubModal] = useState(false);
  const [clubInfo, setClubInfo] = useState();
  const [openInfoPlayerModal, setOpenInfoPlayerModal] = useState(false);
  const [playerInfo, setPlayerInfo] = useState();
  const [tipo, setTipo] = useState();
  const [expanded, setExpanded] = useState(false);
  const [book] = useMutation(BOOK);

  const deleteBookmark = async (tipo, id, email) => {
    let input = {
      tipo,
      idBook: id,
      userBook: email,
    };
    try {
      await book({
        variables: { input },
      });
      const bookedListAux = bookedList.filter((el) =>
        el.tipo === tipo && el.idBook === id ? false : true
      );
      setBookedList(bookedListAux);
      if (tipo == "CLUB") {
        const clubsAux = clubs.filter((item) => item.uid !== id);
        setClubs(clubsAux);
      }
      if (tipo == "PLAYER") {
        const playersAux = players.filter((item) => item.uid !== id);
        setPlayers(playersAux);
      }
    } catch (error) {
      console.log("hay error vuelta book  ! " + JSON.stringify(error.message));
    }
  };

  const handleChange = (panel) => async (event, isExpanded) => {
    setLoading(true);
    setExpanded(isExpanded ? panel : false);
    if (panel === "panel1") {
      await buscoBooksClubs();
      setLoading(false);
    } else if (panel == "panel2") {
      await buscoBooksPlayers();
      setLoading(false);
    }
  };

  const buscoBooksClubs = async () => {
    try {
      const input = { tipo: "CLUB" };
      const chatsResponse = await bookedMutation({
        variables: { input },
      });
      if (chatsResponse && chatsResponse.data) {
        setClubs(chatsResponse.data.obtenerBooked.clubs);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error : " + JSON.stringify(error));
    }
  };

  const buscoBooksPlayers = async () => {
    try {
      const input = { tipo: "PLAYER" };
      const chatsResponse = await bookedMutation({
        variables: { input },
      });
      if (chatsResponse && chatsResponse.data) {
        setPlayers(chatsResponse.data.obtenerBooked.players);
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
      if (tipo == "CLUB") {
        await buscoBooksClubs();
      }
      if (tipo == "PLAYER") {
        await buscoBooksPlayers();
      }
      resolve();
    });
  };

  return (
    <>
      <Layout id={id} title={t("txt.booked")}>
        <>
          <div ref={scrollRef} />

          <div className={classes.marginList}>
            <Accordion
              style={{ backgroundColor: "#2c3235" }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                onClick={() => {
                  setTipo("clubs");
                }}
                style={{ backgroundColor: "#1d2529" }}
              >
                <Typography
                  className={
                    expanded && tipo === "clubs"
                      ? classes.filterOpen
                      : classes.filterWA
                  }
                >
                  <BookmarkIcon
                    className={
                      expanded && tipo === "clubs"
                        ? classes.filterOpen
                        : classes.filter
                    }
                    style={{
                      fontSize: "0.9rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  {t("txt.clubs").toUpperCase()}{" "}
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
                    onRefresh={() => onRefresh("CLUB")}
                    triggerHeight={60}
                    backgroundColor="#2c3235"
                    startInvisible={true}
                  >
                    <div style={{ textAlign: "center", width: "100%" }}>
                      {clubs && (
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
                          ) : clubs.length === 0 ? (
                            <h4
                              style={{
                                textAlign: "center",
                                color: "#717d85",
                              }}
                            >
                              {t("txt.bookmark.empty.clubs")}
                            </h4>
                          ) : (
                            clubs.map((item) => {
                              return (
                                <div
                                  style={{
                                    height: "min-content",
                                    backgroundColor: "#2c3235",
                                  }}
                                  key={item.uid}
                                >
                                  <ClubSearchCard
                                    club={item}
                                    setClubInfo={setClubInfo}
                                    setOpenInfoClubModal={setOpenInfoClubModal}
                                    disabledBookmarks={true}
                                    deleteBookmark={deleteBookmark}
                                  />
                                </div>
                              );
                            })
                          )}
                        </GridList>
                      )}
                    </div>
                  </PullToRefresh>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{ backgroundColor: "#2c3235" }}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                onClick={() => {
                  setTipo("players");
                }}
                style={{ backgroundColor: "#1d2529" }}
              >
                <Typography
                  className={
                    expanded && tipo === "players"
                      ? classes.filterOpen
                      : classes.filterWA
                  }
                >
                  <BookmarkIcon
                    className={
                      expanded && tipo === "players"
                        ? classes.filterOpen
                        : classes.filter
                    }
                    style={{
                      fontSize: "0.9rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  {t("txt.players").toUpperCase()}{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  width: "100%",
                  padding: 0,
                  height: "50vh",
                  backgroundColor: "#1e2529",
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
                    onRefresh={() => onRefresh("PLAYER")}
                    triggerHeight={60}
                    backgroundColor="#2c3235"
                    startInvisible={true}
                  >
                    <div style={{ textAlign: "center" }}>
                      <>
                        {players && (
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
                              ) : players.length === 0 ? (
                                <h4
                                  style={{
                                    textAlign: "center",
                                    color: "#717d85",
                                  }}
                                >
                                  {t("txt.bookmark.empty.players")}
                                </h4>
                              ) : (
                                players.map((item) => {
                                  return (
                                    <div
                                      style={{
                                        height: "min-content",
                                        backgroundColor: "#2c3235",
                                      }}
                                      key={item.uid}
                                    >
                                      <PlayerSearchCard
                                        key={item.uid}
                                        player={item}
                                        setPlayerInfo={setPlayerInfo}
                                        setOpenInfoPlayerModal={
                                          setOpenInfoPlayerModal
                                        }
                                        disabledBookmarks={true}
                                        deleteBookmark={deleteBookmark}
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
            <Accordion
              style={{ backgroundColor: "#2c3235" }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel3a-header"
                onClick={() => {
                  setTipo("offers");
                }}
                style={{ backgroundColor: "#1d2529" }}
              >
                <Typography
                  className={
                    expanded && tipo === "offers"
                      ? classes.filterOpen
                      : classes.filterWA
                  }
                >
                  <BookmarkIcon
                    className={
                      expanded && tipo === "offers"
                        ? classes.filterOpen
                        : classes.filter
                    }
                    style={{
                      fontSize: "0.9rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  />{" "}
                  {t("txt.offers").toUpperCase()}{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ width: "100%", padding: 0, height: "50vh" }}
              >
                <>
                  <Fragment>
                    <GridList className={classes.card} cols={1}>
                      <h4 style={{ textAlign: "center", color: "#717d85" }}>
                        En construcción ...
                      </h4>
                    </GridList>
                  </Fragment>
                </>
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      </Layout>
    </>
  );
};
