import { ReactNode, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/authContext";
import { REGISTER_USER } from "./graphql/register.mutations";
import {
  FETCH_ALL_TEAM_MEMBERS,
  FETCH_REGISTERED_USERS,
} from "./graphql/register.queries";
import {
  StyledRegister,
  StyledPageTitle,
  StyledFormContainer,
  StyledForm,
  StyledField,
  StyledErrorMessage,
  StyledFieldLabel,
} from "../shared/styles";

interface ITeamMember {
  id: string;
  fullName: string;
  imageUrl: string;
}

interface IRegisteredUser {
  id: string;
  fullName: string;
  email: string;
}

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("You need to choose your name"),
  email: Yup.string().email().required("Please provide your email"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .max(100, "Password must contain no more than 50 characters")
    .required("Please provide a password"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")
    .required("Please confirm your password"),
});

const Register = (props: any) => {
  const [backendErrors, setBackendErrors] = useState({});
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const context = useContext(AuthContext);

  const [addUser, { loading: loadingRegisterUser }] = useMutation(
    REGISTER_USER,
    {
      update(_, { data: { register: userData } }) {
        context.login(userData);
        props.history.push("/");
      },
      onError(err) {
        console.log(err);

        if (err.graphQLErrors[0].extensions) {
          console.log(err.graphQLErrors[0].extensions.exception.errors);
          setBackendErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
      },
      variables: formValues,
    }
  );

  const {
    loading: loadingFetchAllTeamMembers,
    data: { getAllTeamMembers: teamMembers } = {},
  } = useQuery(FETCH_ALL_TEAM_MEMBERS);

  const {
    loading: loadingFetchRegisteredUsers,
    data: { getRegisteredUsers: registeredUsers } = {},
  } = useQuery(FETCH_REGISTERED_USERS);

  const teamMembersFullNames = loadingFetchAllTeamMembers
    ? []
    : teamMembers.map((teamMember: ITeamMember) => teamMember.fullName);

  const registeredTeamMembersFullNames = loadingFetchRegisteredUsers
    ? []
    : registeredUsers.map(
        (registeredUser: IRegisteredUser) => registeredUser.fullName
      );

  const unregisteredTeamMembersFullNames = teamMembersFullNames.filter(
    (teamMemberFullName: string) =>
      !registeredTeamMembersFullNames.includes(teamMemberFullName)
  );

  return (
    <StyledRegister>
      {loadingRegisterUser ? (
        "Loading"
      ) : (
        <>
          <StyledPageTitle>Register</StyledPageTitle>
          <StyledFormContainer>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                setFormValues(values);
                addUser();
              }}
            >
              <StyledForm component={<Form />}>
                <StyledField component={<Field name="fullName" as="select" />}>
                  <option defaultValue="default">Choose your name</option>

                  {unregisteredTeamMembersFullNames.map((fullName: string) => (
                    <option key={fullName} value={fullName}>
                      {fullName}
                    </option>
                  ))}
                </StyledField>
                <StyledErrorMessage
                  component={<ErrorMessage component="div" name="fullName" />}
                />

                <StyledFieldLabel>Email: </StyledFieldLabel>
                <StyledField component={<Field name="email" type="email" />} />
                <StyledErrorMessage
                  component={<ErrorMessage component="div" name="email" />}
                />

                <StyledFieldLabel>Password: </StyledFieldLabel>
                <StyledField
                  component={<Field name="password" type="password" />}
                />
                <StyledErrorMessage
                  component={<ErrorMessage component="div" name="password" />}
                />

                <StyledFieldLabel>Confirm password: </StyledFieldLabel>
                <StyledField
                  component={<Field name="confirmPassword" type="password" />}
                />
                <StyledErrorMessage
                  component={
                    <ErrorMessage component="div" name="confirmPassword" />
                  }
                />

                <button type="submit">Register</button>
              </StyledForm>
            </Formik>
          </StyledFormContainer>
        </>
      )}
      {Object.keys(backendErrors).length > 0 && (
        <div>
          <ul>
            {Object.values(backendErrors).map((value) => (
              <li key={value as string}>{value as ReactNode}</li>
            ))}
          </ul>
        </div>
      )}
    </StyledRegister>
  );
};

export default Register;
