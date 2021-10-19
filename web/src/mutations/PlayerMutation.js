import { gql } from "apollo-boost";

export const GET_PLAYER = gql`
  mutation player($input: Id!) {
    player(input: $input) {
      uid
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
  }
`;

export const NEW_PLAYER = gql`
  mutation newPlayer($input: PlayerIn!) {
    newPlayer(input: $input) {
      uid
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
  }
`;
export const EDIT_PLAYER = gql`
  mutation editPlayer($input: PlayerIn!) {
    editPlayer(input: $input) {
      uid
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
  }
`;
