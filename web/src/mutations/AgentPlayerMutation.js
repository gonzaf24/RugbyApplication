import { gql } from "apollo-boost";

export const DELETE_AGENT_PLAYER = gql`
  mutation deleteAgentPlayer($input: AgentPlayerIn!) {
    deleteAgentPlayer(input: $input)
  }
`;

export const GET_AGENT_PLAYER = gql`
  mutation agentPlayer($input: AgentPlayerIn!) {
    agentPlayer(input: $input) {
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
      agentNombre
      agentFotoPerfil
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

export const NEW_AGENT_PLAYER = gql`
  mutation newAgentPlayer($input: PlayerIn!) {
    newAgentPlayer(input: $input) {
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

export const EDIT_AGENT_PLAYER = gql`
  mutation editAgentPlayer($input: PlayerIn!) {
    editAgentPlayer(input: $input) {
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
