import { gql } from "apollo-boost";

export const GET_CLUB = gql`
  mutation club($input: Id!) {
    club(input: $input) {
      nombre
      direccion
      pais
      estadoCiudad
      cp
      categorias
      presidente
      responsableContrataciones
      telefonoResponsable
      emailResponsable
      fotoPerfil
      clubType
      uid
      userEmail
      idiomas
      web
      documentos {
        uid
        nombre
        link
      }
      videos {
        uid
        nombre
        link
      }
    }
  }
`;

export const NEW_CLUB = gql`
  mutation newClub($input: ClubIn!) {
    newClub(input: $input) {
      nombre
      direccion
      pais
      estadoCiudad
      cp
      categorias
      presidente
      responsableContrataciones
      telefonoResponsable
      emailResponsable
      fotoPerfil
      clubType
      userEmail
      idiomas
      web
      documentos {
        uid
        nombre
        link
      }
      videos {
        uid
        nombre
        link
      }
    }
  }
`;

export const EDIT_CLUB = gql`
  mutation editClub($input: ClubIn!) {
    editClub(input: $input) {
      nombre
      direccion
      pais
      estadoCiudad
      cp
      categorias
      presidente
      responsableContrataciones
      telefonoResponsable
      emailResponsable
      fotoPerfil
      userEmail
      idiomas
      web
      documentos {
        uid
        nombre
        link
      }
      videos {
        uid
        nombre
        link
      }
    }
  }
`;
