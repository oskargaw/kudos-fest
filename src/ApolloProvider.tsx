import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: (authLink as any).concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
