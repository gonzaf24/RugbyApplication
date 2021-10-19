import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../Context";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import PublicIcon from "@material-ui/icons/Public";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import { uploadFile } from "react-s3";
import { MATCHS_RESULTS } from "../../config";
import { useMutation } from "@apollo/react-hooks";
import { NEW_MATCH_RESULT } from "../../mutations/ResultsMatchsMutation";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { es, enUS, fr, it } from "date-fns/locale";
import { Paises } from "../../assets/countries/paises";
import countriesList from "../../assets/countries/countries.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

let uniqid = require("uniqid");

const TransitionDown = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  color: {
    color: "#fafffc",
    marginRight: 10,
    zIndex: 200,
  },
  contenedorPrivadoPublico: {
    color: "#435b68",
    textAlign: "center",
    backgroundColor: "#dcdcdc26",
    paddingBottom: 20,
    paddingTop: 20,
  },
  backPrincipal: {
    "& .MuiDialog-paper": {
      backgroundColor: "#ffffff",
      borderRadius: 15,
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
      minHeight: 266,
    },
  },
  backPrivadoPublico: {
    "& .MuiDialog-paper": {
      backgroundColor: "white",
      borderRadius: 5,
    },
  },
  button: {
    color: "#ffffff",
    border: "1px solid #ffffff66",
    width: "100%",
    letterSpacing: 3,
  },
  buttonPublicPrivate: {
    color: "#435b68",
    border: "1px solid #435b68",
    borderRadius: 25,
    fontSize: "0.5rem",
    height: 22,
  },
  buttonPublish: {
    color: "#28a499",
    border: "1px solid #28a499",
    borderRadius: 25,
    fontSize: "0.6rem",
    height: 22,
    float: "right",
  },
  avatar: {
    backgroundColor: red[500],
  },
  imagen: {
    maxHeight: 250,
  },
  mainRoot: {
    minHeight: 266,
    width: "100%",
    overflow: "scroll",
  },
  stadium: {
    display: "flex",
    justifyContent: "space-between",
  },
  where: {
    display: "flex",
    justifyContent: "space-between",
  },
  team1: {
    display: "flex",
    justifyContent: "space-between",
  },
  team2: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
    width: "100%",
    position: "relative",
    minHeight: 400,
    "& .MuiTab-root ": {
      minWidth: 100,
      fontSize: "0.6rem",
      minHeight: 30,
    },
    "& .MuiTabs-root ": {
      minHeight: 30,
    },
    "& .MuiTab-root.Mui-selected": {
      backgroundColor: "#2aa49936",
    },
  },
  matchType: {
    width: "100%",
    textAlign: "center",
    fontSize: "0.8rem",
    letterSpacing: 3,
    paddingBottom: 10,
    paddingTop: 10,
    color: "#2aa499",
    backgroundColor: "#cae4e1",
  },
  fechaMatch: {
    width: "100%",
    "& .MuiFormLabel-root": {
      fontSize: "0.6rem",
      fontWeight: "bold",
    },
  },
  fromLabel: {
    "& .MuiFormLabel-root": {
      fontSize: "0.6rem",
      fontWeight: "bold",
    },
  },
  fromLabelSize: {
    margin: 0,
    width: "45%",
    "& .MuiFormLabel-root": {
      fontSize: "0.6rem",
      fontWeight: "bold",
    },
  },
}));

let ciudadesList = [];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const NewMatchResultModal = ({
  openNewMatchResult,
  setOpenNewMatchResult,
  fotoUser,
  nombreUser,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { lenguaje, changeLang, user, type, postedEffect, setPostedEffect } =
    useContext(Context);

  const [openPublicPrivate, setOpenPublicPrivate] = useState();
  const [visibilidad, setVisibilidad] = useState("PUBLIC");
  const [counter, setCounter] = useState(1000);
  const [contenidoPost, setContenidoPost] = useState("");
  const [urlFotoMatchResult, setUrlFotoMatchResult] = useState("");
  const [newMatchResult] = useMutation(NEW_MATCH_RESULT);
  const [upImg, setUpImg] = useState();
  const [fileNameUpload, setFileNameUpload] = useState();
  const [fileToUpload, setFileToUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [len, setLen] = useState(enUS);
  const handleClosePublicPrivate = () => {
    setOpenPublicPrivate(false);
  };
  const [fechaMatch, setFechaMatch] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [stadium, setStadium] = useState("");
  const [category, setCategory] = useState("");
  const [matchVideoLink, setMatchVideoLink] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  const [pais, setPais] = useState("");
  const [paisTeam1, setPaisTeam1] = useState("");
  const [paisTeam2, setPaisTeam2] = useState("");
  const [estadoCiudad, setEstadoCiudad] = useState("");
  const [matchType, setMatchType] = useState("NATIONAL");

  const onChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const onChangeStadium = (event) => {
    setStadium(event.target.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const onChangeMatchVideoLink = (event) => {
    setMatchVideoLink(event.target.value);
  };

  const onChangeTeam1 = (event) => {
    setTeam1(event.target.value);
  };

  const onChangeTeam2 = (event) => {
    setTeam2(event.target.value);
  };

  const onChangeScore1 = (event) => {
    setScore1(event.target.value);
  };

  const onChangeScore2 = (event) => {
    setScore2(event.target.value);
  };

  const handleFechaMatch = (date) => {
    setFechaMatch(date);
  };

  const resetForm = () => {
    setStadium("");
    setCategory("");
    setMatchVideoLink("");
    setTeam1("");
    setTeam2("");
    setScore1("");
    setScore2("");
    setFechaMatch(null);
    setPais("");
    setEstadoCiudad("");
    setDescripcion("");
  };

  useEffect(() => {
    if (lenguaje === "en") {
      setLen(enUS);
    } else if (lenguaje === "es") {
      setLen(es);
    } else if (lenguaje === "it") {
      setLen(it);
    } else if (lenguaje === "fr") {
      setLen(fr);
    }
  }, [lenguaje]);

  const handleCloseNewMatchResult = () => {
    setOpenNewMatchResult(false);
    resetForm();
  };

  const onSelectFilePortada = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setUrlFotoMatchResult(URL.createObjectURL(e.target.files[0]));
      setFileToUpload(e.target.files[0]);
      let nameFilePortadaShow = e.target.files[0].name;
      const name = e.target.files[0].name;
      const lastDot = name.lastIndexOf(".");
      const ext = name.substring(lastDot + 1);
      const fileName = user.uid + "-" + uniqid() + "." + ext;
      if (nameFilePortadaShow.length > 9) {
        nameFilePortadaShow = nameFilePortadaShow
          .substring(0, 8)
          .concat(" ... " + ext);
      }
      setFileNameUpload(fileName);
    }
  };

  const publicar = async (input) => {
    console.log(" entro aqui : " + JSON.stringify(input));
    try {
      let { data } = await newMatchResult({
        variables: { input },
      });
      if (data) {
        console.log("vuelvo ...  " + JSON.stringify(data));
        setLoading(false);
        handleCloseNewMatchResult();
      }
    } catch (error) {
      setLoading(false);
      //Aqui muestro el error de que no se pudo conectar con backend
      console.log(
        "hay error en newMatchResult! " + JSON.stringify(error.message)
      );
    }
  };

  const onSubmitNewMatchResult = async (event) => {
    console.log(" onSubmitNewMatchResult ");
    event.preventDefault();
    setLoading(true);
    try {
      if (fileToUpload) {
        let data = new FormData();
        data.append("file", fileToUpload, fileNameUpload);
        await uploadFile(data.get("file"), MATCHS_RESULTS)
          .then(async (result) => {
            setUrlFotoMatchResult(result.location);
            const input = {
              matchType: matchType,
              visibilidad: visibilidad,
              matchDate: fechaMatch,
              paisMatch: pais,
              estadoCiudadMatch: estadoCiudad,
              stadium: stadium,
              category: category,
              paisSelectionTeam1: paisTeam1,
              paisSelectionTeam2: paisTeam2,
              team1: team1,
              team2: team2,
              scoreTeam1: score1,
              scoreTeam2: score2,
              descripcion: descripcion,
              matchVideoLink: matchVideoLink,
              urlFotoMatchResult: urlFotoMatchResult,
            };
            await publicar(input);
          })
          .catch((error) => {
            // aqui mostrar el error de que no se pudo subir la imagen
            setUrlFotoMatchResult("");
            console.log("Error : " + error);
          });
      } else {
        setUrlFotoMatchResult("");
        const input = {
          matchType: matchType,
          visibilidad: visibilidad,
          matchDate: fechaMatch,
          paisMatch: pais,
          estadoCiudadMatch: estadoCiudad,
          stadium: stadium,
          category: category,
          paisSelectionTeam1: paisTeam1,
          paisSelectionTeam2: paisTeam2,
          team1: team1,
          team2: team2,
          scoreTeam1: score1,
          scoreTeam2: score2,
          descripcion: descripcion,
          matchVideoLink: matchVideoLink,
          urlFotoMatchResult: urlFotoMatchResult,
        };
        await publicar(input);
      }
      postedEffect ? setPostedEffect(false) : setPostedEffect(true);
    } catch (error) {
      setLoading(false);
      console.log(" Error :" + error);
    }
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (value) {
      case 0:
        setMatchType("NATIONAL");
        break;
      case 1:
        setMatchType("INTERNATIONAL");
        break;
      case 2:
        setMatchType("SELECTIONS");
        break;
    }
  });

  const handleChange = (event, newValue) => {
    resetForm();
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      <Dialog
        className={classes.backPrincipal}
        open={openNewMatchResult}
        onClose={handleCloseNewMatchResult}
        TransitionComponent={TransitionUp}
      >
        {loading ? (
          <Box style={{ width: 200, marginTop: 150, textAlign: "center" }}>
            {t("txt.publishing").toLowerCase()}
            <LinearProgress style={{ backgroundColor: "#28a499" }} />
          </Box>
        ) : (
          <Card className={classes.mainRoot}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={fotoUser}
                ></Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <CloseIcon onClick={() => handleCloseNewMatchResult()} />
                </IconButton>
              }
              title={nombreUser}
              subheader={
                <Button
                  onClick={() => {
                    setOpenPublicPrivate(true);
                  }}
                  variant="outlined"
                  className={classes.buttonPublicPrivate}
                  startIcon={<PublicIcon />}
                  endIcon={<ArrowDropDownIcon />}
                >
                  {visibilidad}
                </Button>
              }
            />
            <CardMedia />

            <div className={classes.root}>
              <div className={classes.matchType}>
                {" "}
                {t("txt.matchType").toUpperCase()}
              </div>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="Match Type"
                >
                  <Tab
                    label={t("txt.matchTypeNational")}
                    id="action-tab-0"
                    aria-controls="action-tabpanel-0"
                  />
                  <Tab
                    label={t("txt.matchTypeInternational")}
                    id="action-tab-1"
                    aria-controls="action-tabpanel-1"
                  />
                  <Tab
                    label={t("txt.matchTypeSelections")}
                    id="action-tab-2"
                    aria-controls="action-tabpanel-2"
                  />
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0} dir={theme.direction}>
                <form
                  className={classes.form}
                  onSubmit={onSubmitNewMatchResult}
                >
                  <CardContent style={{ padding: 0 }}>
                    <div>
                      <MuiPickersUtilsProvider
                        locale={len}
                        utils={DateFnsUtils}
                      >
                        <KeyboardDatePicker
                          size="small"
                          className={classes.fechaMatch}
                          id="date-picker"
                          required
                          label={t("txt.matchDate")}
                          value={fechaMatch}
                          onChange={handleFechaMatch}
                          format="dd/mm/yyyy"
                          KeyboardButtonProps={{
                            "aria-label": "Match Date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>

                    <div className={classes.where}>
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={pais}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPais(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setEstadoCiudad("");
                          countriesList.Countries.forEach((pais) => {
                            if (pais.CountryName === value) {
                              ciudadesList = [];
                              Object.keys(pais.States).forEach((estados) => {
                                ciudadesList.push(
                                  pais.States[estados].StateName
                                );
                              });
                              setPais(value);
                            }
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countryMatch")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="ciudadID"
                        options={ciudadesList}
                        value={estadoCiudad}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            setEstadoCiudad(option);
                            return option;
                          }
                        }}
                        onChange={(event, value) => {
                          setEstadoCiudad(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.cityState")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className={classes.where}>
                      <TextField
                        required
                        type="text"
                        id="stadium"
                        label={t("txt.category")}
                        name="category"
                        value={category}
                        onChange={onChangeCategory}
                        className={classes.fromLabelSize}
                      />
                      <TextField
                        required
                        type="text"
                        id="stadium"
                        label={t("txt.stadiumField")}
                        name="stadium"
                        value={stadium}
                        onChange={onChangeStadium}
                        className={classes.fromLabelSize}
                      />
                    </div>
                    <div className={classes.team1}>
                      <TextField
                        required
                        type="text"
                        id="team1"
                        label={t("txt.team1")}
                        name="team1"
                        value={team1}
                        onChange={onChangeTeam1}
                        className={classes.fromLabelSize}
                      />

                      <TextField
                        required
                        type="text"
                        id="team2"
                        label={t("txt.team2")}
                        name="team2"
                        value={team2}
                        onChange={onChangeTeam2}
                        className={classes.fromLabelSize}
                      />
                    </div>
                    <div className={classes.team2}>
                      <TextField
                        required
                        type="text"
                        id="score1"
                        label={t("txt.score1")}
                        name="score1"
                        value={score1}
                        onChange={onChangeScore1}
                        className={classes.fromLabelSize}
                      />

                      <TextField
                        required
                        type="text"
                        id="score2"
                        label={t("txt.score2")}
                        name="score2"
                        value={score2}
                        onChange={onChangeScore2}
                        className={classes.fromLabelSize}
                      />
                    </div>

                    <TextField
                      type="text"
                      fullWidth
                      id="LinkMatch"
                      label={t("txt.matchVideoLink")}
                      name="match video link"
                      value={matchVideoLink}
                      onChange={onChangeMatchVideoLink}
                      className={classes.fromLabel}
                    />

                    <TextField
                      type="text"
                      fullWidth
                      id="Descripcion"
                      label={t("txt.description")}
                      name="descripcion"
                      value={descripcion}
                      onChange={onChangeDescripcion}
                      className={classes.fromLabel}
                    />

                    {urlFotoMatchResult && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        position="relative"
                        style={{ width: "100%", height: 250 }}
                      >
                        <IconButton
                          aria-label="share"
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <CancelIcon
                            style={{ color: "#ff00008c" }}
                            onClick={() => setUrlFotoMatchResult("")}
                          />
                        </IconButton>

                        <img
                          className={classes.imagen}
                          alt="vista imagen cortada"
                          src={urlFotoMatchResult}
                        />
                      </Box>
                    )}
                  </CardContent>
                  <CardActions style={{ justifyContent: "space-between" }}>
                    <IconButton aria-label="add photo">
                      <label
                        htmlFor="contained-button-file"
                        style={{ fontSize: "1rem" }}
                      >
                        <input
                          style={{ display: "none" }}
                          accept="image/*"
                          type="file"
                          id="contained-button-file"
                          onChange={onSelectFilePortada}
                        ></input>

                        <AddAPhotoIcon />
                      </label>
                    </IconButton>

                    <Button
                      type="submit"
                      variant="outlined"
                      className={classes.buttonPublish}
                      disabled={
                        !fechaMatch ||
                        !pais ||
                        !estadoCiudad ||
                        !category ||
                        !stadium ||
                        !team1 ||
                        !team2 ||
                        !score1 ||
                        !score2
                          ? true
                          : false
                      }
                    >
                      {t("txt.publish")}
                    </Button>
                  </CardActions>
                </form>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <form
                  className={classes.form}
                  onSubmit={onSubmitNewMatchResult}
                >
                  <CardContent style={{ padding: 0 }}>
                    <div>
                      <MuiPickersUtilsProvider
                        locale={len}
                        utils={DateFnsUtils}
                      >
                        <KeyboardDatePicker
                          size="small"
                          className={classes.fechaMatch}
                          id="date-picker"
                          required
                          label={t("txt.matchDate")}
                          value={fechaMatch}
                          onChange={handleFechaMatch}
                          format="dd/mm/yyyy"
                          KeyboardButtonProps={{
                            "aria-label": "Match Date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>

                    <div className={classes.where}>
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={pais}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPais(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setEstadoCiudad("");
                          countriesList.Countries.forEach((pais) => {
                            if (pais.CountryName === value) {
                              ciudadesList = [];
                              Object.keys(pais.States).forEach((estados) => {
                                ciudadesList.push(
                                  pais.States[estados].StateName
                                );
                              });
                              setPais(value);
                            }
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countryMatch")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="ciudadID"
                        options={ciudadesList}
                        value={estadoCiudad}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            setEstadoCiudad(option);
                            return option;
                          }
                        }}
                        onChange={(event, value) => {
                          setEstadoCiudad(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.cityState")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className={classes.where}>
                      <TextField
                        required
                        type="text"
                        id="stadium"
                        label={t("txt.category")}
                        name="category"
                        value={category}
                        onChange={onChangeCategory}
                        className={classes.fromLabelSize}
                      />
                      <TextField
                        required
                        type="text"
                        id="stadium"
                        label={t("txt.stadiumField")}
                        name="stadium"
                        value={stadium}
                        onChange={onChangeStadium}
                        className={classes.fromLabelSize}
                      />
                    </div>

                    <div className={classes.team1}>
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={paisTeam1}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPaisTeam1(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setPaisTeam1(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countryTeam1")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />

                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={paisTeam2}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPaisTeam2(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setPaisTeam2(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countryTeam2")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                    </div>

                    <div className={classes.team1}>
                      <TextField
                        required
                        type="text"
                        id="team1"
                        label={t("txt.team1")}
                        name="team1"
                        value={team1}
                        onChange={onChangeTeam1}
                        className={classes.fromLabelSize}
                      />

                      <TextField
                        required
                        type="text"
                        id="team2"
                        label={t("txt.team2")}
                        name="team2"
                        value={team2}
                        onChange={onChangeTeam2}
                        className={classes.fromLabelSize}
                      />
                    </div>
                    <div className={classes.team2}>
                      <TextField
                        required
                        type="text"
                        id="score1"
                        label={t("txt.score1")}
                        name="score1"
                        value={score1}
                        onChange={onChangeScore1}
                        className={classes.fromLabelSize}
                      />

                      <TextField
                        required
                        type="text"
                        id="score2"
                        label={t("txt.score2")}
                        name="score2"
                        value={score2}
                        onChange={onChangeScore2}
                        className={classes.fromLabelSize}
                      />
                    </div>

                    <TextField
                      style={{ margin: 0 }}
                      required
                      type="text"
                      fullWidth
                      id="LinkMatch"
                      label={t("txt.matchVideoLink")}
                      name="match video link"
                      value={matchVideoLink}
                      onChange={onChangeMatchVideoLink}
                      className={classes.fromLabel}
                    />

                    <TextField
                      style={{ margin: 0 }}
                      type="text"
                      fullWidth
                      id="Descripcion"
                      label={t("txt.description")}
                      name="descripcion"
                      value={descripcion}
                      onChange={onChangeDescripcion}
                      className={classes.fromLabel}
                    />

                    {urlFotoMatchResult && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        position="relative"
                        style={{ width: "100%", height: 250 }}
                      >
                        <IconButton
                          aria-label="share"
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <CancelIcon
                            style={{ color: "#ff00008c" }}
                            onClick={() => setUrlFotoMatchResult("")}
                          />
                        </IconButton>

                        <img
                          className={classes.imagen}
                          alt="vista imagen cortada"
                          src={urlFotoMatchResult}
                        />
                      </Box>
                    )}
                  </CardContent>
                  <CardActions style={{ justifyContent: "space-between" }}>
                    <IconButton aria-label="add photo">
                      <label
                        htmlFor="contained-button-file"
                        style={{ fontSize: "1rem" }}
                      >
                        <input
                          style={{ display: "none" }}
                          accept="image/*"
                          type="file"
                          id="contained-button-file"
                          onChange={onSelectFilePortada}
                        ></input>

                        <AddAPhotoIcon />
                      </label>
                    </IconButton>

                    <Button
                      type="submit"
                      variant="outlined"
                      className={classes.buttonPublish}
                      disabled={
                        !fechaMatch ||
                        !pais ||
                        !estadoCiudad ||
                        !category ||
                        !stadium ||
                        !team1 ||
                        !team2 ||
                        !score1 ||
                        !score2 ||
                        !paisTeam1 ||
                        !paisTeam2
                          ? true
                          : false
                      }
                    >
                      {t("txt.publish")}
                    </Button>
                  </CardActions>
                </form>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <form
                  className={classes.form}
                  onSubmit={onSubmitNewMatchResult}
                >
                  <CardContent style={{ padding: 0 }}>
                    <div>
                      <MuiPickersUtilsProvider
                        locale={len}
                        utils={DateFnsUtils}
                      >
                        <KeyboardDatePicker
                          size="small"
                          className={classes.fechaMatch}
                          id="date-picker"
                          required
                          label={t("txt.matchDate")}
                          value={fechaMatch}
                          onChange={handleFechaMatch}
                          format="dd/mm/yyyy"
                          KeyboardButtonProps={{
                            "aria-label": "Match Date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>

                    <div className={classes.where}>
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={pais}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPais(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setEstadoCiudad("");
                          countriesList.Countries.forEach((pais) => {
                            if (pais.CountryName === value) {
                              ciudadesList = [];
                              Object.keys(pais.States).forEach((estados) => {
                                ciudadesList.push(
                                  pais.States[estados].StateName
                                );
                              });
                              setPais(value);
                            }
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countryMatch")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="ciudadID"
                        options={ciudadesList}
                        value={estadoCiudad}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            setEstadoCiudad(option);
                            return option;
                          }
                        }}
                        onChange={(event, value) => {
                          setEstadoCiudad(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.cityState")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className={classes.where}>
                      <TextField
                        required
                        type="text"
                        id="stadium"
                        label={t("txt.category")}
                        name="category"
                        value={category}
                        onChange={onChangeCategory}
                        className={classes.fromLabelSize}
                      />
                      <TextField
                        required
                        type="text"
                        id="stadium"
                        label={t("txt.stadiumField")}
                        name="stadium"
                        value={stadium}
                        onChange={onChangeStadium}
                        className={classes.fromLabelSize}
                      />
                    </div>

                    <div className={classes.team1}>
                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={paisTeam1}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPaisTeam1(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setPaisTeam1(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countrySelectionTeam1")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />

                      <Autocomplete
                        className={classes.fromLabelSize}
                        id="paisID"
                        options={Paises}
                        defaultValue={paisTeam2}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => {
                          if (option === value) {
                            countriesList.Countries.forEach((pais) => {
                              if (pais.CountryName === option) {
                                ciudadesList = [];
                                Object.keys(pais.States).forEach((estados) => {
                                  ciudadesList.push(
                                    pais.States[estados].StateName
                                  );
                                });
                                setPaisTeam2(value);
                              }
                            });
                          }
                        }}
                        onChange={(event, value) => {
                          setPaisTeam2(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.fromLabel}
                            required
                            {...params}
                            label={t("txt.countrySelectionTeam2")}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "off",
                            }}
                          />
                        )}
                      />
                    </div>

                    <div className={classes.team2}>
                      <TextField
                        required
                        type="text"
                        id="score1"
                        label={t("txt.score1")}
                        name="score1"
                        value={score1}
                        onChange={onChangeScore1}
                        className={classes.fromLabelSize}
                      />

                      <TextField
                        required
                        type="text"
                        id="score2"
                        label={t("txt.score2")}
                        name="score2"
                        value={score2}
                        onChange={onChangeScore2}
                        className={classes.fromLabelSize}
                      />
                    </div>

                    <TextField
                      style={{ margin: 0 }}
                      required
                      type="text"
                      fullWidth
                      id="LinkMatch"
                      label={t("txt.matchVideoLink")}
                      name="match video link"
                      value={matchVideoLink}
                      onChange={onChangeMatchVideoLink}
                      className={classes.fromLabel}
                    />

                    <TextField
                      style={{ margin: 0 }}
                      type="text"
                      fullWidth
                      id="Descripcion"
                      label={t("txt.description")}
                      name="descripcion"
                      value={descripcion}
                      onChange={onChangeDescripcion}
                      className={classes.fromLabel}
                    />

                    {urlFotoMatchResult && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        position="relative"
                        style={{ width: "100%", height: 250 }}
                      >
                        <IconButton
                          aria-label="share"
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <CancelIcon
                            style={{ color: "#ff00008c" }}
                            onClick={() => setUrlFotoMatchResult("")}
                          />
                        </IconButton>

                        <img
                          className={classes.imagen}
                          alt="vista imagen cortada"
                          src={urlFotoMatchResult}
                        />
                      </Box>
                    )}
                  </CardContent>
                  <CardActions style={{ justifyContent: "space-between" }}>
                    <IconButton aria-label="add photo">
                      <label
                        htmlFor="contained-button-file"
                        style={{ fontSize: "1rem" }}
                      >
                        <input
                          style={{ display: "none" }}
                          accept="image/*"
                          type="file"
                          id="contained-button-file"
                          onChange={onSelectFilePortada}
                        ></input>

                        <AddAPhotoIcon />
                      </label>
                    </IconButton>

                    <Button
                      type="submit"
                      variant="outlined"
                      className={classes.buttonPublish}
                      disabled={
                        !fechaMatch ||
                        !pais ||
                        !estadoCiudad ||
                        !category ||
                        !stadium ||
                        !score1 ||
                        !score2 ||
                        !paisTeam1 ||
                        !paisTeam2
                          ? true
                          : false
                      }
                    >
                      {t("txt.publish")}
                    </Button>
                  </CardActions>
                </form>
              </TabPanel>
            </div>
          </Card>
        )}
      </Dialog>

      <Dialog
        className={classes.backPrivadoPublico}
        open={openPublicPrivate}
        onClose={handleClosePublicPrivate}
        TransitionComponent={TransitionDown}
      >
        <div className={classes.contenedorPrivadoPublico}>
          {t("txt.whoCanSeeThePost")}
        </div>
        <List dense>
          <ListItem key={1} button>
            <ListItemAvatar>
              <PublicIcon />
            </ListItemAvatar>
            <ListItemText
              id={22}
              primary={"Public"}
              secondary={t("txt.anyUserInAndOutApp")}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => setVisibilidad("PUBLIC")}
                checked={visibilidad === "PUBLIC"}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem key={2} button>
            <ListItemAvatar>
              <PublicIcon />
            </ListItemAvatar>
            <ListItemText
              id={33}
              primary={"Private"}
              secondary={t("txt.onlyRegisteredUsers")}
            />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => setVisibilidad("PRIVATE")}
                checked={visibilidad === "PRIVATE"}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <div style={{ margin: 20, color: "#435b68" }}>
          <Button
            onClick={() => handleClosePublicPrivate()}
            variant="outlined"
            style={{
              borderRadius: 25,
              fontSize: "0.6rem",
              float: "right",
              color: "#28a499",
              border: " 1px solid #28a499",
            }}
          >
            {t("txt.save")}
          </Button>
          <Button
            style={{
              borderRadius: 25,
              fontSize: "0.6rem",
              float: "right",
              marginRight: 10,
              color: "#435b68",
              border: " 1px solid #435b68",
            }}
            onClick={() => handleClosePublicPrivate()}
            variant="outlined"
          >
            {t("txt.close")}
          </Button>
        </div>
      </Dialog>
    </>
  );
};
