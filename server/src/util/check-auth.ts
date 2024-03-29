import { AuthenticationError } from "apollo-server-express";
import * as jwt from "jsonwebtoken";

import { config } from "../config";

export const checkAuth = (context: any) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, config.SECRET_KEY);

        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid / Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Authorization header must be provided");
};
