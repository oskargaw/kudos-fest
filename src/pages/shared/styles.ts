import * as React from "react";
import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #091a22;
  position: relative;
  overflow: hidden;
`;

export const StyledPageTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2.5rem;
  font-weight: 800;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledFieldLabel = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const StyledForm = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  display: flex;
  flex-direction: column;
`;

export const StyledField = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  margin-bottom: 1rem;
`;

export const StyledErrorMessage = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
  margin-bottom: 1.5rem;
  color: red;
`;
