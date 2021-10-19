import { gql } from "apollo-boost";

export const DO_PAYMENT = gql`
  mutation payment($input: Payment!) {
    payment(input: $input)
  }
`;

export const SUSCRIPTION_CLIENT = gql`
  mutation suscription($input: Id!) {
    suscription(input: $input) {
      id
      fechaInicio
      fechaFin
      plan
      planId
      monto
      stripeCustomerId
      userId
      clubType
    }
  }
`;
