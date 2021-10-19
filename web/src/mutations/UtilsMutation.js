import { gql } from "apollo-boost";

export const GET_PLAN = gql`
  mutation plan($input: Id!) {
    plan(input: $input) {
      id
      entidad
      precio
      tipo
      planKey
    }
  }
`;
