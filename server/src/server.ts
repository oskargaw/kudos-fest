import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import schema from "./schema";
import config from "./config";

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use("*", cors());
app.use(compression());
server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);

mongoose
  .connect(config.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return httpServer.listen({ port: 5000 }, (): void =>
      console.log("GraphQL is now running on http://localhost:5000/graphql")
    );
  })
  .catch((err) => {
    console.log(err);
  });
