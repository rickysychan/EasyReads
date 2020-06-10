import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import {
  withAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  SignOut,
} from "aws-amplify-react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import aws_exports from "../aws-exports";
import "@aws-amplify/ui/dist/style.css";

import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

Amplify.configure(aws_exports);

const getUser = () =>
  Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then((user) => console.log(user))
    .catch((err) => console.log(err));

const allBlogs = async () => {
  let moo = await API.graphql(graphqlOperation(queries.listBlogs));
  console.log(moo);
};

const newblog = async () =>
  await API.graphql(
    graphqlOperation(mutations.createBlog, {
      input: { name: "blog-" + Date.now() },
    })
  );

class Content extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p onClick={() => getUser()}>user</p>
          <p onClick={() => newblog()}>add blog</p>
          <p onClick={() => allBlogs()}>get all blog</p>
          <SignOut />
        </header>
      </div>
    );
  }
}

//the second parameter adds AWS default navbar with signin/signout

export default withAuthenticator(Content, false);
