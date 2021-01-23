import gql from "graphql-tag";

export const FETCH_ALL_TEAM_MEMBERS = gql`
  {
    getAllTeamMembers {
      id
      fullName
      imageUrl
    }
  }
`;

export const FETCH_REGISTERED_USERS = gql`
  {
    getRegisteredUsers {
      id
      fullName
      email
    }
  }
`;
