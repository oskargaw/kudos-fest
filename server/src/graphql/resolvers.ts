import { UserInputError, AuthenticationError } from "apollo-server-express";
import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { validateRegisterInput, validateLoginInput } from "../util/validators";
import { config } from "../config";
import { User } from "../models/User";
import { Kudos } from "../models/Kudos";

const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const resolvers: IResolvers = {
  Query: {
    getAllKudoses: async () => {
      try {
        const allKudoses = await Kudos.find();

        return allKudoses;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    login: async (_, { loginInput: { email, password } }) => {
      // validate user's data
      const { errors, valid } = validateLoginInput({ email, password });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new UserInputError("User not found", {
          errors: {
            general: "User not found",
          },
        });
      }

      //compare passwords and create auth token
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError("Invalid password", {
          errors: {
            general: "Invalid password",
          },
        });
      }

      const token = generateToken(user);

      return {
        id: user._id,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { email, password, confirmPassword } }
    ) => {
      // validate user's data
      const { errors, valid } = validateRegisterInput({
        email,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      //   make sure the user doesn't exist already
      if (user) {
        throw new UserInputError("This user already exists", {
          errors: {
            email: "This user already exists",
          },
        });
      }

      //   hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();

      const token = generateToken(result);

      return {
        id: result._id,
        token,
      };
    },
    giveKudos: async (_, { body, forWhom }, context) => {
      // get logged user id
      // TODO: uncomment when we'll set user's token in local storage on the client side
      // const user = checkAuth(context);

      const user = await User.findOne({ email: "oskar.gawlak@gmail.com" });

      if (body.trim() === "") {
        throw new Error("Kudos body must not be empty");
      }

      const newKudos = new Kudos({
        body,
        fromWhom: user?.id,
        forWhom,
        createdAt: new Date().toISOString(),
      });

      const kudos = await newKudos.save();

      return kudos;
    },
    deleteKudos: async (_, { kudosId }, context) => {
      // TODO: uncomment when we'll set user's token in local storage on the client side
      // const user = checkAuth(context);

      try {
        const kudos = await Kudos.findById(kudosId);

        if (!kudos) {
          throw new Error("Kudos does not exist");
        }
        // TODO: uncomment when we'll set user's token in local storage on the client side and when we add username to User
        // if (user.username === kudos.fromWhom) {
        kudos && (await kudos.delete()); // this condition is to be removed once the above gets uncommented

        return "Kudos deleted :(";
      } catch (err) {
        throw new Error(err);
      }
      // } else {
      //   throw new AuthenticationError("Action not allowed");
      // }
    },
  },
};
