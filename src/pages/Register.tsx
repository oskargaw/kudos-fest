import { ReactNode, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../context/authContext";
import { REGISTER_USER } from "../graphql/mutations/register";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("You need to choose your name"),
  email: Yup.string().email().required("Please provide your email"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .max(50, "Password must contain no more than 50 characters")
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

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
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
  });

  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <>
          <h1>Register</h1>
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
            <Form>
              <Field name="fullName" as="select">
                <option value="default" selected>
                  Choose your name
                </option>
                <option value="oskar" selected>
                  Oskar
                </option>
                <option value="olga" selected>
                  Olga
                </option>
              </Field>
              <ErrorMessage component="div" name="fullName" />

              <Field name="email" type="email" />
              <ErrorMessage component="div" name="email" />

              <Field name="password" type="password" />
              <ErrorMessage component="div" name="password" />

              <Field name="confirmPassword" type="password" />
              <ErrorMessage component="div" name="confirmPassword" />

              <button type="submit">Register</button>
            </Form>
          </Formik>
        </>
      )}
      {Object.keys(backendErrors).length > 0 && (
        <div>
          <ul>
            {Object.values(backendErrors).map((value) => (
              <li>{value as ReactNode}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Register;
