import { ReactNode, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { RouteComponentProps } from "react-router-dom";
import { Mail, Lock } from "react-feather";

import { AuthContext } from "../../context/authContext";
import { LOGIN_USER } from "./graphql/login.mutations";

import LoginAndRegisterPageTemplate from "../templates/LoginAndRegisterPageTemplate";
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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Please provide your email"),
  password: Yup.string().required("Please provide a password"),
});

const Login = (props: RouteComponentProps) => {
  const [backendErrors, setBackendErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const context = useContext(AuthContext);

  const [loginUser, { loading: loadingLoginUser }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      console.log(err);

      if (err.graphQLErrors[0].extensions) {
        const errors = err.graphQLErrors[0].extensions.exception.errors;
        console.log(errors);
        setBackendErrors(errors);
      }
    },
    variables: formValues,
  });

  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setFormValues(values);
      loginUser();
    },
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;

  return (
    <StyledContainer>
      {loadingLoginUser ? (
        "Loading"
      ) : (
        <LoginAndRegisterPageTemplate>
          <StyledTitle>Login</StyledTitle>
          <StyledFormContainer>
            <FormikProvider value={formik}>
              <StyledForm>
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

                <StyledButton type="submit">Login</StyledButton>
              </StyledForm>
            </FormikProvider>

            <StyledFormFooter>
              <StyledFormFooterDescription>
                Don't have an account?
              </StyledFormFooterDescription>
              <StyledFormFooterLink to="/register">
                Create an account
              </StyledFormFooterLink>
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

export default Login;
