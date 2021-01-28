import { UserInputError, AuthenticationError } from "apollo-server-express";
import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import {
  validateRegisterInput,
  validateLoginInput,
  validateGiveKudosInput,
} from "../util/validators";
import { config } from "../config";
import { User } from "../models/User";
import { Kudos } from "../models/Kudos";
import { TeamMember } from "../models/TeamMember";
import { checkAuth } from "../util/check-auth";

const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.SECRET_KEY,
    { expiresIn: "168h" }
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
    getKudos: async (_, { kudosId }) => {
      try {
        const kudos = await Kudos.findById(kudosId);

        if (kudos) {
          return kudos;
        } else {
          throw new Error("Kudos not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllTeamMembers: async (_parent, _args) => {
      try {
        const teamMembers = await TeamMember.find();

        return teamMembers;
      } catch (err) {
        throw new Error(err);
      }
    },
    getTeamMember: async (_, { teamMemberId }) => {
      try {
        const teamMember = await TeamMember.findById(teamMemberId);

        return teamMember;
      } catch (err) {
        throw new Error(err);
      }
    },
    getRegisteredUsers: async () => {
      try {
        const registeredUsers = await User.find();

        return registeredUsers;
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
      { registerInput: { fullName, email, password, confirmPassword } }
    ) => {
      // validate user's data
      const { errors, valid } = validateRegisterInput({
        fullName,
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
        fullName,
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
      const user = checkAuth(context);

      const { errors, valid } = validateGiveKudosInput({ forWhom, body });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      try {
        if (body.trim() === "") {
          throw new Error("Kudos body must not be empty");
        }

        const newKudos = new Kudos({
          body,
          fromWhom: (user as any).id,
          forWhom,
          createdAt: new Date().toISOString(),
        });

        const kudos = await newKudos.save();

        return kudos;
      } catch (err) {
        throw new Error(err);
      }
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
    createTeamMember: async (_, { fullName, imageUrl }) => {
      try {
        const newTeamMember = new TeamMember({
          fullName,
          imageUrl,
        });

        const teamMember = await newTeamMember.save();

        return teamMember;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
