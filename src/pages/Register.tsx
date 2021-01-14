import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const Register = () => (
  <div>
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
        console.log(values);
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
  </div>
);

export default Register;
