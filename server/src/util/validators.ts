interface RegisterInputValidationProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateRegisterInput = ({
  email,
  password,
  confirmPassword,
}: RegisterInputValidationProps) => {
  let errors = {};

  if (email.trim() === "") {
    errors = { ...errors, email: "Email must not be empty" };
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors = { ...errors, email: "Email must be a valid email address" };
    }
  }

  if (password === "") {
    errors = { ...errors, password: "Password must not be empty" };
  } else if (password.length < 6) {
    errors = {
      ...errors,
      password: "Password must contain at least 6 characters",
    };
  } else if (password !== confirmPassword) {
    errors = {
      ...errors,
      confirmPassword: "Passwords must match",
    };
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

interface LoginInputValidationProps {
  email: string;
  password: string;
}

export const validateLoginInput = ({
  email,
  password,
}: LoginInputValidationProps) => {
  let errors = {};

  if (email.trim() === "") {
    errors = { ...errors, email: "Email must not be empty" };
  }
  if (password === "") {
    errors = { ...errors, password: "Password must not be empty" };
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
