import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { useTranslation } from "react-i18next";
import { Paises } from "../../assets/countries/paises";

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "center",
    width: "100%",
  },
  atocomplete: {
    width: "100%",
  },
}));

export const AgentFilter = ({
  paisOpera,
  setPaisOpera,
  inputValuePaisOpera,
  setInputValuePaisOpera,
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const handleChangePaisOpera = (e) => {
    if (e) {
      setPaisOpera(e);
      setInputValuePaisOpera(e);
    } else {
      setPaisOpera("");
      setInputValuePaisOpera("");
    }
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <Autocomplete
            className={classes.atocomplete}
            id="paisOperaID"
            options={Paises}
            autoHighlight
            defaultValue={paisOpera}
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
        </FormGroup>
      </FormControl>
    </>
  );
};
