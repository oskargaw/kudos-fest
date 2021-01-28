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
