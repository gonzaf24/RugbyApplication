import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paises } from "../../assets/countries/paises";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { useTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import { puestosList } from "../../assets/countries/puestos.js";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "center",
    width: "100%",
  },
  puesto: {
    marginRight: "5px !important",
    width: "100%",
  },
  puestoAlt: {
    marginLeft: 5,
    width: "100%",
  },
  atocomplete: {
    width: "100%",
  },
}));

export const PlayersFreeFilter = ({
  nivel,
  setNivel,
  otroPais,
  setOtroPais,
  inputValueOtroPais,
  setInputValueOtroPais,
  puesto,
  setPuesto,
  puestoAlt,
  setPuestoAlt,
  altura,
  setAltura,
  peso,
  setPeso,
  edad,
  setEdad,
  pateador,
  setPateador,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const handleChangeOtroPais = (e) => {
    if (e) {
      setOtroPais(e);
    } else {
      setOtroPais("");
    }
  };

  const handleChangePateador = (e) => {
    e ? setPateador(e) : setPateador("");
  };

  const handleChangeNivel = (e) => {
    e ? setNivel(e) : setNivel("");
  };

  const handleChangePuesto = (e) => {
    e ? setPuesto(e) : setPuesto("");
  };

  const handleChangePuestoAlt = (e) => {
    e ? setPuestoAlt(e) : setPuestoAlt("");
  };

  const handleChangeAltura = (event, newValue) => {
    setAltura(newValue);
  };

  const handleChangePeso = (event, newValue) => {
    setPeso(newValue);
  };

  const handleChangeEdad = (event, newValue) => {
    setEdad(newValue);
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <div style={{ display: "flex" }}>
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
                  {...params}
                  label={t("txt.level")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off",
                  }}
                />
              )}
            />

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
                  label={t("txt.nationality")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off",
                  }}
                />
              )}
            />
          </div>
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
          <Autocomplete
            id="pateadorID"
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
                {...params}
                label={t("txt.kicker")}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                }}
              />
            )}
          />

          <div style={{ width: "100%", marginTop: 25 }}>
            <Typography
              style={{ color: "#757575", textAlign: "left", marginLeft: 25 }}
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
            />
          </div>
          <div style={{ width: "100%" }}>
            <Typography
              id="range-slider"
              style={{ color: "#757575", textAlign: "left", marginLeft: 25 }}
            >
              {t("txt.weight")} (kgs)
            </Typography>

            <Slider
              value={peso}
              onChange={handleChangePeso}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              max={170}
            />
          </div>

          <div style={{ width: "100%" }}>
            <Typography
              style={{ color: "#757575", textAlign: "left", marginLeft: 25 }}
              id="range-slider"
            >
              {t("txt.age")} ({t("txt.years").toLowerCase()})
            </Typography>

            <Slider
              value={edad}
              onChange={handleChangeEdad}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              max={60}
            />
          </div>
        </FormGroup>
      </FormControl>
    </>
  );
};
