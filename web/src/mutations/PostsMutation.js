import { gql } from "apollo-boost";

export const NEW_POST = gql`
  mutation newPost($input: PostIn!) {
    newPost(input: $input) {
      uid
      userType
      userUid
      userEmail
      urlFotoPost
      visibilidad
      contenidoPost
      fechaCreacion
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

export const GET_POSTS_ADM = gql`
  mutation obtenerAdmPosts($input: Id!) {
    obtenerAdmPosts(input: $input) {
      posts {
        uid
        userType
        userUid
        userEmail
        urlFotoPost
        visibilidad
        contenidoPost
        fechaCreacion
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

export const EDIT_POST = gql`
  mutation editPost($input: PostIn!) {
    editPost(input: $input) {
      uid
      userType
      userUid
      userEmail
      urlFotoPost
      visibilidad
      contenidoPost
      fechaCreacion
      nombreUsuario
      likes
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($input: PostIn!) {
    deletePost(input: $input)
  }
`;

export const COMMENT_POST = gql`
  mutation commentPost($input: CommentIn!) {
    commentPost(input: $input) {
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

export const GET_COMMENTS_POST = gql`
  mutation obtenerCommentsPost($input: Id!) {
    obtenerCommentsPost(input: $input) {
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

export const LIKE_POST = gql`
  mutation likePost($input: PostIn!) {
    likePost(input: $input) {
      likes
    }
  }
`;
