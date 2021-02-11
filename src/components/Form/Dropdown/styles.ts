import styled from "styled-components";

export const StyledDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export const StyledDropdown = styled.select`
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: none;
  color: #f0f0f0;

  &:focus {
    outline: none;
  }
`;
