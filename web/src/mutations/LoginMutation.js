import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const LOGIN = gql`
  mutation login($input: UserCredentials!) {
    login(input: $input) {
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
      clubType
      fotoPerfil
      nombre
      player {
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
        booked {
          idBook
          userBook
          tipo
          fechaCreacion
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
        clubType
        uid
        userEmail
        idiomas
        web
        booked {
          idBook
          userBook
          tipo
          fechaCreacion
        }
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

export const LoginMutation = ({ children }) => {
  return <Mutation mutation={LOGIN}>{children}</Mutation>;
};
