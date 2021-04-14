import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import "./style.css";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          commentde: {
            read(existing, obj) {
              console.log("existing", existing);
              console.log("objcommentde", obj);
              return "noice";
            },
          },
          content: {
            read(existing, obj) {
              console.log("existing", existing);
              console.log("objcontent", obj);
              return "heyyyyo";
            },
          },
        },
      },
      Query: {
        fields: {
          post(_, { args, toReference }) {
            return toReference({
              __typename: "Post",
              id: args.id,
            });
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});

ReactDom.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
