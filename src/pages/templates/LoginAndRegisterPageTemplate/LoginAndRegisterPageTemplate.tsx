import cardOne from "../../../assets/images/1.png";
import cardTwo from "../../../assets/images/2.png";
import cardThree from "../../../assets/images/3.png";

import {
  StyledGlassContainer,
  StyledGlass,
  StyledCardOne,
  StyledCardTwo,
  StyledCardThree,
  StyledCardFour,
  StyledCardFive,
  StyledCardSix,
} from "../../shared/styles";

const LoginAndRegisterPageTemplate = ({ children }: any) => (
  <>
    <StyledGlassContainer>
      <StyledCardOne alt="1" src={cardOne} />
      <StyledCardTwo alt="2" src={cardTwo} />
      <StyledCardThree alt="3" src={cardThree} />

      <StyledGlass>{children}</StyledGlass>

      <StyledCardFour alt="1" src={cardOne} />
      <StyledCardFive alt="3" src={cardThree} />
      <StyledCardSix alt="2" src={cardTwo} />
    </StyledGlassContainer>
  </>
);

export default LoginAndRegisterPageTemplate;
