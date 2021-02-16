import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../../context/authContext";
import { FETCH_TEAM_MEMBERS_QUERY } from "./graphql/home.queries";
import { StyledContainer } from "../../pages/shared/styles";
import {
  StyledHomePage,
  StyledKudosAndRankingContainer,
  StyledKudosCard,
  StyledRanking,
  StyledTeamMembersListContainer,
  StyledLeftColumn,
  StyledRightColumn,
  StyledImage,
  StyledMiddleColumn,
  StyledBigImage,
} from "./styles";

// TODO: Implement all commented code in next PRs

interface ITeamMember {
  id: string;
  fullName: string;
  imageUrl: string;
}

const Home = () => {
  const [isTeamMemberChosen, setIsTeamMemberChosen] = useState(false);
  const { user } = useContext(AuthContext);
  const { loading, data: { getAllTeamMembers: teamMembers } = {} } = useQuery(
    FETCH_TEAM_MEMBERS_QUERY
  );

  const isMemberChosenClassName = isTeamMemberChosen
    ? "member-chosen"
    : "member-not-chosen";

  return (
    // <div>
    //   <h1>Team Members</h1>
    //   {user && (
    //     <>
    //       {loading ? (
    //         <h1>Getting team members...</h1>
    //       ) : (
    //         <ul>
    //           {teamMembers.map(({ fullName, imageUrl }: ITeamMember) => (
    //             <li key={fullName}>
    //               <h2>{fullName}</h2>
    //               <StyledImage src={imageUrl} alt={fullName} />
    //             </li>
    //           ))}
    //         </ul>
    //       )}
    //     </>
    //   )}
    // </div>
    <StyledContainer>
      <StyledHomePage>
        <StyledKudosAndRankingContainer>
          {isTeamMemberChosen ? (
            <StyledKudosCard>Kudos Card</StyledKudosCard>
          ) : (
            <StyledRanking>Ranking</StyledRanking>
          )}
        </StyledKudosAndRankingContainer>
        <StyledTeamMembersListContainer>
          <StyledLeftColumn className={isMemberChosenClassName}>
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
          </StyledLeftColumn>

          <StyledMiddleColumn className={isMemberChosenClassName}>
            <StyledBigImage />
          </StyledMiddleColumn>

          <StyledRightColumn className={isMemberChosenClassName}>
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
            <StyledImage onClick={() => setIsTeamMemberChosen(true)} />
          </StyledRightColumn>
        </StyledTeamMembersListContainer>
      </StyledHomePage>
    </StyledContainer>
  );
};

export default Home;
