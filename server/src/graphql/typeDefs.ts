import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Kudos {
    id: ID!
    body: String!
    fromWhom: String!
    forWhom: String!
  }
  type User {
    id: ID!
    token: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    currentUser: User!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    giveKudos(body: String!, forWhom: String!): Kudos!
  }
`;
