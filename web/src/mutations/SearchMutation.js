import { gql } from "apollo-boost";

export const SEARCH_CLUBS = gql`
  mutation searchClubs($input: FilterClubIn!) {
    searchClubs(input: $input) {
      uid
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

export const SEARCH_AGENTS = gql`
  mutation searchAgents($input: FilterAgentIn!) {
    searchAgents(input: $input) {
      uid
      nombre
      inicioActividad
      idiomas
      agencia
      paisAgencia
      paisesOpera
      telefono
      email
      fotoPerfil
      userEmail
      documentos {
        uid
        nombre
        link
      }
      agentPlayers {
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
        agentUID
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
  }
`;

export const SEARCH_PLAYERS_AGENTS = gql`
  mutation searchPlayersAgents($input: FilterPlayersIn!) {
    searchPlayersAgents(input: $input) {
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
      agentUID
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

export const SEARCH_PLAYERS = gql`
  mutation searchPlayers($input: FilterPlayersIn!) {
    searchPlayers(input: $input) {
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
