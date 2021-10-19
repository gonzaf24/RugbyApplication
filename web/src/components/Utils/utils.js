import { PaisesFlag } from "../../assets/countries/paisesFlag";

export function reverseString(str) {
  return str.split("-").reverse().join("-");
}

export function shortName(str) {
  if (str.length > 10) {
    return str.substring(0, 10) + "...";
  }
  return str;
}

export function shortNameCustom(number, str) {
  if (str.length > number) {
    return str.substring(0, number) + "...";
  }
  return str;
}

export function funcionDeFechas(date1, date2) {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

export function getEdad(dateString) {
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }
  return edad;
}

export function getFlagCountry(country) {
  let salida = "";
  Object.entries(PaisesFlag).find(([key, value]) => {
    if (key === country) {
      salida = value;
      return key;
    }
  });
  return salida;
}

import { format } from "date-fns";
export async function aboutTime(fecha, t) {
  let fechaHoy = new Date();
  let fechaParamFormato = new Date(fecha);
  let fechaParam = fechaParamFormato.toISOString().slice(0, 10);
  let fechaHoyFormato = fechaHoy.toISOString().slice(0, 10);
  let numeroDeDias = await funcionDeFechas(fechaParam, fechaHoyFormato);
  if (numeroDeDias === 0 || numeroDeDias < 0) {
    return t("txt.about.today");
  } else if (numeroDeDias === 1) {
    return t("txt.about.1day");
  } else if (numeroDeDias === 2) {
    return t("txt.about.2days");
  } else if (numeroDeDias === 3) {
    return t("txt.about.3days");
  } else if (numeroDeDias === 4) {
    return t("txt.about.4days");
  } else if (numeroDeDias >= 5 && numeroDeDias <= 10) {
    return t("txt.about.5days");
  } else if (numeroDeDias >= 11 && numeroDeDias <= 20) {
    return t("txt.about.10days");
  } else if (numeroDeDias >= 30 && numeroDeDias <= 38) {
    return t("txt.about.1mes");
  } else if (numeroDeDias >= 39) {
    let fechaCompleta = format(fechaParamFormato, "dd/mm/yyyy");
    return fechaCompleta;
  } else {
    return "";
  }
}
