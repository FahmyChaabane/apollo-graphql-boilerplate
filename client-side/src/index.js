import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import "./style.css";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        users {
          id
          userName
          role
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
