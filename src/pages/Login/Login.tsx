import { ReactNode, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { LOGIN_USER } from './graphql/login.mutations';
import {
  StyledContainer,
  StyledPageTitle,
  StyledFormContainer,
  StyledForm,
  StyledField,
  StyledErrorMessage,
  StyledFieldLabel,
} from '../shared/styles';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Please provide your email'),
  password: Yup.string().required('Please provide a password'),
});

const Login = (props: RouteComponentProps) => {
  const [backendErrors, setBackendErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const context = useContext(AuthContext);

  const [loginUser, { loading: loadingLoginUser }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
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

  //TODO: styles to be changed later
  return (
    <StyledContainer>
      <>
        <StyledPageTitle>Login</StyledPageTitle>
        <StyledFormContainer>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              setFormValues(values);
              loginUser();
            }}
          >
            <StyledForm component={<Form />}>
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

              <button type="submit">Login</button>
            </StyledForm>
          </Formik>
        </StyledFormContainer>
      </>
      {loadingLoginUser && <div>Loading</div>}
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
