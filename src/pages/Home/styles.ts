import styled from "styled-components";

export const StyledHomePage = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
  height: 100%;
`;

export const StyledKudosAndRankingContainer = styled.div`
  grid-column: 2 / 7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledKudosCard = styled.div`
  width: 50%;
  height: 60%;
  background: red;
`;

export const StyledRanking = styled.div`
  width: 50%;
  height: 60%;
  background-color: green;
`;

export const StyledTeamMembersListContainer = styled.div`
  grid-column: 8 / 12;
  display: flex;
  justify-content: center;
  transform: rotate(-7deg);
  overflow: visible scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  & {
    overflow: -moz-scrollbars-none;
  }
`;

const StyledColumn = styled.div`
  width: 80%;
  height: 100%;
`;

export const StyledLeftColumn = styled(StyledColumn)`
  margin-right: 4rem;
  animation: ${(props) =>
    props.className === "member-chosen"
      ? "scale-down-horizontal-to-left 0.6s ease-out both"
      : "none"};

  @keyframes scale-down-horizontal-to-left {
    0% {
      transform: scaleX(1);
      transform-origin: 0% 0%;
    }
    100% {
      transform: scaleX(0);
      transform-origin: 0% 0%;
    }
  }
`;

export const StyledMiddleColumn = styled.div`
  display: ${(props) =>
    props.className === "member-chosen" ? "flex" : "none"};
  position: absolute;
  width: 90%;
  height: 100%;
`;

export const StyledRightColumn = styled(StyledColumn)`
  transform: translateY(-25%);
  animation: ${(props) =>
    props.className === "member-chosen"
      ? "scale-down-horizontal-to-right 0.6s ease-out both"
      : "none"};

  @keyframes scale-down-horizontal-to-right {
    0% {
      transform: scaleX(1);
      transform-origin: 100% 100%;
    }
    100% {
      transform: scaleX(0);
      transform-origin: 100% 100%;
    }
  }
`;

export const StyledImage = styled.div`
  width: 100%;
  height: 50%;
  background-color: blue;
  margin-bottom: 3rem;
`;

export const StyledBigImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: purple;
  animation: scale-up-horizontally-from-center 0.6s ease-out both;

  @keyframes scale-up-horizontally-from-center {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
`;
