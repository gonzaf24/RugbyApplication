import { gql } from "apollo-boost";

export const BOOK = gql`
  mutation book($input: BookIn!) {
    book(input: $input)
  }
`;

export const BOOKED = gql`
  mutation obtenerBooked($input: BookIn!) {
    obtenerBooked(input: $input) {
      clubs {
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
      players {
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
  }
`;
