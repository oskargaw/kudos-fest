import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../../context/authContext";
import { FETCH_TEAM_MEMBERS_QUERY } from "./graphql/home.queries";
import { StyledImage } from "./styles/home";

interface ITeamMember {
  id: string;
  fullName: string;
  imageUrl: string;
}

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getAllTeamMembers: teamMembers } = {} } = useQuery(
    FETCH_TEAM_MEMBERS_QUERY
  );

  return (
    <div>
      <h1>Team Members</h1>
      {user && (
        <>
          {loading ? (
            <h1>Getting team members...</h1>
          ) : (
            <ul>
              {teamMembers.map(({ fullName, imageUrl }: ITeamMember) => (
                <li key={fullName}>
                  <h2>{fullName}</h2>
                  <StyledImage src={imageUrl} alt={fullName} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
