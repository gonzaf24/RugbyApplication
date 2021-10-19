import React, { useContext } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Context from "./Context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { App } from "./App";
import { navigate } from "@reach/router";
import firebaseApp from "firebase";

require("firebase/database");

firebaseApp.initializeApp(firebaseConfig);

const client = new ApolloClient({
  //uri: "http://localhost:5001/rugbyagentsapp/us-central1/rugbyAgentsApi/graphql",
  uri: "https://us-central1-rugbyagentsapp.cloudfunctions.net/rugbyAgentsApi/graphql",
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = window.localStorage.getItem("tkn");
    const authorization = token ? `Bearer ${token}` : "";
    operation.setContext({
      headers: {
        authorization,
      },
    });
  },
  onError: (error) => {
    const { networkError } = error;

    console.log(
      "¡+++++++ ERROR CONTEXT +++++++" + JSON.stringify(networkError)
    );
    if (
      networkError &&
      networkError.result &&
      networkError.result.code === "invalid_token"
    ) {
      window.localStorage.removeItem("tkn");
      navigate("/login");
    }

    const errorCode = error.graphQLErrors ? error.graphQLErrors[0].message : "";
    console.log("error code contexto : " + error.graphQLErrors);
    if (errorCode) {
      console.log("error code contexto : " + errorCode);
      let code = errorCode.substring(0, errorCode.indexOf("-"));
      console.log("code : " + code);
      let message = errorCode.substring(
        errorCode.lastIndexOf("-") + 1,
        errorCode.length
      );
      if (code && code === "404") {
        navigate(`/notFound/${message}`);
      }
    }
  },
});

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById("app")
);
