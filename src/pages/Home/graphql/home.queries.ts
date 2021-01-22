import gql from "graphql-tag";

export const FETCH_TEAM_MEMBERS_QUERY = gql`
  {
    getAllTeamMembers {
      id
      fullName
      imageUrl
    }
  }
`;
