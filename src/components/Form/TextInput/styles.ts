import styled from "styled-components";

export const StyledTextInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 0.875rem;
  margin-top: 1.2rem;
  margin-bottom: 5px;
  padding: 0 0.5rem;
  border: ${(props) =>
    props.color === "normal"
      ? "1px solid rgba(255, 255, 255, 0.4)"
      : "1px solid #f44336"};
  border-radius: 0.25rem;
  color: #f0f0f0;
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
`;

export const StyledTextInput = styled.input`
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: none;
  color: #f0f0f0;

  &:focus {
    outline: none;
  }
`;

export const StyledTextInputPlaceholder = styled.span`
  position: absolute;
  top: calc(50%);
  transform: translateY(-50%);
  transition: top 0.3s ease, font-size 0.3s ease, color 0.3s ease;

  ${StyledTextInput}:valid + &,
  ${StyledTextInput}:focus + & {
    top: -0.625rem;
    font-size: 0.625rem;
    color: #f0f0f0;
  }
`;
