import React from "react";
import { gql, useQuery } from "@apollo/client";

const EXCHANGE_COMMENTS = gql`
  query {
    comments {
      id
      content
      createdAt
      post {
        content
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(EXCHANGE_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.comments.map(({ content, createdAt }) => (
    <div key={createdAt}>
      <p>
        {content}: @ {createdAt}
      </p>
    </div>
  ));

  return <div> Hello from React World !!</div>;
}
export default App;
