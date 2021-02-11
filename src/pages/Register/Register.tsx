import { ReactNode, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Mail, Lock } from "react-feather";

import { AuthContext } from "../../context/authContext";
import { REGISTER_USER } from "./graphql/register.mutations";
import {
  FETCH_ALL_TEAM_MEMBERS,
  FETCH_REGISTERED_USERS,
} from "./graphql/register.queries";

import LoginAndRegisterPageTemplate from "../templates/LoginAndRegisterPageTemplate";
import Dropdown from "../../components/Form/Dropdown";
import TextInput from "../../components/Form/TextInput";

import {
  StyledContainer,
  StyledTitle,
  StyledFormContainer,
  StyledForm,
  StyledButton,
  StyledFormFooter,
  StyledFormFooterDescription,
  StyledFormFooterLink,
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

  const formik = useFormik({
    validationSchema: RegisterSchema,
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      setFormValues(values);
      addUser();
    },
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;

  return (
    <StyledContainer>
      {loadingRegisterUser ? (
        "Loading"
      ) : (
        <LoginAndRegisterPageTemplate>
          <StyledTitle>Sign Up</StyledTitle>
          <StyledFormContainer>
            <FormikProvider value={formik}>
              <StyledForm>
                <Dropdown
                  name="fullName"
                  placeholder="Choose your name"
                  options={unregisteredTeamMembersFullNames}
                  onChange={handleChange("fullName")}
                  value={values.fullName}
                  onBlur={handleBlur("fullName")}
                  error={errors.fullName}
                  touched={touched.fullName}
                />

                <TextInput
                  name="mail"
                  type="text"
                  icon={<Mail />}
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  required={true}
                  error={errors.email}
                  touched={touched.email}
                />

                <TextInput
                  name="password"
                  type="password"
                  icon={<Lock />}
                  placeholder="Password"
                  onChange={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  required={true}
                  error={errors.password}
                  touched={touched.password}
                />

                <TextInput
                  name="confirmPassword"
                  type="password"
                  icon={<Lock />}
                  placeholder="Comfirm password"
                  onChange={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                  required={true}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />

                <StyledButton type="submit">Sign Up</StyledButton>
              </StyledForm>
            </FormikProvider>

            <StyledFormFooter>
              <StyledFormFooterDescription>
                Already have an account?
              </StyledFormFooterDescription>
              <StyledFormFooterLink to="/login">Login</StyledFormFooterLink>
            </StyledFormFooter>
          </StyledFormContainer>
        </LoginAndRegisterPageTemplate>
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
    </StyledContainer>
  );
};

export default Register;
