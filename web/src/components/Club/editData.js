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
import css from "../../styles/reactCropp.css";
import { uploadFile, deleteFile } from "react-s3";
import { Paises } from "../../assets/countries/paises";
import countriesList from "../../assets/countries/countries.json";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactCrop from "react-image-crop";
import Box from "@material-ui/core/Box";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Fab from "@material-ui/core/Fab";
import { DOCUMENTOS_CLUB, PERFIL_CLUB } from "../../config";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LocalSeeIcon from "@material-ui/icons/LocalSee";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PreviewFoto } from "../Preview/previewFoto";
import { PreviewVideo } from "../Preview/previewVideo";
import { Categorias } from "../../assets/countries/categorias";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Idiomas } from "../../assets/countries/idiomas";

let uniqid = require("uniqid");

const useStyles = makeStyles((theme) => ({
  wellcomeText: {
    height: "150px",
    paddingTop: "90px",
    letterSpacing: "3px",
  },
  body: {
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    height: "fit-content",
    width: "100%",
  },
  register: {
    margin: theme.spacing(1),
    width: 200,
    marginBottom: 25,
  },
  root: {
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
  alturaPeso: {
    marginLeft: 10,
    maxWidth: 80,
  },
  puesto: {
    marginRight: "5px !important",
    width: "100%",
  },
  puestoAlt: {
    marginLeft: 5,
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
  textArea: {
    width: "100%",
    marginTop: 20,
  },
  tableHistory: {
    border: "1px solid #949494",
    borderRadius: 5,
  },
  resize: {
    fontSize: 5,
  },
  stepper: {
    paddingLeft: "10px !important",
    width: "100%",
  },
  tableFontSize: {
    fontSize: "0.7rem",
    padding: 3,
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
  contenedorFotoPerfil: {
    boder: "2px solid black",
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

let ciudadesList = [];

export const EditData = ({ club, onSubmitClub, loadingConfirm }) => {
  const { lenguaje, user } = useContext(Context);
  const [len, setLen] = useState(enUS);
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    t("txt.clubData").toUpperCase(),
    t("txt.documentsData").toUpperCase(),
  ];

  const [aplicar, setAplicar] = useState(false);
  const [fileNameUpload, setFileNameUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingTableMatchs, setLoadingTableMatchs] = useState(false);

  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({ unit: "%", width: 60, aspect: 9 / 9 });
  const [previewUrl, setPreviewUrl] = useState(
    club && club.fotoPerfil ? club.fotoPerfil : ""
  );
  const [imgRef, setImgRef] = useState(null);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");
  const [openPreviewVideo, setOpenPreviewVideo] = useState(false);
  const [srcVideoPreview, setSrcVideoPreview] = useState("");
  const [openPreviewFoto, setOpenPreviewFoto] = useState(false);
  const [srcFotoPreview, setSrcFotoPreview] = useState("");
  const [idiomaResponsable, setIdiomaResponsable] = useState("");
  const [idiomas, setIdiomas] = useState(
    club && club.idiomas ? club.idiomas : []
  );
  const [disableAgregarVideo, setDisabledAgregarVideo] = useState(true);
  const [pais, setPais] = useState(club && club.pais ? club.pais : "");
  const [estadoCiudad, setEstadoCiudad] = useState(
    club && club.estadoCiudad ? club.estadoCiudad : ""
  );

  const [videos, setVideos] = useState(
    club && club.videos
      ? () =>
          club.videos.map((item) => {
            let { uid, nombre, link } = item;
            return {
              uid,
              nombre,
              link,
            };
          })
      : []
  );

  const [documentos, setDocumentos] = useState(
    club && club.documentos
      ? () =>
          club.documentos.map((item) => {
            let { uid, nombre, link } = item;
            return {
              uid,
              nombre,
              link,
            };
          })
      : []
  );
  let nombre = useInputValue(club ? club.nombre : "");
  let direccion = useInputValue(club ? club.direccion : "");
  let cp = useInputValue(club ? club.cp : "");
  let presidente = useInputValue(club ? club.presidente : "");
  let web = useInputValue(club ? club.web : "");
  let responsableContrataciones = useInputValue(
    club ? club.responsableContrataciones : ""
  );
  let telefono = useInputValue(club ? club.telefonoResponsable : "");
  let email = useInputValue(club ? club.emailResponsable : "");
  let videoName = useInputValue("");
  let linkVideo = useInputValue("");

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

  const [inputValueIdiomaResponsable, setInputValueIdiomaResponsable] =
    useState("");
  const [disableAgregarIdiomaResponsable, setDisableAgregarIdiomaResponsable] =
    useState(true);

  const handleClickAgregarIdiomaResponsable = async () => {
    if (idiomaResponsable) {
      if (!idiomas.includes(idiomaResponsable)) {
        idiomas.push(idiomaResponsable);
      }
      setIdiomas((idiomas) => [...idiomas]);
    }
    setInputValueIdiomaResponsable("");
    setIdiomaResponsable("");
    setDisableAgregarIdiomaResponsable(true);
  };

  const onFileVideoPreview = async (src) => {
    setSrcVideoPreview(src);
    setOpenPreviewVideo(true);
  };

  const onFileFotoPreview = async (src) => {
    setSrcFotoPreview(src);
    setOpenPreviewFoto(true);
  };

  const handleChangeIdiomaResponsable = (e) => {
    if (e) {
      setIdiomaResponsable(e);
      setInputValueIdiomaResponsable(e);
    } else {
      setIdiomaResponsable("");
      setInputValueIdiomaResponsable("");
    }
  };

  useEffect(() => {
    if (idiomaResponsable !== "") {
      setDisableAgregarIdiomaResponsable(false);
    } else {
      setDisableAgregarIdiomaResponsable(true);
    }
  }, [idiomaResponsable]);

  useEffect(() => {
    if (videos.value !== "" && linkVideo.value !== "") {
      setDisabledAgregarVideo(false);
    } else {
      setDisabledAgregarVideo(true);
    }
  }, [videos, linkVideo]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAgregarVideo = () => {
    setLoadingTableMatchs(true);
    videos.push({
      uid: uniqid(),
      nombre: videoName.value,
      link: linkVideo.value,
    });
    videoName.reset();
    linkVideo.reset();
    setLoadingTableMatchs(false);
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
      if (nameFilePortadaShow.length > 9) {
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
        if (nameFile.length > 9) {
          nameFile = nameFile.substring(0, 8).concat(" ... " + ext);
        }
        let data = new FormData();
        data.append("file", file, fileName);
        await uploadFile(data.get("file"), DOCUMENTOS_CLUB)
          .then((result) => {
            const url = result.location;
            documentos.push({ uid: uniqid(), nombre: nameFile, link: url });
            setLoadingTable(false);
          })
          .catch((error) => {
            console.log("hay error load image club : " + JSON.stringify(error));
            setLoadingTable(false);
          });
      }
    }
  };

  const onDeleteFile = async (src) => {
    setMsgError("");
    setLoadingTable(true);
    let filename = src.substring(src.lastIndexOf("/") + 1);
    await deleteFile(filename, DOCUMENTOS_CLUB)
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

  const onDeleteFileMatch = async (src) => {
    setLoadingTableMatchs(true);
    setVideos(videos.filter((item) => item.uid !== src));
    setLoadingTableMatchs(false);
  };

  const submitDatosPersonales = (event) => {
    event.preventDefault();
    handleNext();
  };

  const submitConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let url = null;
      if (file) {
        let data = new FormData();
        data.append("file", file, fileNameUpload);
        await uploadFile(data.get("file"), PERFIL_CLUB)
          .then((result) => {
            url = result.location;
          })
          .catch((error) => {
            console.log("Error : " + error);
          });
      } else if (previewUrl) {
        url = previewUrl;
      }
      onSubmitClub({
        nombre: nombre.value,
        direccion: direccion.value,
        pais: pais,
        estadoCiudad: estadoCiudad,
        cp: cp.value,
        categorias: categorias,
        presidente: presidente.value,
        responsableContrataciones: responsableContrataciones.value,
        telefonoResponsable: telefono.value,
        emailResponsable: email.value,
        fotoPerfil: url,
        documentos: documentos,
        videos: videos,
        clubType: user.clubType,
        idiomas: idiomas,
        web: web.value,
      });
      setLoading(false);
    } catch (error) {
      console.log(" Error :" + error);
    }
  };

  const [categorias, setCategorias] = useState(
    club && club.categorias ? club.categorias : []
  );
  const [categoria, setCategoria] = useState("");
  const [inputValueCategoria, setInputValueCategoria] = useState("");
  const [disableAgregarCategoria, setDisableAgregarCategoria] = useState(true);

  const eliminarCategoria = (categoria) => {
    if (categorias.includes(categoria)) {
      categorias.splice(categorias.indexOf(categoria), 1);
      setCategorias((categorias) => [...categorias]);
    }
  };

  const handleClickAgregarIdioma = async () => {
    if (categoria) {
      if (!categorias.includes(categoria)) {
        categorias.push(categoria);
      }
      setCategorias((categorias) => [...categorias]);
    }
    setInputValueCategoria("");
    setCategoria("");
    setDisableAgregarCategoria(true);
  };

  const handleChangeCategoria = (e) => {
    if (e) {
      setCategoria(e);
      setInputValueCategoria(e);
    } else {
      setCategoria("");
      setInputValueCategoria("");
    }
  };

  useEffect(() => {
    if (categoria !== "") {
      setDisableAgregarCategoria(false);
    } else {
      setDisableAgregarCategoria(true);
    }
  }, [categoria]);

  const eliminarIdiomaResponsable = (idioma) => {
    if (idiomas.includes(idioma)) {
      idiomas.splice(idiomas.indexOf(idioma), 1);
      setIdiomas((idiomas) => [...idiomas]);
    }
  };

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
                label={t("txt.fullNameClub")}
                name="nombre"
                {...nombre}
              />
              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="adress"
                label={t("txt.adress")}
                name="adress"
                value={""}
                {...direccion}
              />

              <Autocomplete
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
                          ciudadesList.push(pais.States[estados].StateName);
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
                        ciudadesList.push(pais.States[estados].StateName);
                      });
                      setPais(value);
                    }
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={t("txt.country")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "off",
                    }}
                  />
                )}
              />
              <Autocomplete
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

              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="cp"
                label={t("txt.cp")}
                name="cp"
                value={""}
                {...cp}
              />

              <div style={{ display: "flex" }}>
                <Autocomplete
                  className={classes.atocomplete}
                  id="categoriasId"
                  options={Categorias}
                  autoHighlight
                  defaultValue={categoria}
                  inputValue={inputValueCategoria}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      return value;
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValueCategoria(newInputValue);
                  }}
                  onChange={(event, value) => handleChangeCategoria(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 0 }}
                      label={t("txt.categories")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  className={classes.buttonAgregar}
                  onClick={() => handleClickAgregarIdioma()}
                  disabled={disableAgregarCategoria}
                >
                  {t("txt.add")}
                </Button>
              </div>

              {categorias && categorias.length != 0 && (
                <>
                  <TableContainer className={classes.marcoTable}>
                    <div className={classes.nacionalidades}>
                      {t("txt.categories").toUpperCase()}
                    </div>
                    <Table aria-label="categorias">
                      <TableBody>
                        {categorias.map((row) => (
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
                                onClick={() => eliminarCategoria(row)}
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
                id="presidente"
                label={t("txt.president")}
                name="presidente"
                value={""}
                {...presidente}
              />

              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="responsableContrataciones"
                label={t("txt.hiringManager")}
                name="responsableContrataciones"
                value={""}
                {...responsableContrataciones}
              />

              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="telefono"
                label={t("txt.phoneManager")}
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
                label={t("txt.emailManager")}
                name="email"
                value={""}
                {...email}
              />

              <div style={{ display: "flex" }}>
                <Autocomplete
                  className={classes.atocomplete}
                  id="lagunageId"
                  options={Idiomas}
                  autoHighlight
                  defaultValue={idiomaResponsable}
                  inputValue={inputValueIdiomaResponsable}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      return value;
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValueIdiomaResponsable(newInputValue);
                  }}
                  onChange={(event, value) =>
                    handleChangeIdiomaResponsable(value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 0 }}
                      label={t("txt.languagesManager")}
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
                  onClick={() => handleClickAgregarIdiomaResponsable()}
                  disabled={disableAgregarIdiomaResponsable}
                >
                  {t("txt.add")}
                </Button>
              </div>

              {idiomas && idiomas.length > 0 && (
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
                                onClick={() => eliminarIdiomaResponsable(row)}
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
                type="text"
                fullWidth
                id="web"
                label={t("txt.web")}
                name="web"
                value={""}
                {...web}
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
                                    onClick={() => onFileFotoPreview(row.link)}
                                    fontSize="small"
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
              <div className={classes.tableHistory}>
                <div className={classes.title}>
                  {t("txt.videos").toUpperCase()}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: 6,
                    marginRight: 6,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="nomvid"
                    label={t("txt.videoName").toLowerCase() + "*"}
                    name="nomvid"
                    {...videoName}
                  />

                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="linkH"
                    label={t("txt.linkYoutube").toLowerCase() + "*"}
                    name="linkH"
                    {...linkVideo}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonAgregar}
                    onClick={() => handleAgregarVideo()}
                    disabled={disableAgregarVideo}
                  >
                    {t("txt.add")}
                  </Button>
                </div>
                {videos && videos.length !== 0 && (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("txt.video")}</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {videos.map((row) => (
                          <TableRow key={row.uid}>
                            <TableCell component="th" scope="row">
                              {row.nombre}
                            </TableCell>
                            <TableCell align="right">
                              {loadingTableMatchs && (
                                <div className={classes.spinner}>
                                  <CircularProgress />
                                </div>
                              )}
                              {!loadingTableMatchs && (
                                <>
                                  <PlayArrowIcon
                                    style={{
                                      color: "green",
                                      marginRight: 15,
                                    }}
                                    onClick={() => onFileVideoPreview(row.link)}
                                    fontSize="small"
                                  />

                                  <DeleteForeverOutlinedIcon
                                    style={{ color: "red" }}
                                    fontSize="small"
                                    onClick={() => onDeleteFileMatch(row.uid)}
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

        <PreviewVideo
          openPreviewVideo={openPreviewVideo}
          setOpenPreviewVideo={setOpenPreviewVideo}
          src={srcVideoPreview}
        />

        <PreviewFoto
          openPreviewFoto={openPreviewFoto}
          setOpenPreviewFoto={setOpenPreviewFoto}
          src={srcFotoPreview}
        />
      </div>
    </>
  );
};
