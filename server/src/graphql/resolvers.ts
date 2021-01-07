import { UserInputError } from "apollo-server-express";
import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { validateRegisterInput } from "../util/validators";
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
  Mutation: {
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
    giveKudos: async (_, { body, forWhom }) => {
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
  },
};