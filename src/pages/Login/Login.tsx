import { ReactNode, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/authContext";
import { LOGIN_USER } from './graphql/login.mutations';
import { History } from 'history';

interface Props {
  history: History
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Please provide your email"),
  password: Yup.string().required("Please provide a password"),
})

const Login = (props: Props) => {
  const [backendErrors, setBackendErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  })
  const context = useContext(AuthContext);
  const [loginUser, {loading: loadingLoginUser}] = useMutation(
    LOGIN_USER,
    {
      update(_, {data: {login: userData}}) {
        context.login(userData);
        props.history.push("/")
      },
      onError(err) {
        console.log(err);

        if (err.graphQLErrors[0].extensions) {
          const errors = err.graphQLErrors[0].extensions.exception.errors
          console.log(errors);
          setBackendErrors(errors);
        }
      },
      variables: formValues,
    }
  )

  return (
    <div>
      {loadingLoginUser ? 'Loading' : (
        <>
          <h1>Sign in</h1>
          <Formik 
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={(values)=>{
              setFormValues(values);
              loginUser()
            }}
          >
            <Form>
              <Field name="email" type="email" />
              <ErrorMessage component="div" name="email" />

              <Field name="password" type="password" />
              <ErrorMessage component="div" name="password" />

              <button type="submit">Sign up</button>
            </Form>
          </Formik>
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
    </div>
  );
};

export default Login;
