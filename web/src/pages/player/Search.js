import React, { useState, useContext, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/Layout";
import { Context } from "../../Context";
import {
  SEARCH_CLUBS,
  SEARCH_AGENTS,
  SEARCH_PLAYERS_AGENTS,
  SEARCH_PLAYERS,
} from "../../mutations/SearchMutation";
import { useMutation } from "@apollo/react-hooks";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GroupIcon from "@material-ui/icons/Group";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SportsRugbyIcon from "@material-ui/icons/SportsRugby";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useInputValue } from "../../hooks/useInputValue";
import { ClubFilter } from "../../components/Search/ClubFilter";
import { AgentFilter } from "../../components/Search/AgentFilter";
import { PlayersAgentsFilter } from "../../components/Search/PlayersAgentsFilter";
import { PlayersFreeFilter } from "../../components/Search/PlayersFreeFilter";
import { ClubsTable } from "../../components/Search/ClubsTable";
import { AgentsTable } from "../../components/Search/AgentsTable";
import { PlayersAgentsTable } from "../../components/Search/PlayersAgentsTable";
import { PlayersTable } from "../../components/Search/PlayersTable";
import { PlayerSearchCard } from "../../components/Cards/PlayerSearchCard";
import { PreviewInfoPlayer } from "../../components/Preview/previewInfoPlayer";
import { ClubSearchCard } from "../../components/Cards/ClubSearchCard";
import { PreviewInfoClub } from "../../components/Preview/previewInfoClub";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
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
    paddingBottom: 50,
  },
  linear: {
    paddingTop: 30,
    width: "50%",
    marginBottom: 50,
  },
  collapser: {
    height: 40,
    width: "100%",
    backgroundColor: "secondary",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  collapserExp: {
    height: 40,
    width: "100%",
    textAlign: "center",
    backgroundColor: "secondary",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnSearch: {
    float: "right",
    marginRight: 10,
    backgroundColor: "white",
    "&:hover": {
      color: "white",
      borderColor: "white",
    },
  },
  fontSize: {
    fontSize: "5px",
    marginLeft: 0,
  },
  filter: {
    color: "#28a499",
    animation: `$myEffectClose 1.5s infinite `,
  },
  filterOpen: {
    paddingBottom: 0,
  },
  expand: {
    color: "#28a499",
    animation: `$myEffectClose 1.5s infinite `,
    transform: "rotate(180deg)",
  },
  expandOpen: {
    paddingBottom: 0,
    color: "white",
    animation: `$myEffectOpen 1.5s infinite`,
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

  fullWidth: {
    width: "100%",
    backgroundColor: "white",
  },
  tab: {
    fontSize: "0.7rem",
    minWidth: "100px !important",
  },
  icon: {
    fontSize: "2rem",
  },
  colorGreen: {
    zIndex: 1,
    paddingTop: 50,
  },
  puesto: {
    marginRight: "5px !important",
    width: "100%",
  },
  puestoAlt: {
    marginLeft: 5,
    width: "100%",
  },
  playerSearch: {
    width: "100%",
    minHeight: "80vh",
    backgroundColor: "#2c323",
    flexGrow: 1,
    paddingBottom: "250px",
    borderRadius: 0,
  },
}));

export const Search = ({ id }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const {
    listPlayersSearch,
    setListPlayersSearch,
    listClubsSearch,
    setListClubsSearch,
  } = useContext(Context);
  const [pais, setPais] = useState("");
  const [estadoCiudad, setEstadoCiudad] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [paisAgencia, setPaisAgencia] = useState();
  const [indexMenuSelected, setIndexMenuSelected] = useState(1);
  const [inputValuePaisOpera, setInputValuePaisOpera] = useState("");
  const [value, setValue] = useState(0);
  const [paisOpera, setPaisOpera] = useState("");
  const [puesto, setPuesto] = useState("");
  const [puestoAlt, setPuestoAlt] = useState("");
  const [nivel, setNivel] = useState("");
  const [otroPais, setOtroPais] = useState("");
  const [categoriaClub, setCategoriaClub] = useState("");
  const [inputValueOtroPais, setInputValueOtroPais] = useState("");
  const [pateador, setPateador] = useState("");
  const [altura, setAltura] = useState([0, 0]);
  const [peso, setPeso] = useState([0, 0]);
  const [edad, setEdad] = useState([0, 0]);
  let nombreClub = useInputValue("");
  const [inputValuePais, setInputValuePais] = useState("");

  const [searchClubs] = useMutation(SEARCH_CLUBS);
  const [searchAgents] = useMutation(SEARCH_AGENTS);
  const [searchPlayersAgents] = useMutation(SEARCH_PLAYERS_AGENTS);
  const [searchPlayers] = useMutation(SEARCH_PLAYERS);

  const [listClubs, setListClubs] = useState(
    listClubsSearch ? listClubsSearch : []
  );
  const [listPlayers, setListPlayers] = useState(
    listPlayersSearch ? listPlayersSearch : []
  );
  const [listAgents, setListAgents] = useState([]);
  const [listPlayersAgents, setListPlayersAgents] = useState([]);

  const [openInfoClubModal, setOpenInfoClubModal] = useState(false);

  const [clubInfo, setClubInfo] = useState();

  const [openInfoPlayerModal, setOpenInfoPlayerModal] = useState(false);

  const [playerInfo, setPlayerInfo] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleCloseInfoPlayerModal = () => {
    setOpenInfoPlayerModal(false);
  };

  const handleCloseInfoClubModal = () => {
    setOpenInfoClubModal(false);
  };
  const onClickSearch = async (index) => {
    setLoading(true);
    let input = {};
    let result;
    switch (index) {
      case 1:
        input = {
          pais,
          estadoCiudad,
          nombre: nombreClub.value,
          categoria: categoriaClub,
          clubType: "REGULAR",
        };
        result = await searchClubs({
          variables: { input },
        });
        if (result) {
          setListClubs(result.data.searchClubs);
          setListClubsSearch(result.data.searchClubs);
        }
        setLoading(false);
        setExpanded(false);
        break;
      case 2:
        input = {
          nivel,
          nacionalidad: otroPais,
          puesto,
          puestoAlt,
          pateador,
          altura,
          peso,
          edad,
        };
        result = await searchPlayers({
          variables: { input },
        });
        if (result) {
          setListPlayers(result.data.searchPlayers);
          setListPlayersSearch(result.data.searchPlayers);
        }
        setLoading(false);
        setExpanded(false);

      case 3:
        input = { pais: paisOpera };
        result = await searchAgents({
          variables: { input },
        });
        if (result) {
          setListAgents(result.data.searchAgents);
        }
        setLoading(false);
        setExpanded(false);
        break;
      case 4:
        input = {
          nivel,
          nacionalidad: otroPais,
          puesto,
          puestoAlt,
          pateador,
          altura,
          peso,
          edad,
        };
        result = await searchPlayersAgents({
          variables: { input },
        });
        if (result) {
          setListPlayersAgents(result.data.searchPlayersAgents);
        }
        setLoading(false);
        setExpanded(false);
        break;
      default:
        setLoading(false);
        setExpanded(false);
    }
  };

  return (
    <>
      <Layout id={id} title={t("txt.search")}>
        <div className={classes.body}>
          <>
            <AppBar
              className={classes.colorGreen}
              position="static"
              color="default"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                aria-label="scrollable force tabs example"
              >
                <Tab
                  className={classes.tab}
                  label="CLUBS"
                  icon={<SportsRugbyIcon className={classes.icon} />}
                  {...a11yProps(0)}
                  onClick={() => setIndexMenuSelected(1)}
                />
                <Tab
                  className={classes.tab}
                  label="PLAYERS"
                  icon={<PeopleOutlineIcon className={classes.icon} />}
                  {...a11yProps(1)}
                  onClick={() => setIndexMenuSelected(2)}
                />
              </Tabs>
            </AppBar>
            <Collapse
              className={classes.fullWidth}
              in={expanded}
              timeout="auto"
              unmountOnExit
            >
              <div className={classes.root}>
                <TabPanel value={value} index={0}>
                  <ClubFilter
                    pais={pais}
                    setPais={setPais}
                    estadoCiudad={estadoCiudad}
                    inputValuePais={inputValuePais}
                    setInputValuePais={setInputValuePais}
                    setEstadoCiudad={setEstadoCiudad}
                    nombreClub={nombreClub}
                    categoriaClub={categoriaClub}
                    setCategoriaClub={setCategoriaClub}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PlayersFreeFilter
                    nivel={nivel}
                    setNivel={setNivel}
                    otroPais={otroPais}
                    setOtroPais={setOtroPais}
                    inputValueOtroPais={inputValueOtroPais}
                    setInputValueOtroPais={setInputValueOtroPais}
                    puesto={puesto}
                    setPuesto={setPuesto}
                    puestoAlt={puestoAlt}
                    setPuestoAlt={setPuestoAlt}
                    altura={altura}
                    setAltura={setAltura}
                    peso={peso}
                    setPeso={setPeso}
                    edad={edad}
                    setEdad={setEdad}
                    pateador={pateador}
                    setPateador={setPateador}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <AgentFilter
                    paisOpera={paisOpera}
                    setPaisOpera={setPaisOpera}
                    setInputValuePaisOpera={setInputValuePaisOpera}
                    inputValuePaisOpera={inputValuePaisOpera}
                  />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <PlayersAgentsFilter
                    nivel={nivel}
                    setNivel={setNivel}
                    otroPais={otroPais}
                    setOtroPais={setOtroPais}
                    inputValueOtroPais={inputValueOtroPais}
                    setInputValueOtroPais={setInputValueOtroPais}
                    puesto={puesto}
                    setPuesto={setPuesto}
                    puestoAlt={puestoAlt}
                    setPuestoAlt={setPuestoAlt}
                    altura={altura}
                    setAltura={setAltura}
                    peso={peso}
                    setPeso={setPeso}
                    edad={edad}
                    setEdad={setEdad}
                    pateador={pateador}
                    setPateador={setPateador}
                  />
                </TabPanel>
              </div>
            </Collapse>

            <div
              className={expanded ? classes.collapserExp : classes.collapser}
            >
              <div>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="filtros"
                >
                  <ExpandLessIcon />
                </IconButton>
                <Button
                  className={expanded ? classes.filterOpen : classes.filter}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="filtros"
                  color="primary"
                >
                  {t("txt.filters").toUpperCase()}
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.btnSearch}
                  onClick={() => onClickSearch(indexMenuSelected)}
                  disabled={loading}
                  size="small"
                >
                  {indexMenuSelected === 1 && t("button.search") + " CLUBS"}
                  {indexMenuSelected === 2 && t("button.search") + " PLAYERS"}
                  {indexMenuSelected === 3 && t("button.search") + " AGENT"}
                  {indexMenuSelected === 4 &&
                    t("button.search") + " PLAYERS AGENTS "}
                </Button>
              </div>
            </div>
          </>

          {loading ? (
            <div className={classes.linear}>
              <LinearProgress />
            </div>
          ) : (
            <>
              {indexMenuSelected === 1 && (
                <>
                  {listClubs && (
                    <Fragment>
                      <ul className={classes.playerSearch}>
                        {listClubs.map((item) => {
                          return (
                            <div key={item.uid}>
                              <ClubSearchCard
                                club={item}
                                setClubInfo={setClubInfo}
                                setOpenInfoClubModal={setOpenInfoClubModal}
                              />
                            </div>
                          );
                        })}
                      </ul>
                    </Fragment>
                  )}
                </>
              )}
              {indexMenuSelected === 2 && (
                <>
                  {listPlayers && (
                    <Fragment>
                      <ul className={classes.playerSearch}>
                        {listPlayers.map((item) => {
                          return (
                            <div key={item.uid}>
                              <PlayerSearchCard
                                key={item.uid}
                                player={item}
                                setPlayerInfo={setPlayerInfo}
                                setOpenInfoPlayerModal={setOpenInfoPlayerModal}
                              />
                            </div>
                          );
                        })}
                      </ul>
                    </Fragment>
                  )}
                </>
              )}
              {indexMenuSelected === 3 && (
                <AgentsTable listAgents={listAgents} />
              )}
              {indexMenuSelected === 4 && (
                <PlayersAgentsTable listPlayersAgents={listPlayersAgents} />
              )}
            </>
          )}
        </div>
        <PreviewInfoPlayer
          player={playerInfo}
          openInfoPlayerModal={openInfoPlayerModal}
          handleCloseInfoPlayerModal={handleCloseInfoPlayerModal}
        />
        <PreviewInfoClub
          club={clubInfo}
          openInfoClubModal={openInfoClubModal}
          handleCloseInfoClubModal={handleCloseInfoClubModal}
        />
      </Layout>
      ;
    </>
  );
};
