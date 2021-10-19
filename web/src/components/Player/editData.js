import React, { useState, useContext, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useInputValue } from "../../hooks/useInputValue";
import { puestosList } from "../../assets/countries/puestos.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputAdornment from "@material-ui/core/InputAdornment";
import { format } from "date-fns";
import AvatarImg from "../../assets/avatar.png";
import css from "../../styles/reactCropp.css";
import { uploadFile, deleteFile } from "react-s3";
import { Paises } from "../../assets/countries/paises";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactCrop from "react-image-crop";
import Box from "@material-ui/core/Box";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Fab from "@material-ui/core/Fab";
import { DOCUMENTOS_PLAYER, PERFIL_PLAYER } from "../../config";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LocalSeeIcon from "@material-ui/icons/LocalSee";
import LinearProgress from "@material-ui/core/LinearProgress";
import { PreviewVideo } from "../Preview/previewVideo";
import { PreviewFoto } from "../Preview/previewFoto";
import { Idiomas } from "../../assets/countries/idiomas";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";

let uniqid = require("uniqid");

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: "#28a499",
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

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
  actionsContainerLeft: {
    marginTop: 20,
    textAlign: "left",
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
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
  wrapper: {
    position: "relative",
    backgroundColor: "black",
  },
  player: {
    left: 0,
  },
  pink: {
    color: "#28a499",
  },
  inherit: {
    color: "#28a499",
  },
  legend: {
    width: "100%",
  },
  marcoTable: {
    border: "1px solid grey",
    margin: "10px 0px 10px 0px",
    padding: 10,
    borderRadius: 5,
  },
}));

export const EditData = ({ player, level, onSubmitPlayer, loadingConfirm }) => {
  const { lenguaje, user } = useContext(Context);
  const [len, setLen] = useState(enUS);
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    t("txt.personalData").toUpperCase(),
    t("txt.sportData").toUpperCase(),
    t("txt.documentsData").toUpperCase(),
  ];
  const [aplicar, setAplicar] = useState(false);
  const [fileNameUpload, setFileNameUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingTableHighlight, setLoadingTableHighlight] = useState(false);
  const [loadingTableMatchs, setLoadingTableMatchs] = useState(false);
  const [uid, setUid] = useState(player ? player.uid : "");
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({ unit: "%", width: 60, aspect: 9 / 9 });
  const [previewUrl, setPreviewUrl] = useState(player ? player.fotoPerfil : "");
  const [nivel, setNivel] = useState(
    level ? level : player && player.nivel ? player.nivel : ""
  );
  const [imgRef, setImgRef] = useState(null);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");
  const [pais, setPais] = useState(player ? player.paisNacimiento : "");
  const [otroPais, setOtroPais] = useState("");
  const [paisEquipoActual, setPaisEquipoActual] = useState(
    player ? player.paisEquipoActual : ""
  );
  const [paisEquipoHistory, setPaisEquipoHistory] = useState(
    player ? player.paisEquipoHistory : ""
  );

  const [paisInternacionalHistory, setPaisInternacionalHistory] = useState(
    player ? player.paisInternacionalHistory : ""
  );
  const [puesto, setPuesto] = useState(player ? player.puesto : "");
  const [puestoAlt, setPuestoAlt] = useState(player ? player.puestoAlt : "");
  const [pateador, setPateador] = useState(player ? player.pateador : "");
  const [inputValuePais, setInputValuePais] = useState(pais);
  const [inputValueOtroPais, setInputValueOtroPais] = useState("");
  const [inputValuePaisHistory, setInputValuePaisHistory] = useState("");
  const [
    inputValuePaisInternacionalHistory,
    setInputValuePaisInternacionalHistory,
  ] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    player ? player.fechaNacimiento : null
  );
  const [fechaInternacional, setFechaInternacional] = useState(null);
  const [fechaDesdeHistory, setFechaDesdeHistory] = useState(null);
  const [fechaHastaHistory, setFechaHastaHistory] = useState(null);
  const [nacionalidades, setNacionalidades] = useState(
    player && player.nacionalidades ? [...player.nacionalidades] : []
  );

  const [historialInternacional, setHistorialInternacional] = useState(
    player && player.historialInternacional
      ? () =>
          player.historialInternacional.map((item) => {
            let { uid, pais, categoria, torneo, fecha } = item;
            return {
              uid,
              pais: pais,
              categoria: categoria,
              torneo: torneo,
              fecha: new Date(fecha),
            };
          })
      : []
  );

  const [historialClubs, setHistorialClubs] = useState(
    player && player.historialClubs
      ? () =>
          player.historialClubs.map((item) => {
            let { uid, club, pais, liga, fdesde, fhasta } = item;
            return {
              uid,
              club,
              pais,
              liga,
              fdesde: new Date(fdesde),
              fhasta: new Date(fhasta),
            };
          })
      : []
  );
  const [videosHighlights, setVideosHighlights] = useState(
    player && player.videosHighlights
      ? () =>
          player.videosHighlights.map((item) => {
            let { uid, nombre, link } = item;
            return {
              uid,
              nombre,
              link,
            };
          })
      : []
  );
  const [videosMatchs, setVideosMatchs] = useState(
    player && player.videosMatchs
      ? () =>
          player.videosMatchs.map((item) => {
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
    player && player.documentos
      ? () =>
          player.documentos.map((item) => {
            let { uid, nombre, link } = item;
            return {
              uid,
              nombre,
              link,
            };
          })
      : []
  );

  const [
    disableAgregarHistoryInternacional,
    setDisabledAgregarHistoryInternacional,
  ] = useState(true);

  const [disableAgregarHistoryClub, setDisabledAgregarHistoryClub] =
    useState(true);
  const [disableAgregarNacionalidad, setDisabledAgregarNacionalidad] =
    useState(true);
  const [disableAgregarHighligh, setDisabledAgregarHighligh] = useState(true);
  const [disableAgregarMatch, setDisabledAgregarMatch] = useState(true);
  let nombre = useInputValue(player ? player.nombre : "");
  let apellido = useInputValue(player ? player.apellido : "");
  let equipoActual = useInputValue(player ? player.equipoActual : "");
  let categoria = useInputValue(player ? player.categoriaEquipoActual : "");
  let descripcion = useInputValue(player ? player.descripcion : "");
  let clubHistory = useInputValue("");
  let liga = useInputValue("");
  let nombreHighlights = useInputValue("");
  let linkHighlights = useInputValue("");
  let nombreMatchs = useInputValue("");
  let linkMatchs = useInputValue("");
  let torneoMatchInternacional = useInputValue("");
  let categoriaInternacional = useInputValue("");
  const [openPreviewVideo, setOpenPreviewVideo] = useState(false);
  const [srcVideoPreview, setSrcVideoPreview] = useState("");
  const [openPreviewFoto, setOpenPreviewFoto] = useState(false);
  const [srcFotoPreview, setSrcFotoPreview] = useState("");

  const [altura, setAltura] = useState(player ? player.altura : 0);
  const [peso, setPeso] = useState(player ? player.peso : 0);

  const [idiomas, setIdiomas] = useState(
    player && player.idiomas ? player.idiomas : []
  );
  const [idioma, setIdioma] = useState("");
  const [inputValueIdioma, setInputValueIdioma] = useState("");
  const [disableAgregarIdioma, setDisableAgregarIdioma] = useState(true);

  const [dispLaboral, setDispLaboral] = useState(
    player ? player.dispLaboral : false
  );
  const [jugadorInternacional, setJugadorInternacional] = useState(
    player ? player.jugadorInternacional : false
  );
  const [dispEntrMenores, setDispEntrMenores] = useState(
    player ? player.dispEntrMenores : false
  );

  const handleChangeJugadorInternacional = (event) => {
    console.log(
      "cheked handleChangejugadorInternacional ? " + event.target.checked
    );
    setJugadorInternacional(event.target.checked);
  };

  const handleChangeDispEntrMenores = (event) => {
    console.log("cheked handleChangeDispEntrMenores ? " + event.target.checked);
    setDispEntrMenores(event.target.checked);
  };

  const handleChangeDispLaboral = (event) => {
    console.log("cheked handleChangeDispLaboral ? " + event.target.checked);
    setDispLaboral(event.target.checked);
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

  useEffect(() => {
    if (idioma !== "") {
      setDisableAgregarIdioma(false);
    } else {
      setDisableAgregarIdioma(true);
    }
  }, [idioma]);

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

  useEffect(() => {
    if (nombreHighlights.value !== "" && linkHighlights.value !== "") {
      setDisabledAgregarHighligh(false);
    } else {
      setDisabledAgregarHighligh(true);
    }
  }, [nombreHighlights, linkHighlights]);

  useEffect(() => {
    if (nombreMatchs.value !== "" && linkMatchs.value !== "") {
      setDisabledAgregarMatch(false);
    } else {
      setDisabledAgregarMatch(true);
    }
  }, [nombreMatchs, linkMatchs]);

  useEffect(() => {
    if (
      liga.value !== "" &&
      clubHistory.value !== "" &&
      fechaDesdeHistory &&
      paisEquipoHistory
    ) {
      setDisabledAgregarHistoryClub(false);
    } else {
      setDisabledAgregarHistoryClub(true);
    }
  }, [liga, clubHistory, paisEquipoHistory, fechaDesdeHistory]);

  useEffect(() => {
    if (
      paisInternacionalHistory !== "" &&
      categoriaInternacional.value !== "" &&
      torneoMatchInternacional.value !== "" &&
      fechaInternacional
    ) {
      setDisabledAgregarHistoryInternacional(false);
    } else {
      setDisabledAgregarHistoryInternacional(true);
    }
  }, [
    paisInternacionalHistory,
    categoriaInternacional,
    torneoMatchInternacional,
    fechaInternacional,
  ]);

  useEffect(() => {
    if (otroPais !== "") {
      setDisabledAgregarNacionalidad(false);
    } else {
      setDisabledAgregarNacionalidad(true);
      setOtroPais("");
    }
  }, [otroPais, inputValueOtroPais]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFechaNacimientoChange = (date) => {
    setFechaNacimiento(date);
  };

  const handleFechaDesdeHistoryChange = (date) => {
    setFechaDesdeHistory(date);
  };

  const handleFechaInternacionalHistoryChange = (date) => {
    setFechaInternacional(date);
  };

  const handleFechaHastaHistoryChange = (date) => {
    setFechaHastaHistory(date);
  };

  const handleChangePais = (e) => {
    if (e) {
      setPais(e);
      if (!nacionalidades.includes(e)) {
        nacionalidades.splice(0, 1, e);
      }
    } else {
      setPais("");
      if (nacionalidades.includes(pais)) {
        nacionalidades.splice(nacionalidades.indexOf(pais), 1);
      }
    }
  };

  const handleChangeOtroPais = (e) => {
    if (e) {
      setOtroPais(e);
    } else {
      setOtroPais("");
    }
  };

  const handleChangePaisEquipoActual = (e) => {
    if (e) {
      setPaisEquipoActual(e);
    } else {
      setPaisEquipoActual("");
    }
  };

  const handleChangePaisHistory = (e) => {
    if (e) {
      setPaisEquipoHistory(e);
      setInputValuePaisHistory(e);
    } else {
      setPaisEquipoHistory("");
      setInputValuePaisHistory("");
    }
  };

  const handleChangePaisInternacionalHistory = (e) => {
    if (e) {
      setPaisInternacionalHistory(e);
      setInputValuePaisInternacionalHistory(e);
    } else {
      setPaisInternacionalHistory("");
      setInputValuePaisInternacionalHistory("");
    }
  };

  const handleClickAgregarOtroPais = async () => {
    if (otroPais) {
      if (!nacionalidades.includes(otroPais)) {
        nacionalidades.push(otroPais);
      }
      setNacionalidades((nacionalidades) => [...nacionalidades]);
    }
    setInputValueOtroPais("");
    setOtroPais("");
    setDisabledAgregarNacionalidad(true);
  };

  const eliminarNacionalidad = (historyClub) => {
    if (nacionalidades.includes(historyClub)) {
      nacionalidades.splice(nacionalidades.indexOf(historyClub), 1);
      setNacionalidades((nacionalidades) => [...nacionalidades]);
    }
  };

  const handleChangePuesto = (e) => {
    e ? setPuesto(e) : setPuesto("");
  };

  const handleChangePuestoAlt = (e) => {
    e ? setPuestoAlt(e) : setPuestoAlt("");
  };

  const handleChangeNivel = (e) => {
    e ? setNivel(e) : setNivel("");
  };

  const handleChangePateador = (e) => {
    e ? setPateador(e) : setPateador("");
  };

  const handleAgregarInternacionalHistory = () => {
    historialInternacional.push({
      uid: uniqid(),
      pais: paisInternacionalHistory,
      categoria: categoriaInternacional.value,
      torneo: torneoMatchInternacional.value,
      fecha: fechaInternacional ? fechaInternacional : null,
    });

    historialClubs.sort((a, b) => {
      return new Date(b.fdesde) - new Date(a.fdesde);
    });

    clubHistory.reset();
    liga.reset();
    setFechaDesdeHistory(null);
    setPaisEquipoHistory("");
    setInputValuePaisHistory("");
    setFechaHastaHistory(null);
  };

  const handleAgregarClubHistory = () => {
    historialClubs.push({
      uid: uniqid(),
      club: clubHistory.value,
      pais: paisEquipoHistory,
      liga: liga.value,
      fdesde: fechaDesdeHistory,
      fhasta: fechaHastaHistory ? fechaHastaHistory : null,
    });

    historialClubs.sort((a, b) => {
      return new Date(b.fdesde) - new Date(a.fdesde);
    });

    clubHistory.reset();
    liga.reset();
    setFechaDesdeHistory(null);
    setPaisEquipoHistory("");
    setInputValuePaisHistory("");
    setFechaHastaHistory(null);
  };

  const handleAgregarVideoHighlight = () => {
    setLoadingTableHighlight(true);
    videosHighlights.push({
      uid: uniqid(),
      nombre: nombreHighlights.value,
      link: linkHighlights.value,
    });
    nombreHighlights.reset();
    linkHighlights.reset();
    setLoadingTableHighlight(false);
  };

  const handleAgregarVideoMatchs = () => {
    setLoadingTableMatchs(true);
    videosMatchs.push({
      uid: uniqid(),
      nombre: nombreMatchs.value,
      link: linkMatchs.value,
    });
    nombreMatchs.reset();
    linkMatchs.reset();
    setLoadingTableMatchs(false);
  };

  const eliminarRowHistorialClub = (clubRow) => {
    if (historialClubs.includes(clubRow)) {
      historialClubs.splice(historialClubs.indexOf(clubRow), 1);
      historialClubs.sort((a, b) => {
        return new Date(b.fdesde) - new Date(a.fdesde);
      });
      setHistorialClubs((historialClubs) => [...historialClubs]);
    }
  };

  const eliminarRowHistorialInternacional = (interRow) => {
    if (historialInternacional.includes(interRow)) {
      historialInternacional.splice(
        historialInternacional.indexOf(interRow),
        1
      );
      historialInternacional.sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha);
      });
      setHistorialInternacional((historialInternacional) => [
        ...historialInternacional,
      ]);
    }
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
        await uploadFile(data.get("file"), DOCUMENTOS_PLAYER)
          .then((result) => {
            const url = result.location;
            documentos.push({ uid: uniqid(), nombre: nameFile, link: url });
            setLoadingTable(false);
          })
          .catch((error) => {
            console.log(
              "hay error load image player : " + JSON.stringify(error)
            );
            setLoadingTable(false);
          });
      }
    }
  };

  const onDeleteFile = async (src) => {
    setMsgError("");
    setLoadingTable(true);
    let filename = src.substring(src.lastIndexOf("/") + 1);
    await deleteFile(filename, DOCUMENTOS_PLAYER)
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

  const onDeleteFileHighlight = async (src) => {
    setLoadingTableHighlight(true);
    setVideosHighlights(videosHighlights.filter((item) => item.uid !== src));
    setLoadingTableHighlight(false);
  };

  const onFileVideoPreview = async (src) => {
    setSrcVideoPreview(src);
    setOpenPreviewVideo(true);
  };

  const onFileFotoPreview = async (src) => {
    setSrcFotoPreview(src);
    setOpenPreviewFoto(true);
  };

  const onDeleteFileMatch = async (src) => {
    setLoadingTableMatchs(true);
    setVideosMatchs(videosMatchs.filter((item) => item.uid !== src));
    setLoadingTableMatchs(false);
  };

  const submitDatosPersonales = (event) => {
    event.preventDefault();
    setInputValuePais(pais);
    handleNext();
  };

  const submitDatosDeportivos = (event) => {
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
        await uploadFile(data.get("file"), PERFIL_PLAYER)
          .then((result) => {
            url = result.location;
          })
          .catch((error) => {
            url = previewUrl;
            console.log(
              "Error aqui al cargr imagen es : " + JSON.stringify(error)
            );
          });
      } else if (previewUrl) {
        url = previewUrl;
      }
      onSubmitPlayer({
        nombre: nombre.value,
        apellido: apellido.value,
        fechaNacimiento: fechaNacimiento,
        paisNacimiento: pais,
        nacionalidades: nacionalidades,
        puesto: puesto,
        puestoAlt: puestoAlt,
        pateador: pateador,
        altura: altura,
        peso: peso,
        equipoActual: equipoActual.value,
        paisEquipoActual: paisEquipoActual,
        categoriaEquipoActual: categoria.value,
        historialClubs: historialClubs,
        fotoPerfil: url,
        documentos: documentos,
        videosHighlights: videosHighlights,
        videosMatchs: videosMatchs,
        uid: uid,
        nivel: nivel,
        idiomas: idiomas,
        dispLaboral: dispLaboral,
        dispEntrMenores: dispEntrMenores,
        descripcion: descripcion.value,
        jugadorInternacional: jugadorInternacional,
        historialInternacional: jugadorInternacional
          ? historialInternacional
          : [],
      });

      setLoading(false);
    } catch (error) {
      console.log(" Error essss :" + JSON.stringify(error));
    }
  };

  const handleChangeAltura = (event, newValue) => {
    setAltura(newValue);
  };

  const handleChangePeso = (event, newValue) => {
    setPeso(newValue);
  };

  const eliminarIdioma = (idioma) => {
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
                label={t("txt.name")}
                name="nombre"
                {...nombre}
              />
              <TextField
                style={{ margin: 0 }}
                required
                type="text"
                fullWidth
                id="apellido"
                label={t("txt.surname")}
                name="apellido"
                value={""}
                {...apellido}
              />

              <MuiPickersUtilsProvider locale={len} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.atocomplete}
                  required
                  style={{ margin: 0 }}
                  id="date-picker-dialog-required"
                  label={t("txt.birthDate")}
                  format="dd/MM/yyyy"
                  value={fechaNacimiento}
                  onChange={handleFechaNacimientoChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>

              <Autocomplete
                className={classes.atocomplete}
                id="paisID"
                options={Paises}
                defaultValue={pais}
                getOptionLabel={(option) => option}
                getOptionSelected={(option, value) => {
                  if (option === value) {
                    setPais(value);
                  }
                }}
                onChange={(event, value) => handleChangePais(value)}
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
              <div style={{ display: "flex" }}>
                <Autocomplete
                  className={classes.atocomplete}
                  id="otroPaisID"
                  options={Paises}
                  defaultValue={otroPais}
                  autoHighlight
                  inputValue={inputValueOtroPais}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      setOtroPais(value);
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValueOtroPais(newInputValue);
                  }}
                  onChange={(event, value) => handleChangeOtroPais(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 0 }}
                      label={t("txt.otherNationalities")}
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
                  onClick={() => handleClickAgregarOtroPais()}
                  disabled={disableAgregarNacionalidad}
                >
                  {t("txt.add")}
                </Button>
              </div>

              <TableContainer className={classes.marcoTable}>
                {nacionalidades && nacionalidades.length ? (
                  <div className={classes.nacionalidades}>
                    {t("txt.nationalities").toUpperCase()}
                  </div>
                ) : (
                  ""
                )}
                <Table aria-label="nacionalidades">
                  <TableBody>
                    {nacionalidades.map((row) => (
                      <TableRow key={row}>
                        <TableCell
                          className={classes.noPadding}
                          component="th"
                          scope="row"
                        >
                          {row}
                        </TableCell>
                        {row !== pais && (
                          <>
                            <TableCell
                              className={classes.noPadding}
                              disabled
                              align="right"
                            >
                              <DeleteForeverIcon
                                onClick={() => eliminarNacionalidad(row)}
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
              <div className={classes.actionsContainerLeft}>
                <FormLabel className={classes.legend} component="legend">
                  {t("txt.jobAvailability")}
                </FormLabel>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>{t("button.no")}</Grid>
                  <Grid item>
                    <AntSwitch
                      className={classes.inherit}
                      checked={dispLaboral}
                      onChange={handleChangeDispLaboral}
                      name="disponibilidadLaboral"
                      color="inherit"
                    />
                  </Grid>
                  <Grid item>{t("button.yes")}</Grid>
                </Grid>
              </div>
              <div className={classes.actionsContainerLeft}>
                <FormLabel className={classes.legend} component="legend">
                  {t("txt.jobAvailabilityToTrain")}
                </FormLabel>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>{t("button.no")}</Grid>
                  <Grid item>
                    <AntSwitch
                      className={classes.inherit}
                      checked={dispEntrMenores}
                      onChange={handleChangeDispEntrMenores}
                      name="disponibilidadEntrMenores"
                      color="inherit"
                    />
                  </Grid>
                  <Grid item>{t("button.yes")}</Grid>
                </Grid>
              </div>

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
            <form className={classes.form} onSubmit={submitDatosDeportivos}>
              {!level && (
                <Autocomplete
                  id="levelID"
                  className={classes.puesto}
                  options={["AMATEUR", "SEMI-PRO", "PROFESSIONAL"]}
                  defaultValue={nivel}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      setNivel(value);
                    }
                  }}
                  onChange={(event, value) => handleChangeNivel(value)}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={t("txt.level")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
              )}
              <div style={{ display: "flex" }}>
                <Autocomplete
                  id="puestoID"
                  className={classes.puesto}
                  options={puestosList}
                  defaultValue={puesto}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      setPuesto(value);
                    }
                  }}
                  onChange={(event, value) => handleChangePuesto(value)}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={t("txt.position")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />

                <Autocomplete
                  id="puestoAltID"
                  className={classes.puestoAlt}
                  options={puestosList}
                  defaultValue={puestoAlt}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      setPuestoAlt(value);
                    }
                  }}
                  onChange={(event, value) => handleChangePuestoAlt(value)}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={t("txt.positionAlt")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
              </div>

              <div style={{ width: "100%", marginTop: 25 }}>
                <Typography
                  style={{
                    color: "#757575",
                    textAlign: "left",
                    marginLeft: 25,
                  }}
                  id="range-slider"
                >
                  {t("txt.height")} (cms)
                </Typography>

                <Slider
                  value={altura}
                  onChange={handleChangeAltura}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  max={220}
                  min={50}
                />
              </div>
              <div style={{ width: "100%" }}>
                <Typography
                  id="range-slider"
                  style={{
                    color: "#757575",
                    textAlign: "left",
                    marginLeft: 25,
                  }}
                >
                  {t("txt.weight")} (kgs)
                </Typography>

                <Slider
                  value={peso}
                  onChange={handleChangePeso}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  max={170}
                  min={50}
                />
              </div>

              <div style={{ display: "flex" }}>
                <Autocomplete
                  id="pateadorID"
                  className={classes.puesto}
                  options={["YES", "NO"]}
                  defaultValue={pateador}
                  getOptionLabel={(option) => option}
                  getOptionSelected={(option, value) => {
                    if (option === value) {
                      setPateador(value);
                    }
                  }}
                  onChange={(event, value) => handleChangePateador(value)}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={t("txt.kicker")}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
              </div>

              <TextField
                className={classes.puesto}
                type="text"
                fullWidth
                id="eqActual"
                label={t("txt.currentTeam")}
                name="eqActual"
                {...equipoActual}
              />

              <Autocomplete
                id="paisEquipoActualID"
                className={classes.atocomplete}
                options={Paises}
                defaultValue={paisEquipoActual}
                getOptionLabel={(option) => option}
                getOptionSelected={(option, value) => {
                  if (option === value) {
                    setPaisEquipoActual(value);
                  }
                }}
                onChange={(event, value) => handleChangePaisEquipoActual(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("txt.countryCurrentTeam")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "off",
                    }}
                  />
                )}
              />

              <TextField
                className={classes.puesto}
                type="text"
                fullWidth
                id="categoria"
                label={t("txt.currentTeamCat")}
                name="categoria"
                {...categoria}
              />

              <div className={classes.actionsContainerLeft}>
                <FormLabel className={classes.legend} component="legend">
                  {t("txt.internationalPlayer")}
                </FormLabel>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>{t("button.no")}</Grid>
                  <Grid item>
                    <AntSwitch
                      className={classes.inherit}
                      checked={jugadorInternacional}
                      onChange={handleChangeJugadorInternacional}
                      name="jugadorInternacional"
                      color="inherit"
                    />
                  </Grid>
                  <Grid item>{t("button.yes")}</Grid>
                </Grid>
              </div>

              {jugadorInternacional && (
                <div className={classes.tableHistory}>
                  <div style={{ display: "flex", margin: "6px" }}>
                    <Autocomplete
                      className={classes.atocomplete}
                      id="paisDatosDeportivosIntHistoryID"
                      options={Paises}
                      defaultValue={paisInternacionalHistory}
                      autoHighlight
                      inputValue={inputValuePaisInternacionalHistory}
                      size="small"
                      getOptionLabel={(option) => option}
                      getOptionSelected={(option, value) => {
                        if (option === value) {
                          setPaisInternacionalHistory(value);
                        }
                      }}
                      onInputChange={(event, newInputValue) => {
                        setInputValuePaisInternacionalHistory(newInputValue);
                      }}
                      onChange={(event, value) =>
                        handleChangePaisInternacionalHistory(value)
                      }
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          style={{ margin: 0 }}
                          label={t("txt.country") + "*"}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "off",
                            style: { fontSize: 12 },
                          }}
                        />
                      )}
                    />

                    <TextField
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      size="small"
                      className={classes.puestoAlt}
                      type="text"
                      fullWidth
                      id="category"
                      label={t("txt.category") + "*"}
                      name="category"
                      {...categoriaInternacional}
                    />
                  </div>

                  <div style={{ display: "flex", margin: "6px" }}>
                    <TextField
                      className={classes.puesto}
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      size="small"
                      type="text"
                      fullWidth
                      id="testMatch"
                      label={t("txt.testMatch") + "*"}
                      name="testMatch"
                      {...torneoMatchInternacional}
                    />
                    <MuiPickersUtilsProvider locale={len} utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        size="small"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        className={classes.puesto}
                        style={{ margin: 0 }}
                        id="date-requiredA"
                        label={t("txt.date") + "*"}
                        format="yyyy"
                        value={fechaInternacional}
                        onChange={handleFechaInternacionalHistoryChange}
                        views={["year"]}
                      />
                    </MuiPickersUtilsProvider>

                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.buttonAgregar}
                      onClick={() => handleAgregarInternacionalHistory()}
                      disabled={disableAgregarHistoryInternacional}
                    >
                      {t("txt.add")}
                    </Button>
                  </div>

                  <TableContainer>
                    <div className={classes.nacionalidades}>
                      {t("txt.internationalPlayer")}
                    </div>

                    <Table aria-label="internationalPlayer">
                      <TableHead style={{ backgroundColor: "cadetblue" }}>
                        <TableRow>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.country")}
                          </TableCell>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.category")}
                          </TableCell>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.testMatch")}
                          </TableCell>
                          <TableCell className={classes.tableFontSize}>
                            {t("txt.date")}
                          </TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {historialInternacional &&
                          historialInternacional.map((row) => (
                            <TableRow key={row.uid}>
                              <TableCell className={classes.tableFontSize}>
                                {row.pais}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.categoria}
                              </TableCell>
                              <TableCell className={classes.tableFontSize}>
                                {row.torneo}
                              </TableCell>

                              <TableCell className={classes.tableFontSize}>
                                {row.fecha
                                  ? format(row.fecha, "yyyy", {
                                      locale: es,
                                    })
                                  : ""}
                              </TableCell>
                              <TableCell
                                className={classes.tableFontSize}
                                className={classes.noPadding}
                                disabled
                              >
                                <DeleteForeverIcon
                                  onClick={() =>
                                    eliminarRowHistorialInternacional(row)
                                  }
                                  color="error"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              <div className={classes.nacionalidades}>
                {t("txt.description")}
              </div>

              <TextareaAutosize
                className={classes.textArea}
                rowsMax={8}
                rowsMin={4}
                aria-label={t("txt.description")}
                placeholder={t("txt.descriptionHighlight")}
                {...descripcion}
              />

              <br />
              <br />

              <div className={classes.tableHistory}>
                <div style={{ display: "flex", margin: "6px" }}>
                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="club"
                    label={t("txt.club") + "*"}
                    name="club"
                    {...clubHistory}
                  />

                  <Autocomplete
                    className={classes.atocomplete}
                    id="paisDatosDeportivosHistoryID"
                    options={Paises}
                    defaultValue={paisEquipoHistory}
                    autoHighlight
                    inputValue={inputValuePaisHistory}
                    size="small"
                    getOptionLabel={(option) => option}
                    getOptionSelected={(option, value) => {
                      if (option === value) {
                        setPaisEquipoHistory(value);
                      }
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputValuePaisHistory(newInputValue);
                    }}
                    onChange={(event, value) => handleChangePaisHistory(value)}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        style={{ margin: 0 }}
                        label={t("txt.country") + "*"}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "off",
                          style: { fontSize: 12 },
                        }}
                      />
                    )}
                  />

                  <TextField
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    className={classes.puestoAlt}
                    type="text"
                    fullWidth
                    id="liga"
                    label={t("txt.league") + "*"}
                    name="liga"
                    {...liga}
                  />
                </div>

                <div style={{ display: "flex", margin: "6px" }}>
                  <MuiPickersUtilsProvider locale={len} utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      size="small"
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      className={classes.puesto}
                      style={{ margin: 0 }}
                      id="date-picker-dialog-requiredA"
                      label={t("txt.dateFrom") + "*"}
                      format="yyyy"
                      value={fechaDesdeHistory}
                      onChange={handleFechaDesdeHistoryChange}
                      views={["year"]}
                    />
                  </MuiPickersUtilsProvider>

                  <MuiPickersUtilsProvider locale={len} utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      size="small"
                      inputProps={{ style: { fontSize: 12 } }}
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      className={classes.puestoAlt}
                      style={{ margin: 0 }}
                      id="date-picker-dialog-requiredB"
                      label={t("txt.dateTo")}
                      format="yyyy"
                      value={fechaHastaHistory}
                      onChange={handleFechaHastaHistoryChange}
                      views={["year"]}
                    />
                  </MuiPickersUtilsProvider>

                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonAgregar}
                    onClick={() => handleAgregarClubHistory()}
                    disabled={disableAgregarHistoryClub}
                  >
                    {t("txt.add")}
                  </Button>
                </div>

                <TableContainer>
                  <div className={classes.nacionalidades}>
                    {t("txt.historyClub")}
                  </div>

                  <Table aria-label="historiaClubs">
                    <TableHead style={{ backgroundColor: "cadetblue" }}>
                      <TableRow>
                        <TableCell className={classes.tableFontSize}>
                          {t("txt.dateFromShort")}
                        </TableCell>
                        <TableCell className={classes.tableFontSize}>
                          {t("txt.dateToShort")}
                        </TableCell>
                        <TableCell className={classes.tableFontSize}>
                          {t("txt.club")}
                        </TableCell>
                        <TableCell className={classes.tableFontSize}>
                          {t("txt.country")}
                        </TableCell>
                        <TableCell className={classes.tableFontSize}>
                          {t("txt.league")}
                        </TableCell>

                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historialClubs &&
                        historialClubs.map((row) => (
                          <TableRow key={row.uid}>
                            <TableCell className={classes.tableFontSize}>
                              {row.fdesde
                                ? format(row.fdesde, "yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.fhasta
                                ? format(row.fhasta, "yyyy", {
                                    locale: es,
                                  })
                                : ""}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.club}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.pais}
                            </TableCell>
                            <TableCell className={classes.tableFontSize}>
                              {row.liga}
                            </TableCell>

                            <TableCell
                              className={classes.tableFontSize}
                              className={classes.noPadding}
                              disabled
                            >
                              <DeleteForeverIcon
                                onClick={() => eliminarRowHistorialClub(row)}
                                color="error"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

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

      case 2:
        return (
          <>
            <form className={classes.form} onSubmit={submitConfirm}>
              <div className={classes.tableHistory}>
                <div className={classes.title}>FOTO PERFIL</div>
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
                      {upImg && <p>mueve el recuadro para ajustar tu foto</p>}
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
                <h4>will look like :</h4>
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
                  aplicar
                </Button>
              </div>
              <br />

              <div className={classes.tableHistory}>
                <div className={classes.title}>FOTO PASAPORTE / DOCUMENTOS</div>
                {!loading && (
                  <Box justifyContent="center" marginTop="15px">
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
                {documentos && (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>nombre</TableCell>
                          <TableCell align="right">accion</TableCell>
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
                                    style={{ color: "green", marginRight: 15 }}
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
              <div className={classes.tableHistory}>
                <div className={classes.title}>VIDEOS HIGHLIGHTS</div>
                <div style={{ display: "flex", margin: "6px" }}>
                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="nomvid"
                    label="Nombre video *"
                    name="nomvid"
                    {...nombreHighlights}
                  />

                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="linkH"
                    label="Link (youtube) *"
                    name="linkH"
                    {...linkHighlights}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonAgregar}
                    onClick={() => handleAgregarVideoHighlight()}
                    disabled={disableAgregarHighligh}
                  >
                    agregar
                  </Button>
                </div>
                {videosHighlights && (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>video</TableCell>
                          <TableCell align="right">accion</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {videosHighlights.map((row) => (
                          <TableRow key={row.uid}>
                            <TableCell component="th" scope="row">
                              {row.nombre}
                            </TableCell>
                            <TableCell align="right">
                              {loadingTableHighlight && (
                                <div className={classes.spinner}>
                                  <CircularProgress />
                                </div>
                              )}
                              {!loadingTableHighlight && (
                                <>
                                  <PlayArrowIcon
                                    style={{ color: "green", marginRight: 15 }}
                                    fontSize="small"
                                    onClick={() => onFileVideoPreview(row.link)}
                                  />

                                  <DeleteForeverOutlinedIcon
                                    style={{ color: "red" }}
                                    fontSize="small"
                                    onClick={() =>
                                      onDeleteFileHighlight(row.uid)
                                    }
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
              <div className={classes.tableHistory}>
                <div className={classes.title}>VIDEOS PARTIDOS COMPLETOS</div>
                <div style={{ display: "flex", margin: "6px" }}>
                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="nomvid"
                    label="Nombre video *"
                    name="nomvid"
                    {...nombreMatchs}
                  />

                  <TextField
                    className={classes.puesto}
                    inputProps={{ style: { fontSize: 12 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    size="small"
                    type="text"
                    fullWidth
                    id="linkH"
                    label="Link (youtube) *"
                    name="linkH"
                    {...linkMatchs}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonAgregar}
                    onClick={() => handleAgregarVideoMatchs()}
                    disabled={disableAgregarMatch}
                  >
                    agregar
                  </Button>
                </div>
                {videosMatchs && (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>video</TableCell>
                          <TableCell align="right">accion</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {videosMatchs.map((row) => (
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
                                    style={{ color: "green", marginRight: 15 }}
                                    fontSize="small"
                                    onClick={() => onFileVideoPreview(row.link)}
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
