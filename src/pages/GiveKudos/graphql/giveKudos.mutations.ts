import gql from "graphql-tag";

export const GIVE_KUDOS = gql`
  mutation giveKudos($forWhom: String!, $body: String!) {
    giveKudos(forWhom: $forWhom, body: $body) {
      id
      body
      fromWhom
      forWhom
    }
  }
`;
