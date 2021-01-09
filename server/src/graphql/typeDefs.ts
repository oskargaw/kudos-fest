import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Kudos {
    id: ID!
    body: String!
    fromWhom: String!
    forWhom: String!
  }
  type TeamMember {
    id: ID!
    fullName: String!
    imageUrl: String!
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
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    getAllKudoses: [Kudos]
    getAllTeamMembers: [TeamMember]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    giveKudos(body: String!, forWhom: String!): Kudos!
    deleteKudos(kudosId: ID!): String!
    createTeamMember(fullName: String!, imageUrl: String!): TeamMember!
  }
`;
