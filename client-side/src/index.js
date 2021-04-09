import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "./style.css";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

ReactDom.render(
  //<ApolloProvider client={client}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  /*</ApolloProvider>*/ document.getElementById("root")
);
