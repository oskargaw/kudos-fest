import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $fullName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        fullName: $fullName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
    }
  }
`;
