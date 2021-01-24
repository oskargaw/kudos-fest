interface RegisterInputValidationProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginInputValidationProps {
  email: string;
  password: string;
}

interface GiveKudosValidationProps {
  forWhom: string;
  body: string;
}

export const validateRegisterInput = ({
  fullName,
  email,
  password,
  confirmPassword,
}: RegisterInputValidationProps) => {
  let errors = {};

  // "Choose your name" will be a default value in the dropdown
  const chooseFullNameMessage = "Choose your name";

  if (fullName === chooseFullNameMessage || fullName === "") {
    errors = { ...errors, fullName: "You need to choose your name" };
  }

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

export const validateGiveKudosInput = ({
  forWhom,
  body,
}: GiveKudosValidationProps) => {
  let errors = {};

  // "Choose a person" will be a default value in the dropdown
  const choosePersonMessage = "Choose a person";

  if (forWhom === choosePersonMessage || forWhom === "") {
    errors = {
      ...errors,
      forWhom: "Please choose a person you want to give kudos to",
    };
  }

  if (body === "") {
    errors = {
      ...errors,
      body: "Please provide the kudos message",
    };
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
