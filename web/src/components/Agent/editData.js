import React, { useState, useContext, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useInputValue } from "../../hooks/useInputValue";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { es, enUS, fr, it } from "date-fns/locale";
import { Context } from "../../Context";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AvatarImg from "../../assets/avatar.png";
import "../../styles/reactCropp.css";
import { uploadFile, deleteFile } from "react-s3";
import { Paises } from "../../assets/countries/paises";
import { Idiomas } from "../../assets/countries/idiomas";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactCrop from "react-image-crop";
import Box from "@material-ui/core/Box";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Fab from "@material-ui/core/Fab";
import { DOCUMENTOS_AGENT, PERFIL_AGENT } from "../../config";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import LocalSeeIcon from "@material-ui/icons/LocalSee";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PreviewFoto } from "../Preview/previewFoto";

let uniqid = require("uniqid");

const useStyles = makeStyles((theme) => ({
  body: {
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    height: "fit-content",
    width: "100%",
  },
  button: {
    color: "#28a499",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonAgregar: {
    margin: 5,
    marginRight: 0,
    fontSize: "xx-small",
    color: "#f9feff",
    backgroundColor: "#28a499",
  },
  actionsContainer: {
    marginTop: 80,
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  atocomplete: {
    width: "100%",
  },
  puesto: {
    marginRight: "5px !important",
    width: "100%",
  },
  left: {
    textAlign: "left",
  },
  table: {
    marginTop: 20,
  },
  noPadding: {
    padding: 0,
  },
  form: {
    padding: 0,
  },
  nacionalidades: {
    marginTop: 20,
    color: "#737373c7",
    fontWeight: "bold",
  },
  tableHistory: {
    border: "1px solid #949494",
    borderRadius: 5,
  },
  stepper: {
    paddingLeft: "10px !important",
    width: "100%",
  },
  crop: {
    width: "fit-content",
    flexDirection: "column",
    alignItem: "center",
    textAlign: "center",
    borderRadius: "4px",
  },
  imagen: {
    borderRadius: "50%",
    height: "100px",
    width: "100px",
  },
  spinner: {
    marginTop: 15,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#949494",
    marginTop: 10,
  },
  marcoTable: {
    border: "1px solid grey",
    margin: "10px 0px 10px 0px",
    padding: 10,
    borderRadius: 5,
  },
}));

export const EditData = ({ agent, onSubmitAgent, loadingConfirm }) => {
  const { lenguaje, user } = useContext(Context);
  const [len, setLen] = useState(enUS);

  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    t("txt.agentData").toUpperCase(),
    t("txt.documentsData").toUpperCase(),
  ];

  const [openPreviewFoto, setOpenPreviewFoto] = useState(false);
  const [srcFotoPreview, setSrcFotoPreview] = useState("");

  const [aplicar, setAplicar] = useState(false);
  const [fileNameUpload, setFileNameUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({ unit: "%", width: 60, aspect: 9 / 9 });
  const [previewUrl, setPreviewUrl] = useState(
    agent && agent.fotoPerfil ? agent.fotoPerfil : ""
  );
  const [imgRef, setImgRef] = useState(null);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");

  const [paisAgencia, setPaisAgencia] = useState(
    agent && agent.pais ? agent.pais : ""
  );
  const [inicioActividad, setInicioActividad] = useState(
    agent && agent.inicioActividad ? new Date(agent.inicioActividad) : null
  );

  const [idiomas, setIdiomas] = useState(
    agent && agent.idiomas ? agent.idiomas : []
  );
  const [idioma, setIdioma] = useState("");
  const [inputValueIdioma, setInputValueIdioma] = useState("");

  const [paisesOpera, setPaisesOpera] = useState(
    agent && agent.paisesOpera ? agent.paisesOpera : []
  );
  const [paisOpera, setPaisOpera] = useState("");
  const [inputValuePaisOpera, setInputValuePaisOpera] = useState("");

  const [documentos, setDocumentos] = useState(
    agent && agent.documentos
      ? () =>
          agent.documentos.map((item) => {
            let { uid, nombre, link } = item;
            return {
              uid,
              nombre,
              link,
            };
          })
      : []
  );

  const [disableAgregarPaisOpera, setDisableAgregarPaisOpera] = useState(true);
  const [disableAgregarIdioma, setDisableAgregarIdioma] = useState(true);

  let nombre = useInputValue(agent && agent.nombre ? agent.nombre : "");
  let agencia = useInputValue(agent && agent.agencia ? agent.agencia : "");
  let telefono = useInputValue(agent && agent.telefono ? agent.telefono : "");
  let email = useInputValue(agent && agent.email ? agent.email : "");
  const [openPreviewVideo, setOpenPreviewVideo] = useState(false);

  const handleClosePreviewVideo = () => {
    setOpenPreviewVideo(false);
  };

  const onFileFotoPreview = async (src) => {
    setSrcFotoPreview(src);
    setOpenPreviewFoto(true);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSelectFilePortada = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true);
      setAplicar(true);
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      let file = e.target.files[0];
      let nameFilePortadaShow = e.target.files[0].name;
      const name = e.target.files[0].name;
      const lastDot = name.lastIndexOf(".");
      const ext = name.substring(lastDot + 1);
      const fileName = user.uid + "-" + uniqid() + "." + ext;
      if (nameFilePortadaShow.length > 10) {
        nameFilePortadaShow = nameFilePortadaShow
          .substring(0, 8)
          .concat(" ... " + ext);
      }
      setFileNameUpload(fileName);
      setLoading(false);
    }
  };

  const makeClientCrop = async (crop) => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, fileNameUpload);
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx1 = canvas.getContext("2d");

    ctx1.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
        setFile(blob);
      }, "image/jpeg");
    });
  };

  const aplicarHandle = () => {
    setAplicar(false);
  };

  const onLoad = useCallback((img) => {
    setImgRef(img);
  }, []);

  const onSelectFiles = async (e) => {
    //fixxy aca tengo que retornar el mensage de error y mostrarlo
    setMsgError("");
    e.persist();
    if (
      e.target.files.length > 5 ||
      documentos.length > 5 ||
      e.target.files.length + documentos.length > 5
    ) {
      return setMsgError("No se puede agregar mas de 5 fotos");
    }

    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        setLoadingTable(true);
        let file = e.target.files[i];
        let nameFile = file.name;
        const name = file.name;
        const lastDot = name.lastIndexOf(".");
        const ext = name.substring(lastDot + 1);
        const nombre = name.substring(0, lastDot);
        const fileName = nombre + "--" + user.uid + "-" + uniqid() + "." + ext;
        if (nameFile.length > 15) {
          nameFile = nameFile.substring(0, 15).concat(" ... " + ext);
        }
        let data = new FormData();
        data.append("file", file, fileName);
        await uploadFile(data.get("file"), DOCUMENTOS_AGENT)
          .then((result) => {
            const url = result.location;
            documentos.push({ uid: uniqid(), nombre: nameFile, link: url });
            setLoadingTable(false);
          })
          .catch((error) => {
            console.log(
              "hay error load image agent : " + JSON.stringify(error)
            );
            setLoadingTable(false);
          });
      }
    }
  };

  onPreviewFile;

  const onPreviewFile = async (src) => {
    /// aqui abro el modal
  };

  const onDeleteFile = async (src) => {
    setMsgError("");
    setLoadingTable(true);
    let filename = src.substring(src.lastIndexOf("/") + 1);
    await deleteFile(filename, DOCUMENTOS_AGENT)
      .then((response) => {
        setDocumentos(documentos.filter((item) => item.link !== src));
        setLoadingTable(false);
      })
      .catch((err) => {
        setLoadingTable(false);
        setDocumentos(documentos.filter((item) => item.link !== src));
        console.log("ERROR : " + JSON.stringify(err));
      });
  };

  const submitDatosPersonales = (event) => {
    event.preventDefault();
    handleNext();
  };

  const handleChangeIdioma = (e) => {
    if (e) {
      setIdioma(e);
      setInputValueIdioma(e);
    } else {
      setIdioma("");
      setInputValueIdioma("");
    }
  };

  const handleChangePaisOpera = (e) => {
    if (e) {
      setPaisOpera(e);
      setInputValuePaisOpera(e);
    } else {
      setPaisOpera("");
      setInputValuePaisOpera("");
    }
  };

  const handleClickAgregarIdioma = async () => {
    if (idioma) {
      if (!idiomas.includes(idioma)) {
        idiomas.push(idioma);
      }
      setIdiomas((idiomas) => [...idiomas]);
    }
    setInputValueIdioma("");
    setIdioma("");
    setDisableAgregarIdioma(true);
  };

  const handleClickAgregarPaisOpera = async () => {
    if (paisOpera) {
      if (!paisesOpera.includes(paisOpera)) {
        paisesOpera.push(paisOpera);
      }
      setPaisesOpera((paisesOpera) => [...paisesOpera]);
    }
    setInputValuePaisOpera("");
    setPaisOpera("");
    setDisableAgregarPaisOpera(true);
  };

  const submitConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let url = null;
      if (file) {
        let data = new FormData();
        data.append("file", file, fileNameUpload);
        await uploadFile(data.get("file"), PERFIL_AGENT)
          .then((result) => {
            url = result.location;
          })
          .catch((error) => {
            console.log(
              "Error al imagen perfil gentre  : " + JSON.stringify(error)
            );
          });
      } else if (previewUrl) {
        url = previewUrl;
      }

      onSubmitAgent({
        nombre: nombre.value,
        inicioActividad: inicioActividad,
        idiomas: idiomas,
        agencia: agencia.value,
        paisAgencia: paisAgencia,
        paisesOpera: paisesOpera,
        telefono: telefono.value,
        email: email.value,
        fotoPerfil: url,
        documentos: documentos,
      });
      setLoading(false);
    } catch (error) {
      console.log(" Error al submit agente : " + +JSON.stringify(error));
    }
  };

  const eliminarIdioma = (idioma) => {
    if (idiomas.includes(idioma)) {
      idiomas.splice(idiomas.indexOf(idioma), 1);
      setIdiomas((idiomas) => [...idiomas]);
    }
  };

  const eliminarPaisOpera = (paisOpera) => {
    if (paisesOpera.includes(paisOpera)) {
      paisesOpera.splice(paisesOpera.indexOf(paisOpera), 1);
      setPaisesOpera((paisesOpera) => [...paisesOpera]);
    }
  };

  const handleDateChange = (date) => {
    setInicioActividad(date);
  };

  useEffect(() => {
    if (idioma !== "") {
      setDisableAgregarIdioma(false);
    } else {
      setDisableAgregarIdioma(true);
    }
  }, [idioma]);

  useEffect(() => {
    if (paisOpera !== "") {
      setDisableAgregarPaisOpera(false);
    } else {
      setDisableAgregarPaisOpera(true);
    }
  }, [paisOpera]);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <form className={classes.form} onSubmit={submitDatosPersonales}>
              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="nombre"
                label={t("txt.nameAgent")}
                name="nombre"
                {...nombre}
              />

              <MuiPickersUtilsProvider locale={len} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="incioActividadID"
                  label={t("txt.startActivity")}
                  format="yyyy"
                  required
                  value={inicioActividad}
                  className={classes.puesto}
                  onChange={handleDateChange}
                  views={["year"]}
                />
              </MuiPickersUtilsProvider>

              <div style={{ display: "flex" }}>
                <Autocomplete
                  className={classes.atocomplete}
                  id="lagunageId"
                  options={Idiomas}
                  autoHighlight
                  defaultValue={idioma}
                  inputValue={inputValueIdioma}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      return value;
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValueIdioma(newInputValue);
                  }}
                  onChange={(event, value) => handleChangeIdioma(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 0 }}
                      label={t("txt.languages")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttonAgregar}
                  onClick={() => handleClickAgregarIdioma()}
                  disabled={disableAgregarIdioma}
                >
                  {t("txt.add")}
                </Button>
              </div>

              {idiomas && idiomas.length != 0 && (
                <>
                  <TableContainer className={classes.marcoTable}>
                    <div className={classes.nacionalidades}>
                      {t("txt.languages").toUpperCase()}
                    </div>
                    <Table aria-label="idiomas">
                      <TableBody>
                        {idiomas.map((row) => (
                          <TableRow key={row}>
                            <TableCell
                              className={classes.noPadding}
                              component="th"
                              scope="row"
                            >
                              {row}
                            </TableCell>
                            <TableCell
                              className={classes.noPadding}
                              disabled
                              align="right"
                            >
                              <DeleteForeverIcon
                                onClick={() => eliminarIdioma(row)}
                                color="error"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="agencia"
                label={t("txt.agencyName")}
                name="agencia"
                {...agencia}
              />

              <div style={{ display: "flex" }}>
                <Autocomplete
                  className={classes.atocomplete}
                  id="paisAgenciaID"
                  options={Paises}
                  autoHighlight
                  defaultValue={paisAgencia}
                  inputValue={inputValuePaisOpera}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      return value;
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValuePaisOpera(newInputValue);
                  }}
                  onChange={(event, value) => handleChangePaisOpera(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("txt.countryAgency")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />

                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttonAgregar}
                  onClick={() => handleClickAgregarPaisOpera()}
                  disabled={disableAgregarPaisOpera}
                >
                  {t("txt.add")}
                </Button>
              </div>

              {paisesOpera && paisesOpera.length != 0 && (
                <>
                  <TableContainer className={classes.marcoTable}>
                    {" "}
                    <div className={classes.nacionalidades}>
                      {t("txt.countryAgency").toUpperCase()}
                    </div>
                    <Table aria-label="paisesOpera">
                      <TableBody>
                        {paisesOpera.map((row) => (
                          <TableRow key={row}>
                            <TableCell
                              className={classes.noPadding}
                              component="th"
                              scope="row"
                            >
                              {row}
                            </TableCell>
                            {row !== idioma && (
                              <>
                                <TableCell
                                  className={classes.noPadding}
                                  disabled
                                  align="right"
                                >
                                  <DeleteForeverIcon
                                    onClick={() => eliminarPaisOpera(row)}
                                    color="error"
                                  />
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="telefono"
                label={t("txt.phone")}
                name="telefono"
                value={""}
                {...telefono}
              />

              <TextField
                style={{ margin: 0 }}
                required
                type="email"
                fullWidth
                id="email"
                label={t("txt.email")}
                name="email"
                value={""}
                {...email}
              />

              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    {t("button.back").toUpperCase()}
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? t("button.confirm").toUpperCase()
                      : t("button.next").toUpperCase()}
                  </Button>
                </div>
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <div className={classes.spinner}></div>
            <form className={classes.form} onSubmit={submitConfirm}>
              <div className={classes.tableHistory}>
                <div className={classes.title}>
                  {t("txt.profilePhoto").toUpperCase()}
                </div>
                <Box justifyContent="center" marginTop="15px">
                  <label htmlFor="contained-button-file">
                    <input
                      style={{ display: "none" }}
                      accept="image/*"
                      type="file"
                      id="contained-button-file"
                      onChange={onSelectFilePortada}
                    ></input>
                    <Fab component="span">
                      <AddAPhoto />
                    </Fab>
                  </label>
                </Box>
                <div>
                  {aplicar && (
                    <>
                      {upImg && <p>{t("txt.moveFrame").toLowerCase()}</p>}
                      <ReactCrop
                        className={classes.crop}
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={makeClientCrop}
                      />
                    </>
                  )}
                </div>
                <h4>{t("txt.willLook")}</h4>
                <Box display="flex" justifyContent="center" marginBottom="20px">
                  {previewUrl ? (
                    <img
                      className={classes.imagen}
                      alt="vista imagen cortada"
                      src={previewUrl}
                    />
                  ) : (
                    <img
                      className={classes.imagen}
                      alt="vista imagen cortada"
                      src={user && user.avatar ? user.avatar : AvatarImg}
                    />
                  )}
                </Box>
                <Button
                  disabled={!aplicar}
                  onClick={aplicarHandle}
                  className={classes.button}
                >
                  {t("txt.apply")}
                </Button>
              </div>
              <br />

              <div className={classes.tableHistory}>
                <div className={classes.title}>
                  {t("txt.documents").toUpperCase()}
                </div>
                {!loading && (
                  <Box
                    justifyContent="center"
                    marginTop="15px"
                    marginBottom="15px"
                  >
                    <label htmlFor="contained-button-files">
                      <input
                        style={{ display: "none" }}
                        accept="image/*"
                        multiple
                        type="file"
                        id="contained-button-files"
                        onChange={onSelectFiles}
                      ></input>
                      <Fab component="span">
                        <AddPhotoAlternateIcon />
                      </Fab>
                    </label>
                  </Box>
                )}
                {loadingTable && (
                  <div className={classes.spinner}>
                    <CircularProgress />
                  </div>
                )}
                {documentos && documentos.length !== 0 && (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("txt.name")}</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {documentos.map((row) => (
                          <TableRow key={row.uid}>
                            <TableCell component="th" scope="row">
                              {row.nombre}
                            </TableCell>
                            <TableCell align="right">
                              {loadingTable && (
                                <div className={classes.spinner}>
                                  <CircularProgress />
                                </div>
                              )}
                              {!loadingTable && (
                                <>
                                  <LocalSeeIcon
                                    style={{
                                      color: "green",
                                      marginRight: 15,
                                    }}
                                    fontSize="small"
                                    onClick={() => onFileFotoPreview(row.link)}
                                  />

                                  <DeleteForeverOutlinedIcon
                                    style={{ color: "red" }}
                                    fontSize="small"
                                    onClick={() => onDeleteFile(row.link)}
                                  />
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
              <br />

              <br />
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    {t("button.back").toUpperCase()}
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    className={classes.button}
                    disabled={loading || loadingConfirm || loadingTable}
                  >
                    {activeStep === steps.length - 1
                      ? t("button.confirm").toUpperCase()
                      : t("button.next").toUpperCase()}
                  </Button>
                </div>
              </div>
            </form>
          </>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <div className={classes.body}>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          orientation="vertical"
        >
          {loading || loadingConfirm ? (
            <div>
              {t("txt.confirming").toLowerCase()}
              <LinearProgress />
            </div>
          ) : (
            steps.map((label, index) => (
              <Step key={label}>
                <StepLabel className={classes.left}>{label}</StepLabel>
                <StepContent className={classes.stepper}>
                  <div>{getStepContent(index)}</div>
                </StepContent>
              </Step>
            ))
          )}
        </Stepper>

        <PreviewFoto
          openPreviewFoto={openPreviewFoto}
          setOpenPreviewFoto={setOpenPreviewFoto}
          src={srcFotoPreview}
        />
      </div>
    </>
  );
};
