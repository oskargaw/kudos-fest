import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";

import { config } from "./config";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

mongoose
  .connect(config.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return app.listen({ port: 5000 }, () =>
      console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
