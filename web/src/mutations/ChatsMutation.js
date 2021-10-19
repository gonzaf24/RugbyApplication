import { gql } from "apollo-boost";

export const GET_CHATS = gql`
  mutation obtenerChatsUser($input: ChatsIn!) {
    obtenerChatsUser(input: $input) {
      uid
      nombre
      avatar
      timestamp
      message
      horaPrev
      seen
      email
    }
  }
`;
