import { gql } from "apollo-boost";

export const REGISTER_USER = gql`
  mutation signup($input: UserCredentials!) {
    signup(input: $input)
  }
`;

export const RECOVER_PASSWORD = gql`
  mutation recoverPassword($input: Email!) {
    recoverPassword(input: $input)
  }
`;

export const EDIT_USER = gql`
  mutation editUser($input: Email!) {
    editUser(input: $input) {
      uid
      token
      email
      fechaCreacion
      notificarSuscripcion
      notificarCompletarInformacion
      status
      emailVerified
      type
      planId
      nivel
      nombre
      fotoPerfil
    }
  }
`;

export const GET_USER_MESSAGE = gql`
  mutation user($input: Id!) {
    user(input: $input) {
      uid
      email
      type
      player {
        nombre
        apellido
        fotoPerfil
      }

      club {
        nombre
        fotoPerfil
      }
    }
  }
`;

export const GET_USER = gql`
  mutation user($input: Id!) {
    user(input: $input) {
      uid
      token
      email
      fechaCreacion
      notificarSuscripcion
      notificarCompletarInformacion
      status
      emailVerified
      planId
      type
      nivel
      nombre
      fotoPerfil
      player {
        nombre
        apellido
        fechaNacimiento
        paisNacimiento
        nacionalidades
        puesto
        puestoAlt
        pateador
        altura
        peso
        equipoActual
        paisEquipoActual
        categoriaEquipoActual
        descripcion
        fotoPerfil
        nivel
        userEmail
        idiomas
        dispLaboral
        dispEntrMenores
        jugadorInternacional
        historialInternacional {
          uid
          pais
          categoria
          torneo
          fecha
        }
        historialClubs {
          uid
          club
          pais
          liga
          fdesde
          fhasta
        }
        documentos {
          uid
          nombre
          link
        }
        videosHighlights {
          uid
          nombre
          link
        }
        videosMatchs {
          uid
          nombre
          link
        }
      }
      club {
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
  }
`;
