import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paises } from "../../assets/countries/paises";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { useTranslation } from "react-i18next";
import countriesList from "../../assets/countries/countries.json";
import { Categorias } from "../../assets/countries/categorias";

const useStyles = makeStyles((theme) => ({
  formControlClubs: {
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
}));

let ciudadesList = [];

export const ClubFilter = ({
  nombreClub,
  pais,
  setPais,
  inputValuePais,
  setInputValuePais,
  estadoCiudad,
  setEstadoCiudad,
  categoriaClub,
  setCategoriaClub,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const handleChangeCategoriaClub = (e) => {
    e ? setCategoriaClub(e) : setCategoriaClub("");
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.formControlClubs}>
        <FormGroup>
          <div style={{ display: "flex" }}>
            <Autocomplete
              id="paisID"
              className={classes.puesto}
              options={Paises}
              defaultValue={pais}
              inputValue={inputValuePais}
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
              onInputChange={(event, newInputValue) => {
                setInputValuePais(newInputValue);
                setPais(newInputValue);
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
              className={classes.puestoAlt}
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
          <div style={{ display: "flex" }}>
            <TextField
              className={classes.puesto}
              style={{ margin: 0 }}
              type="text"
              fullWidth
              id="nombre"
              label={t("txt.teamName")}
              name="nombre"
              {...nombreClub}
            />

            <Autocomplete
              id="levelID"
              className={classes.puestoAlt}
              options={Categorias}
              defaultValue={categoriaClub}
              getOptionLabel={(option) => option}
              getOptionSelected={(option, value) => {
                if (option === value) {
                  setCategoriaClub(value);
                }
              }}
              onChange={(event, value) => handleChangeCategoriaClub(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("txt.category")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off",
                  }}
                />
              )}
            />
          </div>
        </FormGroup>
      </FormControl>
    </>
  );
};
