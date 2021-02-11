import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #091a22;
  position: relative;
  overflow: hidden;
`;

export const StyledGlassContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const StyledGlass = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 22rem;
  width: 100%;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1)
  );
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 100;
  transition: all 0.2s ease-in-out;
  position: absolute;
  animation: fadeInUp 0.5s;

  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 40px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

export const StyledTitle = styled.h1`
  font-weight: 800;
  color: #fff;
  opacity: 0.7;
  font-size: 1.4rem;
  margin-bottom: 3.75rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const StyledButton = styled.button`
  background: #00aeef;
  color: #fff;
  width: 50%;
  height: auto;
  border: 1px solid #00aeef;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: 0.6s;
  overflow: hidden;
  align-self: center;
  margin-top: 3rem;
  padding: 0.5rem 1rem;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    background: #0082b3;
    border: 1px solid #0082b3;
  }
`;

export const StyledFormFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

export const StyledFormFooterDescription = styled.div`
  color: #f0f0f0;
  margin-bottom: 0.5rem;
`;

export const StyledFormFooterLink = styled(Link)`
  color: #00aeef;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const StyledCard = styled.img`
  width: 350px;

  @media (max-width: 1440px) {
    width: 300px;
  }
`;

export const StyledCardOne = styled(StyledCard)`
  transform: translateY(-15%) translateX(3%) rotate(-15deg);
`;

export const StyledCardTwo = styled(StyledCard)`
  transform: translateX(-16%) rotate(15deg);
  z-index: 10;
`;

export const StyledCardThree = styled(StyledCard)`
  transform: translateY(30%) translateX(-50%) rotate(-10deg);
  z-index: 5;
`;

export const StyledCardFour = styled(StyledCard)`
  transform: translateY(-50%) translateX(45%) rotate(-40deg);
  z-index: 6;

  @media (max-width: 1440px) {
    transform: translateY(-50%) translateX(55%) rotate(-40deg);
  }
`;

export const StyledCardFive = styled(StyledCard)`
  transform: translateY(22%) translateX(-15%) rotate(15deg);
  z-index: 7;
`;

export const StyledCardSix = styled(StyledCard)`
  transform: translateY(14%) translateX(-12%) rotate(45deg);
  z-index: 8;
`;

export const StyledErrorMessage = styled.div`
  color: #f44336;
  font-size: 10.5px;
  font-weight: 400;
  margin-left: 0.25rem;
  animation: fadeInDown 0.3s;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledErrorMessagePlaceholder = styled.div`
  font-size: 10.5px;
  font-weight: 400;
  margin-left: 0.25rem;
  visibility: hidden;
`;
