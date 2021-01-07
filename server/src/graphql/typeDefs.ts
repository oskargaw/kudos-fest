import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
  }
`;
