import { gql } from "apollo-boost";

export const GET_AGENT = gql`
  mutation agent($input: Id!) {
    agent(input: $input) {
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

export const NEW_AGENT = gql`
  mutation newAgent($input: AgentIn!) {
    newAgent(input: $input) {
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
    }
  }
`;

export const EDIT_AGENT = gql`
  mutation editAgent($input: AgentIn!) {
    editAgent(input: $input) {
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
    }
  }
`;
