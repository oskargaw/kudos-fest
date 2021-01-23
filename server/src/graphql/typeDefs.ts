import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Kudos {
    id: ID!
    body: String!
    fromWhom: String!
    forWhom: String!
    createdAt: String!
  }
  type TeamMember {
    id: ID!
    fullName: String!
    imageUrl: String!
  }
  type User {
    id: ID!
    token: String!
    fullName: String!
  }
  type RegisteredUser {
    id: ID!
    fullName: String!
    email: String!
  }
  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    getAllTeamMembers: [TeamMember]
    getTeamMember(teamMemberId: ID!): TeamMember!
    getRegisteredUsers: [RegisteredUser]
    getAllKudoses: [Kudos]
    getKudos(kudosId: ID!): Kudos!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    giveKudos(body: String!, forWhom: String!): Kudos!
    deleteKudos(kudosId: ID!): String!
    createTeamMember(fullName: String!, imageUrl: String!): TeamMember!
  }
`;
