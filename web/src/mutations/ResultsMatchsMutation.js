import { gql } from "apollo-boost";

export const NEW_MATCH_RESULT = gql`
  mutation newMatchResult($input: MatchResultIn!) {
    newMatchResult(input: $input) {
      uid
      userType
      userUid
      userEmail
      matchType
      stadium
      category
      matchDate
      matchVideoLink
      team1
      team2
      scoreTeam1
      scoreTeam2
      paisMatch
      estadoCiudadMatch
      descripcion
      paisSelectionTeam1
      paisSelectionTeam2
      urlFotoMatchResult
      visibilidad
      fechaCreacion
      nombreUsuario
      likes
      comments {
        uid
        uidParent
        userUID
        text
        userEmail
        userType
        fotoPerfil
        fechaCreacion
        nombreUsuario
      }
    }
  }
`;

export const GET_MATCHS_RESULTS_ADM = gql`
  mutation obtenerAdmMatchsResults($input: Id!) {
    obtenerAdmMatchsResults(input: $input) {
      matchsResults {
        uid
        userType
        userUid
        userEmail
        matchType
        stadium
        category
        matchDate
        matchVideoLink
        team1
        team2
        scoreTeam1
        scoreTeam2
        paisMatch
        estadoCiudadMatch
        descripcion
        paisSelectionTeam1
        paisSelectionTeam2
        urlFotoMatchResult
        visibilidad
        fechaCreacion
        nombreUsuario
        likes
        comments {
          uid
          uidParent
          userUID
          text
          userEmail
          userType
          fotoPerfil
          fechaCreacion
          nombreUsuario
        }
      }
    }
  }
`;

export const EDIT_MATCH_RESULT = gql`
  mutation editMatchResult($input: MatchResultIn!) {
    editMatchResult(input: $input) {
      uid
      userType
      userUid
      userEmail
      matchType
      stadium
      category
      matchDate
      matchVideoLink
      team1
      team2
      scoreTeam1
      scoreTeam2
      paisMatch
      estadoCiudadMatch
      descripcion
      paisSelectionTeam1
      paisSelectionTeam2
      urlFotoMatchResult
      visibilidad
      fechaCreacion
      nombreUsuario
      likes
    }
  }
`;

export const DELETE_MATCH_RESULT = gql`
  mutation deleteMatchResult($input: MatchResultIn!) {
    deleteMatchResult(input: $input)
  }
`;

export const COMMENT_MATCH_RESULT = gql`
  mutation commentMatchResult($input: CommentIn!) {
    commentMatchResult(input: $input) {
      uid
      uidParent
      userUID
      text
      userEmail
      userType
      fotoPerfil
      fechaCreacion
      nombreUsuario
    }
  }
`;

export const GET_COMMENTS_MATCH_RESULT = gql`
  mutation obtenerCommentsMatchResult($input: Id!) {
    obtenerCommentsMatchResult(input: $input) {
      uid
      uidParent
      userUID
      text
      userEmail
      userType
      fotoPerfil
      fechaCreacion
      nombreUsuario
    }
  }
`;

export const LIKE_MATCH_RESULT = gql`
  mutation likeMatchResult($input: MatchResultIn!) {
    likeMatchResult(input: $input) {
      likes
    }
  }
`;
